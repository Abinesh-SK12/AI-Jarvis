describe('Aeromodelling Program Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
    });
    
    it('should find the correct workshop card and register successfully', () => {
        // Visit workshops page
        cy.visit('https://chitti.xyz/workshops/');
        
        // Find the specific Aeromodelling Program workshop card
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
            .then($elements => {
                const found = $elements.filter((index, el) => {
                    const text = el.innerText;
                    return (
                        text.includes('Aeromodelling Program') &&
                        text.includes('Free') &&
                        text.includes('English') &&
                        text.includes('Sunday, August 24, 2025') &&
                        text.includes('Grade 1 to 4') &&
                        text.includes('10:30 AM EST')
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
        
        // Click Register Now button
        cy.contains('button', 'Register Now')
            .scrollIntoView({ duration: 1500 })
            .click({ force: true, multiple: true });
        
        cy.wait(5000);
        
        // Fill registration form
        // Name field
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
        
        // Email
        cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
        
        // Select grade
        cy.get('select.block').eq(0).select('Class 8');
        
        // Select timezone
        cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
        
        // Select time slot
        cy.contains('span', '12:30 PM').click({ force: true });
        
        // Submit registration
        cy.contains('p', 'Register').click();
        
        // Verify success message
        cy.contains('div', ' Registration Successful ').should('exist');
    });
    
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            cy.log('❌ Test Failed');
            cy.screenshot(`failed-${this.currentTest.title}`);
        } else {
            cy.log('✅ Test Passed Successfully');
        }
    });
});