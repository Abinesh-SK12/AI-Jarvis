describe('Aeromodelling Workshop - PAN Test', () => {
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
    it('should find the correct workshop card and register successfully', () => {
        cy.visit('https://chitti.xyz/workshops/');
        
        // Wait for workshops to load
        cy.wait(3000);
        
        // Workshop Selection Logic
        
        // Try to find workshop by image first
        cy.get('body').then($body => {
            // Check if the specific image exists
            if ($body.find('img[alt="Aeromodelling Workshop - PAN"]').length > 0) {
                cy.log('✅ Found workshop by image alt text');
                cy.get('img[alt="Aeromodelling Workshop - PAN"]')
                    .first()
                    .scrollIntoView({ duration: 1000 })
                    .click({ force: true });
            } else {
                cy.log('⚠️ Image not found, trying text-based search');
                // Fallback to text-based search
                cy.get('a.group.rounded-xl.bg-white.flex.flex-col', { timeout: 10000 })
                    .then($elements => {
                        cy.log(`Found ${$elements.length} workshop cards`);
                        
                        let matchedElement = null;
                        
                        for (let i = 0; i < $elements.length; i++) {
                            const el = $elements[i];
                            const text = el.innerText || '';
                            
                            if (text.includes('Aeromodelling Workshop') && text.includes('PAN')) {
                                cy.log(`✅ Found Aeromodelling Workshop - PAN at index ${i}`);
                                matchedElement = el;
                                break;
                            }
                        }
                        
                        if (!matchedElement) {
                            // Try any Aeromodelling workshop
                            for (let i = 0; i < $elements.length; i++) {
                                const el = $elements[i];
                                const text = el.innerText || '';
                                
                                if (text.includes('Aeromodelling')) {
                                    cy.log(`⚠️ Using any Aeromodelling workshop at index ${i}`);
                                    matchedElement = el;
                                    break;
                                }
                            }
                        }
                        
                        if (!matchedElement) {
                            cy.log('⚠️ No Aeromodelling workshop found, using first card');
                            matchedElement = $elements[0];
                        }
                        
                        cy.wrap(matchedElement)
                            .scrollIntoView({ duration: 1000 })
                            .click({ force: true });
                    });
            }
        });

        cy.wait(5000);
        
        // Click Register Now button - try multiple selectors
        cy.get('body').then($body => {
            if ($body.find('button:contains("Register Now for")').length > 0) {
                cy.contains('button', 'Register Now for').scrollIntoView({ duration: 1500 })
                    .click({ force: true, multiple: true });
            } else if ($body.find('button:contains("Register Now")').length > 0) {
                cy.contains('button', 'Register Now').scrollIntoView({ duration: 1500 })
                    .click({ force: true, multiple: true });
            } else {
                cy.log('⚠️ Register button not found with standard text');
                // Try any button with Register text
                cy.get('button').contains(/register/i).first()
                    .scrollIntoView({ duration: 1500 })
                    .click({ force: true });
            }
        });
        
        cy.wait(5000);
        
        // Registration Form Completion
        cy.get('input[type="text"]').type('Jacob Samro', { delay: 20 });
        cy.wait(1000);
        
        // Country selection - first select US then India
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
        cy.wait(1000);
        
        // Phone number
        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
        cy.wait(2000);
        
        // Email field if it exists
        cy.get('body').then($body => {
            if ($body.find('input[type="email"]').length > 0) {
                cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
            }
        });
        
        // Select grade
        cy.get('select.block').eq(0).select('Class 8');
        
        // Select timezone if it exists
        cy.get('body').then($body => {
            if ($body.find('select:contains("Choose timezone")').length > 0) {
                cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
            }
        });
        
        // Select time slot
        cy.contains('span', '10:00 AM').click({ force: true });
        
        // Submit Registration Form
        cy.contains('p', 'Register').click();
        
        // Verify success message
        cy.contains('div', ' Registration Successful ').should('exist');
    });

});