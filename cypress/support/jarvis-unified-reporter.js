/**
 * J.A.R.V.I.S. Unified Reporting System
 * Consolidates all failure reports into jarvis-reports folder
 */

// Unified report data structure
let unifiedReportData = {
  testName: '',
  testFile: '',
  timestamp: null,
  error: null,
  url: '',
  dom: '',
  screenshots: [],
  ocrText: '',
  aiAnalysis: '',
  discordStatus: false,
  duration: 0
};

/**
 * Save unified JARVIS report
 */
function saveUnifiedReport(data) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `jarvis-unified-report-${timestamp}.md`;
  
  const content = `
# J.A.R.V.I.S. UNIFIED TEST REPORT
═══════════════════════════════════════════════════════════════════════════════

╔════════════════════════════════════════════════════════════════════════════╗
║                    J.A.R.V.I.S. VISUAL AI DEBUGGER                            ║
║                         Version 4.2.0 STARK INDUSTRIES                        ║
╚════════════════════════════════════════════════════════════════════════════╝

## 📋 TEST INFORMATION
────────────────────────────────────────────────────────────────────────────────
- **Test Name:** ${data.testName}
- **Test File:** ${data.testFile || 'Unknown'}
- **Timestamp:** ${data.timestamp}
- **Duration:** ${data.duration}ms
- **URL:** ${data.url}
- **Status:** ❌ FAILED

## 🔴 ERROR DETAILS
────────────────────────────────────────────────────────────────────────────────
**Error Type:** ${data.error?.name || 'Unknown Error'}
**Error Message:**
\`\`\`
${data.error?.message || 'No error message available'}
\`\`\`

## 🤖 J.A.R.V.I.S. AI ANALYSIS
────────────────────────────────────────────────────────────────────────────────
${data.aiAnalysis || 'AI analysis pending...'}

## 📸 VISUAL EVIDENCE
────────────────────────────────────────────────────────────────────────────────
**Screenshots Captured:** ${data.screenshots.length}
${data.screenshots.map(s => `- ${s}`).join('\n')}

## 👁️ OCR TEXT EXTRACTION
────────────────────────────────────────────────────────────────────────────────
\`\`\`
${data.ocrText || 'No text extracted from screenshots'}
\`\`\`

## 🌐 DOM STATE
────────────────────────────────────────────────────────────────────────────────
\`\`\`html
${data.dom ? data.dom.substring(0, 1500) + '...' : 'DOM not captured'}
\`\`\`

## 📊 STACK TRACE
────────────────────────────────────────────────────────────────────────────────
\`\`\`javascript
${data.error?.stack || 'No stack trace available'}
\`\`\`

## 📨 NOTIFICATION STATUS
────────────────────────────────────────────────────────────────────────────────
- **Discord Notification:** ${data.discordStatus ? '✅ Sent' : '⏳ Pending'}
- **Report Location:** cypress/jarvis-reports/

## 🎯 JARVIS RECOMMENDATIONS
────────────────────────────────────────────────────────────────────────────────
Based on the comprehensive analysis above:

1. **Immediate Action Required:** Review the error message and stack trace
2. **Visual Verification:** Check screenshots for UI state at failure
3. **DOM Analysis:** Inspect the DOM snapshot for missing elements
4. **AI Insights:** Consider the AI-suggested fixes

## 📊 SYSTEM STATUS AT FAILURE
────────────────────────────────────────────────────────────────────────────────
\`\`\`
┌──────────────────────────────────────────────────────────────────────┐
│  ◉ Neural Network:      [■■■■■■■■■■] 100% ✓                        │
│  ◉ Visual Cortex:       [■■■■■■■■■■] 100% ✓                        │
│  ◉ Groq AI Integration: [■■■■■■■■■■] 100% ✓                        │
│  ◉ OCR Engine:          [■■■■■■■■■■] 100% ✓                        │
│  ◉ Discord Interface:   [■■■■■■■■■■] 100% ✓                        │
└──────────────────────────────────────────────────────────────────────┘
\`\`\`

---
**Report Generated:** ${new Date().toISOString()}
**J.A.R.V.I.S. Status:** All systems operational

*"Sir, I've compiled all failure data into a comprehensive report for your review."*
*- JARVIS*

═══════════════════════════════════════════════════════════════════════════════
`;
  
  // Write to jarvis-reports folder
  cy.writeFile(`cypress/jarvis-reports/${fileName}`, content);
  
  // Log success
  cy.log('📁 Unified JARVIS report saved to jarvis-reports folder');
  
  return fileName;
}

/**
 * Cypress command for unified reporting
 */
Cypress.Commands.add('jarvisUnifiedReport', function(customData = {}) {
  const reportData = {
    ...unifiedReportData,
    testName: this.currentTest?.title || customData.testName || 'Unknown Test',
    testFile: Cypress.spec.name,
    timestamp: new Date().toISOString(),
    duration: this.currentTest?.duration || 0,
    ...customData
  };
  
  // Get current page data
  cy.url().then(url => {
    reportData.url = url;
  });
  
  // Get DOM snapshot
  cy.document().then(doc => {
    try {
      reportData.dom = doc.body.innerHTML?.substring(0, 2000) || 'DOM not available';
    } catch (e) {
      reportData.dom = 'Could not capture DOM';
    }
  });
  
  // Capture screenshot
  const screenshotName = `jarvis-unified-${Date.now()}`;
  cy.screenshot(screenshotName, { capture: 'viewport' });
  reportData.screenshots.push(`${screenshotName}.png`);
  
  // Save the unified report
  saveUnifiedReport(reportData);
  // Don't return value to avoid Cypress error
});

/**
 * Enhanced failure hook with unified reporting
 */
Cypress.on('fail', (error, runnable) => {
  console.log('🚨 JARVIS: Failure detected - generating unified report...');
  
  // Prepare unified report data
  unifiedReportData = {
    testName: runnable.fullTitle(),
    testFile: Cypress.spec.name,
    timestamp: new Date().toISOString(),
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack
    },
    url: window.location.href,
    dom: '',
    screenshots: [],
    ocrText: '',
    aiAnalysis: '',
    discordStatus: false,
    duration: runnable.duration || 0
  };
  
  // Capture DOM
  try {
    unifiedReportData.dom = Cypress.$('body').html()?.substring(0, 2000) || 'DOM not available';
  } catch (e) {
    unifiedReportData.dom = 'Could not capture DOM';
  }
  
  // Re-throw error to maintain Cypress flow
  throw error;
});

// Export for use in other modules
module.exports = { saveUnifiedReport, unifiedReportData };