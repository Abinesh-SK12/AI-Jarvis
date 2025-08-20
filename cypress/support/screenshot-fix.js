/**
 * Global screenshot fix to prevent timeouts
 */

console.log('Loading screenshot-fix.js');

// Override screenshot command to apply safe defaults
Cypress.Commands.overwrite('screenshot', (originalFn, subject, ...args) => {
  console.log('Screenshot command intercepted with args:', args);
  
  // Extract name and options
  let name = args[0];
  let options = args[1] || {};
  
  // If first argument is an object, it's options only
  if (typeof name === 'object' && name !== null) {
    options = name;
    name = undefined;
  }
  
  // Apply safe defaults with increased timeout
  const safeOptions = {
    capture: 'viewport',
    overwrite: true,
    disableTimersAndAnimations: true,
    scale: false, // Disable scaling to speed up
    blackout: [], // No blackout needed
    ...options, // Allow overrides
    timeout: 60000 // Force 60 seconds timeout AFTER options spread
  };
  
  // Use cy.wrap to ensure proper timeout handling
  return cy.wrap(null, { timeout: 60000 }).then(() => {
    try {
      // Call original with safe options
      if (name) {
        console.log('Calling screenshot with name:', name, 'and options:', safeOptions);
        return originalFn(subject, name, safeOptions);
      } else {
        console.log('Calling screenshot with options:', safeOptions);
        return originalFn(subject, safeOptions);
      }
    } catch (error) {
      console.error('Screenshot error:', error);
      // Don't fail the test on screenshot errors
      cy.log('Screenshot failed but continuing test');
      return cy.wrap(null);
    }
  });
});

console.log('✅ Screenshot timeout fix applied');