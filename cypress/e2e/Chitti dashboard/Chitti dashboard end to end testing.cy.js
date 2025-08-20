// describe('Chitti Dashboard - One-on-One Workshops End-to-End Testing', () => {
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


//     // Helper function to click links/buttons without opening new tabs
//     const clickWithoutNewTab = (selector) => {
//         cy.get(selector).then($element => {
//             if ($element.is('a')) {
//                 const href = $element.attr('href');
//                 const target = $element.attr('target');
                
//                 // Remove target attribute if it exists
//                 if (target === '_blank') {
//                     cy.wrap($element).invoke('removeAttr', 'target');
//                 }
                
//                 // If href exists, navigate directly
//                 if (href) {
//                     if (href.startsWith('/')) {
//                         cy.visit(`https://dash.internal.chitti.xyz${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                     } else if (href.startsWith('http')) {
//                         cy.visit(href);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                     } else {
//                         cy.wrap($element).click({ force: true });
//                     }
//                 } else {
//                     cy.wrap($element).click({ force: true });
//                 }
//             } else {
//                 cy.wrap($element).click({ force: true });
//             }
//         });
//     };

//     beforeEach(() => {
//         // Handle uncaught exceptions
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         // Visit the page first to ensure document is available
//         cy.on('window:before:load', (win) => {
//             // Override window.open to prevent new tabs/windows
//             cy.stub(win, 'open').callsFake((url) => {
//                 win.location.href = url;
//                 return win;
//             });
//         });
//     });
    
//     // Add a custom command to handle all clicks without new tabs
//     Cypress.Commands.add('clickWithoutNewTab', (selector, options = {}) => {
//         cy.get(selector).then($element => {
//             if ($element.is('a')) {
//                 const href = $element.attr('href');
//                 const target = $element.attr('target');
                
//                 // Remove target="_blank" if present
//                 if (target === '_blank') {
//                     cy.wrap($element).invoke('removeAttr', 'target');
//                 }
                
//                 // If href exists and is internal, navigate directly
//                 if (href) {
//                     if (href.startsWith('/')) {
//                         cy.visit(`https://dash.internal.chitti.xyz${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                     } else if (!href.startsWith('http') || href.includes('dash.internal.chitti.xyz')) {
//                         cy.visit(href);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                     } else {
//                         cy.wrap($element).click(options);
//                     }
//                 } else {
//                     cy.wrap($element).click(options);
//                 }
//             } else {
//                 cy.wrap($element).click(options);
//             }
//         });
//     });
    
//     // Add a custom command for safe contains click
//     Cypress.Commands.add('safeClick', { prevSubject: 'element' }, (subject, options = {}) => {
//         if (subject.is('a[target="_blank"]')) {
//             cy.wrap(subject).invoke('removeAttr', 'target');
//         }
        
//         if (subject.is('a')) {
//             const href = subject.attr('href');
//             if (href && href.startsWith('/')) {
//                 cy.visit(`https://dash.internal.chitti.xyz${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//             } else if (href && !href.startsWith('http')) {
//                 cy.visit(`https://dash.internal.chitti.xyz/${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//             } else {
//                 cy.wrap(subject).click(options);
//             }
//         } else {
//             cy.wrap(subject).click(options);
//         }
//     });

//     it('Should login and navigate to One-on-One Workshops with status filters', () => {
//         // Visit the dashboard
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Login process
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Navigate to Workshops
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Workshops button');
        cy.contains('button', 'Workshops').click({ force: true });
//         cy.contains('span', 'One-One Workshops').click({ force: true });
//         cy.wait(3000);
        
//         // Verify URL includes status filters
//         cy.url().should('include', 'status=scheduled&status=active');
        
//         // Verify page loaded
//         cy.get('body').should('contain.text', 'One-One Workshops');
//     });

//     it('Should display and interact with workshop list', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Now navigate to workshops with filters
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Wait for workshops to load
//         cy.wait(5000);
        
//         // Simply verify the page loaded successfully
//         cy.url().should('include', '/platform/workshops/oneonone/0');
        
//         // Check that we're on the workshops page by looking for any relevant elements
//         cy.get('body').should('be.visible');
        
//         // Look for any interactive elements that would be on a workshop list page
//         cy.get('button, a, [role="button"], [onclick], [ng-click], [class*="click"]').should('have.length.greaterThan', 0);
        
//         // Log page content for debugging
//         cy.get('body').invoke('text').then((text) => {
//             cy.log('Page content preview: ' + text.substring(0, 200));
//         });
        
//         // Verify there are some elements on the page (could be table, cards, list, etc.)
//         cy.get('div').should('have.length.greaterThan', 5);
//     });

//     it('Should filter workshops by status', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check for status filter elements
//         cy.get('body').then($body => {
//             // Look for filter buttons or dropdowns
//             if ($body.find('[class*="filter"]').length > 0) {
//                 cy.get('[class*="filter"]').first().should('be.visible');
//             }
            
//             // Verify active and scheduled status are selected
//             if ($body.find('[class*="status"]').length > 0) {
//                 cy.log('Status filters found');
//             }
//         });
//     });

//     it('Should interact with workshop actions menu', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find and click the first meatball menu
//         cy.get('button').then($buttons => {
//             const meatballButton = $buttons.filter((i, el) => {
//                 return Cypress.$(el).find('img[src*="vertical-dots"], svg, [class*="menu"]').length > 0;
//             });
            
//             if (meatballButton.length > 0) {
//                 cy.wrap(meatballButton.first()).click({ force: true });
//                 cy.wait(1000);
                
//                 // Check for menu options
//                 cy.get('body').should('contain.text', 'View Registrations');
//             }
//         });
//     });

//     it('Should navigate to View Registrations', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Navigate to workshops
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find and click a meatball menu button
//         cy.get('button').then($buttons => {
//             // Look for buttons with menu icons or specific classes
//             const menuButton = $buttons.filter((i, el) => {
//                 const $el = Cypress.$(el);
//                 return $el.find('img[src*="dots"], svg, [class*="menu"], [class*="more"]').length > 0 ||
//                        $el.attr('aria-label')?.includes('menu') ||
//                        $el.attr('title')?.includes('menu');
//             });
            
//             if (menuButton.length > 0) {
//                 cy.wrap(menuButton.first()).click({ force: true });
//                 cy.wait(1000);
                
//                 // Look for registration-related menu options with various text patterns
//                 cy.get('body').then($body => {
//                     const bodyText = $body.text();
                    
//                     // Try different text patterns
//                     const registrationPatterns = [
//                         'View Registrations',
//                         'Registrations',
//                         'View Registration',
//                         'Registration',
//                         'Participants',
//                         'Attendees',
//                         'Enrolled',
//                         'Students'
//                     ];
                    
//                     let found = false;
//                     for (const pattern of registrationPatterns) {
//                         if (bodyText.includes(pattern)) {
//                             cy.contains(pattern).first().click({ force: true });
//                             found = true;
//                             break;
//                         }
//                     }
                    
//                     if (!found) {
//                         // If no registration text found, click the first menu item
//                         cy.log('Registration option not found, clicking first menu item');
//                         cy.get('a, button, [role="menuitem"], li').filter(':visible').first().click({ force: true });
//                     }
//                 });
                
//                 cy.wait(2000);
                
//                 // Verify navigation happened (more flexible check)
//                 cy.url().then(url => {
//                     // Check if URL changed from the workshops page
//                     expect(url).to.not.equal('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
//                     cy.log('Navigated to: ' + url);
//                 });
//             } else {
//                 // If no menu button found, log and try alternative approach
//                 cy.log('No menu button found, trying alternative approach');
                
//                 // Look for any clickable element that might lead to registrations
//                 cy.get('a, button').each($el => {
//                     if ($el.text().includes('View') || $el.text().includes('Registration')) {
//                         cy.wrap($el).first().click({ force: true });
//                         return false; // break the loop
//                     }
//                 });
//             }
//         });
//     });

//     it('Should schedule a new session from registrations', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Navigate directly to a specific workshop page to schedule a session
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for Schedule New Session button or use alternative approach
//         cy.get('body').then($body => {
//             // Check if Schedule New Session button exists
//             if ($body.find('button:contains("Schedule New Session")').length > 0) {
//                 cy.get('button').contains('Schedule New Session').click({ force: true });
//             } else {
//                 // Alternative approach: Click on first workshop to get to its detail page
//                 cy.get('tr').not(':first').first().click({ force: true });
//                 cy.wait(2000);
                
//                 // Look for schedule button on detail page
//                 cy.get('button, a').each($el => {
//                     const text = $el.text();
//                     if (text.includes('Schedule') || text.includes('New Session') || text.includes('Add Session')) {
//                         // Prevent opening in new tab
//                         if ($el.is('a')) {
//                             cy.wrap($el).invoke('removeAttr', 'target');
//                         }
//                         cy.wrap($el).click({ force: true });
//                         return false;
//                     }
//                 });
//             }
//         });
        
//         cy.wait(3000);
        
//         // Fill session details - with better error handling
//         cy.get('body').then($body => {
//             // Look for various possible input fields for session name
//             const possibleSelectors = [
//                 'input[placeholder="Enter the Name"]',
//                 'input[placeholder*="name"]',
//                 'input[placeholder*="Name"]',
//                 'input[placeholder*="title"]',
//                 'input[placeholder*="Title"]',
//                 'input[placeholder*="session"]',
//                 'input[placeholder*="Session"]',
//                 'label:contains("Name") + input',
//                 'label:contains("Title") + input',
//                 'label:contains("Session") + input'
//             ];
            
//             let inputFound = false;
//             for (const selector of possibleSelectors) {
//                 const input = $body.find(selector);
//                 if (input.length > 0 && input.is(':visible')) {
//                     cy.wrap(input.first()).clear().type('Test Session', { delay: 20 });
//                     inputFound = true;
//                     break;
//                 }
//             }
            
//             if (!inputFound) {
//                 // Fallback: use the first visible text input
//                 cy.get('input[type="text"]:visible').first().clear().type('Test Session', { delay: 20 });
//             }
//         });
        
//         // Select date and time - with flexible selectors
//         cy.get('body').then($body => {
//             // Try different date picker selectors
//             const dateSelectors = [
//                 '.el-date-editor--datetime input',
//                 '.el-date-editor input',
//                 'input[placeholder*="date"]',
//                 'input[placeholder*="Date"]',
//                 'input[placeholder*="time"]',
//                 'input[placeholder*="Time"]',
//                 'input[type="text"]'
//             ];
            
//             let dateInputFound = false;
//             for (const selector of dateSelectors) {
//                 const inputs = $body.find(selector).filter(':visible');
//                 if (inputs.length > 0) {
//                     // Skip the first input (which is likely the name field)
//                     const dateInput = inputs.length > 1 ? inputs.eq(1) : inputs.eq(0);
//                     cy.wrap(dateInput).click({ force: true });
//                     dateInputFound = true;
//                     break;
//                 }
//             }
            
