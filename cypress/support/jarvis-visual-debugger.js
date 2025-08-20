/**
 * J.A.R.V.I.S. - Just A Rather Very Intelligent System
 * Tony Stark-style Visual AI Debugger for Cypress
 * 
 * "Sometimes you gotta run before you can walk" - Tony Stark
 */

import Tesseract from 'tesseract.js';

// Store for visual debugging data
let jarvisData = {
  screenshot: null,
  extractedText: '',
  visualElements: [],
  timestamp: null
};

// JARVIS ASCII art for console - Clean and simple version
const JARVIS_LOGO = `
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║       ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗                                ║
║       ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝                                ║
║       ██║███████║██████╔╝██║   ██║██║███████╗                                ║
║  ██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║                                ║
║  ╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║                                ║
║   ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝                                ║
║                                                                                ║
║  ┌──────────────────────────────────────────────────────────────────────┐    ║
║  │  ◉ Just A Rather Very Intelligent System                              │    ║
║  │  ▸ Version: 4.2.0 STARK INDUSTRIES                                    │    ║
║  │  ▸ Status:  ● ONLINE | ● READY | ● ARMED                             │    ║
║  │  ▸ Mode:    ⚡ VISUAL DEBUGGER                                        │    ║
║  └──────────────────────────────────────────────────────────────────────┘    ║
║                                                                                ║
║  ╭─────────────────────────────────────────────────────────────────────╮    ║
║  │ ⟦⟧ Initializing Systems...                                          │    ║
║  │ [■■■■■■■■■■] 100% ✓ Neural Network                                  │    ║
║  │ [■■■■■■■■■■] 100% ✓ Visual Cortex                                   │    ║
║  │ [■■■■■■■■■■] 100% ✓ Groq AI Integration                             │    ║
║  │ [■■■■■■■■■■] 100% ✓ OCR Engine (Tesseract)                          │    ║
║  │ [■■■■■■■■■■] 100% ✓ Discord Interface                               │    ║
║  ╰─────────────────────────────────────────────────────────────────────╯    ║
║                                                                                ║
║  【 CAPABILITIES 】                                                            ║
║  ◆ Visual Analysis     ◆ OCR Processing     ◆ AI Debugging                   ║
║  ◆ Failure Detection   ◆ Smart Suggestions  ◆ Report Generation              ║
║                                                                                ║
║  ┌────────────────────────────────────────────────────────────────────┐    ║
║  │ "Good evening, sir. All systems are operational."                   │    ║
║  │ "Shall I begin the visual debugging protocols?"                     │    ║
║  │ - JARVIS                                                             │    ║
║  └────────────────────────────────────────────────────────────────────┘    ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

// Initialize JARVIS
console.log(JARVIS_LOGO);

/**
 * JARVIS Visual Analysis Command
 * Takes screenshot, extracts text via OCR, and sends to AI
 */
Cypress.Commands.add('jarvisAnalyze', (customMessage = '') => {
  cy.log('🤖 JARVIS: Initiating visual analysis...');
  
  const screenshotName = `jarvis-capture-${Date.now()}`;
  
  // Capture screenshot
  cy.screenshot(screenshotName, { 
    capture: 'viewport',
    overwrite: true
  });
  
  // Wait a bit for screenshot to be saved
  cy.wait(1000);
  
  // Process with OCR and analyze
  return cy.task('extractTextFromScreenshot', { 
    screenshotPath: screenshotName
  }).then((extractedText) => {
    jarvisData.extractedText = extractedText;
    
    // Send to Groq AI for visual analysis
    analyzeWithJarvis(extractedText, customMessage);
    return null; // Don't return the promise, let Cypress handle it
  });
});

/**
 * JARVIS Failure Hook - Automatic visual analysis on failure
 */
Cypress.on('fail', (error, runnable) => {
  console.log('🚨 JARVIS: Failure detected! Initiating emergency protocol...');
  
  // Take screenshot
  const screenshotName = `jarvis-failure-${Date.now()}`;
  
  // We need to handle this carefully since we're in a fail event
  try {
    // Capture current viewport
    cy.task('captureFailureScreenshot', {
      name: screenshotName,
      testName: runnable.fullTitle()
    }).then((screenshotData) => {
      // Extract text and analyze
      cy.task('emergencyVisualAnalysis', {
        screenshot: screenshotData,
        error: error.message,
        testName: runnable.fullTitle()
      });
    });
  } catch (e) {
    console.log('⚠️ JARVIS: Could not perform visual analysis', e);
  }
  
  // Re-throw to maintain Cypress flow
  throw error;
});

/**
 * Analyze visual content with Groq AI
 */
function analyzeWithJarvis(extractedText, customMessage) {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
  // Build JARVIS-style prompt
  const prompt = `
    You are JARVIS, Tony Stark's AI assistant. Analyze this visual debugging data in JARVIS style.
    
    ${customMessage ? `User Message: ${customMessage}` : ''}
    
    VISUAL TEXT EXTRACTED FROM SCREENSHOT (via OCR):
    "${extractedText}"
    
    Current URL: ${window.location.href}
    Timestamp: ${new Date().toISOString()}
    
    Provide analysis in JARVIS style:
    1. "Sir/Ma'am, I've detected..." (What you see)
    2. "The primary issue appears to be..." (Root cause)
    3. "I recommend..." (3 specific solutions)
    4. "Shall I..." (Proactive suggestion)
    
    Be concise, helpful, and slightly witty like JARVIS would be.
  `;
  
  cy.request({
    method: 'POST',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'llama3-8b-8192',
      messages: [{ 
        role: 'system', 
        content: 'You are JARVIS from Iron Man. Respond in character - professional, British, slightly witty.'
      }, {
        role: 'user', 
        content: prompt 
      }],
      max_tokens: 600,
      temperature: 0.7
    },
    failOnStatusCode: false
  }).then((response) => {
    if (response.status === 200) {
      const jarvisResponse = response.body.choices[0].message.content;
      
      // Display in JARVIS style
      displayJarvisAnalysis(jarvisResponse);
      
      // Save to file
      saveJarvisReport(extractedText, jarvisResponse);
    } else {
      cy.log('⚠️ JARVIS: Unable to complete analysis. Systems offline.');
    }
  });
}

/**
 * Display JARVIS analysis in styled format
 */
function displayJarvisAnalysis(analysis) {
  const separator = '═'.repeat(60);
  
  console.log(`
