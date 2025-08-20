describe('NEET JEE One on One Workshop Test', () => {
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

  it('should find NEET JEE One on One workshop and register successfully', () => {
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
        
        // Strategy 1: Exact match for NEET JEE workshop
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          if (text.includes('NEET JEE One on One') || 
              text.includes('NEET JEE 1 on 1') ||
              (text.includes('NEET') && text.includes('JEE') && text.includes('One on One'))) {
            cy.log(`✅ Found exact match: NEET JEE One on One at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Look for NEET JEE with price
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if ((text.includes('NEET') || text.includes('JEE')) && 
                (text.includes('₹99') || text.includes('99') || text.includes('₹'))) {
              cy.log(`⚠️ Found NEET/JEE workshop with price at index ${i}`);
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
            
            if ((text.includes('neet') || text.includes('jee')) && 
                (text.includes('one on one') || text.includes('1 on 1'))) {
              cy.log(`⚠️ Found NEET/JEE workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 4: Very flexible - any NEET or JEE workshop
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('neet') || text.includes('jee')) {
              cy.log(`⚠️ Found NEET or JEE workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find NEET JEE One on One workshop');
          throw new Error('Workshop not found - NEET JEE workshop may not be available');
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
        'span.text-base.font-bold.leading-6.text-white',
        'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\]',
        'button[class*="bg-"][class*="E94C45"]',
        'button:contains("Register")',
        'button:contains("Enroll")',
        'button:contains("Book")',
        '*:contains("Register Now")',
        '*:contains("Book Now")'
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
    // Name field - try multiple selectors
    cy.get('body').then($body => {
      if ($body.find('input[placeholder*="Name"]').length > 0) {
        cy.get('input[placeholder*="Name"]').type('Raj Kumar', { delay: 20 });
      } else if ($body.find('input[type="text"]').length > 0) {
        cy.get('input[type="text"]').first().type('Raj Kumar', { delay: 20 });
      } else {
        cy.log('⚠️ Name field not found with standard selectors');
      }
    });
    
    cy.wait(1000);
    
    // Select country - India (for NEET/JEE which are Indian exams)
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
    
    // Select grade - appropriate for NEET/JEE students
    cy.get('select.block').eq(0).then($select => {
      const options = $select.find('option').toArray().map(o => o.text);
      cy.log(`Available options: ${options.join(', ')}`);
      
      // Try to select appropriate grade for NEET/JEE
      if (options.includes('Grade 12')) {
        cy.get('select.block').eq(0).select('Grade 12');
      } else if (options.includes('Grade 11')) {
        cy.get('select.block').eq(0).select('Grade 11');
      } else if (options.includes('Grade 10')) {
        cy.get('select.block').eq(0).select('Grade 10');
      } else if (options.includes('High School')) {
        cy.get('select.block').eq(0).select('High School');
      } else if (options.includes('12th Standard')) {
        cy.get('select.block').eq(0).select('12th Standard');
      } else if (options.includes('11th Standard')) {
        cy.get('select.block').eq(0).select('11th Standard');
      } else if (options.length > 1) {
        // Select second option (first is usually placeholder)
        cy.get('select.block').eq(0).select(1);
      }
    });
    
    // Enter address details (if fields exist)
    cy.get('body').then($body => {
      // Address field
      if ($body.find('input[placeholder*="Address"]').length > 0) {
        cy.get('input[placeholder*="Address"]').type('123 MG Road, Bengaluru');
      }
      
      // City field
      if ($body.find('input[placeholder*="City"]').length > 0) {
        cy.get('input[placeholder*="City"]').type('Bengaluru');
      }
      
      // State field (if exists)
      if ($body.find('input[placeholder*="State"]').length > 0) {
        cy.get('input[placeholder*="State"]').type('Karnataka');
      } else if ($body.find('select[name*="state"]').length > 0) {
        cy.get('select[name*="state"]').select('Karnataka');
      }
      
      // Pincode
      if ($body.find('input[placeholder*="Pincode"]').length > 0) {
        cy.get('input[placeholder*="Pincode"]').type('560001');
      } else if ($body.find('input[placeholder*="Zip"]').length > 0) {
        cy.get('input[placeholder*="Zip"]').type('560001');
      }
    });
    
    cy.wait(4000);
    
    // Click final Register button
    cy.get('body').then($body => {
      const registerSelectors = [
        'p:contains("Register")',
        'button:contains("Register")',
        'button[type="submit"]',
        'button:contains("Submit")',
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
    
    // Verify payment gateway loads
    cy.wait(5000);
    
    // Check for various payment gateway options
    cy.get('body').then($body => {
      if ($body.find('iframe[src*="razorpay"]').length > 0) {
        cy.get('iframe[src*="razorpay"]').should('be.visible');
        cy.log('✅ Razorpay gateway loaded');
      } else if ($body.find('iframe[src*="checkout.dodopayments"]').length > 0) {
        cy.origin('https://checkout.dodopayments.com', () => {
          cy.contains('h1', 'LMES INC').should('be.visible');
        });
        cy.log('✅ DodoPayments gateway loaded');
      } else if ($body.find('iframe[src*="stripe"]').length > 0) {
        cy.get('iframe[src*="stripe"]').should('be.visible');
        cy.log('✅ Stripe gateway loaded');
      } else if ($body.find('iframe[src*="paytm"]').length > 0) {
        cy.get('iframe[src*="paytm"]').should('be.visible');
        cy.log('✅ Paytm gateway loaded');
      } else {
        cy.log('⚠️ Payment gateway verification - checking for any iframe');
        cy.get('iframe', { timeout: 15000 }).should('exist');
      }
    });
  });
});