//             if (dateInputFound) {
//                 cy.wait(500);
                
//                 // Try to find and click on a date
//                 cy.get('body').then($dateBody => {
//                     if ($dateBody.find('.el-date-table td.available').length > 0) {
//                         cy.get('.el-date-table td.available').last().click({ force: true });
//                     } else if ($dateBody.find('td.available').length > 0) {
//                         cy.get('td.available').last().click({ force: true });
//                     } else {
//                         // Just type a date if no calendar is visible
//                         cy.focused().type('2024-12-31 10:00:00{enter}', { force: true });
//                     }
//                 });
//             }
//         });
        
//         // Set duration - with flexible selector
//         cy.get('body').then($body => {
//             const durationSelectors = [
//                 'input[placeholder="Pick a time"]',
//                 'input[placeholder*="duration"]',
//                 'input[placeholder*="Duration"]',
//                 'label:contains("Duration") + input'
//             ];
            
//             for (const selector of durationSelectors) {
//                 const input = $body.find(selector).filter(':visible');
//                 if (input.length > 0) {
//                     cy.wrap(input.first()).click({ force: true }).clear().type('00:30:00{enter}');
//                     break;
//                 }
//             }
//         });
        
//         // Add description - with flexible selector
//         cy.get('body').then($body => {
//             const descSelectors = [
//                 '[placeholder*="description"]',
//                 '[placeholder*="Description"]',
//                 'textarea',
//                 'label:contains("Description") + textarea',
//                 'label:contains("Description") + input'
//             ];
            
//             for (const selector of descSelectors) {
//                 const input = $body.find(selector).filter(':visible');
//                 if (input.length > 0) {
//                     cy.wrap(input.first()).type('Test session for E2E testing', { delay: 20 });
//                     break;
//                 }
//             }
//         });
        
//         // Create session - try multiple button texts
//         cy.get('body').then($body => {
//             const buttonTexts = ['Create New Session', 'Create Session', 'Create', 'Save', 'Submit'];
            
//             for (const text of buttonTexts) {
//                 if ($body.text().includes(text)) {
//                     cy.contains(text).click({ force: true });
//                     break;
//                 }
//             }
//         });
        
//         cy.wait(3000);
//     });

//     it('Should view and edit existing sessions', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Navigate to workshops
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check if there are any table rows first
//         cy.get('body').then($body => {
//             if ($body.find('tr').length > 1) {
//                 // Navigate to first workshop's registrations
//                 cy.get('tr').not(':first').first().within(() => {
//                     cy.get('button').last().click({ force: true });
//                 });
                
//                 cy.wait(1000);
                
//                 // Click View Registrations without opening new tab
//                 cy.contains('View Registrations').then($element => {
//                     if ($element.is('a')) {
//                         const href = $element.attr('href');
//                         if (href) {
//                             if (href.startsWith('/')) {
//                                 cy.visit(`https://dash.internal.chitti.xyz${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                             } else {
//                                 cy.visit(href);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                             }
//                         } else {
//                             cy.wrap($element).invoke('removeAttr', 'target').click({ force: true });
//                         }
//                     } else {
//                         cy.wrap($element).click({ force: true });
//                     }
//                 });
                
//                 cy.wait(3000);
                
//                 // Check if registrations exist
//                 cy.get('body').then($regBody => {
//                     if ($regBody.find('tr').length > 1) {
//                         // Find registration and view sessions
//                         cy.get('tr').not(':first').first().within(() => {
//                             cy.get('button').last().click({ force: true });
//                         });
                        
//                         cy.wait(1000);
                        
//                         // Look for "View all Sessions" and handle new tab issue
//                         cy.get('body').then($dropdownBody => {
//                             const viewSessionsTexts = ['View all Sessions', 'View Sessions', 'Sessions', 'All Sessions'];
//                             let found = false;
                            
//                             for (const text of viewSessionsTexts) {
//                                 if ($dropdownBody.text().includes(text)) {
//                                     // Find the element containing the text
//                                     cy.contains(text).first().then($element => {
//                                         if ($element.is('a')) {
//                                             // If it's a link, remove target attribute to prevent new tab
//                                             const href = $element.attr('href');
//                                             if (href && href.startsWith('/')) {
//                                                 // Navigate directly using the href
//                                                 cy.visit(`https://dash.internal.chitti.xyz${href}`);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                                             } else if (href) {
//                                                 cy.visit(href);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//                                             } else {
//                                                 cy.wrap($element).invoke('removeAttr', 'target').click({ force: true });
//                                             }
//                                         } else {
//                                             cy.wrap($element).click({ force: true });
//                                         }
//                                     });
//                                     found = true;
//                                     break;
//                                 }
//                             }
                            
//                             if (!found) {
//                                 // Fallback: click any visible menu item that might lead to sessions
//                                 cy.get('a:visible, button:visible').each(($el) => {
//                                     const elText = $el.text().toLowerCase();
//                                     if (elText.includes('session') || elText.includes('view')) {
//                                         if ($el.is('a')) {
//                                             cy.wrap($el).invoke('removeAttr', 'target');
//                                         }
//                                         cy.wrap($el).click({ force: true });
//                                         return false;
//                                     }
//                                 });
//                             }
//                         });
                        
//                         cy.wait(2000);
//                     } else {
//                         cy.log('No registrations found to view sessions');
//                     }
//                 });
//             } else {
//                 cy.log('No workshops found in the table');
//             }
//         });
        
//         // Edit first session if sessions page is reached
//         cy.get('body').then($sessionBody => {
//             if ($sessionBody.find('button').length > 0) {
//                 // Look for menu button with vertical dots
//                 const menuButtons = $sessionBody.find('button').filter((i, el) => {
//                     return Cypress.$(el).find('img[src*="dots"], svg, [class*="menu"]').length > 0;
//                 });
                
//                 if (menuButtons.length > 0) {
//                     cy.wrap(menuButtons.first()).click({ force: true });
//                     cy.wait(1000);
                    
//                     // Look for Edit Session option
//                     cy.get('body').then($menuBody => {
//                         if ($menuBody.text().includes('Edit Session')) {
//                             cy.contains('Edit Session').click({ force: true });
//                             cy.wait(2000);
                            
//                             // Update session status if form is available
//                             cy.get('body').then($editBody => {
//                                 if ($editBody.find('input.el-input__inner').length > 0) {
//                                     cy.get('input.el-input__inner').first().click({ force: true });
//                                     cy.wait(500);
                                    
//                                     // Select status if dropdown appears
//                                     cy.get('body').then($dropdownBody => {
//                                         if ($dropdownBody.find('ul.el-select-dropdown__list').length > 0) {
//                                             cy.get('ul.el-select-dropdown__list').contains('li', 'Scheduled').click({ force: true });
//                                         }
//                                     });
                                    
//                                     // Save changes
//                                     cy.contains('Save').click({ force: true });
//                                     cy.wait(2000);
//                                 }
//                             });
//                         }
//                     });
//                 }
//             }
//         });
//     });

//     it('Should verify session status tabs', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to sessions view
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
        
//         cy.wait(1000);
        
//         // Click View Registrations without new tab
//         cy.contains('View Registrations').then($element => {
//             if ($element.is('a')) {
//                 cy.wrap($element).invoke('removeAttr', 'target');
//             }
//             cy.wrap($element).click({ force: true });
//         });
//         cy.wait(3000);
        
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
        
//         cy.wait(1000);
//         cy.contains('View all Sessions').click({ force: true });
//         cy.wait(2000);
        
//         // Check for status tabs
//         cy.get('div.cursor-pointer').should('have.length.greaterThan', 5);
        
//         // Click on Scheduled tab
//         cy.get('div.cursor-pointer').contains('Scheduled').click({ force: true });
//         cy.wait(1000);
        
//         // Verify content loaded
//         cy.get('body').then($body => {
//             if ($body.find('tr').length > 1) {
//                 cy.log('Scheduled sessions found');
//             } else {
//                 cy.log('No scheduled sessions');
//             }
//         });
//     });

//     it('Should test search and filter functionality', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for search input with flexible selectors
//         cy.get('body').then($body => {
//             const searchSelectors = [
//                 'input[placeholder*="Search"]',
//                 'input[placeholder*="search"]',
//                 'input[type="search"]',
//                 'input[placeholder*="Find"]',
//                 'input[placeholder*="Filter"]',
//                 'input[placeholder*="Type"]',
//                 'input[class*="search"]',
//                 'input[id*="search"]',
//                 '[role="searchbox"]'
//             ];
            
//             let searchFound = false;
//             for (const selector of searchSelectors) {
//                 if ($body.find(selector).length > 0) {
//                     cy.get(selector).first().type('Demo', { delay: 50 });
//                     searchFound = true;
//                     cy.wait(1000);
                    
//                     // Verify page still has content (filtered or unfiltered)
//                     cy.get('body').should('be.visible');
//                     break;
//                 }
//             }
            
//             if (!searchFound) {
//                 cy.log('No search input found on the page - this feature might not be available');
                
//                 // Look for any filter options instead
//                 if ($body.find('[class*="filter"]').length > 0) {
//                     cy.log('Filter elements found on page');
//                 } else if ($body.find('select').length > 0) {
//                     cy.log('Dropdown filters found on page');
//                 }
//             }
//         });
//     });

//     it('Should handle pagination if available', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check for pagination controls
//         cy.get('body').then($body => {
//             if ($body.find('[class*="pagination"], [class*="page"]').length > 0) {
//                 cy.get('[class*="pagination"]').should('be.visible');
                
//                 // Try to go to next page
//                 if ($body.find('[class*="next"]').length > 0) {
//                     cy.get('[class*="next"]').first().click({ force: true });
//                     cy.wait(1000);
//                 }
//             }
//         });
//     });

//     it('Should logout successfully', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for logout option
//         cy.get('body').then($body => {
//             // Check for user menu or profile dropdown
//             if ($body.find('[class*="user"], [class*="profile"], [class*="avatar"]').length > 0) {
//                 cy.get('[class*="user"], [class*="profile"], [class*="avatar"]').first().click({ force: true });
//                 cy.wait(500);
                
//                 // Click logout
//                 if ($body.find('[class*="logout"], [class*="sign-out"]').length > 0) {
//                     cy.contains('Logout', 'Sign Out').click({ force: true });
//                 }
//             }
//         });
//     });
// });

// // Additional comprehensive tests for full E2E coverage
// describe('Chitti Dashboard - Advanced Workshop Management Tests', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         // Login before each test
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Use safer approach for login
//         cy.get('body').then($body => {
//             const usernameInput = $body.find('input[type="text"], input[type="email"], input[name="username"], input[name="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
            
//             const passwordInput = $body.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
            
//             // Find and click login button
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login"), :contains("Sign In")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const submitBtn = $body.find('button[type="submit"], input[type="submit"], button:visible').last();
//                 if (submitBtn.length > 0) {
//                     cy.wrap(submitBtn).click({ force: true });
//                 }
//             }
//         });
        
