/**
 * AI Integration Initialization
 * Sets up AI-powered failure analysis for Cypress tests
 */

const aiConfig = require('./ai-config');
const aiAPI = require('./ai-api-integration');

// Initialize AI features
function initializeAI() {
  // Validate configuration
  const validation = aiConfig.validateConfiguration();
  
  if (validation.errors.length > 0) {
    console.warn('🤖 JARVIS AI Configuration Errors:');
    validation.errors.forEach(error => console.error(`  ❌ ${error}`));
  }
  
  if (validation.warnings.length > 0) {
    console.warn('🤖 JARVIS AI Configuration Warnings:');
    validation.warnings.forEach(warning => console.warn(`  ⚠️ ${warning}`));
  }
  
  // Log configuration summary
  if (aiConfig.isConfigured()) {
    const summary = aiConfig.getConfigurationSummary();
    console.log('🤖 JARVIS AI System Initialized');
    console.log(`  Provider: ${summary.provider}`);
    console.log(`  Model: ${summary.model}`);
    console.log(`  Pattern Recognition: ${summary.patternRecognition}`);
    console.log(`  Auto-Fix: ${summary.autoFix}`);
    console.log(`  Confidence Threshold: ${summary.confidenceThreshold}`);
  }
  
  // Register Cypress commands
  registerAICommands();
  
  // Set up hooks for automatic analysis
  setupAIHooks();
}

// Register custom Cypress commands
function registerAICommands() {
  // Command to manually trigger AI analysis
  Cypress.Commands.add('aiAnalyze', (customMessage) => {
    const failureData = {
      testName: Cypress.currentTest.title,
      error: {
        message: customMessage || 'Manual AI analysis requested',
        name: 'ManualAnalysis',
        stack: new Error().stack
      },
      url: window.location.href,
      timestamp: new Date().toISOString(),
      dom: Cypress.$('body').html(),
      browser: Cypress.browser.name,
      testFile: Cypress.spec.relative
    };
    
    return aiAPI.analyzeFailureWithAI(failureData);
  });
  
  // Command to check if AI can auto-fix current failure
  Cypress.Commands.add('aiAutoFix', () => {
    cy.task('getLastFailure').then(failure => {
      if (failure) {
        return aiAPI.analyzeFailureWithAI(failure).then(analysis => {
          if (analysis.autoFixAvailable) {
            return aiAPI.applyAutoFix(analysis, failure);
          }
          return { success: false, reason: 'No auto-fix available' };
        });
      }
      return { success: false, reason: 'No failure to fix' };
    });
  });
  
  // Command to get AI suggestions for selector
  Cypress.Commands.add('aiSuggestSelector', (element) => {
    const html = element ? element[0].outerHTML : '';
    const context = {
      html,
      url: window.location.href,
      testName: Cypress.currentTest.title
    };
    
    const prompt = `Suggest resilient CSS selectors for this element:\n${html}\n\nProvide multiple options ranked by reliability.`;
    
    return aiAPI.analyzeFailureWithAI({
      testName: 'Selector Suggestion',
      error: { message: prompt, name: 'SelectorRequest', stack: '' },
      dom: html,
      url: context.url,
      timestamp: new Date().toISOString()
    });
  });
}

// Set up hooks for automatic AI analysis
function setupAIHooks() {
  // Store test context
  let currentTest = null;
  
  beforeEach(function() {
    currentTest = {
      title: this.currentTest.title,
      fullTitle: this.currentTest.fullTitle(),
      file: this.currentTest.file,
      startTime: Date.now()
    };
  });
  
  afterEach(function() {
    if (currentTest) {
      currentTest.duration = Date.now() - currentTest.startTime;
      currentTest.state = this.currentTest.state;
      
      // Store test history for pattern recognition
      cy.task('storeTestHistory', currentTest);
    }
  });
  
  // Enhanced failure handler
  Cypress.on('fail', (error, runnable) => {
    const settings = aiConfig.getSelfHealingSettings();
    
    if (settings.aiEnabled) {
      // Capture comprehensive failure data
      const failureData = {
        testName: runnable.fullTitle(),
        error: {
          message: error.message,
          name: error.name,
          stack: error.stack
        },
        url: window.location.href,
        timestamp: new Date().toISOString(),
        dom: Cypress.$('body').html(),
        browser: Cypress.browser.name,
        testFile: runnable.file,
        testCode: runnable.body ? runnable.body.toString() : '',
        screenshot: Cypress.config('screenshotOnRunFailure')
      };
      
      // Store for potential auto-fix
      cy.task('storeLastFailure', failureData);
      
      // Trigger AI analysis asynchronously
      setTimeout(() => {
        aiAPI.analyzeFailureWithAI(failureData).then(analysis => {
          // Check for auto-fix capability
          if (settings.autoApplyFixes && analysis.autoFixAvailable) {
            console.log('🤖 JARVIS: Attempting automatic fix...');
            aiAPI.applyAutoFix(analysis, failureData).then(result => {
              if (result.success) {
                console.log(`✅ Auto-fix applied: ${result.fixApplied}`);
              }
            });
          }
        });
      }, 0);
    }
    
    // Still throw the error
    throw error;
  });
}

// Export initialization function
module.exports = { initializeAI };