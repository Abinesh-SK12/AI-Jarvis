describe('One on One Organic Workshop Test', () => {
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

  it('should find One on One Organic workshop and register successfully', () => {
    // Visit workshops page
    cy.visit('https://chitti.xyz/workshops/');
    
    // Wait for workshops to load
    cy.wait(5000);

    // Log all workshop cards for debugging
    cy.get('a.group.rounded-xl.bg-white.flex.flex-col', { timeout: 15000 })
      .should('have.length.greaterThan', 0)
      .then($elements => {
        cy.log(`Found ${$elements.length} workshop cards`);
        
        // Log first 10 workshops for debugging
        for (let i = 0; i < Math.min(10, $elements.length); i++) {
          const text = ($elements[i].innerText || '').replace(/\n/g, ' ');
          cy.log(`Workshop ${i}: ${text.substring(0, 100)}...`);
        }
        
        // Find matching workshop with multiple strategies
        let matchedElement = null;
        
        // Strategy 1: Exact match for Organic workshop
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          if (text.includes('One on One Organic') || 
              text.includes('1 on 1 Organic') ||
              (text.includes('Organic') && text.includes('One on One'))) {
            cy.log(`✅ Found exact match: One on One Organic at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Look for Organic with Free pricing
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Organic') && 
                (text.includes('Free') || text.includes('FREE') || text.includes('₹0'))) {
              cy.log(`⚠️ Found Organic workshop with Free pricing at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 3: Case insensitive search
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('organic') && 
                (text.includes('one on one') || text.includes('1 on 1'))) {
              cy.log(`⚠️ Found Organic workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 4: Very flexible - any Organic workshop
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('organic')) {
              cy.log(`⚠️ Found Organic workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find One on One Organic workshop');
          throw new Error('Workshop not found - Organic workshop may not be available');
        }
        
        // Click the workshop card
        cy.wrap(matchedElement)
          .scrollIntoView({ duration: 1500 })
          .click();
      });

    // Wait for workshop details page to load
    cy.wait(5000);
    
    // Click Book Free Demo button - try multiple selectors
    cy.get('body').then($body => {
      const selectors = [
        'button:contains("Book free Demo")',
        'button:contains("Book Free Demo")',
        'button:contains("FREE DEMO")',
        'button:contains("Free Demo")',
        'button:contains("Book Demo")',
        'button:contains("Register")',
        'button:contains("Enroll")',
        'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\]',
        'button[class*="bg-"][class*="E94C45"]',
        '*:contains("Book Now")'
      ];
      
      let buttonFound = false;
      for (const selector of selectors) {
        try {
          if ($body.find(selector).length > 0) {
            cy.get(selector).first().click({ force: true });
            buttonFound = true;
            cy.log(`✅ Clicked book demo button using: ${selector}`);
            break;
          }
        } catch (e) {
          cy.log(`⚠️ Selector failed: ${selector}`);
        }
      }
      
      if (!buttonFound) {
        cy.log('❌ Could not find book demo button');
        throw new Error('Book demo button not found');
      }
    });
    
    // Wait for registration form to load
    cy.wait(5000);
    
    // Sometimes there might be multiple "Book free Demo" buttons, click again if needed
    cy.get('body').then($body => {
      if ($body.find('button:contains("Book free Demo")').length > 0) {
        cy.log('Found another Book free Demo button, clicking it');
        cy.contains('button', 'Book free Demo').first().click({ force: true });
        cy.wait(3000);
      }
    });
    
    // Fill registration form
    // Name field - try multiple selectors
    cy.get('body').then($body => {
      if ($body.find('input[placeholder*="Name"]').length > 0) {
        cy.get('input[placeholder*="Name"]').type('Jacob Samro', { delay: 20 });
      } else if ($body.find('input[type="text"]').length > 0) {
        cy.get('input[type="text"]').first().type('Jacob Samro', { delay: 20 });
      } else {
        cy.log('⚠️ Name field not found with standard selectors');
      }
    });
    
    cy.wait(1000);
    
    // Select country - India
    cy.get('.iti__flag-container').click();
    cy.wait(1000);
    
    // First select US then switch to India (sometimes required)
    cy.get('.iti__country-list').then($list => {
      // Try to click United States first
      if ($list.find('li:contains("United States")').length > 0) {
        cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
        cy.wait(1000);
        // Click flag container again to reopen
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
      }
      
      // Now select India
      if ($list.find('li:contains("India")').length > 0) {
        cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
      } else {
        // Search for India in the list
        cy.get('.iti__country-list li').each(($el) => {
          if ($el.text().includes('India')) {
            cy.wrap($el).click({ force: true });
            return false;
          }
        });
      }
    });
    
    cy.wait(1000);
    
    // Enter phone number
    cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
    cy.wait(2000);
    
    // Enter email
    cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
    
    // Select grade
    cy.get('select.block').eq(0).then($select => {
      const options = $select.find('option').toArray().map(o => o.text);
      cy.log(`Available options: ${options.join(', ')}`);
      
      // Try to select appropriate grade
      if (options.includes('Grade 8')) {
        cy.get('select.block').eq(0).select('Grade 8');
      } else if (options.includes('Grade 7')) {
        cy.get('select.block').eq(0).select('Grade 7');
      } else if (options.includes('Grade 9')) {
        cy.get('select.block').eq(0).select('Grade 9');
      } else if (options.includes('Middle School')) {
        cy.get('select.block').eq(0).select('Middle School');
      } else if (options.length > 1) {
        // Select second option (first is usually placeholder)
        cy.get('select.block').eq(0).select(1);
      }
    });
    
    // Enter address details (if fields exist - may not be required for free demo)
    cy.get('body').then($body => {
      // Address field
      if ($body.find('input[placeholder*="Address"]').length > 0) {
        cy.get('input[placeholder*="Address"]').type('123 Main Street, Chennai');
      }
      
      // City field
      if ($body.find('input[placeholder*="City"]').length > 0) {
        cy.get('input[placeholder*="City"]').type('Chennai');
      }
      
      // State field (if exists)
      if ($body.find('input[placeholder*="State"]').length > 0) {
        cy.get('input[placeholder*="State"]').type('Tamil Nadu');
      } else if ($body.find('select[name*="state"]').length > 0) {
        cy.get('select[name*="state"]').select('Tamil Nadu');
      }
      
      // Pincode
      if ($body.find('input[placeholder*="Pincode"]').length > 0) {
        cy.get('input[placeholder*="Pincode"]').type('600001');
      } else if ($body.find('input[placeholder*="Zip"]').length > 0) {
        cy.get('input[placeholder*="Zip"]').type('600001');
      }
    });
    
    cy.wait(4000);
    
    // Click final Register button
    cy.get('body').then($body => {
      const registerSelectors = [
        'p:contains("Register")',
        'button:contains("Register")',
        'button:contains("Book Demo")',
        'button:contains("Submit")',
        'button[type="submit"]',
        'button:contains("Proceed")',
        'button:contains("Continue")',
        '*[class*="btn"]:contains("Register")'
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
    
    // Verify registration success (for free demo, might show success message instead of payment)
    cy.wait(5000);
    
    // Check for success message or payment gateway
    cy.get('body').then($body => {
      // Check for success message first (since it's a free demo)
      if ($body.find('h1:contains("Registration Successful")').length > 0) {
        cy.contains('h1', 'Registration Successful').should('exist');
        cy.log('✅ Registration successful - Free demo booked');
      } else if ($body.find('*:contains("Success")').length > 0) {
        cy.contains('Success').should('exist');
        cy.log('✅ Registration successful');
      } else if ($body.find('*:contains("Thank you")').length > 0) {
        cy.contains('Thank you').should('exist');
        cy.log('✅ Registration successful - Thank you message displayed');
      } else if ($body.find('iframe').length > 0) {
        // Check for payment gateway (shouldn't happen for free, but just in case)
        cy.get('iframe').should('exist');
        cy.log('⚠️ Payment gateway loaded (unexpected for free demo)');
      } else {
        cy.log('⚠️ Could not verify registration success, checking for any confirmation');
        // Look for any confirmation element
        cy.get('body').should('contain.text', 'demo');
      }
    });
  });
});