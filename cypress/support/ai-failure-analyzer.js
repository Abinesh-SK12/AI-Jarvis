/**
 * AI-Powered Failure Analyzer for Cypress
 * Automatically analyzes test failures and provides human-readable explanations
 * Enhanced with GPT-4/Claude API integration
 */

const aiAPI = require('./ai-api-integration');

// Store failure data for analysis
let failureData = {
  testName: '',
  error: null,
  dom: '',
  url: '',
  timestamp: null,
  screenshot: null,
  testCode: '',
  browser: '',
  testFile: '',
  previousRuns: []
};

// Hook into Cypress test lifecycle
Cypress.on('fail', (error, runnable) => {
  // Capture enhanced failure data
  failureData.testName = runnable.fullTitle();
  failureData.error = {
    message: error.message,
    stack: error.stack,
    name: error.name
  };
  failureData.url = window.location.href;
  failureData.timestamp = new Date().toISOString();
  failureData.browser = Cypress.browser.name;
  failureData.testFile = runnable.file;
  
  // Capture test code if available
  try {
    failureData.testCode = runnable.body ? runnable.body.toString() : '';
  } catch (e) {
    failureData.testCode = '';
  }
  
  // Capture DOM snapshot
  try {
    failureData.dom = Cypress.$('body').html()?.substring(0, 10000) || 'DOM not available'; // Increased DOM size
  } catch (e) {
    failureData.dom = 'Could not capture DOM';
  }
  
  // Capture screenshot if available
  if (Cypress.config('screenshotOnRunFailure')) {
    failureData.screenshot = true;
  }
  
  // Analyze failure with enhanced AI (don't wait for it)
  setTimeout(() => {
    analyzeFailureWithEnhancedAI(failureData);
  }, 0);
  
  // Still throw the error so Cypress knows the test failed
  throw error;
});

// Enhanced function to analyze failure with multiple AI providers
async function analyzeFailureWithEnhancedAI(data) {
  try {
    // Use the new AI API integration
    const analysis = await aiAPI.analyzeFailureWithAI(data);
    
    // Log the enhanced AI analysis
    cy.task('log', '\n🤖 ========== JARVIS AI FAILURE ANALYSIS ==========\n');
    cy.task('log', formatAnalysisOutput(analysis));
    cy.task('log', '\n==================================================\n');
    
    // Save comprehensive failure analysis
    saveEnhancedFailureAnalysis(data, analysis);
    
    // Attempt auto-fix if confidence is high
    if (analysis.autoFixAvailable && analysis.confidence > 0.8) {
      const fixResult = await aiAPI.applyAutoFix(analysis, data);
      if (fixResult.success) {
        cy.task('log', `\n✅ AUTO-FIX APPLIED: ${fixResult.fixApplied}\n`);
      }
    }
    
    return analysis;
  } catch (error) {
    cy.task('log', `⚠️ AI Analysis Error: ${error.message}`);
    // Fall back to original Groq analysis
    analyzeFailureWithAI(data);
  }
}

// Original Groq-based analysis (kept as fallback)
function analyzeFailureWithAI(data) {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
  // Build comprehensive prompt for AI analysis
  const prompt = `
    A Cypress test has failed. Please analyze the failure and provide:
    1. A human-readable explanation of what went wrong
    2. The likely root cause
    3. Suggested fixes (2-3 specific solutions)
    
    Test Information:
    - Test Name: ${data.testName}
    - URL: ${data.url}
    - Error Type: ${data.error.name}
    - Error Message: ${data.error.message}
    - Stack Trace (first line): ${data.error.stack?.split('\n')[0]}
    - DOM Elements Present: ${extractDOMInfo(data.dom)}
    - Timestamp: ${data.timestamp}
    
    Based on this information, provide a clear, actionable analysis.
    Format your response with clear sections using markdown headers.
  `;
  
  // Make API request to Groq
  cy.request({
    method: 'POST',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 800,
      temperature: 0.3 // Lower temperature for more focused analysis
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200) {
      const aiAnalysis = response.body.choices[0].message.content;
      
      // Log the AI analysis in a formatted way
      cy.task('log', '\n🤖 ========== AI FAILURE ANALYSIS ==========\n');
      cy.task('log', aiAnalysis);
      cy.task('log', '\n=========================================\n');
      
      // Also save to a file for later review
      saveFailureAnalysis(data, aiAnalysis);
    } else {
      cy.task('log', '⚠️ Could not get AI analysis for this failure');
    }
  });
}