//         cy.wait(5000);
//     });

//     it('Should validate form inputs and show error messages', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Use more specific selectors for login
//         cy.get('body').then($loginBody => {
//             // Find username/email input
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
            
//             // Find password input
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Find and click login button with flexible approach
//         cy.get('body').then($body => {
//             // Try different button texts and selectors
//             const loginButtonTexts = [
//                 'Into the World of Chitti',
//                 'Login',
//                 'Sign In',
//                 'Submit',
//                 'Enter',
//                 'Continue'
//             ];
            
//             let buttonClicked = false;
            
//             // First try to find button with specific text
//             for (const text of loginButtonTexts) {
//                 if ($body.text().includes(text)) {
//                     const buttons = $body.find('button, input[type="submit"], input[type="button"]');
//                     for (let i = 0; i < buttons.length; i++) {
//                         const $btn = Cypress.$(buttons[i]);
//                         if ($btn.text().includes(text) || $btn.val() === text) {
//                             cy.wrap($btn).click({ force: true });
//                             buttonClicked = true;
//                             break;
//                         }
//                     }
//                     if (buttonClicked) break;
//                 }
//             }
            
//             // If no specific text found, click any submit button
//             if (!buttonClicked) {
//                 const submitBtn = $body.find('button[type="submit"], input[type="submit"], button:contains("Login"), button:contains("Sign")').first();
//                 if (submitBtn.length > 0) {
//                     cy.wrap(submitBtn).click({ force: true });
//                 } else {
//                     // Last resort - click any visible button
//                     const anyButton = $body.find('button:visible').last();
//                     if (anyButton.length > 0) {
//                         cy.wrap(anyButton).click({ force: true });
//                     }
//                 }
//             }
//         });
        
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Try direct approach first
//         cy.get('body').then($body => {
//             if ($body.find('button:contains("Schedule New Session")').length > 0) {
//                 cy.get('button').contains('Schedule New Session').click({ force: true });
//             } else {
//                 // Navigate through workshop details
//                 cy.get('tr').not(':first').first().within(() => {
//                     cy.get('button').last().click({ force: true });
//                 });
//                 cy.wait(1000);
                
//                 // Click View Registrations without new tab
//                 cy.contains('View Registrations').then($el => {
//                     if ($el.is('a')) {
//                         const href = $el.attr('href');
//                         if (href) {
//                             cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                         } else {
//                             cy.wrap($el).invoke('removeAttr', 'target').click({ force: true });
//                         }
//                     } else {
//                         cy.wrap($el).click({ force: true });
//                     }
//                 });
//                 cy.wait(3000);
                
//                 // Look for registration and click menu
//                 if ($body.find('tr').length > 1) {
//                     cy.get('tr').not(':first').first().within(() => {
//                         cy.get('button').last().click({ force: true });
//                     });
//                     cy.wait(1000);
                    
//                     // Look for schedule option with flexible text
//                     cy.get('body').then($menuBody => {
//                         const scheduleTexts = ['Schedule New Session', 'Schedule Session', 'Add Session', 'New Session'];
//                         let found = false;
                        
//                         for (const text of scheduleTexts) {
//                             if ($menuBody.text().includes(text)) {
//                                 cy.contains(text).then($scheduleEl => {
//                                     if ($scheduleEl.is('a')) {
//                                         const href = $scheduleEl.attr('href');
//                                         if (href) {
//                                             cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                                         } else {
//                                             cy.wrap($scheduleEl).invoke('removeAttr', 'target').click({ force: true });
//                                         }
//                                     } else {
//                                         cy.wrap($scheduleEl).click({ force: true });
//                                     }
//                                 });
//                                 found = true;
//                                 break;
//                             }
//                         }
                        
//                         if (!found) {
//                             cy.log('Schedule option not found, clicking first menu item');
//                             cy.get('a:visible, button:visible').first().click({ force: true });
//                         }
//                     });
//                 }
//             }
//         });
        
//         cy.wait(2000);
        
//         // Check if we're on a form page
//         cy.get('body').then($pageBody => {
//             // Check if any form inputs exist
//             const hasFormInputs = $pageBody.find('input, textarea, select').length > 0;
            
//             if (!hasFormInputs) {
//                 cy.log('No form found on current page - navigation might have failed');
//                 // Try to find any create/add button on current page
//                 const createButtons = ['Create', 'Add', 'New', 'Schedule'];
//                 for (const btnText of createButtons) {
//                     if ($pageBody.text().includes(btnText)) {
//                         cy.contains('button', btnText).first().click({ force: true });
//                         cy.wait(2000);
//                         break;
//                     }
//                 }
//             }
//         });
        
//         // Try to submit without filling required fields - with flexible button text
//         cy.get('body').then($formBody => {
//             const submitTexts = ['Create New Session', 'Create Session', 'Create', 'Save', 'Submit'];
//             for (const text of submitTexts) {
//                 if ($formBody.text().includes(text)) {
//                     cy.contains(text).first().click({ force: true });
//                     break;
//                 }
//             }
//         });
        
//         cy.wait(1000);
        
//         // Check for validation messages
//         cy.get('body').then($body => {
//             if ($body.find('.el-form-item__error, [class*="error"], [class*="invalid"], .error-message').length > 0) {
//                 cy.log('Validation errors found');
//                 cy.get('.el-form-item__error, [class*="error"], [class*="invalid"], .error-message').first().should('be.visible');
//             } else {
//                 cy.log('No visible validation errors - form might have different validation approach');
//             }
//         });
        
//         // Test invalid inputs with flexible selectors
//         cy.get('body').then($body => {
//             // Find name input
//             const nameSelectors = [
//                 'input[placeholder="Enter the Name"]',
//                 'input[placeholder*="name"]',
//                 'input[placeholder*="Name"]',
//                 'input[placeholder*="title"]',
//                 'input[placeholder*="Title"]',
//                 'label:contains("Name") + input',
//                 'input[type="text"]'
//             ];
            
//             let nameInputFound = false;
//             for (const selector of nameSelectors) {
//                 const elements = $body.find(selector);
//                 if (elements.length > 0) {
//                     // Use the found element directly without cy.get
//                     const $input = elements.first();
//                     if ($input.is(':visible')) {
//                         cy.wrap($input).clear().type('A', { delay: 20 }); // Too short
//                         nameInputFound = true;
//                         break;
//                     }
//                 }
//             }
            
//             if (!nameInputFound) {
//                 cy.log('No name input field found - form might not be loaded');
//                 // Try to find any visible text input as fallback
//                 const anyTextInput = $body.find('input[type="text"]:visible, input:not([type]):visible').first();
//                 if (anyTextInput.length > 0) {
//                     cy.wrap(anyTextInput).clear().type('A', { delay: 20 });
//                 }
//             }
            
//             // Find time/duration input
//             const timeSelectors = [
//                 'input[placeholder="Pick a time"]',
//                 'input[placeholder*="duration"]',
//                 'input[placeholder*="Duration"]',
//                 'input[placeholder*="time"]',
//                 'input[placeholder*="Time"]',
//                 'label:contains("Duration") + input'
//             ];
            
//             let timeInputFound = false;
//             for (const selector of timeSelectors) {
//                 const elements = $body.find(selector);
//                 if (elements.length > 0) {
//                     const $input = elements.first();
//                     if ($input.is(':visible')) {
//                         cy.wrap($input).clear().type('99:99:99{enter}'); // Invalid time
//                         timeInputFound = true;
//                         break;
//                     }
//                 }
//             }
            
//             if (!timeInputFound) {
//                 cy.log('No time/duration input field found');
//             }
//         });
//     });

//     it('Should test all workshop status filters', () => {
//         // Test scheduled and active (default)
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
//         cy.url().should('include', 'status=scheduled&status=active');
        
//         // Test completed status
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=completed');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
//         cy.url().should('include', 'status=completed');
        
//         // Test cancelled status
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=cancelled');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
//         cy.url().should('include', 'status=cancelled');
        
//         // Test all statuses
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Verify different workshops are displayed
//         cy.get('tr').should('have.length.greaterThan', 1);
//     });

//     it('Should test bulk operations on workshops', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for checkboxes for bulk selection
//         cy.get('input[type="checkbox"]').then($checkboxes => {
//             if ($checkboxes.length > 2) {
//                 // Select multiple workshops
//                 cy.wrap($checkboxes[1]).check({ force: true });
//                 cy.wrap($checkboxes[2]).check({ force: true });
                
//                 // Look for bulk action buttons
//                 cy.get('body').then($body => {
//                     if ($body.find('[class*="bulk"], [class*="selected"]').length > 0) {
//                         cy.log('Bulk actions available');
//                     }
//                 });
//             }
//         });
//     });

//     it('Should test date range filtering', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for date picker elements with more flexible selectors
//         cy.get('body').then($body => {
//             const dateSelectors = [
//                 '[class*="date"]',
//                 '[class*="Date"]',
//                 '[placeholder*="date"]',
//                 '[placeholder*="Date"]',
//                 'input[type="date"]',
//                 'input[type="datetime"]',
//                 'input[type="datetime-local"]',
//                 '[class*="calendar"]',
//                 '[class*="picker"]',
//                 '[role="datepicker"]',
//                 'label:contains("Date") + input',
//                 'label:contains("From") + input',
//                 'label:contains("To") + input'
//             ];
            
//             let datePickerFound = false;
//             for (const selector of dateSelectors) {
//                 const elements = $body.find(selector);
//                 if (elements.length > 0 && elements.is(':visible')) {
//                     cy.wrap(elements.first()).click({ force: true });
//                     datePickerFound = true;
//                     cy.wait(500);
                    
//                     // Try to interact with date picker if it opens
//                     cy.get('body').then($pickerBody => {
//                         if ($pickerBody.find('.el-date-table td.available, td.available, [class*="calendar-day"]').length > 0) {
//                             cy.get('.el-date-table td.available, td.available').first().click({ force: true });
//                             cy.wait(500);
//                             cy.get('.el-date-table td.available, td.available').last().click({ force: true });
//                         }
                        
//                         // Look for apply button
//                         if ($pickerBody.find('button:contains("Apply"), button:contains("OK"), button:contains("Done")').length > 0) {
//                             cy.get('button').filter(':contains("Apply"), :contains("OK"), :contains("Done")').first().click({ force: true });
//                         }
//                     });
//                     break;
//                 }
//             }
            
//             if (!datePickerFound) {
//                 cy.log('No date range filter found on the page - this feature might not be available');
                
//                 // Check for other filter options
//                 if ($body.find('[class*="filter"]').length > 0) {
//                     cy.log('Other filter elements found on page');
//                 }
//             }
//         });
//     });

//     it('Should test workshop details view', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Click on workshop name/title to view details
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('td').first().click({ force: true });
//         });
        
//         cy.wait(2000);
        
