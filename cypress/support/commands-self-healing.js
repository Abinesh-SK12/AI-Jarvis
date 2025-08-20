/**
 * Cypress Custom Commands for Self-Healing Tests
 */

const selfHealingAgent = require('./self-healing-agent');

// Command to run tests with self-healing capability
Cypress.Commands.add('runWithHealing', (testName, testFunction) => {
  return selfHealingAgent.executeWithHealing(testFunction, testName);
});

// Command to generate test cases for a page
Cypress.Commands.add('generateTests', (pageUrl) => {
  return selfHealingAgent.generateTestCases(pageUrl);
});

// Command to analyze current failure
Cypress.Commands.add('analyzeFailure', (error) => {
  const testCode = Cypress.currentTest.fn.toString();
  return selfHealingAgent.analyzeFailure(error, testCode);
});

// Override default test behavior to add self-healing
const originalIt = it;
const healingIt = function(name, options, fn) {
  // If only two arguments, second is the function
  if (arguments.length === 2) {
    fn = options;
    options = {};
  }
  
  const wrappedFn = function() {
    if (Cypress.env('selfHealing') === true) {
      return cy.wrap(null).then(() => {
        return selfHealingAgent.executeWithHealing(fn, name);
      });
    } else {
      return fn.call(this);
    }
  };
  
  return originalIt(name, options, wrappedFn);
};

// Export the healing version of 'it'
if (typeof window !== 'undefined') {
  window.healingIt = healingIt;
}

// Command to retry with fixes
Cypress.Commands.add('retryWithFix', { prevSubject: true }, (subject, options = {}) => {
  const { retries = 3, fixes = [] } = options;
  
  let attempt = 0;
  const retry = () => {
    attempt++;
    
    return cy.wrap(subject, { log: false }).then((el) => {
      try {
        // Try the original action
        return el;
      } catch (error) {
        if (attempt < retries && fixes[attempt - 1]) {
          // Apply fix and retry
          console.log(`Applying fix ${attempt}: ${fixes[attempt - 1].description}`);
          return fixes[attempt - 1].apply().then(retry);
        }
        throw error;
      }
    });
  };
  
  return retry();
});

// Command to wait with intelligent retry
Cypress.Commands.add('smartWait', (selector, options = {}) => {
  const { timeout = 10000, retryInterval = 500 } = options;
  const startTime = Date.now();
  
  const checkElement = () => {
    return cy.document().then((doc) => {
      const element = doc.querySelector(selector);
      
      if (element && element.offsetParent !== null) {
        return cy.wrap(element);
      }
      
      if (Date.now() - startTime > timeout) {
        // Try alternative selectors
        const alternatives = selfHealingAgent.generateAlternativeSelectors(selector);
        for (const alt of alternatives) {
          const altElement = doc.querySelector(alt);
          if (altElement && altElement.offsetParent !== null) {
            console.log(`Found element with alternative selector: ${alt}`);
            return cy.wrap(altElement);
          }
        }
        throw new Error(`Element ${selector} not found after ${timeout}ms`);
      }
      
      return cy.wait(retryInterval, { log: false }).then(checkElement);
    });
  };
  
  return checkElement();
});

// Command for intelligent click with retry
Cypress.Commands.add('smartClick', (selector, options = {}) => {
  return cy.smartWait(selector).then((element) => {
    // Simply try force click if regular click might fail
    return cy.wrap(element)
      .scrollIntoView()
      .click({ force: true })
      .then(() => {
        console.log(`Successfully clicked element: ${selector}`);
      });
  });
});

// Command for intelligent type with retry
Cypress.Commands.add('smartType', (selector, text, options = {}) => {
  return cy.smartWait(selector).then((element) => {
    // Clear and type with force option
    return cy.wrap(element)
      .clear({ force: true })
      .type(text, { force: true, delay: 50 })
      .then(() => {
        console.log(`Successfully typed into element: ${selector}`);
      });
  });
});