describe('TEP 1 on 1 - Telugu Workshop Test', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
  });
  
  afterEach(function() {
    if (this.currentTest.state === 'failed') {
      cy.log('❌ Test Failed');
      cy.screenshot(`failed-${this.currentTest.title}`);
    } else {
      cy.log('✅ Test Passed Successfully');
    }
  });

  it('should find TEP 1 on 1 - Telugu workshop and register successfully', () => {
    // Visit workshops page
    cy.visit('https://chitti.xyz/workshops/');
    
    // Wait for workshops to load
    cy.wait(5000);

    // Log all workshop cards for debugging
    cy.get('a.group.rounded-xl.bg-white.flex.flex-col', { timeout: 15000 })
      .should('have.length.greaterThan', 0)
      .then($elements => {
        cy.log(`Found ${$elements.length} workshop cards`);
        
        // Log all workshops for debugging
        for (let i = 0; i < Math.min(10, $elements.length); i++) {
          const text = ($elements[i].innerText || '').replace(/\n/g, ' ');
          cy.log(`Workshop ${i}: ${text.substring(0, 100)}...`);
        }
        
        // Find matching workshop with multiple strategies
        let matchedElement = null;
        
        // Strategy 1: Look for TEP 1 on 1 - Telugu
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          if (text.includes('TEP 1 on 1 - Telugu') || 
              (text.includes('TEP') && text.includes('Telugu'))) {
            cy.log(`✅ Found exact match: TEP 1 on 1 - Telugu at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Case insensitive search
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('tep') && text.includes('telugu')) {
              cy.log(`⚠️ Found TEP Telugu workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 3: Very flexible - just Telugu with TEP
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('telugu') && (text.includes('tep') || text.includes('1 on 1'))) {
              cy.log(`⚠️ Found Telugu workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find TEP 1 on 1 - Telugu workshop');
          throw new Error('Workshop not found - TEP Telugu workshop may not be available');
        }
        
        // Click the workshop card
        cy.wrap(matchedElement)
          .scrollIntoView({ duration: 1500 })
          .click();
      });

    // Wait for workshop details page to load
    cy.wait(5000);
    
    // Click Register button - try multiple selectors
    cy.get('body').then($body => {
      const selectors = [
        'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\]',
        'button[class*="bg-"][class*="E94C45"]',
        'button:contains("Register")',
        'button:contains("Enroll")',
        'button:contains("Book")'
      ];
      
      let buttonFound = false;
      for (const selector of selectors) {
        try {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().click({ force: true });
            buttonFound = true;
            cy.log(`✅ Clicked register button using: ${selector}`);
            break;
          }
        } catch (e) {
          cy.log(`⚠️ Selector failed: ${selector}`);
        }
      }
      
      if (!buttonFound) {
        cy.log('❌ Could not find register button');
        throw new Error('Register button not found');
      }
    });
    
    // Wait for registration form to load
    cy.wait(5000);
    
    // Fill registration form
    cy.get('input[placeholder*="Name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Jacob Samro', { delay: 20 });
    
    cy.wait(1000);
    
    // Select country - India
    cy.get('.iti__flag-container').click();
    cy.wait(1000);
    cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
    cy.wait(1000);
    cy.get('.iti__flag-container').click();
    cy.wait(1000);
    cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
    cy.wait(1000);
    
    // Enter phone number
    cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
    cy.wait(2000);
    
    // Enter email
    cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
    
    // Select grade
    cy.get('select.block').eq(0).select('Working Professional');
    
    // Enter address details
    // cy.get('input[placeholder*="Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai');
    // cy.get('input[placeholder*="City"]').type('Chennai');
    // cy.wait(2000);
    // cy.get('input[placeholder*="Pincode"]').type('600117');
    // cy.wait(4000);
    
    // Click Register button
    cy.get('body').then($body => {
      const registerSelectors = [
        'button:contains("Register")',
        'button[type="submit"]',
        'button:contains("Submit")',
        'button:contains("Proceed")'
      ];
      
      let registerFound = false;
      for (const selector of registerSelectors) {
        try {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().click();
            registerFound = true;
            cy.log(`✅ Clicked final register button using: ${selector}`);
            break;
          }
        } catch (e) {
          cy.log(`⚠️ Register selector failed: ${selector}`);
        }
      }
      
      if (!registerFound) {
        cy.log('❌ Could not find final register button');
        throw new Error('Final register button not found');
      }
    });
    
    // Verify payment gateway loads
    cy.get('iframe[src*="razorpay"]', { timeout: 15000 })
      .should('be.visible')
      .then(() => {
        cy.log('✅ Payment gateway loaded successfully');
      });
  });
});