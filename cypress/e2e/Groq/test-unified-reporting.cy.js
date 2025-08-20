describe('Test JARVIS Unified Reporting', () => {
    
    it('should generate comprehensive JARVIS reports on failure', () => {
        // Visit page
        cy.visit('https://chitti.app/workshops/');
        
        // This will fail and trigger all reporting systems
        cy.get('.non-existent-element-to-trigger-failure', { timeout: 2000 })
            .should('exist');
    });
    
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            cy.log('🚨 Test Failed - Generating JARVIS Unified Report...');
            
            // Generate unified JARVIS report
            cy.jarvisUnifiedReport({
                aiAnalysis: 'Test intentionally failed to demonstrate unified reporting',
                discordStatus: true
            });
            
            // Also trigger other reporting systems
            cy.aiDebugFailure();
            cy.jarvisAnalyze('Unified reporting test failure');
            
            cy.log('📁 All reports saved to cypress/jarvis-reports/');
        }
    });
});