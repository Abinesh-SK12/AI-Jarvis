// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// AI-powered analysis commands for JARVIS
Cypress.Commands.add('jarvisAnalyze', (selector) => {
  // Analyze element and provide insights
  return cy.get(selector).then($el => {
    const isVisible = $el.is(':visible');
    const isEnabled = !$el.is(':disabled');
    const text = $el.text();
    
    cy.log('🤖 JARVIS Analysis:', {
      element: selector,
      visible: isVisible,
      enabled: isEnabled,
      text: text.substring(0, 50)
    });
    
    return cy.wrap($el);
  });
});

Cypress.Commands.add('aiDebugFailure', (error) => {
  // AI-powered debug helper
  cy.log(`🧠 AI Debug: ${error}`);
  
  // Log to console for JARVIS to capture
  if (typeof window !== 'undefined') {
    console.log('[JARVIS AI Debug]', {
      error: error,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      viewport: { width: window.innerWidth, height: window.innerHeight }
    });
  }
});

// Add a safe screenshot command with proper timeout
Cypress.Commands.add('safeScreenshot', (name, options = {}) => {
  const defaultOptions = {
    timeout: 60000,
    capture: 'viewport',
    overwrite: true,
    disableTimersAndAnimations: true,
    onTimeout: () => {
      cy.log(`Screenshot ${name} timed out, continuing test`);
      return false;
    }
  };
  
  return cy.screenshot(name, { ...defaultOptions, ...options }).then(
    () => cy.log(`Screenshot ${name} captured successfully`),
    (error) => {
      cy.log(`Screenshot ${name} failed: ${error.message}`);
      // Don't fail the test on screenshot errors
      return cy.wrap(null);
    }
  );
});