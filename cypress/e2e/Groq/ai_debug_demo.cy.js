describe('AI Failure Debugging Demo', () => {
  
  it('Successful test - should pass', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    cy.get('input[name="search_query"]').should('be.visible');
    cy.log('✅ This test passes successfully');
  });

  it('DEMO: Element not found failure', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This will fail - element doesn't exist
    cy.get('#non-existent-login-button').click();
    // AI will analyze why this element wasn't found
  });

  it('DEMO: Assertion failure', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This will fail - wrong text assertion
    cy.title().should('contain', 'Netflix');
    // AI will explain why the title doesn't match
  });

  it('DEMO: Timeout failure', () => {
    cy.visit('https://www.youtube.com/');
    
    // This will timeout - element never appears
    cy.get('.fake-loading-spinner', { timeout: 3000 }).should('be.visible');
    // AI will analyze why element didn't appear in time
  });

  it('DEMO: Navigation failure', () => {
    // This will fail - invalid URL
    cy.visit('https://www.youtube.com/this-page-does-not-exist-404');
    cy.wait(2000);
    
    // Try to interact with non-existent page elements
    cy.get('button[type="submit"]').click();
    // AI will detect we're on an error page
  });

  it('DEMO: Manual failure analysis', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Manually trigger AI analysis for debugging
    cy.window().then((win) => {
      if (!win.location.href.includes('netflix')) {
        cy.analyzeFailure('Expected to be on Netflix but got YouTube instead');
      }
    });
  });

  it('DEMO: Complex interaction failure', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Search for something
    cy.get('input[name="search_query"]').type('cypress tutorial{enter}');
    cy.wait(3000);
    
    // This will fail - wrong selector for filter button
    cy.get('#advanced-filters-button').click();
    // AI will suggest the correct selector
  });

  it('DEMO: API-like validation failure', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Get video count and validate (will fail)
    cy.get('ytd-rich-item-renderer').should('have.length', 100);
    // AI will explain actual vs expected count
  });
});