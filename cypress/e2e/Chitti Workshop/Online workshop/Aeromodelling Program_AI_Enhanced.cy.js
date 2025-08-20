describe('Aeromodelling Program - AI Enhanced', () => {
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
        
        // AI: Initialize debugging assistant
        cy.log('🤖 AI Debug Assistant: Initialized for Aeromodelling Program test');
    });
    
    it('should find the correct workshop card and register with AI assistance', () => {
        // Visit workshops page
        cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Is this the Chitti workshops page? How many workshops are visible?')
            .then(aiResponse => {
                cy.log('🤖 AI Page Analysis:', aiResponse);
            });
        
        // JARVIS: Visual verification of page
        cy.jarvisVerifyVisible('workshop cards').then(isVisible => {
            if (isVisible) {
                cy.log('✅ JARVIS: Workshop cards detected visually');
            }
        });
        
        // Find the specific workshop
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
            .then($elements => {
                const found = $elements.filter((index, el) => {
                    const text = el.innerText;
                    return (
                        text.includes('Aeromodelling Program') &&
                        text.includes('Free') &&
                        text.includes('English') &&
                        text.includes('Sunday, August 03, 2025') &&
                        text.includes('Grade 1 to 4') &&
                        text.includes('10:30 AM EST')
                    );
                });
                return cy.wrap(found.first());
            })
            .as('US01');
        
        // AI: Verify correct workshop found
        cy.get('@US01').then($workshop => {
            const workshopText = $workshop.text();
            cy.askGroq(`I found a workshop with text: "${workshopText.substring(0, 200)}". Is this the Aeromodelling Program workshop?`)
                .then(response => {
                    cy.log('🤖 AI Workshop Verification:', response);
                });
        });
        
        // Click on workshop
        cy.get('@US01')
            .should('be.visible')
            .scrollIntoView({ duration: 1500 })
            .click();
        
        cy.wait(5000);
        
        // AI: Analyze workshop details page
        cy.askGroq('What workshop details are shown? Is registration available?')
            .then(response => {
                cy.log('🤖 AI Workshop Details:', response);
                
                // Check if registration is available
                if (response.toLowerCase().includes('closed') || 
                    response.toLowerCase().includes('full')) {
                    cy.log('⚠️ AI Warning: Registration might be closed');
                    cy.jarvisAnalyze('Workshop registration availability check');
                }
            });
        
        // JARVIS: Visual check for Register button
        cy.jarvisVerifyVisible('Register Now button').then(isVisible => {
            if (!isVisible) {
                cy.log('⚠️ JARVIS: Register button not visually detected');
                cy.jarvisAnalyze('Looking for registration options');
            }
        });
        
        // Click Register Now
        cy.contains('button', 'Register Now')
            .scrollIntoView({ duration: 1500 })
            .click({ force: true, multiple: true });
        
        cy.wait(5000);
        
        // AI: Verify registration form loaded
        cy.askGroq('Is a registration form visible? What fields need to be filled?')
            .then(response => {
                cy.log('🤖 AI Form Analysis:', response);
            });
        
        // Fill registration form
        cy.get('input[type="text"]').type('Jacob Samro', { delay: 20 });
        cy.wait(1000);
        
        // Handle country selection
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
        cy.wait(1000);
        
        // Fill phone number
        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
        cy.wait(2000);
        
        // Fill email
        cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });
        
        // AI: Verify form fields are filled correctly
        cy.askGroq('Are all required form fields filled? Any validation errors showing?')
            .then(response => {
                cy.log('🤖 AI Form Validation:', response);
                
                if (response.toLowerCase().includes('error')) {
                    cy.jarvisAnalyze('Form validation error analysis');
                }
            });
        
        // Select grade
        cy.get('select.block').eq(0).select('Class 8');
        
        // Select timezone
        cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');
        
        // Select time slot
        cy.contains('span', '12:30 PM').click({ force: true });
        
        // JARVIS: Final form check before submission
        cy.jarvisAnalyze('Pre-submission form validation - all fields filled correctly?');
        
        // AI: Verify ready to submit
        cy.askGroq('Is the registration form complete and ready to submit?')
            .then(response => {
                cy.log('🤖 AI Pre-Submit Check:', response);
            });
        
        // Submit registration
        cy.contains('p', 'Register').click();
        
        // AI: Verify registration success
        cy.askGroq('Did the registration succeed? What message is displayed?')
            .then(response => {
                cy.log('🤖 AI Registration Result:', response);
                
                if (response.toLowerCase().includes('success')) {
                    cy.log('✅ Registration successful!');
                    // Send success notification to Discord
                    cy.discordSuccess(`Aeromodelling Program registration successful for Jacob Samro`);
                } else if (response.toLowerCase().includes('error') || 
                           response.toLowerCase().includes('failed')) {
                    cy.log('❌ Registration failed!');
                    // Analyze the failure
                    cy.jarvisAnalyze('Registration failure - what went wrong?');
                    // Send failure report to Discord
                    cy.analyzeAndReport('Aeromodelling registration failed');
                }
            });
        
        // JARVIS: Visual confirmation of success
        cy.jarvisVerifyVisible('Registration Successful message').then(isSuccess => {
            if (isSuccess) {
                cy.log('✅ JARVIS: Success message confirmed visually');
            } else {
                cy.log('⚠️ JARVIS: Success message not detected visually');
                cy.jarvisAnalyze('Post-registration state analysis');
            }
        });
        
        // Verify success message exists
        cy.contains('div', ' Registration Successful ').should('exist');
    });
    
    afterEach(function() {
        // AI: Analyze test results
        if (this.currentTest.state === 'failed') {
            cy.log('❌ Test failed - activating AI debugging');
            
            // AI debugs the failure
            cy.aiDebugFailure();
            
            // JARVIS visual analysis
            cy.jarvisAnalyze(`Test failure analysis for: ${this.currentTest.title}`);
            
            // Get AI explanation of error
            cy.aiExplainError(this.currentTest.err?.message || 'Unknown error');
            
            // Send detailed report to Discord
            cy.analyzeAndReport(`Aeromodelling test failed: ${this.currentTest.title}`);
            
            // Suggest fixes
            cy.aiSuggestSelector('registration form elements');
        } else {
            cy.log('✅ Test passed successfully');
            // Optional: Send success to Discord
            // cy.discordInfo('Test Passed', `Aeromodelling Program test completed successfully`);
        }
    });
});