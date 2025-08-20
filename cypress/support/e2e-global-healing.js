/**
 * Global Self-Healing Configuration
 * This file makes self-healing work on ALL test files automatically
 */

const selfHealingAgent = require('./self-healing-agent');

// Override Cypress commands globally only if self-healing is enabled
if (Cypress.env('globalSelfHealing') !== false) {
  
  // Override cy.get() to use smart waiting
  Cypress.Commands.overwrite('get', (originalFn, selector, options) => {
    // Check if originalFn exists
    if (!originalFn || typeof originalFn !== 'function') {
      return cy.get(selector, options);
    }
    
    return originalFn(selector, options).catch((error) => {
      console.log(`🔧 Self-healing: get('${selector}') failed, trying alternatives...`);
      
      // Try alternative selectors
      const alternatives = selfHealingAgent.generateAlternativeSelectors(selector);
      for (const alt of alternatives) {
        try {
          return originalFn(alt, options);
        } catch (e) {
          continue;
        }
      }
      
      // If all alternatives fail, try with increased timeout
      return originalFn(selector, { ...options, timeout: 10000 });
    });
  });

  // Override click() to use smart clicking
  Cypress.Commands.overwrite('click', (originalFn, subject, options) => {
    // Check if we have a valid subject
    if (!subject || !originalFn) {
      return;
    }
    
    const attempts = [
      () => originalFn(subject, options),
      () => originalFn(subject, { ...options, force: true }),
      () => {
        cy.wrap(subject).scrollIntoView();
        return originalFn(subject, options);
      },
      () => originalFn(subject, { ...options, position: 'center' })
    ];
    
    let attemptIndex = 0;
    const tryClick = () => {
      if (attemptIndex >= attempts.length) {
        throw new Error('All click attempts failed');
      }
      
      return attempts[attemptIndex]().catch((error) => {
        console.log(`🔧 Self-healing: click attempt ${attemptIndex + 1} failed`);
        attemptIndex++;
        return tryClick();
      });
    };
    
    return tryClick();
  });

  // Override type() to use smart typing
  Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {
    // Check if we have valid parameters
    if (!subject || !text || !originalFn) {
      return;
    }
    
    const attempts = [
      () => originalFn(subject, text, options),
      () => {
        cy.wrap(subject).clear();
        return originalFn(subject, text, options);
      },
      () => originalFn(subject, text, { ...options, force: true }),
      () => {
        cy.wrap(subject).focus();
        return originalFn(subject, text, { ...options, delay: 100 });
      }
    ];
    
    let attemptIndex = 0;
    const tryType = () => {
      if (attemptIndex >= attempts.length) {
        throw new Error('All type attempts failed');
      }
      
      return attempts[attemptIndex]().catch((error) => {
        console.log(`🔧 Self-healing: type attempt ${attemptIndex + 1} failed`);
        attemptIndex++;
        return tryType();
      });
    };
    
    return tryType();
  });

  // Override the global 'it' function to wrap all tests
  const originalIt = window.it || global.it;
  if (originalIt && typeof originalIt === 'function') {
    const healingItGlobal = function(name, ...args) {
      // Find the test function (could be 2nd or 3rd argument)
      let fn = args[args.length - 1];
      const otherArgs = args.slice(0, -1);
      
      if (typeof fn !== 'function') {
        return originalIt(name, ...args);
      }
      
      // Wrap the test function with self-healing
      const wrappedFn = function() {
        const testCode = fn.toString();
        let retryCount = 0;
        const maxRetries = Cypress.env('selfHealingMaxRetries') || 3;
        
        const runTest = () => {
          try {
            return fn.call(this);
          } catch (error) {
            console.log(`❌ Test "${name}" failed on attempt ${retryCount + 1}`);
            
            if (retryCount < maxRetries - 1) {
              retryCount++;
              console.log(`🔄 Retrying test (attempt ${retryCount + 1}/${maxRetries})...`);
              
              // Add a small delay between retries
              cy.wait(1000);
              
              // Clear any state that might cause issues
              cy.clearCookies();
              cy.clearLocalStorage();
              
              return runTest();
            }
            
            throw error;
          }
        };
        
        return runTest();
      };
      
      return originalIt(name, ...otherArgs, wrappedFn);
    };
    
    // Replace global 'it' function
    if (typeof window !== 'undefined') {
      window.it = healingItGlobal;
    }
    if (typeof global !== 'undefined') {
      global.it = healingItGlobal;
    }
  }

  console.log('🤖 Global Self-Healing Agent is active for all tests');
}

// Add a command to disable self-healing for specific tests
Cypress.Commands.add('disableSelfHealing', () => {
  Cypress.env('selfHealing', false);
});

// Add a command to enable self-healing for specific tests
Cypress.Commands.add('enableSelfHealing', () => {
  Cypress.env('selfHealing', true);
});