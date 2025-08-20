describe('Redirecting on same tab Test', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });
    
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            cy.log('❌ Test Failed');
            cy.screenshot(`failed-${this.currentTest.title}`);
        } else {
            cy.log('✅ Test Passed Successfully');
        }
    });

    it('should login to dashboard and view workshop registrations', () => {
        // Dashboard Login Process
        cy.visit('https://dash.internal.chitti.xyz/');
        
        // Wait for page to load
        cy.wait(2000);
        
        // Set viewport
        cy.viewport('macbook-16');
        
        // Fill login form
        cy.log('Filling login credentials');
        cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
        cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
        
        // Click login button
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
        cy.wait(5000);
        
        // Workshop Navigation
        cy.log('Navigating to Workshops section');
        cy.contains('button', 'Workshops').click({ force: true });
        
        // Click on workshop sub-menu
        cy.wait(2000);
        cy.get('a[data-sidebar="menu-sub-button"] span.text-sidebar-foreground\\/80').eq(1).click({ multiple: true, force: true });
        
        // Scroll to see more options
        cy.get('.overflow-x-auto.w-full').scrollTo(500, 0);
        
        // Click on menu button to show options
        cy.get('button[aria-haspopup="menu"]').eq(2).should('exist').click({ multiple: true, force: true });
        
        // Handle window opening in same tab
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
            });
        });
        
        // Click View Registrations
        cy.log('Clicking View Registrations');
        cy.contains('View Registrations').click();
        
        // Verify URL contains registration path
        cy.url().should('include', '/platform/workshops/workshop/');
        cy.url().should('include', '/registrations/');
        
        cy.log('✅ Successfully navigated to workshop registrations');
    });
});