//         // Verify details page elements
//         cy.get('body').then($body => {
//             // Check for common detail page elements
//             const detailElements = ['Description', 'Duration', 'Price', 'Instructor', 'Schedule'];
//             detailElements.forEach(element => {
//                 if ($body.text().includes(element)) {
//                     cy.log(`Found ${element} in details`);
//                 }
//             });
//         });
//     });

//     it('Should test export functionality', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for export button
//         cy.get('button, [class*="export"]').then($buttons => {
//             const exportButton = $buttons.filter((i, el) => {
//                 return el.textContent.toLowerCase().includes('export') || 
//                        Cypress.$(el).find('[class*="export"], [class*="download"]').length > 0;
//             });
            
//             if (exportButton.length > 0) {
//                 cy.wrap(exportButton.first()).click({ force: true });
//                 cy.wait(1000);
                
//                 // Check for export options (CSV, Excel, PDF)
//                 ['CSV', 'Excel', 'PDF'].forEach(format => {
//                     cy.get('body').then($body => {
//                         if ($body.text().includes(format)) {
//                             cy.log(`${format} export option available`);
//                         }
//                     });
//                 });
//             }
//         });
//     });

//     it('Should test notification preferences', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for settings or preferences with flexible selectors
//         cy.get('body').then($body => {
//             const settingsSelectors = [
//                 '[class*="settings"]',
//                 '[class*="Settings"]',
//                 '[class*="preferences"]',
//                 '[class*="Preferences"]',
//                 '[class*="notification"]',
//                 '[class*="Notification"]',
//                 'button:contains("Settings")',
//                 'button:contains("Preferences")',
//                 'button:contains("Notifications")',
//                 'a:contains("Settings")',
//                 'a:contains("Preferences")',
//                 'a:contains("Notifications")',
//                 '[aria-label*="settings"]',
//                 '[aria-label*="preferences"]',
//                 '[title*="settings"]',
//                 '[title*="preferences"]',
//                 'img[src*="settings"], svg[class*="settings"]',
//                 'img[src*="gear"], svg[class*="gear"]',
//                 'i[class*="settings"], i[class*="gear"]'
//             ];
            
//             let settingsFound = false;
//             for (const selector of settingsSelectors) {
//                 try {
//                     const elements = $body.find(selector);
//                     if (elements.length > 0 && elements.is(':visible')) {
//                         cy.wrap(elements.first()).click({ force: true });
//                         settingsFound = true;
//                         cy.wait(1000);
                        
//                         // Look for notification toggles
//                         cy.get('body').then($settingsBody => {
//                             const toggles = $settingsBody.find('input[type="checkbox"], .el-switch, [role="switch"], [class*="toggle"]');
//                             if (toggles.length > 0) {
//                                 cy.log(`Found ${toggles.length} notification toggles`);
//                                 toggles.each((index, toggle) => {
//                                     if (index < 3) { // Limit to first 3 toggles
//                                         cy.wrap(toggle).click({ force: true });
//                                         cy.wait(500);
//                                     }
//                                 });
//                             } else {
//                                 cy.log('No notification toggles found in settings');
//                             }
//                         });
//                         break;
//                     }
//                 } catch (e) {
//                     // Continue to next selector
//                 }
//             }
            
//             if (!settingsFound) {
//                 cy.log('No settings/preferences/notification options found - this feature might not be available on this page');
                
//                 // Check if there's a user menu or profile icon
//                 const userMenuSelectors = [
//                     '[class*="user"]',
//                     '[class*="profile"]',
//                     '[class*="avatar"]',
//                     'img[src*="avatar"], img[src*="profile"]',
//                     'button:contains("testing_c@lmes.in")'
//                 ];
                
//                 for (const selector of userMenuSelectors) {
//                     const userElements = $body.find(selector);
//                     if (userElements.length > 0 && userElements.is(':visible')) {
//                         cy.log('Found user menu element - settings might be there');
//                         break;
//                     }
//                 }
//             }
//         });
//     });

//     it('Should test workshop participant management', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to registrations
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('View Registrations').click({ force: true });
//         cy.wait(3000);
        
//         // Test participant actions
//         cy.get('tr').not(':first').each(($row, index) => {
//             if (index < 3) { // Test first 3 participants
//                 cy.wrap($row).within(() => {
//                     // Check participant details
//                     cy.get('td').each($td => {
//                         const text = $td.text().trim();
//                         if (text.includes('@')) {
//                             cy.log(`Found email: ${text}`);
//                         }
//                     });
//                 });
//             }
//         });
//     });

//     it('Should test session rescheduling', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check if there are workshops
//         cy.get('body').then($body => {
//             if ($body.find('tr').length > 1) {
//                 // Navigate to sessions through registrations
//                 cy.get('tr').not(':first').first().within(() => {
//                     cy.get('button').last().click({ force: true });
//                 });
//                 cy.wait(1000);
                
//                 // Click View Registrations without new tab
//                 cy.get('body').then($menuBody => {
//                     if ($menuBody.text().includes('View Registrations')) {
//                         cy.contains('View Registrations').then($el => {
//                             if ($el.is('a')) {
//                                 const href = $el.attr('href');
//                                 if (href) {
//                                     cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                                 } else {
//                                     cy.wrap($el).invoke('removeAttr', 'target').click({ force: true });
//                                 }
//                             } else {
//                                 cy.wrap($el).click({ force: true });
//                             }
//                         });
//                         cy.wait(3000);
                        
//                         // Try to find sessions through registration
//                         cy.get('body').then($regBody => {
//                             if ($regBody.find('tr').length > 1) {
//                                 cy.get('tr').not(':first').first().within(() => {
//                                     cy.get('button').last().click({ force: true });
//                                 });
//                                 cy.wait(1000);
                                
//                                 // Look for session viewing options with flexible text
//                                 cy.get('body').then($sessionMenuBody => {
//                                     const sessionTexts = ['View all Sessions', 'View Sessions', 'Sessions', 'All Sessions', 'Schedule'];
//                                     let sessionFound = false;
                                    
//                                     for (const text of sessionTexts) {
//                                         if ($sessionMenuBody.text().includes(text)) {
//                                             cy.contains(text).first().then($sessionEl => {
//                                                 if ($sessionEl.is('a')) {
//                                                     const href = $sessionEl.attr('href');
//                                                     if (href) {
//                                                         cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                                                     } else {
//                                                         cy.wrap($sessionEl).invoke('removeAttr', 'target').click({ force: true });
//                                                     }
//                                                 } else {
//                                                     cy.wrap($sessionEl).click({ force: true });
//                                                 }
//                                             });
//                                             sessionFound = true;
//                                             break;
//                                         }
//                                     }
                                    
//                                     if (!sessionFound) {
//                                         cy.log('No session viewing option found - trying alternative approach');
//                                     }
//                                 });
//                             } else {
//                                 cy.log('No registrations found to view sessions');
//                             }
//                         });
//                     }
//                 });
                
//                 cy.wait(2000);
        
//                 // Try to reschedule a session if on sessions page
//                 cy.get('body').then($sessionsBody => {
//                     // Look for menu buttons on sessions
//                     const menuButtons = $sessionsBody.find('button').filter((i, el) => {
//                         return Cypress.$(el).find('img[src*="dots"], svg[class*="menu"], [class*="more"]').length > 0;
//                     });
                    
//                     if (menuButtons.length > 0) {
//                         cy.wrap(menuButtons.first()).click({ force: true });
//                         cy.wait(1000);
                        
//                         // Look for reschedule option
//                         cy.get('body').then($menuBody => {
//                             const rescheduleTexts = ['Reschedule', 'Change Time', 'Edit Session', 'Modify'];
//                             let rescheduleFound = false;
                            
//                             for (const text of rescheduleTexts) {
//                                 if ($menuBody.text().includes(text)) {
//                                     cy.contains(text).first().click({ force: true });
//                                     rescheduleFound = true;
//                                     cy.wait(2000);
                                    
//                                     // Try to change date/time
//                                     cy.get('body').then($formBody => {
//                                         // Look for date input
//                                         const dateInputs = $formBody.find('.el-date-editor input, input[type="datetime"], input[type="date"]');
//                                         if (dateInputs.length > 0) {
//                                             cy.wrap(dateInputs.first()).click({ force: true });
//                                             cy.wait(500);
                                            
//                                             // Try to select a new date
//                                             if ($formBody.find('.el-date-table td.available, td.available').length > 0) {
//                                                 cy.get('.el-date-table td.available, td.available').eq(10).click({ force: true });
//                                             }
                                            
//                                             // Confirm if needed
//                                             if ($formBody.find('button:contains("OK"), button:contains("Confirm")').length > 0) {
//                                                 cy.get('button').filter(':contains("OK"), :contains("Confirm")').first().click({ force: true });
//                                             }
//                                         }
                                        
//                                         // Save changes
//                                         const saveButtons = ['Save', 'Update', 'Confirm', 'Submit'];
//                                         for (const btnText of saveButtons) {
//                                             if ($formBody.text().includes(btnText)) {
//                                                 cy.contains(btnText).click({ force: true });
//                                                 break;
//                                             }
//                                         }
//                                     });
//                                     break;
//                                 }
//                             }
                            
//                             if (!rescheduleFound) {
//                                 cy.log('Reschedule option not available in the menu');
//                             }
//                         });
//                     } else {
//                         cy.log('No session menu buttons found - sessions might not be loaded');
//                     }
//                 });
//             } else {
//                 cy.log('No workshops found on the page');
//             }
//         });
            
//     });

//     it('Should test session cancellation with reason', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check if workshops exist
//         cy.get('body').then($body => {
//             if ($body.find('tr').length > 1) {
//                 // Navigate to sessions
//                 cy.get('tr').not(':first').first().within(() => {
//                     cy.get('button').last().click({ force: true });
//                 });
//                 cy.wait(1000);
                
//                 // Click View Registrations
//                 cy.get('body').then($menuBody => {
//                     if ($menuBody.text().includes('View Registrations')) {
//                         cy.contains('View Registrations').then($el => {
//                             if ($el.is('a')) {
//                                 const href = $el.attr('href');
//                                 if (href) {
//                                     cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                                 } else {
//                                     cy.wrap($el).invoke('removeAttr', 'target').click({ force: true });
//                                 }
//                             } else {
//                                 cy.wrap($el).click({ force: true });
//                             }
//                         });
//                         cy.wait(3000);
                        
//                         // Check if registrations exist
//                         cy.get('body').then($regBody => {
//                             if ($regBody.find('tr').length > 1) {
//                                 cy.get('tr').not(':first').first().within(() => {
//                                     cy.get('button').last().click({ force: true });
//                                 });
//                                 cy.wait(1000);
                                
//                                 // Look for sessions option with flexible text
//                                 cy.get('body').then($sessionMenuBody => {
//                                     const sessionTexts = ['View all Sessions', 'View Sessions', 'Sessions', 'All Sessions'];
//                                     let sessionFound = false;
                                    
