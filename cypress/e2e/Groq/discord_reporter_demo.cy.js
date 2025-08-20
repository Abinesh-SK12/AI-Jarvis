/**
 * Discord AI Debug Reporter Demo
 * Automatically sends failures with screenshots and AI analysis to Discord
 */

describe('🔔 Discord AI Reporter Demo', () => {
  
  it('Sends success notification to Discord', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Verify page loaded
    cy.get('input[name="search_query"]').should('be.visible');
    
    // Send success notification
    cy.discordSuccess('YouTube homepage loaded successfully');
    
    cy.log('✅ Success notification sent to Discord');
  });

  it('Sends warning notification to Discord', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Check for something that might not be there
    cy.get('body').then($body => {
      if (!$body.find('.premium-banner').length) {
        cy.discordWarning('Premium banner not found - user might not be logged in');
      }
    });
    
    cy.log('⚠️ Warning sent to Discord');
  });

  it('DEMO: Failed test with AI analysis and screenshot', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This will fail and trigger Discord notification
    cy.get('#non-existent-login-button', { timeout: 3000 })
      .should('be.visible')
      .click();
    
    // The failure hook will automatically:
    // 1. Take screenshot
    // 2. Run OCR to extract text
    // 3. Get AI analysis
    // 4. Send everything to Discord
  });

  it('Manual Discord report with analysis', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Manually trigger analysis and Discord report
    cy.analyzeAndReport('Testing Discord integration with AI analysis');
    
    cy.log('📨 Manual report sent to Discord');
  });

  it('Discord report for assertion failure', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This assertion will fail
    cy.title().should('contain', 'Netflix');
    // Discord will receive:
    // - Screenshot of YouTube page
    // - OCR extracted text
    // - AI analysis explaining why it's YouTube not Netflix
  });

  it('Discord report for navigation error', () => {
    // Try to visit non-existent page
    cy.visit('https://www.youtube.com/cypress-test-404', { failOnStatusCode: false });
    cy.wait(2000);
    
    // Check if it's an error page
    cy.get('body').invoke('text').then(text => {
      if (text.includes('404') || text.includes('not found')) {
        cy.analyzeAndReport('404 error page detected');
      }
    });
  });

  it('Complex failure with detailed Discord report', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Search for something
    cy.get('input[name="search_query"]').type('Cypress testing{enter}');
    cy.wait(3000);
    
    // Try to click a non-existent filter
    cy.get('#advanced-filter-button').click();
    // This will fail and send to Discord:
    // - Screenshot of search results page
    // - OCR text showing what's actually visible
    // - AI analysis suggesting the correct selector
  });

  it('Multi-step test with Discord checkpoints', () => {
    // Step 1: Homepage
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    cy.discordInfo('Test Progress', 'Step 1: Homepage loaded');
    
    // Step 2: Search
    cy.get('input[name="search_query"]').type('AI testing{enter}');
    cy.wait(3000);
    cy.discordInfo('Test Progress', 'Step 2: Search completed');
    
    // Step 3: Try to click first video (might fail)
    cy.get('ytd-video-renderer').first().within(() => {
      cy.get('a#video-title').click();
    });
    cy.wait(2000);
    cy.discordInfo('Test Progress', 'Step 3: Video opened');
    
    // Final success
    cy.discordSuccess('Multi-step test completed successfully');
  });

  it('Performance issue detection with Discord alert', () => {
    cy.visit('https://www.youtube.com/');
    
    // Measure load time
    const startTime = Date.now();
    
    cy.get('ytd-rich-item-renderer', { timeout: 10000 }).should('have.length.greaterThan', 0);
    
    const loadTime = Date.now() - startTime;
    
    if (loadTime > 5000) {
      cy.discordWarning(`Slow page load detected: ${loadTime}ms`);
      cy.analyzeAndReport(`Performance issue: Page took ${loadTime}ms to load`);
    } else {
      cy.discordInfo('Performance', `Page loaded in ${loadTime}ms`);
    }
  });

  it('Visual validation with Discord reporting', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // Take screenshot for visual validation
    cy.screenshot('visual-check');
    
    // Analyze visually and report
    cy.task('extractTextFromLastScreenshot').then(ocrText => {
      if (!ocrText.includes('YouTube')) {
        cy.analyzeAndReport('Visual validation failed - YouTube branding not detected');
      } else {
        cy.discordSuccess('Visual validation passed - YouTube branding confirmed');
      }
    });
  });
});

describe('🚨 Discord Failure Scenarios', () => {
  
  it('Element not found - Discord alert', () => {
    cy.visit('https://www.youtube.com/');
    cy.wait(2000);
    
    // This will fail and alert Discord
    cy.get('.fake-premium-button').click();
  });

  it('Timeout failure - Discord alert', () => {
    cy.visit('https://www.youtube.com/');
    
    // This will timeout and alert Discord
    cy.get('.never-appears', { timeout: 2000 }).should('be.visible');
  });

  it('Network error - Discord alert', () => {
    // This will fail with network error
    cy.visit('https://this-domain-does-not-exist-12345.com/');
  });
});