describe('AI Debugging Showcase', () => {
  
  it('Shows AI explaining selector errors', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This will fail - let AI suggest better selectors
    cy.aiSuggestSelector('login button').then(suggestions => {
      cy.log('AI suggested these selectors for login button:', suggestions);
    });
    
    // Try to find a non-existent element
    cy.get('#fake-login-button', { timeout: 3000 })
      .should('exist')
      .catch(error => {
        // AI explains the error
        cy.aiExplainError(error);
        // AI debugs the current state
        cy.aiDebugFailure();
      });
  });

  it('Shows AI debugging assertion failures', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This assertion will fail
    cy.title().then(title => {
      try {
        expect(title).to.include('Netflix');
      } catch (error) {
        // Let AI explain why this failed
        cy.aiExplainError(`Expected title "${title}" to include "Netflix"`);
        
        // Get AI's analysis of the page
        cy.aiDebugFailure();
      }
    });
  });

  it('Shows AI helping with navigation issues', () => {
    // Try to visit a non-existent page
    cy.visit('https://www.youtube.com/fakepage404', { failOnStatusCode: false });
    cy.wait(2000);
    
    // Check if we're on an error page
    cy.get('body').invoke('text').then(bodyText => {
      if (bodyText.includes('404') || bodyText.includes('not found')) {
        // Ask AI for help
        cy.askGroq(
          'I tried to visit a YouTube page but got a 404 error. ' +
          'What are 3 things I should check to fix this?'
        ).then(aiResponse => {
          cy.log('🤖 AI Navigation Help:', aiResponse);
        });
        
        // Also run the debugger
        cy.aiDebugFailure();
      }
    });
  });

  it('Shows AI helping find correct elements', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Ask AI to help find the search box
    cy.aiSuggestSelector('YouTube search input field').then(suggestions => {
      cy.log('Search box selectors:', suggestions);
      
      // Try the actual selector
      cy.get('input[name="search_query"]')
        .should('be.visible')
        .type('test search');
    });
    
    // Ask AI to help find video cards
    cy.aiSuggestSelector('video thumbnail cards on YouTube homepage').then(suggestions => {
      cy.log('Video card selectors:', suggestions);
    });
  });

  it('Shows AI analyzing page state', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Search for something
    cy.get('input[name="search_query"]').type('cypress testing{enter}');
    cy.wait(3000);
    
    // Get AI analysis of current page
    cy.url().then(url => {
      cy.document().then(doc => {
        const videoCount = doc.querySelectorAll('ytd-video-renderer').length;
        
        cy.askGroq(
          `I searched for "cypress testing" on YouTube. ` +
          `The URL is now ${url} and I see ${videoCount} video results. ` +
          `Is this a successful search? What should I verify next?`
        ).then(aiResponse => {
          cy.log('🔍 Search Analysis:', aiResponse);
        });
      });
    });
    
    // Run the debugger to analyze page state
    cy.aiDebugFailure();
  });

  it('Shows AI helping with timing issues', () => {
    cy.visit('https://www.youtube.com/');
    
    // Try to interact too quickly (might fail)
    cy.get('input[name="search_query"]', { timeout: 1000 })
      .type('quick search{enter}')
      .catch(error => {
        cy.aiExplainError('Element not ready - timeout after 1 second');
        
        cy.askGroq(
          'My Cypress test failed because an element was not ready in 1 second. ' +
          'What are best practices for handling timing issues in Cypress?'
        ).then(aiResponse => {
          cy.log('⏱️ Timing Best Practices:', aiResponse);
        });
      });
  });

  it('Shows comprehensive AI debugging', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Intentionally create multiple issues
    cy.get('body').then($body => {
      // Check multiple conditions
      const issues = [];
      
      if (!$body.find('#non-existent-element').length) {
        issues.push('Login button not found');
      }
      
      if (!$body.text().includes('Welcome')) {
        issues.push('Welcome message not visible');
      }
      
      if (issues.length > 0) {
        // Get AI's comprehensive analysis
        cy.askGroq(
          `My test found these issues on YouTube homepage: ${issues.join(', ')}. ` +
          'Are these real problems or expected behavior? ' +
          'How should I adjust my test expectations?'
        ).then(aiResponse => {
          cy.log('🔧 Test Adjustment Advice:', aiResponse);
        });
        
        // Also run standard debugger
        cy.aiDebugFailure();
      }
    });
  });
});