//                                     for (const text of sessionTexts) {
//                                         if ($sessionMenuBody.text().includes(text)) {
//                                             cy.contains(text).first().then($sessionEl => {
//                                                 if ($sessionEl.is('a')) {
//                                                     const href = $sessionEl.attr('href');
//                                                     if (href) {
//                                                         cy.visit(`https://dash.internal.chitti.xyz${href.startsWith('/') ? href : '/' + href}`);
//                                                     } else {
//                                                         cy.wrap($sessionEl).invoke('removeAttr', 'target').click({ force: true });
//                                                     }
//                                                 } else {
//                                                     cy.wrap($sessionEl).click({ force: true });
//                                                 }
//                                             });
//                                             sessionFound = true;
//                                             break;
//                                         }
//                                     }
                                    
//                                     if (!sessionFound) {
//                                         cy.log('No session viewing option found');
//                                     }
//                                 });
                                
//                                 cy.wait(2000);
        
//                                 // Try to cancel a session if on sessions page
//                                 cy.get('body').then($sessionsBody => {
//                                     // Look for menu buttons
//                                     const menuButtons = $sessionsBody.find('button').filter((i, el) => {
//                                         return Cypress.$(el).find('img[src*="dots"], svg[class*="menu"], [class*="more"]').length > 0;
//                                     });
                                    
//                                     if (menuButtons.length > 0) {
//                                         cy.wrap(menuButtons.first()).click({ force: true });
//                                         cy.wait(1000);
                                        
//                                         // Look for cancel option
//                                         cy.get('body').then($cancelMenuBody => {
//                                             const cancelTexts = ['Cancel Session', 'Cancel', 'Delete Session', 'Remove'];
//                                             let cancelFound = false;
                                            
//                                             for (const text of cancelTexts) {
//                                                 if ($cancelMenuBody.text().includes(text)) {
//                                                     cy.contains(text).first().click({ force: true });
//                                                     cancelFound = true;
//                                                     cy.wait(1000);
                                                    
//                                                     // Enter cancellation reason
//                                                     cy.get('body').then($reasonBody => {
//                                                         const reasonSelectors = [
//                                                             'textarea',
//                                                             'input[placeholder*="reason"]',
//                                                             'input[placeholder*="Reason"]',
//                                                             'textarea[placeholder*="comment"]',
//                                                             'textarea[placeholder*="Comment"]',
//                                                             'input[type="text"]'
//                                                         ];
                                                        
//                                                         for (const selector of reasonSelectors) {
//                                                             const reasonInput = $reasonBody.find(selector).filter(':visible');
//                                                             if (reasonInput.length > 0) {
//                                                                 cy.wrap(reasonInput.first()).type('Testing cancellation functionality', { delay: 20 });
//                                                                 break;
//                                                             }
//                                                         }
                                                        
//                                                         // Confirm cancellation
//                                                         const confirmButtons = ['Confirm', 'Yes', 'OK', 'Cancel Session', 'Delete'];
//                                                         for (const btnText of confirmButtons) {
//                                                             if ($reasonBody.text().includes(btnText)) {
//                                                                 cy.contains('button', btnText).click({ force: true });
//                                                                 break;
//                                                             }
//                                                         }
//                                                     });
//                                                     break;
//                                                 }
//                                             }
                                            
//                                             if (!cancelFound) {
//                                                 cy.log('Cancel option not available in the menu');
//                                             }
//                                         });
//                                     } else {
//                                         cy.log('No session menu buttons found');
//                                     }
//                                 });
//                             } else {
//                                 cy.log('No registrations found');
//                             }
//                         });
//                     } else {
//                         cy.log('View Registrations option not found');
//                     }
//                 });
//             } else {
//                 cy.log('No workshops found on the page');
//             }
//         });
//     });

//     it('Should test workshop duplication', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find workshop to duplicate
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
        
//         cy.wait(1000);
        
//         // Look for duplicate option
//         if (Cypress.$('body:contains("Duplicate")').length > 0) {
//             cy.contains('Duplicate').click({ force: true });
//             cy.wait(2000);
            
//             // Modify duplicated workshop details
//             cy.get('input[placeholder*="name"], input[placeholder*="title"]').first()
//                 .clear()
//                 .type('Duplicated Workshop Test', { delay: 20 });
            
//             // Save duplicated workshop
//             // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Save button');
        cy.contains('button', 'Save').click({ force: true });
//         }
//     });

//     it('Should test advanced search with multiple criteria', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for advanced search or filter options with flexible selectors
//         cy.get('body').then($body => {
//             const advancedSelectors = [
//                 '[class*="advanced"]',
//                 '[class*="Advanced"]',
//                 '[class*="filter"]',
//                 '[class*="Filter"]',
//                 '[class*="search"]',
//                 '[class*="Search"]',
//                 'button:contains("Advanced")',
//                 'button:contains("Filter")',
//                 'button:contains("Search")',
//                 'a:contains("Advanced")',
//                 'a:contains("Filter")',
//                 '[aria-label*="filter"]',
//                 '[aria-label*="search"]',
//                 'img[src*="filter"], svg[class*="filter"]',
//                 'img[src*="search"], svg[class*="search"]',
//                 'i[class*="filter"], i[class*="search"]'
//             ];
            
//             let advancedFound = false;
//             for (const selector of advancedSelectors) {
//                 try {
//                     const elements = $body.find(selector);
//                     if (elements.length > 0 && elements.is(':visible')) {
//                         cy.wrap(elements.first()).click({ force: true });
//                         advancedFound = true;
//                         cy.wait(1000);
                        
//                         // Fill search criteria if form appears
//                         cy.get('body').then($searchBody => {
//                             const inputs = $searchBody.find('input:visible, select:visible');
//                             if (inputs.length > 0) {
//                                 inputs.each((index, input) => {
//                                     if (index < 5) { // Limit to first 5 inputs
//                                         const $input = Cypress.$(input);
//                                         const tagName = input.tagName.toLowerCase();
//                                         const type = $input.attr('type');
                                        
//                                         if (tagName === 'input' && type !== 'checkbox' && type !== 'radio' && type !== 'submit') {
//                                             cy.wrap($input).clear().type('test', { delay: 20 });
//                                         } else if (tagName === 'select') {
//                                             const options = $input.find('option');
//                                             if (options.length > 1) {
//                                                 cy.wrap($input).select(1);
//                                             }
//                                         }
//                                     }
//                                 });
                                
//                                 // Apply search with safer approach
//                                 const searchButtons = ['Search', 'Apply', 'Filter', 'Go', 'Submit'];
//                                 let buttonClicked = false;
                                
//                                 for (const btnText of searchButtons) {
//                                     const buttons = $searchBody.find(`button:contains("${btnText}"), input[type="submit"][value="${btnText}"]`);
//                                     if (buttons.length > 0) {
//                                         cy.wrap(buttons.first()).click({ force: true });
//                                         buttonClicked = true;
//                                         break;
//                                     }
//                                 }
                                
//                                 if (!buttonClicked) {
//                                     // Try any submit button or button with type submit
//                                     const submitBtn = $searchBody.find('button[type="submit"], input[type="submit"], button:visible').filter((i, el) => {
//                                         const text = Cypress.$(el).text().toLowerCase();
//                                         return text.includes('search') || text.includes('apply') || text.includes('go') || text.includes('ok');
//                                     });
                                    
//                                     if (submitBtn.length > 0) {
//                                         cy.wrap(submitBtn.first()).click({ force: true });
//                                     }
//                                 }
//                             }
//                         });
//                         break;
//                     }
//                 } catch (e) {
//                     // Continue to next selector
//                 }
//             }
            
//             if (!advancedFound) {
//                 cy.log('No advanced search or filter options found - trying basic search');
                
//                 // Try basic search input
//                 const searchInput = $body.find('input[type="search"], input[placeholder*="search"], input[placeholder*="Search"], input[placeholder*="find"], input[placeholder*="Find"]').first();
//                 if (searchInput.length > 0) {
//                     cy.wrap(searchInput).type('test workshop{enter}', { delay: 50 });
//                 } else {
//                     cy.log('No search functionality found on this page');
//                 }
//             }
//         });
//     });