╔${separator}╗
║  🤖 J.A.R.V.I.S. VISUAL ANALYSIS REPORT
╟${separator}╢
${analysis.split('\n').map(line => `║ ${line.padEnd(58)} ║`).join('\n')}
╚${separator}╝
  `);
  
  // Also log to Cypress
  cy.log('🤖 JARVIS Analysis Complete:', analysis);
}

/**
 * Save JARVIS report
 */
function saveJarvisReport(ocrText, analysis) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const fileName = `jarvis-report-${timestamp}.md`;
  
  const content = `
# J.A.R.V.I.S. Visual Analysis Report

**Generated:** ${new Date().toISOString()}
**System:** Visual AI Debugger v1.0

## OCR Extracted Text
\`\`\`
${ocrText}
\`\`\`

## JARVIS Analysis
${analysis}

## Visual Debugging Metadata
- Screenshot: Available in cypress/screenshots/
- OCR Engine: Tesseract.js
- AI Model: Groq Llama3-8B

---
*"Sir, I've prepared a comprehensive visual analysis for your review."* - JARVIS
`;
  
  cy.writeFile(`cypress/jarvis-reports/${fileName}`, content);
}

/**
 * Advanced Visual Commands
 */

// Check if element is visually present (not just in DOM)
Cypress.Commands.add('jarvisVerifyVisible', (description) => {
  cy.screenshot('jarvis-verify', { capture: 'viewport' });
  
  cy.task('extractTextFromLastScreenshot').then((text) => {
    const apiKey = Cypress.env('GROQ_API_KEY');
    
    const prompt = `
      Acting as JARVIS, analyze if "${description}" is visible in this text:
      "${text}"
      
      Reply with:
      1. YES/NO - Is it visible?
      2. Confidence level (HIGH/MEDIUM/LOW)
      3. Brief explanation
    `;
    
    return cy.request({
      method: 'POST',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.3
      }
    }).then((response) => {
      const result = response.body.choices[0].message.content;
      cy.log(`🤖 JARVIS: Visual verification for "${description}": ${result}`);
      return result.includes('YES');
    });
  });
});

// Visual diff detection
Cypress.Commands.add('jarvisDetectChange', () => {
  cy.log('🤖 JARVIS: Monitoring for visual changes...');
  
  // Take before screenshot
  cy.screenshot('jarvis-before', { capture: 'viewport' });
  
  return {
    compare: () => {
      // Take after screenshot
      cy.screenshot('jarvis-after', { capture: 'viewport' });
      
      // Compare
      cy.task('compareScreenshots', {
        before: 'jarvis-before',
        after: 'jarvis-after'
      }).then((changes) => {
        if (changes.length > 0) {
          cy.log(`🤖 JARVIS: Detected ${changes.length} visual changes`);
          
          // Analyze changes with AI
          const prompt = `As JARVIS, explain these visual changes: ${JSON.stringify(changes)}`;
          cy.askGroq(prompt);
        }
      });
    }
  };
});

// Smart element finder using visual recognition
Cypress.Commands.add('jarvisFindElement', (description) => {
  cy.log(`🤖 JARVIS: Searching for "${description}" visually...`);
  
  cy.screenshot('jarvis-search', { capture: 'viewport' });
  
  cy.task('findElementVisually', { description }).then((location) => {
    if (location) {
      cy.log(`🤖 JARVIS: Element located at coordinates (${location.x}, ${location.y})`);
      
      // Click at those coordinates
      cy.get('body').click(location.x, location.y);
    } else {
      cy.log(`⚠️ JARVIS: Unable to locate "${description}" visually`);
    }
  });
});

// Export for use
module.exports = { 
  jarvisData, 
  analyzeWithJarvis,
  displayJarvisAnalysis 
};