describe('Redirecting on same tab Test', () => {
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

    it('Redirecting on same tab', () => {

        cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

        // Stub window.open to redirect in same tab
        cy.window().then((win) => {
            cy.stub(win, 'open').callsFake((url) => {
                win.location.href = url;
                return win;
            });
        });

        cy.viewport('macbook-16');
        cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
        cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
        // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
        cy.wait(5000);
        // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Workshops button');
        cy.contains('button', 'Workshops').click({ force: true });
        cy.contains('span', 'One-One Workshops').click({ force: true });
        cy.wait(3000);
        
        // Re-stub window.open after navigation to ensure it's active
        cy.window().then((win) => {
            cy.stub(win, 'open').as('windowOpen').callsFake((url) => {
                win.location.href = url;
                return win;
            });
        });
        
        const workshopsToCheck = ['staging test abinesh_sk - 1271', 'Demo - 183'];
        
        // Process only the first found workshop to avoid multiple tabs
        let workshopFound = false;
        
        for (const workshopName of workshopsToCheck) {
            if (workshopFound) break;
            
            cy.get('body').then(($body) => {
                if ($body.text().includes(workshopName) && !workshopFound) {
                    workshopFound = true;
                    cy.log(`Found workshop: ${workshopName}`);
                    
                    cy.contains(workshopName)
                        .should('be.visible')
                        .closest('tr')
                        .within(() => {
                            cy.get('button').last().click({ force: true });
                        });
                    
                    
                    cy.wait(1000);
                    
                    
                    cy.contains('View Registrations')
                        .should('be.visible')
                        .click({ force: true });
                    
                    
                    cy.wait(2000);
                    
                    
                    cy.url().should('include', 'registrations');
                    
                    
                    cy.get('body').should('contain.text', 'Registration');
                    
                    
                    cy.wait(2000);
                    
                    
                    cy.contains('886662')
                        .should('be.visible')
                        .closest('tr')
                        .within(() => {
                            
                            cy.get('button').last().click({ force: true });
                        });
                    
                    
                    cy.wait(1000);
                    
                    
                    cy.contains('Schedule New Session')
                        .should('be.visible')
                        .click({ force: true });
                    
                    cy.log('Clicked Schedule New Session for Registration ID: 886662');
                    
                    
                    cy.wait(2000);
                    cy.get('input[placeholder="Enter the Name"]').type('Testing', { delay: 20 });
                    
                    cy.get('.el-date-editor--datetime input[placeholder="Select date and Time"]')
                        .should('be.visible')
                        .click({ force: true });
                    
                    cy.contains('span', '31').click({ force: true });
                    cy.get('input[placeholder="Select time"]').click({ force: true });
                    cy.get('ul.el-time-spinner__list')
                        .contains('li.el-time-spinner__item', '10 AM')  
                        .scrollIntoView()                               
                        .click({ force: true });                        
                    
                    cy.get('button.el-time-panel__btn.confirm').click({ force: true });
                    cy.get('button.el-picker-panel__link-btn').contains('span', 'OK').parent().click({ force: true });

                    
                    cy.log('Selected date and time for the session');
                    
                    
                    cy.get('input[placeholder="Pick a time"]')
                        .should('be.visible')
                        .click({ force: true });
                    
                    
                    cy.wait(500);
                    
                    
                    cy.get('input[placeholder="Pick a time"]')
                        .clear({ force: true })
                        .type('00:30:00', { force: true })
                        .type('{enter}');
                    
                    cy.log('Selected session duration: 00:30:00');

                    cy.get('ul.el-select-dropdown__list')
                        .contains('li.el-select-dropdown__item', 'Demo Fixed')
                        .scrollIntoView()
                        .click({ force: true });
                    
                
                    cy.wait(1000);
                    
                    // Try different selectors for the description field
                    cy.get('body').then($body => {
                        if ($body.find('textarea[placeholder="Enter the description"]').length > 0) {
                            cy.get('textarea[placeholder="Enter the description"]').type('Testing purpose', { delay: 20 });
                        } else if ($body.find('input[placeholder="Enter the description"]').length > 0) {
                            cy.get('input[placeholder="Enter the description"]').type('Testing purpose', { delay: 20 });
                        } else if ($body.find('[placeholder*="description" i]').length > 0) {
                            cy.get('[placeholder*="description" i]').first().type('Testing purpose', { delay: 20 });
                        } else {
                            cy.log('Description field not found, continuing...');
                        }
                    });
                    
                    cy.contains('span', 'Create New Session').click({ force: true });
                    
                    
                    cy.wait(3000);
                    
                    
                    cy.contains('886662')
                        .should('be.visible')
                        .closest('tr')
                        .within(() => {
                            
                            cy.get('button').last().click({ force: true });
                        });
                    
                   
                    cy.wait(1000);
                    
                    
                    cy.contains('View all Sessions')
                        .should('be.visible')
                        .click({ force: true });
                    
                    cy.log('Clicked View all Sessions for Registration ID: 886662');
                    
                    
                    cy.wait(2000);
                    
                    
                    cy.get('button').each(($btn) => {
                        if ($btn.find('img[src="/platform/icons/vertical-dots.svg"]').length > 0) {
                            cy.wrap($btn).first().click({ force: true });
                            return false; 
                        }
                    });
                    
                    
                    cy.wait(1000);
                    
                    
                    cy.contains('Edit Session')
                        .should('be.visible')
                        .click({ force: true });
                    
                    cy.log('Clicked Edit Session');
                    
                    
                    cy.wait(2000);
                    
                    cy.get('input.el-input__inner')
                        .filter((index, el) => Cypress.$(el).val().includes('Demo Fixed'))
                        .first()
                        .click({ force: true });
                    
                    
                    cy.wait(500);

                    
                    cy.get('ul.el-select-dropdown__list')
                        .contains('li.el-select-dropdown__item', 'Scheduled')
                        .scrollIntoView()
                        .click({ force: true });
                    
                    
                    cy.wait(500);
                    
                    
                    cy.contains('span', 'Save')
                        .should('be.visible')
                        .click({ force: true });
                    
                    cy.log('Clicked Save button');
                    
                    
                    cy.wait(2000);
                    
                    
                    cy.get('div.cursor-pointer')
                        .eq(8) 
                        .click({ force: true });
                    
                    cy.log('Clicked on Scheduled tab');
                    
                    
                    cy.wait(1000);
                    
                    
                    cy.contains('886662').should('be.visible');
                    cy.contains('surya_k@lmes.in').should('be.visible');
                    cy.contains('test 2').should('be.visible');
                    
                    cy.log('Verified: Registration ID 886662, email surya_k@lmes.in, and test 2 are visible');
                    
                } else if (!$body.text().includes(workshopName)) {
                    cy.log(`Workshop not found: ${workshopName}`);
                }
            });
        }

    });
});