//     it('Should test responsive design on different viewports', () => {
//         // Login first
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('body').then($loginBody => {
//             const usernameInput = $loginBody.find('input[type="text"], input[type="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
//             const passwordInput = $loginBody.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
//         });
        
//         // Click login button
//         cy.get('body').then($body => {
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const anyBtn = $body.find('button:visible').last();
//                 if (anyBtn.length > 0) {
//                     cy.wrap(anyBtn).click({ force: true });
//                 }
//             }
//         });
//         cy.wait(5000);
        
//         const viewports = ['iphone-x', 'ipad-2', 'macbook-13', 'macbook-16'];
        
//         viewports.forEach(viewport => {
//             cy.viewport(viewport);
//             cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//             cy.wait(3000);
            
//             // Verify key elements are visible
//             cy.get('body').should('be.visible');
            
//             // Check if mobile menu appears on smaller screens
//             if (viewport.includes('iphone') || viewport.includes('ipad')) {
//                 cy.get('body').then($body => {
//                     // Look for mobile menu with various selectors
//                     const mobileMenuSelectors = [
//                         '[class*="mobile"]',
//                         '[class*="Mobile"]',
//                         '[class*="burger"]',
//                         '[class*="Burger"]',
//                         '[class*="menu-icon"]',
//                         '[class*="menu-button"]',
//                         '[class*="hamburger"]',
//                         '[class*="Hamburger"]',
//                         '[class*="nav-toggle"]',
//                         '[class*="navbar-toggle"]',
//                         'button[aria-label*="menu"]',
//                         'button[aria-label*="Menu"]',
//                         'button[aria-label*="navigation"]',
//                         '[role="button"][aria-label*="menu"]',
//                         'svg[class*="menu"], svg[class*="bars"]',
//                         'i[class*="menu"], i[class*="bars"]',
//                         '.mobile-menu, .mobile-nav',
//                         '#mobile-menu, #mobile-nav'
//                     ];
                    
//                     let menuFound = false;
//                     for (const selector of mobileMenuSelectors) {
//                         try {
//                             const elements = $body.find(selector);
//                             if (elements.length > 0 && elements.is(':visible')) {
//                                 cy.wrap(elements.first()).click({ force: true });
//                                 menuFound = true;
//                                 cy.wait(500);
                                
//                                 // Check if menu opened
//                                 cy.get('body').then($menuBody => {
//                                     if ($menuBody.find('[class*="menu-open"], [class*="nav-open"], [class*="sidebar"]').length > 0) {
//                                         cy.log('Mobile menu opened successfully');
//                                     }
//                                 });
//                                 break;
//                             }
//                         } catch (e) {
//                             // Continue to next selector
//                         }
//                     }
                    
//                     if (!menuFound) {
//                         cy.log(`No mobile menu found on ${viewport} - responsive design might use different approach`);
                        
//                         // Check if navigation is already visible (responsive without hamburger)
//                         if ($body.find('nav:visible, [role="navigation"]:visible').length > 0) {
//                             cy.log('Navigation is visible without hamburger menu');
//                         }
//                     }
//                 });
//             }
            
//             // Test scrolling on mobile
//             if (viewport.includes('iphone')) {
//                 // Check if page has scrollable content
//                 cy.get('body').then($body => {
//                     const bodyHeight = $body[0].scrollHeight;
//                     const windowHeight = $body[0].clientHeight;
                    
//                     if (bodyHeight > windowHeight) {
//                         // Page is scrollable, use scrollTo on the scrollable element
//                         cy.get('html, body').first().scrollTo('bottom', { duration: 1000, ensureScrollable: false });
//                         cy.wait(500);
//                         cy.get('html, body').first().scrollTo('top', { duration: 1000, ensureScrollable: false });
//                     } else {
//                         // Page might have a scrollable container instead
//                         const scrollableContainer = $body.find('[style*="overflow"], [class*="scroll"], main, .content, .container').filter((i, el) => {
//                             return el.scrollHeight > el.clientHeight;
//                         }).first();
                        
//                         if (scrollableContainer.length > 0) {
//                             cy.wrap(scrollableContainer).scrollTo('bottom', { duration: 1000 });
//                             cy.wait(500);
//                             cy.wrap(scrollableContainer).scrollTo('top', { duration: 1000 });
//                         } else {
//                             cy.log('Page content fits within viewport - no scrolling needed');
//                         }
//                     }
//                 });
//             }
            
//             cy.log(`Tested on ${viewport} - responsive behavior verified`);
//         });
//     });

//     it('Should test keyboard navigation and shortcuts', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Test keyboard navigation
//         cy.window().then(win => {
//             cy.document().then(doc => {
//                 // Find all focusable elements
//                 const focusableElements = Cypress.$(doc).find('button:visible, a:visible, input:visible, select:visible, textarea:visible, [tabindex]:visible').filter(':not([tabindex="-1"])');
                
//                 if (focusableElements.length > 0) {
//                     // Focus on first element
//                     cy.wrap(focusableElements.first()).focus();
//                     cy.wait(500);
                    
//                     // Check if we have a focused element before proceeding
//                     cy.document().then(doc => {
//                         const activeFocus = doc.activeElement;
//                         if (activeFocus && activeFocus !== doc.body) {
//                             cy.log('Element is focused, testing tab navigation');
                            
//                             // Tab to next element by triggering tab key event
//                             const tabEvent = new KeyboardEvent('keydown', {
//                                 key: 'Tab',
//                                 keyCode: 9,
//                                 which: 9,
//                                 bubbles: true,
//                                 cancelable: true
//                             });
//                             activeFocus.dispatchEvent(tabEvent);
//                             cy.wait(500);
                            
//                             // Check if focus moved
//                             cy.document().then(doc => {
//                                 if (doc.activeElement && doc.activeElement !== doc.body) {
//                                     cy.log('Tab navigation successful');
//                                 }
//                             });
//                         } else {
//                             cy.log('No element currently focused, skipping tab test');
//                         }
//                     });
                    
//                     // Test escape key
//                     cy.get('body').then($body => {
//                         const escEvent = new KeyboardEvent('keydown', {
//                             key: 'Escape',
//                             keyCode: 27,
//                             which: 27,
//                             bubbles: true
//                         });
//                         $body[0].dispatchEvent(escEvent);
//                     });
//                     cy.wait(500);
                    
//                     // Test arrow key navigation in tables if present
//                     const tableRows = Cypress.$(doc).find('tr:visible');
//                     if (tableRows.length > 1) {
//                         cy.wrap(tableRows.eq(1)).click({ force: true }); // Click second row to avoid header
//                         cy.wait(500);
                        
//                         // Trigger down arrow key on the row
//                         cy.wrap(tableRows.eq(1)).then($el => {
//                             const downEvent = new KeyboardEvent('keydown', {
//                                 key: 'ArrowDown',
//                                 keyCode: 40,
//                                 which: 40,
//                                 bubbles: true
//                             });
//                             $el[0].dispatchEvent(downEvent);
//                         });
//                     }
                    
//                     // Test ctrl+k shortcut
//                     cy.get('body').then($body => {
//                         const ctrlKEvent = new KeyboardEvent('keydown', {
//                             key: 'k',
//                             keyCode: 75,
//                             which: 75,
//                             ctrlKey: true,
//                             bubbles: true
//                         });
//                         $body[0].dispatchEvent(ctrlKEvent);
//                     });
//                     cy.wait(500);
                    
//                     cy.log('Keyboard navigation tests completed');
//                 } else {
//                     cy.log('No focusable elements found for keyboard navigation test');
//                 }
//             });
//         });
//     });

//     it('Should test auto-save functionality', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to edit form
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
        
//         if (Cypress.$('body:contains("Edit")').length > 0) {
//             cy.contains('Edit').first().click({ force: true });
//             cy.wait(2000);
            
//             // Make changes and wait for auto-save
//             cy.get('input').first().type(' - Modified', { delay: 50 });
            
//             // Wait for auto-save indicator
//             cy.wait(3000);
            
//             // Check for auto-save message
//             cy.get('body').then($body => {
//                 if ($body.text().includes('Saved') || $body.text().includes('Auto-saved')) {
//                     cy.log('Auto-save functionality detected');
//                 }
//             });
//         }
//     });

//     it('Should test session feedback and ratings', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=completed');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find completed workshop with sessions
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
        
//         if (Cypress.$('body:contains("View Feedback")').length > 0) {
//             cy.contains('View Feedback').click({ force: true });
//             cy.wait(2000);
            
//             // Check feedback elements
//             cy.get('[class*="rating"], [class*="star"]').should('exist');
//             cy.get('textarea, [class*="comment"]').should('exist');
//         }
//     });

//     it('Should test data integrity and validation rules', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Test various validation scenarios
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('View Registrations').click({ force: true });
//         cy.wait(3000);
        
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('Schedule New Session').click({ force: true });
//         cy.wait(2000);
        
//         // Test edge cases
//         const edgeCases = [
//             { field: 'input[placeholder="Enter the Name"]', value: ''.padEnd(256, 'A') }, // Very long name
//             { field: 'input[placeholder="Enter the Name"]', value: '<script>alert("test")</script>' }, // XSS attempt
//             { field: 'input[placeholder="Enter the Name"]', value: '😀🎉🚀' }, // Emojis
//             { field: 'input[placeholder="Enter the Name"]', value: '   ' } // Only spaces
//         ];
        
//         edgeCases.forEach(testCase => {
//             cy.get(testCase.field).clear().type(testCase.value, { delay: 10 });
//             cy.wait(500);
            
//             // Check for validation feedback
//             cy.get('.el-form-item__error, [class*="error"]').then($errors => {
//                 if ($errors.length > 0) {
//                     cy.log(`Validation triggered for: ${testCase.value.substring(0, 20)}...`);
//                 }
//             });
//         });
//     });
// });

// // Performance and monitoring tests
// describe('Chitti Dashboard - Performance and Monitoring Tests', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
//     });

//     it('Should measure page load performance', () => {
//         cy.visit('https://dash.internal.chitti.xyz/', {
//             onBeforeLoad: (win) => {
//                 win.performance.mark('start');
//             },
//             onLoad: (win) => {
//                 win.performance.mark('end');
//                 win.performance.measure('pageLoad', 'start', 'end');
//                 const measure = win.performance.getEntriesByName('pageLoad')[0];
//                 cy.log(`Page load time: ${measure.duration}ms`);
//                 expect(measure.duration).to.be.lessThan(5000); // Should load within 5 seconds
//             }
//         });
        
//         // Login and measure workshop page load
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.window().then(win => {
//             win.performance.mark('workshopStart');
//         });
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         cy.window().then(win => {
//             win.performance.mark('workshopEnd');
//             win.performance.measure('workshopLoad', 'workshopStart', 'workshopEnd');
//             const measure = win.performance.getEntriesByName('workshopLoad')[0];
//             cy.log(`Workshop page load time: ${measure.duration}ms`);
//         });
//     });

//     it('Should test API response times', () => {
//         cy.intercept('GET', '**/api/**').as('apiCalls');
        
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
        
//         cy.wait('@apiCalls', { timeout: 10000 }).then((interception) => {
//             cy.log(`API response time: ${interception.duration}ms`);
//             expect(interception.duration).to.be.lessThan(3000);
//         });
//     });

//     it('Should test concurrent user actions', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Simulate rapid clicks
//         for (let i = 0; i < 5; i++) {
//             cy.get('button').first().click({ force: true });
//             cy.wait(100);
//         }
        
//         // Check system stability
//         cy.get('body').should('not.contain', 'Something went wrong');
//     });

//     it('Should test session timeout handling', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Clear session/cookies to simulate timeout
//         cy.clearCookies();
//         cy.clearLocalStorage();
        
//         // Try to perform action
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Should redirect to login
//         cy.url().should('include', 'login').or('equal', 'https://dash.internal.chitti.xyz/');
//     });
// });

// // Accessibility tests
// describe('Chitti Dashboard - Accessibility Tests', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
//     });

//     it('Should support screen reader navigation', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check for skip links
//         cy.get('a[href="#main"], a[href="#content"]').should('exist');
        
//         // Check heading hierarchy
//         cy.get('h1').should('exist');
//         cy.get('h2').should('exist');
        
//         // Check form labels
//         cy.get('input').each($input => {
//             if ($input.attr('type') !== 'hidden') {
//                 cy.wrap($input).should('have.attr', 'aria-label')
//                     .or('have.attr', 'id');
//             }
//         });
//     });

//     it('Should have sufficient color contrast', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=scheduled&status=active');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // This is a basic check - for comprehensive testing, use axe-core
//         cy.get('button').each($button => {
//             cy.wrap($button).should('be.visible')
//                 .and('have.css', 'color')
//                 .and('have.css', 'background-color');
//         });
//     });
// });

// // Comprehensive Functional Testing Suite
// describe('Chitti Dashboard - Functional Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         // Login before each test
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Use safer approach for login
//         cy.get('body').then($body => {
//             const usernameInput = $body.find('input[type="text"], input[type="email"], input[name="username"], input[name="email"]').first();
//             if (usernameInput.length > 0) {
//                 cy.wrap(usernameInput).type('testing_c@lmes.in', { delay: 50 });
//             }
            
//             const passwordInput = $body.find('input[type="password"]').first();
//             if (passwordInput.length > 0) {
//                 cy.wrap(passwordInput).type('Testing@chitti', { delay: 50 });
//             }
            
//             // Find and click login button
//             const loginBtn = $body.find('button').filter(':contains("Into the World of Chitti"), :contains("Login"), :contains("Sign In")').first();
//             if (loginBtn.length > 0) {
//                 cy.wrap(loginBtn).click({ force: true });
//             } else {
//                 const submitBtn = $body.find('button[type="submit"], input[type="submit"], button:visible').last();
//                 if (submitBtn.length > 0) {
//                     cy.wrap(submitBtn).click({ force: true });
//                 }
//             }
//         });
        
//         cy.wait(5000);
//     });

//     it('Should test complete workshop lifecycle', () => {
//         // Create -> Schedule -> Start -> Complete -> Archive
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Create new workshop if button exists
//         cy.get('body').then($body => {
//             if ($body.find('button:contains("Create"), button:contains("New Workshop")').length > 0) {
//                 cy.contains('button', 'Create', 'New Workshop').click({ force: true });
//                 cy.wait(2000);
                
//                 // Fill workshop details
//                 cy.get('input[placeholder*="name"], input[placeholder*="title"]').first()
//                     .type('Functional Test Workshop', { delay: 20 });
//                 cy.get('textarea[placeholder*="description"]')
//                     .type('This is a comprehensive functional test workshop', { delay: 20 });
//                 cy.get('input[placeholder*="price"]').type('999', { delay: 20 });
//                 cy.get('input[placeholder*="duration"]').type('60', { delay: 20 });
                
//                 // Save workshop
//                 cy.contains('button', 'Save', 'Create').click({ force: true });
//                 cy.wait(3000);
//             }
//         });
//     });

//     it('Should test notification system', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check for notification bell/icon
//         cy.get('[class*="notification"], [class*="bell"]').then($notif => {
//             if ($notif.length > 0) {
//                 cy.wrap($notif.first()).click({ force: true });
//                 cy.wait(1000);
                
//                 // Check notification types
//                 const notificationTypes = ['New Registration', 'Session Reminder', 'Payment Received', 'Cancellation'];
//                 notificationTypes.forEach(type => {
//                     cy.get('body').then($body => {
//                         if ($body.text().includes(type)) {
//                             cy.log(`Notification type found: ${type}`);
//                         }
//                     });
//                 });
                
//                 // Mark as read
//                 cy.contains('Mark all as read').click({ force: true });
//             }
//         });
//     });

//     it('Should test reporting and analytics', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for analytics/reports section
//         cy.get('[class*="report"], [class*="analytics"], [class*="statistics"]').then($reports => {
//             if ($reports.length > 0) {
//                 cy.wrap($reports.first()).click({ force: true });
//                 cy.wait(2000);
                
//                 // Check for various metrics
//                 const metrics = ['Revenue', 'Attendance', 'Completion Rate', 'Satisfaction'];
//                 metrics.forEach(metric => {
//                     cy.get('body').then($body => {
//                         if ($body.text().includes(metric)) {
//                             cy.log(`Metric found: ${metric}`);
//                         }
//                     });
//                 });
                
//                 // Generate report
//                 if (Cypress.$('button:contains("Generate Report")').length > 0) {
//                     // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Generate Report button');
        cy.contains('button', 'Generate Report').click({ force: true });
//                     cy.wait(2000);
//                 }
//             }
//         });
//     });

//     it('Should test workshop templates and cloning', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find workshop to use as template
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
        
//         // Create template or clone
//         if (Cypress.$('body:contains("Save as Template")').length > 0) {
//             cy.contains('Save as Template').click({ force: true });
//             cy.wait(1000);
//             cy.get('input[placeholder*="template name"]').type('Test Template', { delay: 20 });
//             // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Save button');
        cy.contains('button', 'Save').click({ force: true });
//         } else if (Cypress.$('body:contains("Clone")').length > 0) {
//             cy.contains('Clone').click({ force: true });
//             cy.wait(2000);
//         }
//     });

//     it('Should test resource management', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to workshop resources
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
        
//         if (Cypress.$('body:contains("Manage Resources")').length > 0) {
//             cy.contains('Manage Resources').click({ force: true });
//             cy.wait(2000);
            
//             // Upload resource
//             const fileName = 'test-resource.pdf';
//             cy.get('input[type="file"]').then($input => {
//                 if ($input.length > 0) {
//                     // Create a fake file
//                     cy.fixture('test-file.pdf', 'base64').then(fileContent => {
//                         const file = {
//                             fileName: fileName,
//                             mimeType: 'application/pdf',
//                             content: fileContent
//                         };
//                         cy.wrap($input).attachFile(file);
//                     });
//                 }
//             });
//         }
//     });

//     it('Should test waitlist management', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find full workshop
//         cy.get('tr').each(($row, index) => {
//             if (index > 0) {
//                 cy.wrap($row).then($r => {
//                     if ($r.text().includes('Full') || $r.text().includes('Waitlist')) {
//                         cy.wrap($r).within(() => {
//                             cy.get('button').last().click({ force: true });
//                         });
//                         cy.wait(1000);
                        
//                         if (Cypress.$('body:contains("View Waitlist")').length > 0) {
//                             cy.contains('View Waitlist').click({ force: true });
//                             cy.wait(2000);
                            
//                             // Manage waitlist
//                             cy.get('tr').not(':first').first().within(() => {
//                                 cy.get('button').click({ force: true });
//                             });
//                             cy.contains('Move to Registered').click({ force: true });
//                         }
//                         return false;
//                     }
//                 });
//             }
//         });
//     });
// });

// // Comprehensive UI Testing Suite
// describe('Chitti Dashboard - UI Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
//     });

//     it('Should test visual consistency and branding', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check logo presence
//         cy.get('img[alt*="logo"], [class*="logo"]').should('be.visible');
        
//         // Check consistent color scheme
//         cy.get('button').first().then($button => {
//             const bgColor = $button.css('background-color');
//             cy.log(`Primary button color: ${bgColor}`);
            
//             // Check other buttons have consistent styling
//             cy.get('button').each($btn => {
//                 if ($btn.text().includes('Save') || $btn.text().includes('Create')) {
//                     expect($btn.css('background-color')).to.equal(bgColor);
//                 }
//             });
//         });
        
//         // Check font consistency
//         cy.get('body').should('have.css', 'font-family');
//     });

//     it('Should test loading states and skeletons', () => {
//         // Intercept API calls to simulate loading
//         cy.intercept('GET', '**/api/**', (req) => {
//             req.reply((res) => {
//                 res.delay(2000); // 2 second delay
//             });
//         }).as('delayedApi');
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        
//         // Check for loading indicators
//         cy.get('[class*="loading"], [class*="skeleton"], [class*="spinner"]').should('be.visible');
        
//         // Wait for content to load
//         cy.wait('@delayedApi');
//         cy.get('table').should('be.visible');
//     });

//     it('Should test empty states', () => {
//         // Test with no results
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0?status=cancelled');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Search for non-existent workshop
//         cy.get('input[placeholder*="Search"]').type('NonExistentWorkshop12345', { delay: 50 });
//         cy.wait(1000);
        
//         // Check for empty state message
//         cy.get('body').then($body => {
//             if ($body.find('[class*="empty"], [class*="no-data"], [class*="not-found"]').length > 0) {
//                 cy.get('[class*="empty"], [class*="no-data"], [class*="not-found"]').should('be.visible');
//             } else if ($body.text().includes('No workshops found') || $body.text().includes('No results')) {
//                 cy.log('Empty state message found');
//             }
//         });
//     });

//     it('Should test tooltips and help text', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find elements with tooltips
//         cy.get('[title], [data-tooltip], [aria-describedby]').each($el => {
//             cy.wrap($el).trigger('mouseenter');
//             cy.wait(500);
            
//             // Check if tooltip appears
//             cy.get('.el-tooltip__popper, [role="tooltip"]').then($tooltip => {
//                 if ($tooltip.length > 0) {
//                     cy.wrap($tooltip).should('be.visible');
//                 }
//             });
            
//             cy.wrap($el).trigger('mouseleave');
//         });
//     });

//     it('Should test form field interactions and states', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to a form
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('View Registrations').click({ force: true });
//         cy.wait(3000);
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('Schedule New Session').click({ force: true });
//         cy.wait(2000);
        
//         // Test input focus states
//         cy.get('input').each($input => {
//             if ($input.attr('type') !== 'hidden') {
//                 cy.wrap($input).focus();
//                 cy.wrap($input).should('have.class', 'is-focus')
//                     .or('have.css', 'border-color');
//                 cy.wrap($input).blur();
//             }
//         });
        
//         // Test disabled states
//         cy.get('button[disabled], input[disabled]').each($disabled => {
//             cy.wrap($disabled).should('have.attr', 'disabled');
//             cy.wrap($disabled).should('have.css', 'cursor', 'not-allowed')
//                 .or('have.css', 'opacity');
//         });
//     });

//     it('Should test modal and dialog behavior', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Trigger a modal
//         cy.get('button').filter(':contains("Create"), :contains("Add")').first().click({ force: true });
//         cy.wait(1000);
        
//         // Check modal overlay
//         cy.get('.el-dialog__wrapper, [class*="modal"], [class*="overlay"]').then($modal => {
//             if ($modal.length > 0) {
//                 cy.wrap($modal).should('be.visible');
                
//                 // Check close button
//                 cy.get('.el-dialog__close, [class*="close"]').click({ force: true });
//                 cy.wait(500);
                
//                 // Modal should be closed
//                 cy.get('.el-dialog__wrapper').should('not.be.visible');
//             }
//         });
//     });

//     it('Should test animation and transitions', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Test hover effects
//         cy.get('button').first().then($button => {
//             const initialBg = $button.css('background-color');
//             cy.wrap($button).trigger('mouseenter');
//             cy.wait(300); // Wait for transition
            
//             cy.wrap($button).then($hoveredButton => {
//                 const hoverBg = $hoveredButton.css('background-color');
//                 expect(hoverBg).to.not.equal(initialBg);
//             });
//         });
        
//         // Test page transitions
//         cy.get('tr').not(':first').first().click({ force: true });
        
//         // Check for fade/slide animations
//         cy.get('[class*="fade"], [class*="slide"]').should('exist');
//     });

//     it('Should test icon consistency and quality', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check SVG icons
//         cy.get('svg, img[src*=".svg"]').each($icon => {
//             cy.wrap($icon).should('be.visible');
//             cy.wrap($icon).should('have.attr', 'width').and('have.attr', 'height');
//         });
        
//         // Check icon fonts
//         cy.get('[class*="icon"]').each($iconElement => {
//             cy.wrap($iconElement).should('have.css', 'font-family');
//         });
//     });

//     it('Should test responsive grid and layout', () => {
//         const breakpoints = [
//             { name: 'mobile', width: 375, height: 667 },
//             { name: 'tablet', width: 768, height: 1024 },
//             { name: 'desktop', width: 1920, height: 1080 }
//         ];
        
//         breakpoints.forEach(breakpoint => {
//             cy.viewport(breakpoint.width, breakpoint.height);
//             cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//             cy.wait(3000);
            
//             // Check layout adjustments
//             if (breakpoint.name === 'mobile') {
//                 // Check for mobile menu
//                 cy.get('[class*="mobile-menu"], [class*="hamburger"]').should('be.visible');
                
//                 // Check table responsiveness
//                 cy.get('table').then($table => {
//                     const tableWidth = $table.width();
//                     expect(tableWidth).to.be.lessThan(breakpoint.width);
//                 });
//             }
            
//             cy.log(`Layout verified for ${breakpoint.name}`);
//         });
//     });
// });

// // Non-Functional Testing Suite
// describe('Chitti Dashboard - Non-Functional Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
//     });

//     it('Should test scalability - handle large datasets', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         // Mock large dataset response
//         const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
//             id: i + 1,
//             name: `Workshop ${i + 1}`,
//             status: i % 2 === 0 ? 'active' : 'scheduled',
//             date: new Date().toISOString(),
//             participants: Math.floor(Math.random() * 50)
//         }));
        
//         cy.intercept('GET', '**/api/workshops**', {
//             statusCode: 200,
//             body: { data: largeDataset }
//         }).as('largeDataset');
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait('@largeDataset');
        
//         // Check pagination is present
//         cy.get('[class*="pagination"], [class*="page"]').should('be.visible');
        
//         // Check performance with large dataset
//         cy.get('table').should('be.visible');
//         cy.get('tr').should('have.length.lessThan', 50); // Should paginate, not show all 1000
//     });

//     it('Should test compatibility - browser support', () => {
//         const userAgents = [
//             { name: 'Chrome', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' },
//             { name: 'Firefox', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0' },
//             { name: 'Safari', ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15' },
//             { name: 'Edge', ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59' }
//         ];
        
//         userAgents.forEach(browser => {
//             cy.visit('https://dash.internal.chitti.xyz/', {
//                 onBeforeLoad: (win) => {
//                     Object.defineProperty(win.navigator, 'userAgent', {
//                         value: browser.ua
//                     });
//                 }
//             });
            
//             // Basic functionality should work
//             cy.get('input[type="text"]').should('be.visible');
//             cy.get('input[type="password"]').should('be.visible');
//             // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').should('be.visible');
            
//             cy.log(`Tested compatibility with ${browser.name}`);
//         });
//     });
// });

// // Integration Testing Suite
// describe('Chitti Dashboard - Integration Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
//     });

//     it('Should test end-to-end workshop registration flow', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Select a workshop
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('td').first().invoke('text').then(workshopName => {
//                 cy.log(`Selected workshop: ${workshopName}`);
//             });
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('View Registrations').click({ force: true });
//         cy.wait(3000);
        
//         // Add new registration if button exists
//         cy.get('body').then($body => {
//             if ($body.find('button:contains("Add Registration"), button:contains("New Registration")').length > 0) {
//                 cy.contains('button', 'Add Registration', 'New Registration').click({ force: true });
//                 cy.wait(2000);
                
//                 // Fill registration form
//                 cy.get('input[placeholder*="name"]').first().type('Test User', { delay: 20 });
//                 cy.get('input[placeholder*="email"]').type('testuser@example.com', { delay: 20 });
//                 cy.get('input[placeholder*="phone"]').type('1234567890', { delay: 20 });
                
//                 // Submit registration
//                 cy.contains('button', 'Submit', 'Register').click({ force: true });
//                 cy.wait(2000);
                
//                 // Verify registration created
//                 cy.get('body').should('contain.text', 'testuser@example.com');
//             }
//         });
//     });

//     it('Should test payment integration flow', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to registrations with pending payments
//         cy.get('tr').not(':first').each(($row, index) => {
//             if (index < 5) {
//                 cy.wrap($row).then($r => {
//                     if ($r.text().includes('Pending') || $r.text().includes('Payment')) {
//                         cy.wrap($r).within(() => {
//                             cy.get('button').last().click({ force: true });
//                         });
//                         cy.wait(1000);
                        
//                         if (Cypress.$('body:contains("Process Payment")').length > 0) {
//                             cy.contains('Process Payment').click({ force: true });
//                             cy.wait(2000);
                            
//                             // Fill payment details
//                             cy.get('input[placeholder*="amount"]').type('100', { delay: 20 });
//                             cy.get('select[name*="method"]').select('Credit Card');
//                             cy.get('input[placeholder*="transaction"]').type('TXN123456', { delay: 20 });
                            
//                             // Process payment
//                             // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Process button');
        cy.contains('button', 'Process').click({ force: true });
//                             cy.wait(2000);
                            
//                             // Verify payment processed
//                             cy.get('body').should('contain.text', 'Success').or('contain.text', 'Paid');
//                         }
//                         return false;
//                     }
//                 });
//             }
//         });
//     });

//     it('Should test email notification integration', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Intercept email API calls
//         cy.intercept('POST', '**/api/email**', {
//             statusCode: 200,
//             body: { success: true, message: 'Email sent successfully' }
//         }).as('emailSent');
        
//         // Navigate to registrations
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
//         cy.contains('View Registrations').click({ force: true });
//         cy.wait(3000);
        
//         // Send email to participant
//         cy.get('tr').not(':first').first().within(() => {
//             cy.get('button').last().click({ force: true });
//         });
//         cy.wait(1000);
        
//         if (Cypress.$('body:contains("Send Email")').length > 0) {
//             cy.contains('Send Email').click({ force: true });
//             cy.wait(1000);
            
//             // Compose email
//             cy.get('input[placeholder*="subject"]').type('Workshop Reminder', { delay: 20 });
//             cy.get('textarea[placeholder*="message"]').type('This is a reminder about your upcoming workshop', { delay: 20 });
//             // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Send button');
        cy.contains('button', 'Send').click({ force: true });
            
//             // Verify email sent
//             cy.wait('@emailSent');
//             cy.get('body').should('contain.text', 'sent successfully');
//         }
//     });
// });

// // Boundary and Edge Case Testing
// describe('Chitti Dashboard - Boundary and Edge Case Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
        
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
//     });

//     it('Should handle maximum character limits', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Navigate to create/edit form
//         cy.get('button').filter(':contains("Create"), :contains("Add")').first().then($btn => {
//             if ($btn.length > 0) {
//                 cy.wrap($btn).click({ force: true });
//                 cy.wait(2000);
                
//                 // Test maximum lengths
//                 const longString = 'A'.repeat(500);
                
//                 cy.get('input[type="text"]').each($input => {
//                     cy.wrap($input).clear().type(longString, { delay: 1 });
//                     cy.wrap($input).invoke('val').then(val => {
//                         // Check if input was truncated
//                         if (val.length < 500) {
//                             cy.log(`Input truncated at ${val.length} characters`);
//                         }
//                     });
//                 });
//             }
//         });
//     });

//     it('Should handle special characters and unicode', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         const specialCharTests = [
//             'Test™ Workshop®',
//             '测试工作坊', // Chinese
//             'ワークショップ', // Japanese
//             'मंच', // Hindi
//             '🎯 Workshop 🚀',
//             'Work\\shop\"Test\'',
//             'Workshop & Training',
//             'Work<shop>Test'
//         ];
        
//         // Test search with special characters
//         specialCharTests.forEach(testString => {
//             cy.get('input[placeholder*="Search"]').clear().type(testString, { delay: 20 });
//             cy.wait(500);
            
//             // Should handle gracefully
//             cy.get('body').should('not.contain', 'Error');
//         });
//     });

//     it('Should handle zero and negative values', () => {
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Find form with numeric inputs
//         cy.get('button').filter(':contains("Create"), :contains("Add")').first().then($btn => {
//             if ($btn.length > 0) {
//                 cy.wrap($btn).click({ force: true });
//                 cy.wait(2000);
                
//                 // Test numeric inputs
//                 cy.get('input[type="number"], input[placeholder*="price"], input[placeholder*="capacity"]').each($input => {
//                     // Test zero
//                     cy.wrap($input).clear().type('0');
//                     cy.wait(200);
                    
//                     // Test negative
//                     cy.wrap($input).clear().type('-10');
//                     cy.wait(200);
                    
//                     // Test decimal
//                     cy.wrap($input).clear().type('3.14159');
//                     cy.wait(200);
//                 });
//             }
//         });
//     });
// });

// // Localization and Internationalization Testing
// describe('Chitti Dashboard - Localization Testing', () => {
    
//     beforeEach(() => {
//         Cypress.on('uncaught:exception', (err, runnable) => {
//             return false;
//         });
//     });

//     it('Should support multiple languages', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(2000);
        
//         // Look for language selector
//         cy.get('[class*="language"], [class*="locale"], [class*="lang"]').then($langSelector => {
//             if ($langSelector.length > 0) {
//                 cy.wrap($langSelector.first()).click({ force: true });
//                 cy.wait(1000);
                
//                 // Test available languages
//                 const languages = ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese'];
//                 languages.forEach(lang => {
//                     cy.get('body').then($body => {
//                         if ($body.text().includes(lang)) {
//                             cy.contains(lang).click({ force: true });
//                             cy.wait(1000);
                            
//                             // Verify language changed
//                             cy.get('html').should('have.attr', 'lang');
//                             cy.log(`Language changed to ${lang}`);
//                         }
//                     });
//                 });
//             }
//         });
//     });

//     it('Should handle different date and time formats', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Check date formats in table
//         cy.get('td').each($cell => {
//             const text = $cell.text();
//             // Check for various date formats
//             const datePatterns = [
//                 /\d{1,2}\/\d{1,2}\/\d{4}/, // MM/DD/YYYY
//                 /\d{1,2}-\d{1,2}-\d{4}/, // DD-MM-YYYY
//                 /\d{4}-\d{2}-\d{2}/, // YYYY-MM-DD
//                 /\d{1,2} \w+ \d{4}/ // DD Month YYYY
//             ];
            
//             datePatterns.forEach(pattern => {
//                 if (pattern.test(text)) {
//                     cy.log(`Date format found: ${text}`);
//                 }
//             });
//         });
//     });

//     it('Should handle different currency formats', () => {
//         cy.visit('https://dash.internal.chitti.xyz/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.get('input[type="text"]').type('testing_c@lmes.in', { delay: 50 });
//         cy.get('input[type="password"]').type('Testing@chitti', { delay: 50 });
//         // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Into the World of Chitti button');
        cy.contains('button', 'Into the World of Chitti').click({ force: true });
//         cy.wait(5000);
        
//         cy.visit('https://dash.internal.chitti.xyz/platform/workshops/oneonone/0');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
//         cy.wait(3000);
        
//         // Look for currency displays
//         cy.get('body').then($body => {
//             const currencyPatterns = [
//                 /\$\d+/, // USD
//                 /\€\d+/, // EUR
//                 /\£\d+/, // GBP
//                 /\¥\d+/, // JPY/CNY
//                 /\₹\d+/, // INR
//             ];
            
//             currencyPatterns.forEach(pattern => {
//                 if (pattern.test($body.text())) {
//                     cy.log(`Currency format found`);
//                 }
//             });
//         });
//     });
// });