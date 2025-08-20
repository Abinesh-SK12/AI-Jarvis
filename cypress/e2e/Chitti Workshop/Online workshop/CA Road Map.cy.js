// // describe('Login Test', () => {
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


// //   beforeEach(() => {
// //     Cypress.on('uncaught:exception', (err, runnable) => {
// //       return false;
// //     });
// //   });

// //   it('should log in with valid credentials', () => {
// //     cy.visit('https://chitti.app/workshops/');
        
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

// //     cy.get('img[alt="CA Road Map"][src="https://hubble.cdn.chittiapp.com/cdn_uploads/26f5b1f0-25c0-11f0-90c4-0b2e1f25bbb0_ca-roadmap-thumbnail.jpeg"]')
// //       .scrollIntoView({duration: 1500})
// //       .should('be.visible');

// //     cy.wait(2000);

// //     cy.contains('h1', 'CA Road Map')
// //       .should('exist')
// //       .then(($heading) => {
// //         cy.wrap($heading)
// //           .parent()
// //           .within(() => {
// //             cy.contains('Free')
// //               .should('exist');
// //           });
// //       });

// //     cy.contains('div', 'Free').should('exist');

// //     cy.contains('h1', 'CA Road Map')
// //       .should('exist')
// //       .click({ force: true });

// //     cy.wait(2000);

// //     cy.contains('span', ' Register Now for Free ')
// //       .should('exist')
// //       .click({ force: true });

// //     cy.wait(2000);

// //     // JARVIS: Analyze form fields
//         cy.jarvisAnalyze('What form fields need to be filled?');
//         cy.get('input[type="text"]').type('Jacob');
// //     cy.wait(2000);

// //     // Select United States
// //     cy.get('.iti__flag-container').click();
// //     cy.wait(2000);
// //     cy.get('.iti__country-list')
// //       .contains('li', 'United States')
// //       .click({ force: true });

// //     cy.wait(2000);

// //     // Switch to India
// //     cy.get('.iti__flag-container').click();
// //     cy.wait(2000);
// //     cy.get('.iti__flag-container')
// //       .contains('li', 'India')
// //       .click({ force: true });

// //     cy.wait(2000);

// //     cy.get('input[type="tel"]').type('9884226399');
// //     cy.wait(2000);

// //     cy.get('input[type="email"]').type('dev@lmes.in');

// //     cy.get('select.block.rounded-\\[14px\\].text-\\[\\#2A2A3B\\].cursor-pointer')
// //       .select('Repeater');

// //     cy.get('.flex.font-normal').click({ force: true });
// //     cy.get('.flex.justify-center.items-center.text-sm.font-bold.text-white')
// //       .click({ force: true });

// //     cy.contains('div', ' Registration Successful ')
// //       .should('exist');
// //   });

// // });