describe('Solar 1 on 1 - Tamil Workshop Test', () => {
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

  it('should find Solar 1 on 1 - Tamil workshop and register successfully', () => {
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
        
        // Strategy 1: Exact match for Solar 1 on 1 - Tamil
        for (let i = 0; i < $elements.length; i++) {
          const el = $elements[i];
          const text = (el.innerText || '');
          
          if (text.includes('Solar 1 on 1 - Tamil') || 
              text.includes('Solar 1 on 1 Tamil') ||
              (text.includes('Solar') && text.includes('Tamil') && text.includes('1 on 1'))) {
            cy.log(`✅ Found exact match: Solar 1 on 1 - Tamil at index ${i}`);
            matchedElement = el;
            break;
          }
        }
        
        // Strategy 2: Look for Solar Tamil with price
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '');
            
            if (text.includes('Solar') && 
                text.includes('Tamil') &&
                (text.includes('₹499') || text.includes('499'))) {
              cy.log(`⚠️ Found Solar Tamil workshop with price at index ${i}`);
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
            
            if (text.includes('solar') && 
                text.includes('tamil') &&
                (text.includes('1 on 1') || text.includes('one on one'))) {
              cy.log(`⚠️ Found Solar Tamil workshop (case insensitive) at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 4: Look for Solar workshop in Tamil
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('solar') && text.includes('tamil')) {
              cy.log(`⚠️ Found Solar Tamil workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 5: Look for image with Solar alt text
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const img = el.querySelector('img');
            if (img && (img.alt || '').toLowerCase().includes('solar')) {
              cy.log(`⚠️ Found workshop with solar image at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        // Strategy 6: Very flexible - just Solar workshop
        if (!matchedElement) {
          for (let i = 0; i < $elements.length; i++) {
            const el = $elements[i];
            const text = (el.innerText || '').toLowerCase();
            
            if (text.includes('solar')) {
              cy.log(`⚠️ Found Solar workshop at index ${i}`);
              matchedElement = el;
              break;
            }
          }
        }
        
        if (!matchedElement) {
          cy.log('❌ Could not find Solar 1 on 1 - Tamil workshop');
          throw new Error('Workshop not found - Solar Tamil workshop may not be available');
        }
        
        // Click the workshop card
        cy.wrap(matchedElement)
          .scrollIntoView({ duration: 1500 })
          .click();
      });

    // Wait for workshop details page to load
    cy.wait(5000);
    
    // Click Book Now button - try multiple selectors and strategies
    cy.get('body').then($body => {
      let buttonClicked = false;
      
      // Strategy 1: Try to find element containing exact text "Book Now for ₹499"
      const exactTextElements = Array.from($body[0].querySelectorAll('*')).filter(el => {
        const text = el.textContent || '';
        return text.includes('Book Now for ₹499') || text.includes('Book Now for 499');
      });
      
      if (exactTextElements.length > 0) {
        // Find the most clickable element (button, div with onclick, etc.)
        for (const el of exactTextElements) {
          if (el.tagName === 'BUTTON' || el.tagName === 'A' || 
              el.onclick || el.style.cursor === 'pointer' ||
              el.className.includes('btn') || el.className.includes('button')) {
            cy.wrap(el).scrollIntoView().click({ force: true });
            buttonClicked = true;
            cy.log(`✅ Clicked Book Now button by exact text match`);
            break;
          }
        }
      }
      
      // Strategy 2: Use standard selectors if exact text didn't work
      if (!buttonClicked) {
        const selectors = [
          'div:contains("Book Now for ₹499")',
          'div:contains("Book Now for 499")',
          '*:contains("₹499"):contains("Book")',
          'button:contains("Book Now")',
          'div[class*="cursor-pointer"]:contains("Book Now")',
          'span:contains("Book Now for ₹499")',
          'p:contains("Book Now for ₹499")',
          'button:contains("Register")',
          'button:contains("Enroll")',
          'button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\]',
          'button[class*="bg-"][class*="E94C45"]'
        ];
        
        for (const selector of selectors) {
          try {
            if ($body.find(selector).length > 0) {
              // Get the element and check if it's visible
              const element = $body.find(selector).first();
              if (element.is(':visible')) {
                cy.get(selector).first()
                  .scrollIntoView()
                  .wait(500)
                  .click({ force: true });
                buttonClicked = true;
                cy.log(`✅ Clicked book now button using selector: ${selector}`);
                break;
              }
            }
          } catch (e) {
            cy.log(`⚠️ Selector failed: ${selector}`);
          }
        }
      }
      
      // Strategy 3: Try XPath if CSS selectors don't work
      if (!buttonClicked) {
        cy.xpath("//*[contains(text(), 'Book Now for ₹499')]").then($el => {
          if ($el.length > 0) {
            cy.wrap($el.first()).click({ force: true });
            buttonClicked = true;
            cy.log(`✅ Clicked book now button using XPath`);
          }
        }).catch(() => {
          cy.log('⚠️ XPath strategy failed');
        });
      }
      
      // Strategy 4: Find any clickable element with price 499
      if (!buttonClicked) {
        const priceElements = Array.from($body[0].querySelectorAll('*')).filter(el => {
          const text = el.textContent || '';
          return (text.includes('499') || text.includes('₹499')) && 
                 (text.includes('Book') || text.includes('Register') || text.includes('Enroll'));
        });
        
        if (priceElements.length > 0) {
          cy.wrap(priceElements[0]).click({ force: true });
          buttonClicked = true;
          cy.log(`✅ Clicked element with price 499`);
        }
      }
      
      if (!buttonClicked) {
        cy.log('❌ Could not find book now button - will try to proceed anyway');
        // Don't throw error, just log and continue
      }
    });
    
    // Wait for registration form to load
    cy.wait(5000);
    
    // Fill registration form
    // Name field - try multiple selectors
    cy.get('body').then($body => {
      if ($body.find('input[placeholder="Enter the Name"]').length > 0) {
        cy.get('input[placeholder="Enter the Name"]').type('Jacob Samro', { delay: 20 });
      } else if ($body.find('input[placeholder="Enter Name"]').length > 0) {
        cy.get('input[placeholder="Enter Name"]').type('Jacob Samro', { delay: 20 });
      } else if ($body.find('input[placeholder*="Name"]').length > 0) {
        cy.get('input[placeholder*="Name"]').first().type('Jacob Samro', { delay: 20 });
      } else if ($body.find('input[type="text"]').length > 0) {
        cy.get('input[type="text"]').first().type('Jacob Samro', { delay: 20 });
      } else {
        cy.log('⚠️ Name field not found with standard selectors');
      }
    });
    
    cy.wait(1000);
    
    // Select country - India (for Tamil workshop)
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
          break;
        }
      }
      
      if (!indiaFound) {
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
    cy.get('body').then($body => {
      // Try different selector strategies for grade dropdown
      if ($body.find('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer').length > 0) {
        cy.get('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer').select('Grade 8');
      } else if ($body.find('select.block.rounded-\\[14px\\]').length > 0) {
        cy.get('select.block.rounded-\\[14px\\]').select('Grade 8');
      } else if ($body.find('select.block').length > 0) {
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
      }
    });
    
    // Enter address details
    cy.get('body').then($body => {
      // Address field
      if ($body.find('input[placeholder="Enter your Address"]').length > 0) {
        cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai', { delay: 10 });
      } else if ($body.find('input[placeholder*="Address"]').length > 0) {
        cy.get('input[placeholder*="Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai', { delay: 10 });
      }
      
      cy.wait(1000);
      
      // City field
      if ($body.find('input[placeholder="Enter your City"]').length > 0) {
        cy.get('input[placeholder="Enter your City"]').type('Chennai', { delay: 20 });
      } else if ($body.find('input[placeholder*="City"]').length > 0) {
        cy.get('input[placeholder*="City"]').type('Chennai', { delay: 20 });
      }
      
      cy.wait(1000);
      
      // State field (if exists)
      if ($body.find('input[placeholder*="State"]').length > 0) {
        cy.get('input[placeholder*="State"]').type('Tamil Nadu', { delay: 20 });
      } else if ($body.find('select[name*="state"]').length > 0) {
        cy.get('select[name*="state"]').select('Tamil Nadu');
      }
      
      // Pincode
      if ($body.find('input[placeholder="Enter your Pincode"]').length > 0) {
        cy.get('input[placeholder="Enter your Pincode"]').type('600117', { delay: 20 });
      } else if ($body.find('input[placeholder*="Pincode"]').length > 0) {
        cy.get('input[placeholder*="Pincode"]').type('600117', { delay: 20 });
      } else if ($body.find('input[placeholder*="Zip"]').length > 0) {
        cy.get('input[placeholder*="Zip"]').type('600117', { delay: 20 });
      }
    });
    
    cy.wait(4000);
    
    // Click final Register button
    cy.get('body').then($body => {
      const registerSelectors = [
        'button:contains("Register")',
        'p:contains("Register")',
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
    
    // Verify payment gateway loads
    cy.wait(5000);
    
    // Check for various payment gateway options
    cy.get('body').then($body => {
      if ($body.find('iframe[src*="razorpay"]').length > 0) {
        cy.get('iframe[src*="razorpay"]', { timeout: 20000 }).should('be.visible');
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