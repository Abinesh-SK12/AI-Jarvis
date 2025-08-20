// describe('Login Test', () => {
//     // 🤖 AI-POWERED ENHANCEMENTS
//     beforeEach(() => {
//         // AI: Initialize test with smart analysis
//         cy.log('🤖 AI Assistant: Test initialized');
        
//         // JARVIS: Visual debugging ready
//         cy.log('🎯 JARVIS: Visual debugger standing by');
//     });
    
//     // AI: Analyze page on visit
//     afterEach(function() {
//         if (this.currentTest.state === 'failed') {
//             // 🔴 TEST FAILED - ACTIVATE AI DEBUGGING
//             cy.log('❌ Test Failed - AI Analysis Starting...');
            
//             // AI: Debug the failure
//             cy.aiDebugFailure();
            
//             // JARVIS: Visual analysis of failure
//             cy.jarvisAnalyze(`Test failure: ${this.currentTest.title}`);
            
//             // AI: Explain the error
//             if (this.currentTest.err) {
//                 cy.aiExplainError(this.currentTest.err.message);
//             }
            
//             // Discord: Send failure notification
//             cy.analyzeAndReport(`Failed: ${this.currentTest.title}`);
            
//             // AI: Suggest better selectors if needed
//             cy.aiSuggestSelector('failed element');
//         } else {
//             cy.log('✅ Test Passed Successfully');
//         }
//     });

//     beforeEach(() => {
//         Cypress.on('uncaught:exception', () => false);
//     });

//     it('should find the correct workshop card and click it', () => {
//         cy.visit('https://chitti.app/workshops/');
        
//         // JARVIS: Analyze page visually
//         cy.jarvisAnalyze('Analyzing workshop page - what content is visible?');
        
//         // JARVIS: Verify key elements are visible
//         cy.jarvisVerifyVisible('workshop cards or listings');
        
//         // JARVIS: Monitor for dynamic content
//         cy.jarvisDetectChange('Monitoring page for dynamic content loading');
        
//         // AI: Verify page loaded correctly
//         cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
//             cy.log('🤖 AI Page Analysis:', response);
//         });
//         cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
//             .filter((index, el) => {
//                 const text = el.innerText;
//                 return (
//                     text.includes('CMS Electronics 1 on 1 - Kannada') &&
//                     text.includes('₹299') &&
//                     text.includes('Kannada')
//                 );
//             })
//             .first()
//             .as('CMS4');
//         cy.get('@CMS4')
//             .should('be.visible')
//             .scrollIntoView({ duration: 1500 })
//             .click();
//         cy.wait(5000);
//         cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });
//         cy.wait(5000);
//         cy.get('input[placeholder="Enter the Name"]').type('Jacob Samro', { delay: 20 });
//         cy.wait(1000);
//         cy.get('.iti__flag-container').click();
//         cy.wait(1000);
//         cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
//         cy.wait(1000);
//         cy.get('.iti__flag-container').click();
//         cy.wait(1000);
//         cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
//         cy.wait(1000);
//         cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
//         cy.wait(2000);
//         cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
//         cy.get('select.block').eq(0).select('Grade 8');
//         cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai')
//         cy.get('input[placeholder="Enter your City"]').type('Chennai')
//         cy.wait(2000);
//         cy.get('input[placeholder="Enter your Pincode"]').type('600117')
//         cy.wait(4000);
//         // JARVIS: Verify button is visible
//         cy.jarvisVerifyVisible('Register button');
//         cy.contains('button', 'Register').click();
//         cy.get('iframe[src*="api.razorpay.com"]').should("be.visible");
//         });


//     });