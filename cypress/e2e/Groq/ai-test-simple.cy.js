describe('AI Features Test', () => {
    it('should test Groq AI integration', () => {
        // Visit the workshops page
        cy.visit('https://chitti.app/workshops/');
        
        // Test Groq AI
        cy.askGroq('What is 2 + 2?').then(response => {
            cy.log('🤖 Groq Response:', response);
            expect(response).to.exist;
        });
        
        // Test JARVIS visual analysis
        cy.jarvisAnalyze('Testing JARVIS visual debugger');
        
        // Test AI debugging commands
        cy.aiSuggestSelector('workshop card');
    });
    
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            // Test AI failure analysis
            cy.aiDebugFailure();
        }
    });
});