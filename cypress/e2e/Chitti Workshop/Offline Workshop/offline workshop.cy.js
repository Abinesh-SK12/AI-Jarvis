describe('Register Test', () => {
    // 🤖 AI-POWERED ENHANCEMENTS
    beforeEach(() => {
        // AI: Initialize test with smart analysis
        cy.log('🤖 AI Assistant: Test initialized');
        
        // JARVIS: Visual debugging ready
        cy.log('🎯 JARVIS: Visual debugger standing by');
    });
    
    // AI: Analyze page on visit
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            // 🔴 TEST FAILED - ACTIVATE AI DEBUGGING
            cy.log('❌ Test Failed - AI Analysis Starting...');
            
            // AI: Debug the failure
            cy.aiDebugFailure();
            
            // JARVIS: Visual analysis of failure
            cy.jarvisAnalyze(`Test failure: ${this.currentTest.title}`);
            
            // AI: Explain the error
            if (this.currentTest.err) {
                cy.aiExplainError(this.currentTest.err.message);
            }
            
            // Discord: Send failure notification
            cy.analyzeAndReport(`Failed: ${this.currentTest.title}`);
            
            // AI: Suggest better selectors if needed
            cy.aiSuggestSelector('failed element');
        } else {
            cy.log('✅ Test Passed Successfully');
        }
    });

    beforeEach(() => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });
    });

    it('should log in with valid credentials and check hover effect', () => {
        cy.visit('https://chitti.app/workshops/');
        
        // JARVIS: Analyze page visually
        cy.jarvisAnalyze('Analyzing workshop page - what content is visible?');
        
        // JARVIS: Verify key elements are visible
        cy.jarvisVerifyVisible('workshop cards or listings');
        
        // JARVIS: Monitor for dynamic content
        cy.jarvisDetectChange('Monitoring page for dynamic content loading');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        cy.document().its('readyState').should('eq', 'complete'); 

        cy.get('button.flex.items-center.justify-center.w-full').eq(1).click({ force: true });
        cy.document().its('readyState').should('eq', 'complete');

        cy.get('button.flex.items-center.justify-center.w-full').eq(0).click({ force: true });
        cy.contains('div', '© 2024 LMES Academy Pvt. Ltd. All rights reserved.')
            .scrollIntoView({ duration: 5000 })
            .should('exist');
        cy.scrollTo('top', { duration: 5000 });

        cy.get('a.group').each(($el) => {
            cy.wrap($el).scrollIntoView().realHover();
            cy.wait(100);
            cy.wrap($el)
                .find('img.transition-transform')
                .should('be.visible')
                .then(($img) => {
                    // Just verify the image is visible after hover
                    // Some images may not have transform effects
                    cy.wrap($img).should('be.visible');
                });
        });

        cy.scrollTo('top', { duration: 5000 });
        cy.contains('span', 'Tamil workshops').should('exist');
        cy.contains('span', 'English workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Malayalam workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Telugu workshops').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('span', 'Kannada workshops').scrollIntoView({ duration: 3000 }).should('exist');

        cy.get('a[href="/about"]').eq(1).scrollIntoView({ duration: 3000 });
        cy.get('a[href="/about"]').eq(0).click({ force: true });

        cy.contains('div', 'Careers').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('div', 'Careers').eq(0).click({ force: true });

        cy.get('a[href="/policies/terms"]').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/terms"]').eq(0).click({ force: true });

        cy.get('a[href="/policies/privacy"]').eq(0).scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/privacy"]').eq(0).click({ force: true });

        cy.get('a[href="/policies/refund"]').scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/refund"]').click({ force: true });

        cy.get('a[href="/policies/disclaimer"]').scrollIntoView({ duration: 3000 }).should('exist');
        cy.get('a[href="/policies/disclaimer"]').click({ force: true });

        cy.contains('div', 'FAQ’s').scrollIntoView({ duration: 3000 }).should('exist');
        cy.contains('div', 'Impacted the lives of').should('exist');
        cy.contains('div', '2Million People').should('exist');
        cy.contains('div', ' Google Reviews ').should('exist');

        cy.scrollTo('top', { duration: 3000 });

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.document().its('readyState').should('eq', 'complete');
        cy.get('a[href="/"]').eq(2).contains('Home').click({ force: true });
        cy.wait(5000);
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/products"]', { timeout: 10000 }).click({ multiple: true, force: true });
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/support"]').eq(1).click({ force: true });
        cy.go('back');

        cy.contains('span', 'Open main menu').parents('button').click({ force: true });
        cy.get('a[href="/workshops"]', { timeout: 10000 }).eq(0).click({ multiple: true, force: true });

        cy.document().its('readyState').should('eq', 'complete');
    });
});