// Extract meaningful DOM information for AI
function extractDOMInfo(domHtml) {
  const info = [];
  
  // Extract form elements
  const forms = (domHtml.match(/<form[^>]*>/g) || []).length;
  if (forms > 0) info.push(`${forms} forms`);
  
  // Extract buttons
  const buttons = (domHtml.match(/<button[^>]*>/g) || []).length;
  if (buttons > 0) info.push(`${buttons} buttons`);
  
  // Extract inputs
  const inputs = (domHtml.match(/<input[^>]*>/g) || []).length;
  if (inputs > 0) info.push(`${inputs} input fields`);
  
  // Extract error messages (common patterns)
  const hasError = domHtml.includes('error') || domHtml.includes('Error') || domHtml.includes('failed');
  if (hasError) info.push('error messages visible');
  
  // Extract loading indicators
  const hasLoading = domHtml.includes('loading') || domHtml.includes('spinner') || domHtml.includes('progress');
  if (hasLoading) info.push('loading indicators present');
  
  // Check for videos (YouTube specific)
  const hasVideo = domHtml.includes('video') || domHtml.includes('ytd-') || domHtml.includes('youtube');
  if (hasVideo) info.push('video elements detected');
  
  return info.length > 0 ? info.join(', ') : 'standard page elements';
}

// Format analysis output for console
function formatAnalysisOutput(analysis) {
  if (typeof analysis === 'string') return analysis;
  
  let output = '';
  
  if (analysis.fromCache) {
    output += '📌 KNOWN ISSUE (From Pattern Recognition)\n\n';
  }
  
  output += `🔍 ROOT CAUSE:\n${analysis.rootCause}\n\n`;
  
  if (analysis.immediateFix) {
    output += `🔧 IMMEDIATE FIX:\n${analysis.immediateFix.description}\n`;
    if (analysis.immediateFix.code) {
      output += `\nCode:\n${analysis.immediateFix.code}\n`;
    }
    output += '\n';
  }
  
  if (analysis.longTermSolution) {
    output += `📋 LONG-TERM SOLUTION:\n${analysis.longTermSolution}\n\n`;
  }
  
  if (analysis.pattern) {
    output += `🎯 PATTERN: ${analysis.pattern.type} (Confidence: ${(analysis.pattern.confidence * 100).toFixed(0)}%)\n\n`;
  }
  
  if (analysis.selfHealing && analysis.selfHealing.selectors?.length > 0) {
    output += `🔄 SELF-HEALING SUGGESTIONS:\n`;
    output += `Selectors: ${analysis.selfHealing.selectors.join(', ')}\n`;
    output += `Strategy: ${analysis.selfHealing.strategy}\n\n`;
  }
  
  if (analysis.confidence) {
    output += `📊 CONFIDENCE: ${(analysis.confidence * 100).toFixed(0)}%\n`;
  }
  
  if (analysis.autoFixAvailable) {
    output += `✨ AUTO-FIX AVAILABLE\n`;
  }
  
  return output;
}

// Save enhanced failure analysis with AI insights
function saveEnhancedFailureAnalysis(data, analysis) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `jarvis-ai-report-${timestamp}.md`;
  
  const content = `
# J.A.R.V.I.S. AI-POWERED FAILURE ANALYSIS
═══════════════════════════════════════════════════════════════════

**System:** J.A.R.V.I.S. Enhanced AI Debugger v5.0.0
**AI Provider:** ${analysis.provider || 'Multi-Model Analysis'}
**Generated:** ${new Date().toISOString()}
**Test:** ${data.testName}
**URL:** ${data.url}
**Browser:** ${data.browser || 'Unknown'}

## 🔴 ERROR DETAILS
────────────────────────────────────────────────────────────────────
- **Type:** ${data.error.name}
- **Message:** ${data.error.message}

## 🤖 AI ANALYSIS
────────────────────────────────────────────────────────────────────

### Root Cause
${analysis.rootCause}

### Immediate Fix
**Description:** ${analysis.immediateFix?.description || 'N/A'}

${analysis.immediateFix?.code ? '```javascript\n' + analysis.immediateFix.code + '\n```' : ''}

### Long-term Solution
${analysis.longTermSolution || 'No long-term solution suggested'}

## 🎯 PATTERN RECOGNITION
────────────────────────────────────────────────────────────────────
- **Pattern Type:** ${analysis.pattern?.type || 'Unknown'}
- **Confidence:** ${analysis.pattern ? (analysis.pattern.confidence * 100).toFixed(0) + '%' : 'N/A'}
- **From Cache:** ${analysis.fromCache ? 'Yes' : 'No'}

## 🔄 SELF-HEALING RECOMMENDATIONS
────────────────────────────────────────────────────────────────────
${analysis.selfHealing ? `
**Resilient Selectors:**
${analysis.selfHealing.selectors?.map(s => '- `' + s + '`').join('\n') || 'None'}

