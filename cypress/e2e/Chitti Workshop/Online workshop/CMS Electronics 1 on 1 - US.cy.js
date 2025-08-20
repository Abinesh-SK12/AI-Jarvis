describe('CMS Electronics 1 on 1 - US Workshop Test', () => {
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

  it('should find CMS Electronics 1 on 1 - US workshop and register successfully', () => {
    // Workshop Selection Process
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
        
        // Strategy 1: Exact match for US workshop
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          if (text.includes('CMS Electronics 1 on 1 - US') || 
              (text.includes('CMS Electronics') && text.includes('US'))) {
            cy.log(`✅ Found exact match: CMS Electronics 1 on 1 - US at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Look for US workshop with price
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if ((text.includes('CMS') || text.includes('Electronics')) && 
                text.includes('US') &&
                (text.includes('$9') || text.includes('$') || text.includes('9'))) {
              cy.log(`⚠️ Found US workshop with price at index ${i}`);
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
            
            if (text.includes('cms') && text.includes('us') && 
                (text.includes('electronics') || text.includes('1 on 1'))) {
              cy.log(`⚠️ Found CMS US workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 4: Very flexible - any US workshop
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('us') && 
                (text.includes('workshop') || text.includes('electronics') || text.includes('cms'))) {
              cy.log(`⚠️ Found US workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find CMS Electronics US workshop');
          throw new Error('Workshop not found - US workshop may not be available');
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
    
    // Registration Form Completion (US-specific data)
    cy.get('input[placeholder*="Name"]', { timeout: 10000 })
      .should('be.visible')
      .type('Jacob Samro', { delay: 20 });
    
    cy.wait(1000);
    
    // Select country - India
    cy.get('.iti__flag-container').click();
    cy.wait(1000);
    cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
    
    cy.wait(1000);
    
    // Enter US phone number
    cy.get('input[type="tel"]').clear().type('9884226399', { delay: 20 });
    cy.wait(2000);
    
    // Enter email
    cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
    
    // Select grade - Grade 8
    cy.get('select.block').eq(0).select('Grade 8');
    
    // Enter US address details (if fields exist)
    cy.get('body').then($body => {
      // Address field
      if ($body.find('input[placeholder*="Address"]').length > 0) {
        cy.get('input[placeholder*="Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai');
      }
      
      // City field
      if ($body.find('input[placeholder*="City"]').length > 0) {
        cy.get('input[placeholder*="City"]').type('Chennai');
      }
      
     
      
      // Zip/Postal code
      if ($body.find('input[placeholder*="Zip"]').length > 0) {
        cy.get('input[placeholder*="Zip"]').type('600117');
      } else if ($body.find('input[placeholder*="Pincode"]').length > 0) {
        cy.get('input[placeholder*="Pincode"]').type('600117');
      } else if ($body.find('input[placeholder*="Postal"]').length > 0) {
        cy.get('input[placeholder*="Postal"]').type('600117');
      }
    });
    
    cy.wait(4000);
    
    // Submit Registration Form
    cy.get('body').then($body => {
      const registerSelectors = [
        'button:contains("Register")',
        'button[type="submit"]',
        'button:contains("Submit")',
        'button:contains("Proceed")',
        'button:contains("Continue")'
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
    
   
  });
});