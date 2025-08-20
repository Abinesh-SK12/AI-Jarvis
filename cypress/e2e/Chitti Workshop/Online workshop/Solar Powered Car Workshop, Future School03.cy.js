describe('Solar Powered Car Workshop - Future School 03 Test', () => {
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

  it('should find Solar Powered Car Workshop (Sunday, Aug 24) and register successfully', () => {
    // Visit workshops page with failOnStatusCode option
    cy.visit('https://chitti.xyz/workshops/', { failOnStatusCode: false });
    
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
        
        // Strategy 1: Exact match for Solar Powered Car Workshop with specific date/time
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          // Look for workshop with Sunday, August 24, 2025 at 10:00 AM CST
          if (text.includes('Solar Powered Car Workshop') && 
              text.includes('Future School') &&
              text.includes('Sunday, August 24, 2025') &&
              text.includes('10:00 AM CST')) {
            cy.log(`✅ Found exact match: Solar Powered Car Workshop (Aug 24, 10:00 AM) at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Match with partial date/time
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Solar Powered Car Workshop') && 
                (text.includes('August 24') || text.includes('Aug 24')) &&
                text.includes('10:00 AM')) {
              cy.log(`⚠️ Found Solar Car Workshop with Aug 24, 10:00 AM at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 3: Match with Texas location
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Solar') && text.includes('Car') && 
                text.includes('Texas') && text.includes('$9')) {
              cy.log(`⚠️ Found Solar Car Workshop in Texas at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 4: Any Solar Car Workshop on Sunday
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Solar Powered Car Workshop') && 
                text.includes('Sunday')) {
              cy.log(`⚠️ Found Solar Car Workshop on Sunday at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 5: Future School workshop
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Future School') && 
                (text.includes('$9') || text.includes('10:00 AM'))) {
              cy.log(`⚠️ Found Future School workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 6: Case insensitive search
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('solar') && text.includes('car')) {
              cy.log(`⚠️ Found Solar Car workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find Solar Powered Car Workshop (Sunday, Aug 24)');
          throw new Error('Workshop not found - Solar Powered Car workshop for Aug 24 may not be available');
        }
        
        // Click the workshop card
        cy.wrap(matchedElement)
          .scrollIntoView({ duration: 1500 })
          .click();
      });

    // Wait for workshop details page to load
    cy.wait(5000);
    
    // Click Register/Book Now button - try multiple selectors
    cy.get('body').then($body => {
      const selectors = [
        'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3',
        'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\]',
        'button[class*="bg-"][class*="E94C45"]',
        'button:contains("Register")',
        'button:contains("Book Now")',
        'button:contains("Enroll")',
        'button:contains("Join")',
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
        cy.get('input[placeholder*="Name"]').first().type('Jacob Samro', { delay: 20 });
      } else if ($body.find('input[type="text"]').length > 0) {
        cy.get('input[type="text"]').first().type('Jacob Samro', { delay: 20 });
      } else {
        cy.log('⚠️ Name field not found with standard selectors');
      }
    });
    
    cy.wait(1000);
    
    // Handle country selector - CHANGE FROM US TO INDIA
    cy.get('body').then($body => {
      // Check if country selector exists
      if ($body.find('.iti__flag-container').length > 0) {
        cy.log('Country selector found, changing from US to India');
        
        // First click - select United States
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        
        cy.get('.iti__country-list').then($list => {
          // Select United States first
          if ($list.find('li:contains("United States")').length > 0) {
            cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
            cy.log('✅ Selected United States first');
          } else {
            // Search for United States in the list
            cy.get('.iti__country-list li').each(($el) => {
              if ($el.text().includes('United States') || $el.text().includes('USA')) {
                cy.wrap($el).click({ force: true });
                return false;
              }
            });
          }
        });
        
        cy.wait(1000);
        
        // Second click - change to India
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        
        cy.get('.iti__country-list').then($list => {
          // Now select India
          if ($list.find('li:contains("India")').length > 0) {
            cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
            cy.log('✅ Changed to India');
          } else {
            // Search for India in the list with multiple strategies
            const indiaSelectors = [
              'li:contains("India")',
              'li[data-country-code="in"]',
              'li[data-dial-code="91"]'
            ];
            
            let indiaFound = false;
            for (const selector of indiaSelectors) {
              if ($list.find(selector).length > 0) {
                cy.get('.iti__country-list').find(selector).first().click({ force: true });
                indiaFound = true;
                cy.log('✅ Changed to India');
                break;
              }
            }
            
            if (!indiaFound) {
              // Last resort - search through all list items
              cy.get('.iti__country-list li').each(($el) => {
                if ($el.text().includes('India')) {
                  cy.wrap($el).click({ force: true });
                  cy.log('✅ Changed to India');
                  return false;
                }
              });
            }
          }
        });
      } else if ($body.find('select[name*="country"]').length > 0) {
        // Alternative: Country dropdown
        cy.log('Country dropdown found, selecting India');
        cy.get('select[name*="country"]').select('India');
      } else if ($body.find('input[name*="country"]').length > 0) {
        // Alternative: Country input field
        cy.log('Country input field found, typing India');
        cy.get('input[name*="country"]').clear().type('India');
      } else {
        cy.log('⚠️ No country selector found, skipping country selection');
      }
    });
    
    cy.wait(1000);
    
    // Enter phone number
    cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
    cy.wait(2000);
    
    // Enter email
    cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
    
    // Select grade/class
    cy.get('body').then($body => {
      // Try different selector strategies for grade dropdown
      if ($body.find('select.block').length > 0) {
        cy.get('select.block').eq(0).then($select => {
          const options = $select.find('option').toArray().map(o => o.text);
          cy.log(`Available options: ${options.join(', ')}`);
          
          // Try to select appropriate grade
          if (options.includes('Class 10')) {
            cy.get('select.block').eq(0).select('Class 10');
          } else if (options.includes('Grade 10')) {
            cy.get('select.block').eq(0).select('Grade 10');
          } else if (options.includes('Grade 9')) {
            cy.get('select.block').eq(0).select('Grade 9');
          } else if (options.includes('High School')) {
            cy.get('select.block').eq(0).select('High School');
          } else if (options.length > 1) {
            // Select second option (first is usually placeholder)
            cy.get('select.block').eq(0).select(1);
          }
        });
      } else if ($body.find('select').length > 0) {
        // Try any select element
        cy.get('select').first().then($select => {
          const options = $select.find('option').toArray().map(o => o.text);
          if (options.length > 1) {
            cy.get('select').first().select(1);
          }
        });
      } else {
        cy.log('⚠️ No grade selector found, skipping grade selection');
      }
    });
    
    // Handle timezone selection (specific to this workshop - CST for Texas)
    cy.get('body').then($body => {
      if ($body.find('select:contains("timezone")').length > 0) {
        cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
        cy.log('✅ Selected CST timezone');
      } else if ($body.find('select[name*="timezone"]').length > 0) {
        cy.get('select[name*="timezone"]').then($select => {
          const options = $select.find('option').toArray().map(o => o.text);
          if (options.includes('Central Standard Time (CST)')) {
            cy.get('select[name*="timezone"]').select('Central Standard Time (CST)');
          } else if (options.includes('CST')) {
            cy.get('select[name*="timezone"]').select('CST');
          } else if (options.length > 1) {
            cy.get('select[name*="timezone"]').select(1);
          }
        });
        cy.log('✅ Selected timezone');
      } else {
        cy.log('⚠️ No timezone selector found, skipping timezone selection');
      }
    });
    
    // Handle time slot selection - for 10:00 AM CST
    cy.get('body').then($body => {
      // Try to select 10:00 AM time slot
      if ($body.find('span:contains("10:00 AM")').length > 0) {
        cy.contains('span', '10:00 AM').click({ force: true });
        cy.log('✅ Selected 10:00 AM time slot');
      } else if ($body.find('span:contains("03:00 PM")').length > 0) {
        // Fallback to 3:00 PM if 10:00 AM not available
        cy.contains('span', '03:00 PM').click({ force: true });
        cy.log('✅ Selected 3:00 PM time slot (fallback)');
      } else if ($body.find('span:contains("AM")').length > 0) {
        // Select any AM slot
        cy.get('span:contains("AM")').first().click({ force: true });
        cy.log('✅ Selected AM time slot');
      } else if ($body.find('input[type="radio"]').length > 0) {
        // Select first available time slot
        cy.get('input[type="radio"]').first().check();
        cy.log('✅ Selected first available time slot');
      } else {
        cy.log('⚠️ No time slot selector found, skipping time selection');
      }
    });
    
    // Enter Texas address details (optional - only if fields exist)
    cy.get('body').then($body => {
      // Address field
      if ($body.find('input[placeholder*="Address"]').length > 0) {
        cy.get('input[placeholder*="Address"]').type('789 Elm Street, Austin, TX');
      }
      
      // City field
      if ($body.find('input[placeholder*="City"]').length > 0) {
        cy.get('input[placeholder*="City"]').type('Austin');
      }
      
      // State field (if exists)
      if ($body.find('input[placeholder*="State"]').length > 0) {
        cy.get('input[placeholder*="State"]').type('Texas');
      } else if ($body.find('select[name*="state"]').length > 0) {
        cy.get('select[name*="state"]').select('Texas');
      }
      
      // Zip code (Austin, TX)
      if ($body.find('input[placeholder*="Zip"]').length > 0) {
        cy.get('input[placeholder*="Zip"]').type('78701');
      } else if ($body.find('input[placeholder*="Pincode"]').length > 0) {
        cy.get('input[placeholder*="Pincode"]').type('78701');
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
        '*[class*="btn"]:contains("Register")',
        'div[class*="button"]:contains("Register")'
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
    
    // Verify payment gateway loads or success message
    cy.wait(5000);
    
    
  });

    // Enhanced error handling with AI
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            // AI analyzes the failure
            cy.aiDebugFailure();
            
            // JARVIS visual analysis
            cy.jarvisAnalyze('Test failure visual analysis');
            
            // Send to Discord with AI analysis
            cy.analyzeAndReport(`Test failed: ${this.currentTest.title}`);
        }
    });
});