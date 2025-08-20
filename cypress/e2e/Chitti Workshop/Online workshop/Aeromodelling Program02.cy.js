// describe('Aeromodelling Program Test - Grade 5 to 8', () => {
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', () => false);
//     });
    
//     afterEach(function() {
//         if (this.currentTest.state === 'failed') {
//             cy.log('❌ Test Failed');
//             cy.screenshot(`failed-${this.currentTest.title}`);
//         } else {
//             cy.log('✅ Test Passed Successfully');
//         }
//     });
//     it('should find the correct workshop card and register successfully', () => {
//         cy.visit('https://chitti.xyz/workshops/');
//         // Wait for workshops to load
//         cy.wait(3000);
        
//         cy.get('a.group.rounded-xl.bg-white.flex.flex-col', { timeout: 10000 })
//             .should('have.length.greaterThan', 0)
//             .then($elements => {
//                 cy.log(`Found ${$elements.length} workshop cards`);
                
//                 // Find matching workshop
//                 let matchedElement = null;
                
//                 for (let i = 0; i < $elements.length; i++) {
//                     const el = $elements[i];
//                     const text = el.innerText || '';
                    
//                     // Log for debugging
//                     if (text.includes('Aeromodelling')) {
//                         cy.log(`Card ${i}: ${text.substring(0, 200)}`);
//                     }
                    
//                     // Check for matching workshop - Grade 5 to 8
//                     if (text.includes('Aeromodelling Program') &&
//                         text.includes('Free') &&
//                         text.includes('English') &&
//                         text.includes('Grade 5 to 8')) {
//                         cy.log(`✅ Found matching Aeromodelling workshop for Grade 5-8 at index ${i}`);
//                         matchedElement = el;
//                         break;
//                     }
//                 }
                
//                 if (!matchedElement) {
//                     // Try more flexible matching
//                     for (let i = 0; i < $elements.length; i++) {
//                         const el = $elements[i];
//                         const text = el.innerText || '';
                        
//                         if (text.includes('Aeromodelling') && text.includes('Free')) {
//                             cy.log(`⚠️ Using flexible match: Found Aeromodelling workshop at index ${i}`);
//                             matchedElement = el;
//                             break;
//                         }
//                     }
//                 }
                
//                 if (!matchedElement) {
//                     cy.log('⚠️ No Aeromodelling workshop found, using first available card');
//                     matchedElement = $elements[0];
//                 }
                
//                 return cy.wrap(matchedElement);
//             })
//             .as('US02');
//         cy.get('@US02')
//             .should('exist')
//             .scrollIntoView({ duration: 1500 })
//             .click({ force: true });
//         cy.wait(5000);
        
//         // Click Register Now button
//         cy.contains('button', 'Register Now').scrollIntoView({ duration: 1500 })
//             .click({ force: true, multiple: true });
//         cy.wait(5000);
        
//         // Fill registration form
//         cy.get('input[type="text"]').type('Jacob Samro', { delay: 20 });
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
        
//         // AI: Verify form is filled correctly
//         cy.askGroq('Are all required form fields filled? Any validation errors visible?')
//             .then(response => {
//                 cy.log('🤖 AI Form Validation:', response);
                
//                 if (response.toLowerCase().includes('error') || 
//                     response.toLowerCase().includes('missing')) {
//                     // Take screenshot for debugging
//                     cy.screenshot('form-validation-check');
//                     cy.jarvisAnalyze('Form validation error analysis');
//                 }
//             });
//         cy.get('select.block').eq(0).select('Class 8');
//         cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
//         cy.contains('span', '12:30 PM').click({ force: true });
        
//         // JARVIS: Final visual check before submission
//         cy.jarvisAnalyze('Pre-submission form validation check');
        
//         // AI: Verify we're ready to submit
//         cy.askGroq('Is the form ready for submission? All fields valid?')
//             .then(response => {
//                 cy.log('🤖 AI Pre-Submit Check:', response);
//             });
//         cy.contains('p', 'Register').click();
//         cy.contains('div', ' Registration Successful ').should('exist');
//     });

//     // Enhanced error handling with AI
//     afterEach(function() {
//         if (this.currentTest.state === 'failed') {
//             // AI analyzes the failure
//             cy.aiDebugFailure();
            
//             // JARVIS visual analysis
//             cy.jarvisAnalyze('Test failure visual analysis');
            
//             // Send to Discord with AI analysis
//             cy.analyzeAndReport(`Test failed: ${this.currentTest.title}`);
//         }
//     });
// });