**Strategy:** ${analysis.selfHealing.strategy}
` : 'No self-healing recommendations'}

## 📊 ANALYSIS METRICS
────────────────────────────────────────────────────────────────────
- **Confidence Score:** ${analysis.confidence ? (analysis.confidence * 100).toFixed(0) + '%' : 'N/A'}
- **Auto-Fix Available:** ${analysis.autoFixAvailable ? '✅ Yes' : '❌ No'}
- **Historical Context:** ${analysis.historicalContext ? JSON.stringify(analysis.historicalContext, null, 2) : 'N/A'}

## 📸 SCREENSHOT
────────────────────────────────────────────────────────────────────
${data.screenshot ? 'Screenshot captured at failure point' : 'No screenshot available'}

## 🧬 TEST CODE
────────────────────────────────────────────────────────────────────
${data.testCode ? '```javascript\n' + data.testCode.substring(0, 1000) + '\n```' : 'Test code not available'}

## 📊 STACK TRACE
────────────────────────────────────────────────────────────────────
\`\`\`javascript
${data.error.stack}
\`\`\`

## 🌐 DOM SNAPSHOT (First 2000 chars)
────────────────────────────────────────────────────────────────────
\`\`\`html
${data.dom.substring(0, 2000)}...
\`\`\`

## 🎯 JARVIS VERDICT
────────────────────────────────────────────────────────────────────
${analysis.confidence > 0.7 ? 
  "High confidence in analysis. Recommended actions should resolve the issue." :
  analysis.confidence > 0.5 ?
    "Moderate confidence. Manual review recommended alongside suggested fixes." :
    "Low confidence. Manual debugging required. Analysis provided as guidance only."}

---
*"Sir, I've completed a comprehensive failure analysis with ${analysis.confidence ? (analysis.confidence * 100).toFixed(0) + '%' : 'moderate'} confidence."* - JARVIS
`;
  
  // Save to jarvis-reports folder
  cy.writeFile(`cypress/jarvis-reports/${fileName}`, content);
}

// Original save function (kept for backward compatibility)
function saveFailureAnalysis(data, analysis) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `jarvis-failure-report-${timestamp}.md`;
  
  const content = `
# J.A.R.V.I.S. FAILURE ANALYSIS REPORT
═══════════════════════════════════════════════════════════════════

**System:** J.A.R.V.I.S. Visual AI Debugger v4.2.0
**Generated:** ${new Date().toISOString()}
**Test:** ${data.testName}
**URL:** ${data.url}

## 🔴 ERROR DETAILS
────────────────────────────────────────────────────────────────────
- **Type:** ${data.error.name}
- **Message:** ${data.error.message}

## 🤖 J.A.R.V.I.S. AI ANALYSIS
────────────────────────────────────────────────────────────────────
${analysis}

## 📊 STACK TRACE
────────────────────────────────────────────────────────────────────
\`\`\`javascript
${data.error.stack}
\`\`\`

## 🌐 DOM SNAPSHOT (First 1000 chars)
────────────────────────────────────────────────────────────────────
\`\`\`html
${data.dom.substring(0, 1000)}...
\`\`\`

## 🎯 JARVIS RECOMMENDATIONS
────────────────────────────────────────────────────────────────────
Based on the analysis above, JARVIS recommends immediate attention to the identified issues.

---
*"Sir, I've compiled a comprehensive failure analysis for your review."* - JARVIS
`;
  
  // Save to jarvis-reports folder instead of failure-reports
  cy.writeFile(`cypress/jarvis-reports/${fileName}`, content);
}

// Add custom command for manual failure analysis
Cypress.Commands.add('analyzeFailure', (customError) => {
  const data = {
    testName: Cypress.currentTest.title,
    error: {
      message: customError || 'Manual analysis requested',
      name: 'ManualAnalysis',
      stack: new Error().stack
    },
    url: window.location.href,
    timestamp: new Date().toISOString(),
    dom: Cypress.$('body').html().substring(0, 5000)
  };
  
  analyzeFailureWithAI(data);
});

// Export for use in other files
module.exports = { analyzeFailureWithAI, extractDOMInfo };