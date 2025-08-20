describe('Teacher Empowerment Workshop Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
    });

    it('should find the correct workshop card and register successfully', () => {
        cy.visit('https://chitti.xyz/workshops/');
        
        // Find the specific Teacher Empowerment Workshop card
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
            .then($elements => {
                const found = $elements.filter((index, el) => {
                    const text = el.innerText;
                    return (
                        text.includes('Teacher Empowerment Workshop') &&
                        text.includes('₹9') &&
                        text.includes('English')
                    );
                });
                return cy.wrap(found.first());
            })
            .as('workshopCard');
        
        // Click on the workshop card
        cy.get('@workshopCard')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();
        
        cy.wait(5000);
        
        // Click Book Now button - try multiple selectors
        cy.get('body').then($body => {
            if ($body.find('button:contains("Book Now for ₹9")').length > 0) {
                cy.contains('button', 'Book Now for ₹9')
                    .scrollIntoView({ duration: 1500 })
                    .click({ force: true });
            } else if ($body.find('div:contains("Book Now for ₹9")').length > 0) {
                cy.contains('div', 'Book Now for ₹9')
                    .scrollIntoView({ duration: 1500 })
                    .click({ force: true });
            } else {
                // Fallback - look for any element with Book Now text
                cy.contains('Book Now')
                    .first()
                    .scrollIntoView({ duration: 1500 })
                    .click({ force: true });
            }
        });
        
        cy.wait(5000);
        
        // Fill registration form
        // Name field
        cy.get('input[placeholder="Enter Name"]').type('Jacob Samro', { delay: 20 });
        cy.wait(1000);

        
        // Country selection - first select US then India
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list')
            .contains('li', 'United States')
            .click({ force: true });
        cy.wait(1000);
        
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list')
            .contains('li', 'India')
            .click({ force: true });
        cy.wait(1000);
        
        // Phone number
        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
        cy.wait(1000);
        
        // Email
        cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
        cy.wait(1000);
        
        // Occupation selection
        cy.get('select.block.rounded-\\[14px\\]')
            .select('College Student');
        cy.wait(1000);
        
        // Select time slot
        // cy.contains('span', '11:00 AM').click({ force: true });
        // cy.wait(1000);
        
        // Submit registration
        cy.contains('button', 'Register')
            .scrollIntoView({ duration: 1500 })
            .click({ force: true });
        
        cy.wait(10000);
        
        // Verify Razorpay payment gateway loads
        cy.get('iframe[src*="api.razorpay.com"]', { timeout: 30000 })
            .should('be.visible');
        
        cy.wait(5000);
    });
});