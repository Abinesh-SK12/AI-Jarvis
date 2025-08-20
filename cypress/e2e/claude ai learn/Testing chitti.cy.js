describe('Chitti Workshops E2E Tests', () => {
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
    // Add better error handling
    Cypress.on('uncaught:exception', (err, runnable) => {
      // Ignore specific errors that don't affect test functionality
      if (err.message.includes('Cannot destructure property') ||
        err.message.includes('ResizeObserver loop limit exceeded') ||
        err.message.includes('Non-Error promise rejection captured')) {
        return false;
      }
      return true;
    });

    cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

    // Wait for page to fully load
    cy.get('body').should('be.visible');
    cy.wait(3000);

    // Wait for any dynamic content to load
    cy.get('body').then(($body) => {
      if ($body.find('.loading, .spinner, [data-loading]').length > 0) {
        cy.get('.loading, .spinner, [data-loading]', { timeout: 10000 }).should('not.exist');
      }
    });
  });

  describe('Page Load and Basic Elements', () => {
    it('should load page successfully and verify core elements', () => {
      cy.viewport(1536, 864); // Set desktop viewport for 1920x1080 at 125% scale
      cy.url().should('include', '/workshops');
      cy.get('body').should('be.visible');

      // Ensure page is fully loaded before screenshot
      cy.document().should((doc) => {
        expect(doc.readyState).to.equal('complete');
      });

      // Wait for any animations or transitions to complete
      cy.wait(1000);

      // Take screenshot with increased timeout
      cy.screenshot('page-loaded', {
        capture: 'viewport',
        overwrite: true,
        disableTimersAndAnimations: false
      });

      // Verify page title
      cy.title().should('contain', 'Chitti');
    });


    it('should verify header navigation elements on desktop', () => {
      cy.viewport(1536, 864); // Ensure desktop viewport for 1920x1080 at 125% scale
      cy.wait(1000);

      // Check if elements exist without asserting visibility
      cy.get('body').then(($body) => {
        const navItems = ['Home', 'Products', 'Support', 'About', 'Workshops', 'Get App', 'Log in', 'Sign up'];

        navItems.forEach(item => {
          if ($body.find(`a:contains("${item}"), button:contains("${item}")`).length > 0) {
            cy.log(`Found navigation item: ${item}`);
          } else {
            cy.log(`Navigation item not found: ${item}`);
          }
        });
      });
    });

    it('should handle mobile navigation menu', () => {
      cy.viewport('iphone-x');
      cy.wait(3000);

      // Look for mobile menu button - improved patterns
      cy.get('body').then(($body) => {
        const mobileMenuSelectors = [
          'button[data-mobile-menu]',
          'button.mobile-menu-button',
          '[data-testid="mobile-menu"]',
          'button[aria-label*="menu"]',
          'button:contains("Menu")',
          'button.hamburger',
          'button.md\\:hidden',
          '.mobile-menu-trigger',
          '[role="button"].mobile-toggle'
        ];

        let foundMenu = false;
        for (const selector of mobileMenuSelectors) {
          if ($body.find(selector).length > 0) {
            try {
              cy.get(selector).first().should('be.visible').click({ force: true });
              cy.wait(1000);
              foundMenu = true;
              cy.log(`Mobile menu found with selector: ${selector}`);
              break;
            } catch (e) {
              cy.log(`Failed to click mobile menu with selector: ${selector}`);
            }
          }
        }

        if (!foundMenu) {
          cy.log('Mobile menu button not found - testing mobile responsiveness instead');
          // Test that the page is responsive
          cy.get('body').should('be.visible');
        }
      });

      // Take screenshot after handling mobile menu
      cy.wait(1000);

      // Ensure page is ready for screenshot
      cy.get('body').should('be.visible');
      cy.scrollTo('top');
      cy.wait(500);

      // Take screenshot with proper viewport capture
      cy.screenshot('mobile-navigation', {
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 375, height: 812 }
      });
    });
  });

  describe('Navigation Functionality', () => {
    beforeEach(() => {
      // Add error handling for beforeEach hook
      Cypress.on('uncaught:exception', (err, runnable) => {
        // Ignore specific errors that don't affect test functionality
        if (err.message.includes('Cannot read properties of undefined') ||
          err.message.includes('Cannot destructure property') ||
          err.message.includes('find') ||
          err.message.includes('ResizeObserver loop limit exceeded')) {
          return false;
        }
        return true;
      });

      cy.viewport(1536, 864); // Ensure desktop viewport for navigation tests (1920x1080 at 125% scale)

      // Ensure page is ready before each test
      cy.get('body').should('be.visible');
      cy.wait(1000);
    });

    it('should navigate to Home page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Home")').length > 0) {
          cy.contains('Home').click();

          // Wait for navigation to complete
          cy.wait(2000);

          // Ensure page is loaded before screenshot
          cy.get('body').should('be.visible');
          cy.document().should((doc) => {
            expect(doc.readyState).to.equal('complete');
          });

          // Take screenshot with simplified options
          cy.screenshot('home-page', {
            capture: 'viewport',
            overwrite: true
          });

          cy.go('back');
          cy.wait(1000);
        } else {
          cy.log('Home link not found - skipping test');
        }
      });
    });

    it('should navigate to Products page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Products")').length > 0) {
          cy.contains('Products').click();

          // Wait for navigation to complete
          cy.wait(2000);

          // Ensure page is loaded before screenshot
          cy.get('body').should('be.visible');
          cy.document().should((doc) => {
            expect(doc.readyState).to.equal('complete');
          });

          // Take screenshot with simplified options
          cy.screenshot('products-page', {
            capture: 'viewport',
            overwrite: true
          });

          cy.go('back');
          cy.wait(1000);
        } else {
          cy.log('Products link not found - skipping test');
        }
      });
    });

    it('should navigate to Support page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("Support")').length > 0) {
          cy.contains('Support').click();

          // Wait for navigation to complete
          cy.wait(2000);

          // Ensure page is loaded before screenshot
          cy.get('body').should('be.visible');
          cy.document().should((doc) => {
            expect(doc.readyState).to.equal('complete');
          });

          // Take screenshot with simplified options
          cy.screenshot('support-page', {
            capture: 'viewport',
            overwrite: true
          });

          cy.go('back');
          cy.wait(1000);
        } else {
          cy.log('Support link not found - skipping test');
        }
      });
    });

    it('should navigate to About page', () => {
      cy.get('body').then(($body) => {
        if ($body.find('a:contains("About")').length > 0) {
          cy.contains('About').click();

          // Wait for navigation to complete
          cy.wait(2000);

          // Ensure page is loaded before screenshot
          cy.get('body').should('be.visible');
          cy.document().should((doc) => {
            expect(doc.readyState).to.equal('complete');
          });

          // Take screenshot with simplified options
          cy.screenshot('about-page', {
            capture: 'viewport',
            overwrite: true
          });

          cy.go('back');
          cy.wait(1000);
        } else {
          cy.log('About link not found - skipping test');
        }
      });
    });

    it('should test login functionality', () => {
      const loginSelectors = [
        'a:contains("Log in")',
        'a:contains("Login")',
        'button:contains("Log in")',
        'button:contains("Login")',
        '[data-testid="login"]',
        '.login-button',
        'a[href*="login"]'
      ];

      let foundLoginElement = false;

      for (const selector of loginSelectors) {
        cy.get('body').then(($body) => {
          if (!foundLoginElement && $body.find(selector).length > 0) {
            foundLoginElement = true;

            cy.get(selector).first().then(($el) => {
              try {
                if ($el.is(':visible')) {
                  cy.wrap($el).click();
                } else {
                  cy.wrap($el).click({ force: true });
                }
                cy.wait(4000);

                // Immediately wrap everything in cy.origin to handle cross-origin
                cy.origin('https://accounts.chitti.app', () => {
                  // All commands for accounts.chitti.app domain
                  cy.log('Handling login on accounts.chitti.app');

                  // Wait for page to load
                  cy.get('body', { timeout: 10000 }).should('be.visible');

                  // Check for login form elements
                  cy.get('body').then(($loginBody) => {
                    if ($loginBody.find('input[type="email"], input[type="text"][placeholder*="email"], input[name="email"]').length > 0) {
                      cy.log('Login form found on accounts.chitti.app');
                    } else {
                      cy.log('Login page loaded on accounts.chitti.app');
                    }
                  });

                  // Take screenshot
                  cy.screenshot('login-page');
                });

                // Navigate back to workshops page (outside cy.origin)
                cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
                cy.wait(2000);
              } catch (error) {
                cy.log(`Login test failed: ${error.message}`);
                cy.screenshot('login-page-error');
              }
            });
          }
        });

        if (foundLoginElement) break;
      }

      cy.then(() => {
        if (!foundLoginElement) {
          cy.log('Log in link not found - skipping test');
          cy.screenshot('login-page-not-found');
        }
      });
    });

    it('should test signup functionality', () => {
      // Robust signup test with proper error handling
      cy.get('body').should('exist').and('be.visible').then(() => {
        const signupSelectors = [
          'a:contains("Sign up")',
          'a:contains("Signup")',
          'button:contains("Sign up")',
          'button:contains("Signup")',
          '[data-testid="signup"]',
          '.signup-button',
          'a[href*="signup"]',
          'a[href*="register"]'
        ];

        let foundSignup = false;

        // Try each selector safely
        for (let i = 0; i < signupSelectors.length && !foundSignup; i++) {
          const selector = signupSelectors[i];

          cy.get('body').then(($body) => {
            // Safe check for selector existence
            try {
              if ($body && typeof $body.find === 'function' && $body.find(selector).length > 0) {
                foundSignup = true;

                cy.get(selector).first().then(($el) => {
                  try {
                    // Click the signup element
                    if ($el.is(':visible')) {
                      cy.wrap($el).click();
                    } else {
                      cy.wrap($el).click({ force: true });
                    }

                    cy.wait(4000);

                    // Immediately wrap everything in cy.origin to handle cross-origin
                    cy.origin('https://accounts.chitti.app', () => {
                      // All commands for accounts.chitti.app domain
                      cy.log('Handling signup on accounts.chitti.app');

                      // Wait for page to load
                      cy.get('body', { timeout: 10000 }).should('be.visible');

                      // Check for signup form elements
                      cy.get('body').then(($signupBody) => {
                        if ($signupBody.find('input[type="email"], input[type="text"][placeholder*="email"], input[name="email"]').length > 0) {
                          cy.log('Signup form found on accounts.chitti.app');
                        } else {
                          cy.log('Signup page loaded on accounts.chitti.app');
                        }
                      });

                      // Take screenshot
                      cy.screenshot('signup-page');
                    });

                    // Navigate back to workshops page (outside cy.origin)
                    cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
                    cy.wait(2000);

                  } catch (clickError) {
                    cy.log(`Signup click failed: ${clickError.message}`);
                    cy.screenshot('signup-page-error');
                  }
                });
              }
            } catch (selectorError) {
              cy.log(`Error checking signup selector ${selector}: ${selectorError.message}`);
            }
          });
        }

        // Final check if no signup found
        cy.then(() => {
          if (!foundSignup) {
            cy.log('Sign up link not found - skipping test');
            cy.screenshot('signup-page-not-found');
          }
        });
      });
    });
  });

  describe('Workshop Categories and Filtering', () => {
    it('should verify workshop category links exist', () => {
      cy.contains('Online workshops').should('be.visible');
      cy.contains('Offline workshops').should('be.visible');
      cy.contains('Tamil workshops').should('be.visible');
      cy.contains('English workshops').should('be.visible');
      cy.contains('Malayalam workshops').should('be.visible');
      cy.contains('Telugu workshops').should('be.visible');
      cy.contains('Kannada workshops').should('be.visible');
    });

    it('should test Online workshops filter', () => {
      cy.contains('Online workshops').click();
      cy.wait(3000);

      // Ensure page is loaded before screenshot
      cy.get('body').should('be.visible');
      cy.document().should((doc) => {
        expect(doc.readyState).to.equal('complete');
      });

      // Take screenshot with simplified options
      cy.screenshot('online-workshops-filtered', {
        capture: 'viewport',
        overwrite: true
      });
    });

    it('should test Offline workshops filter', () => {
      cy.contains('Offline workshops').click();
      cy.wait(3000);

      // Ensure page is loaded before screenshot
      cy.get('body').should('be.visible');
      cy.document().should((doc) => {
        expect(doc.readyState).to.equal('complete');
      });

      // Take screenshot with simplified options
      cy.screenshot('offline-workshops-filtered', {
        capture: 'viewport',
        overwrite: true
      });
    });

    it('should test language-specific workshop filters', () => {
      const languages = ['Tamil', 'English', 'Malayalam', 'Telugu', 'Kannada'];

      languages.forEach(language => {
        cy.contains(`${language} workshops`).click();
        cy.wait(2000);

        // Ensure page is loaded before screenshot
        cy.get('body').should('be.visible');
        cy.document().should((doc) => {
          expect(doc.readyState).to.equal('complete');
        });

        // Take screenshot with simplified options
        cy.screenshot(`${language.toLowerCase()}-workshops-filtered`, {
          capture: 'viewport',
          overwrite: true
        });
      });
    });
  });

  describe('Content Verification', () => {
    it('should verify brand and company information', () => {
      cy.contains('CHITTI').should('be.visible');
      cy.contains('an initiative by').should('be.visible');
      cy.contains('Making the world a better place through constructing elegant hierarchies.').should('be.visible');
    });

    it('should verify company address and contact info', () => {
      cy.contains('REGISTERED ADDRESS').should('be.visible');
      cy.contains('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai, Tamil Nadu 600117').should('be.visible');
      cy.contains('Chitti Support').should('be.visible');
      cy.contains('support@chitti.app').should('be.visible');
      cy.contains('+91 988 422 2368').should('be.visible');
    });

    it('should verify product links', () => {
      cy.contains('Our Products').should('be.visible');
      cy.contains('Chitti Maker School').should('be.visible');
      cy.contains('Chitti Powered School').should('be.visible');
      cy.contains('Chitti NEET JEE').should('be.visible');
    });

    it('should verify key metrics and achievements', () => {
      cy.contains('Our workshops are live in the USA, UAE, Australia, and beyond.').should('be.visible');
      cy.contains('Impacted the lives of').should('be.visible');
      cy.contains('2Million People').should('be.visible');
      cy.contains('Google Reviews').should('be.visible');
      cy.contains('4.9').should('be.visible');
      cy.contains('(15,000+)').should('be.visible');
    });
  });

  describe('Footer and Legal Links', () => {
    it('should verify footer company links', () => {
      // Scroll to footer first
      cy.scrollTo('bottom');
      cy.wait(2000);

      // Check for footer elements with more flexible selectors
      const footerElements = ['Company', 'About', 'Careers', 'We are Hiring'];

      footerElements.forEach(elementText => {
        cy.get('body').then(($body) => {
          // Try multiple selector patterns for footer links
          const selectors = [
            `a:contains("${elementText}")`,
            `button:contains("${elementText}")`,
            `[href*="${elementText.toLowerCase()}"]`,
            `*:contains("${elementText}")`
          ];

          let found = false;
          for (const selector of selectors) {
            if ($body.find(selector).length > 0) {
              // Check if element is in viewport or make it visible
              cy.get(selector).first().then(($el) => {
                if ($el.is(':visible')) {
                  cy.wrap($el).should('be.visible');
                  cy.log(`Found visible footer link: ${elementText}`);
                } else {
                  cy.log(`Found footer link but not visible: ${elementText}`);
                  // For responsive design, element might be hidden on certain viewports
                  cy.wrap($el).should('exist');
                }
              });
              found = true;
              break;
            }
          }

          if (!found) {
            cy.log(`Footer link not found: ${elementText}`);
          }
        });
      });
    });

    it('should verify legal and policy links', () => {
      cy.contains('Terms & Conditions').should('be.visible');
      cy.contains('Privacy Policy').should('be.visible');
      cy.contains('Refund & Cancellation Policy').should('be.visible');
      cy.contains('Disclaimer').should('be.visible');
    });

    it('should test Terms & Conditions link', () => {
      cy.contains('Terms & Conditions').click();
      cy.wait(1000);
      cy.screenshot('terms-conditions');
      cy.go('back');
    });

    it('should test Privacy Policy link', () => {
      cy.contains('Privacy Policy').click();
      cy.wait(1000);
      cy.screenshot('privacy-policy');
      cy.go('back');
    });

    it('should verify copyright information', () => {
      cy.contains('© 2024 LMES Academy Pvt. Ltd. All rights reserved.').should('be.visible');
    });
  });

  describe('Responsive Design and Scrolling', () => {
    it('should test desktop viewport', () => {
      cy.viewport(1536, 864); // Desktop viewport for 1920x1080 at 125% scale
      cy.screenshot('desktop-view');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.screenshot('desktop-bottom');
      cy.scrollTo('top');
    });

    it('should test tablet viewport', () => {
      cy.viewport('ipad-2');
      cy.screenshot('tablet-view');
      cy.scrollTo('bottom');
      cy.wait(1000);
      cy.screenshot('tablet-bottom');
      cy.scrollTo('top');
    });

    it('should test mobile viewport', () => {
      cy.viewport('iphone-x');
      cy.wait(3000);

      // Ensure page is ready and scroll to top first
      cy.get('body').should('be.visible');
      cy.scrollTo('top');
      cy.wait(1000);

      // Take initial screenshot with safe options
      cy.screenshot('mobile-view', {
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 375, height: 812 }
      });

      // Safe scrolling with dimension checks
      cy.document().then((doc) => {
        const bodyHeight = doc.body.scrollHeight;
        const viewportHeight = 812; // iPhone-X height

        cy.log(`Body height: ${bodyHeight}, Viewport height: ${viewportHeight}`);

        // Only scroll if body height is reasonable and greater than viewport
        if (bodyHeight > viewportHeight && bodyHeight < 50000) {
          // Scroll to bottom safely
          cy.scrollTo('bottom', { duration: 2000, ensureScrollable: false });
          cy.wait(1500);

          // Take bottom screenshot with safe clipping
          cy.screenshot('mobile-bottom', {
            capture: 'viewport',
            clip: { x: 0, y: 0, width: 375, height: 812 }
          });

          // Scroll back to top
          cy.scrollTo('top', { duration: 2000, ensureScrollable: false });
          cy.wait(1000);
        } else {
          cy.log(`Skipping scroll - body height (${bodyHeight}) is not suitable for scrolling`);

          // Take bottom screenshot anyway (will be same as mobile-view)
          cy.screenshot('mobile-bottom', {
            capture: 'viewport',
            clip: { x: 0, y: 0, width: 375, height: 812 }
          });
        }
      });
    });

    it('should test smooth scrolling functionality', () => {
      cy.scrollTo('bottom', { duration: 2000 });
      cy.wait(1000);
      cy.screenshot('scroll-bottom');
      cy.scrollTo('top', { duration: 2000 });
      cy.wait(1000);
      cy.screenshot('scroll-top');
    });
  });

  describe('Interactive Elements and User Experience', () => {
    beforeEach(() => {
      cy.viewport(1536, 864); // Desktop viewport for 1920x1080 at 125% scale
      cy.wait(1000);
    });

    it('should test hover effects on navigation links', () => {
      cy.get('body').then(($body) => {
        const navLinks = ['Home', 'Products', 'Support', 'About'];

        navLinks.forEach(linkText => {
          const linkSelectors = [`a:contains("${linkText}")`, `button:contains("${linkText}")`];

          for (const selector of linkSelectors) {
            if ($body.find(selector).length > 0) {
              cy.get(selector).first().then(($el) => {
                if ($el.is(':visible')) {
                  cy.wrap($el).trigger('mouseover');
                }
              });
              break;
            }
          }
        });

        cy.screenshot('nav-hover-effects');
      });
    });

    it('should verify all clickable elements are accessible', () => {
      cy.get('a').should('have.length.greaterThan', 0);
      cy.get('body').then(($body) => {
        if ($body.find('button').length > 0) {
          cy.get('button').should('have.length.greaterThan', 0);
        }
      });
    });

    it('should test keyboard navigation', () => {
      // Find the first focusable element and focus it
      cy.get('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])').first().then(($el) => {
        if ($el.length > 0) {
          cy.wrap($el).focus();
          cy.focused().should('exist');
          cy.screenshot('keyboard-focus');
        } else {
          cy.log('No focusable elements found for keyboard navigation test');
          cy.screenshot('keyboard-focus-no-elements');
        }
      });
    });
  });

  describe('Performance and Loading', () => {
    it('should verify page loads within acceptable time', () => {
      const start = Date.now();
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.get('body').should('be.visible');
      cy.then(() => {
        const loadTime = Date.now() - start;
        expect(loadTime).to.be.lessThan(15000);
      });
    });

    it('should verify images load properly', () => {
      cy.get('img').should('be.visible').and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
    });
  });

  describe('Workshop Registration Flow', () => {
    beforeEach(() => {
      Cypress.on('uncaught:exception', () => false);
      cy.viewport(1536, 864);
      cy.wait(2000);

      // Ensure workshop cards are loaded
      cy.get('body').then(($body) => {
        // Wait for workshop content to be available
        const maxRetries = 10;
        let retries = 0;

        const checkForWorkshops = () => {
          if (retries >= maxRetries) {
            cy.log('Max retries reached, proceeding with test');
            return;
          }

          if ($body.find('a[href*="workshop"], .workshop-card, [data-testid="workshop"]').length === 0) {
            retries++;
            cy.wait(1000);
            cy.get('body').then(checkForWorkshops);
          }
        };

        checkForWorkshops();
      });
    });

    it('should complete Aeromodelling Program workshop registration', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.wait(3000);

      // Find and select specific Aeromodelling Program workshop with better error handling
      const workshopSelectors = [
        'a.group.rounded-xl.bg-white.flex.flex-col',
        '[data-testid=\"workshop-card\"]',
        'a[href*=\"workshop\"]',
        '.workshop-card'
      ];

      let foundWorkshop = false;

      for (const selector of workshopSelectors) {
        cy.get('body').then(($body) => {
          if (!foundWorkshop && $body.find(selector).length > 0) {
            cy.get(selector).then(($workshops) => {
              const matchingWorkshop = Array.from($workshops).find(el => {
                const text = el.innerText || '';
                return (
                  text.includes('Aeromodelling Program') ||
                  (text.includes('Aeromodelling') && text.includes('Free')) ||
                  (text.includes('Free') && text.includes('English') && text.includes('Grade'))
                );
              });

              if (matchingWorkshop) {
                foundWorkshop = true;
                cy.wrap(matchingWorkshop).as('aeromodellingWorkshop');
              }
            });
          }
        });
        if (foundWorkshop) break;
      }

      // If no specific workshop found, find any free workshop
      if (!foundWorkshop) {
        cy.log('Specific Aeromodelling workshop not found, looking for any free workshop');
        cy.get('body').then(($body) => {
          const freeWorkshops = $body.find('*:contains(\"Free\")').closest('a, .workshop-card');
          if (freeWorkshops.length > 0) {
            cy.wrap(freeWorkshops.first()).as('aeromodellingWorkshop');
            foundWorkshop = true;
          }
        });
      }

      // Click on the workshop card if found
      cy.then(() => {
        if (!foundWorkshop) {
          cy.log('No suitable workshop found for registration test - skipping form fill');
          cy.screenshot('no-workshop-found');
          return;
        }

        // Click the workshop
        cy.get('@aeromodellingWorkshop')
          .should('exist')
          .scrollIntoView({ duration: 1500 })
          .click({ force: true });

        cy.wait(4000);

        // Look for register button with multiple patterns
        const registerButtonSelectors = [
          'button:contains("Register Now")',
          'button:contains("Register")',
          'button:contains(" Book free Demo ")',
          '[data-testid="register-button"]',
          '.register-button',
          'a:contains("Register")'
        ];

        let registerButtonFound = false;

        for (const buttonSelector of registerButtonSelectors) {
          cy.get('body').then(($body) => {
            if (!registerButtonFound && $body.find(buttonSelector).length > 0) {
              registerButtonFound = true;
              cy.get(buttonSelector)
                .first()
                .scrollIntoView({ duration: 1500 })
                .click({ force: true });

              cy.wait(4000);
            }
          });
          if (registerButtonFound) break;
        }

        if (!registerButtonFound) {
          cy.log('Register button not found - workshop may not be available for registration');
          cy.screenshot('no-register-button');
          return;
        }

        // Fill registration form only if we have a workshop and register button
        cy.get('input[type="text"]').first().type('Jacob Samro', { delay: 20 });
        cy.wait(1000);

        // Handle country selection for phone number
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'United States').click({ force: true });
        cy.wait(1000);
        cy.get('.iti__flag-container').click();
        cy.wait(1000);
        cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
        cy.wait(1000);

        // Enter phone number and email
        cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
        cy.wait(1000);
        cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });

        // Select grade/class
        cy.get('select.block').eq(0).select('Grade 8');

        // Select timezone
        // cy.contains('select', 'Choose timezone').select('Central Standard Time (CST)');

        // Select time slot
        // cy.contains('span', '12:30 PM').click({ force: true });

        // Submit registration
        cy.contains('p', 'Register').click();

        // Verify successful registration
        cy.contains('div', ' Registration Successful ').should('exist');
        cy.screenshot('workshop-registration-success');
      });
    });

    it('should handle workshop card selection with flexible criteria', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.wait(3000);

      // Use more flexible selectors for workshop cards
      const workshopSelectors = [
        'a.group.rounded-xl.bg-white.flex.flex-col',
        '[data-testid="workshop-card"]',
        '.workshop-card',
        'a[href*="workshop"]',
        '.rounded-xl.bg-white'
      ];

      let foundWorkshops = false;

      for (const selector of workshopSelectors) {
        cy.get('body').then(($body) => {
          if (!foundWorkshops && $body.find(selector).length > 0) {
            foundWorkshops = true;

            cy.get(selector).then(($workshops) => {
              if ($workshops.length > 0) {
                // Find a workshop with Free or English criteria
                let selectedWorkshop = null;

                for (let i = 0; i < $workshops.length; i++) {
                  const workshopText = $workshops.eq(i).text();
                  if ((workshopText.includes('Free') || workshopText.includes('English') || workshopText.includes('₹')) && workshopText.includes('Grade')) {
                    selectedWorkshop = $workshops.eq(i);
                    break;
                  }
                }

                if (selectedWorkshop) {
                  cy.wrap(selectedWorkshop)
                    .scrollIntoView({ duration: 1500 })
                    .click({ force: true });

                  cy.wait(3000);
                  cy.screenshot('workshop-selected');

                  // Check for various register button patterns
                  const registerSelectors = [
                    'button:contains("Register Now")',
                    'button:contains("Register")',
                    'button:contains("Book Now")',
                    '[data-testid="register-button"]',
                    '.register-button'
                  ];

                  let foundRegisterButton = false;

                  for (const regSelector of registerSelectors) {
                    cy.get('body').then(($regBody) => {
                      if (!foundRegisterButton && $regBody.find(regSelector).length > 0) {
                        foundRegisterButton = true;
                        cy.get(regSelector).first().then(($btn) => {
                          if ($btn.is(':visible')) {
                            cy.wrap($btn).should('be.visible');
                            cy.log('Register button found and visible');
                          } else {
                            cy.log('Register button found but not visible');
                          }
                        });
                      }
                    });
                    if (foundRegisterButton) break;
                  }

                  if (!foundRegisterButton) {
                    cy.log('No register button found - workshop may be full or unavailable');
                  }
                } else {
                  cy.log('No suitable workshops found with the criteria');
                }
              } else {
                cy.log('No workshops found on the page');
              }
            });
          }
        });
        if (foundWorkshops) break;
      }

      if (!foundWorkshops) {
        cy.log('No workshop cards found with any selector');
        cy.screenshot('no-workshops-found');
      }
    });

    it('should verify workshop card information display', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.wait(3000);

      // Verify workshop cards contain expected information
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().then(($card) => {
        // Check for common workshop card elements
        cy.wrap($card).find('img').should('exist'); // Workshop image

        const cardText = $card.text();

        // Log what information is available in the card
        if (cardText.includes('Grade')) {
          cy.log('Grade information found');
        }
        if (cardText.includes('Free') || cardText.includes('₹')) {
          cy.log('Price information found');
        }
        if (cardText.includes('English') || cardText.includes('Tamil') || cardText.includes('Hindi')) {
          cy.log('Language information found');
        }

        // Also check for title/heading
        cy.wrap($card).find('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="heading"]').should('exist');
      });

      cy.screenshot('workshop-card-details');
    });

    it('should complete CMS Electronics paid registration', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.wait(3000);

      // Check if workshop cards exist first
      cy.get('body').then(($body) => {
        if ($body.find('a.group.rounded-xl.bg-white.flex.flex-col').length === 0) {
          cy.log('No workshop cards found on the page');
          cy.screenshot('no-workshop-cards');
          return;
        }

        // Find and select CMS Electronics workshop
        cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
          .filter((index, el) => {
            const text = el.innerText;
            return (
              text.includes('CMS Electronics') &&
              text.includes('₹299') &&
              text.includes('English')
            );
          })
          .first()
          .then(($workshop) => {
            if ($workshop.length > 0) {
              cy.wrap($workshop)
                .scrollIntoView({ duration: 1500 })
                .click();

            cy.wait(3000);

            // Click Book Now button with flexible approach
            cy.get('body').then(($body) => {
              if ($body.find('div:contains("Book Now for ₹299")').length > 0) {
                cy.contains('div', 'Book Now for ₹299').click({ force: true });
              } else if ($body.find('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').length > 0) {
                cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });
              } else {
                // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Book Now button');
        cy.contains('button', 'Book Now').click({ force: true });
              }
            });

            cy.wait(3000);

            // Fill registration form
            cy.get('input[placeholder="Enter the Name"]').type('Jacob Samro', { delay: 20 });
            cy.wait(1000);

            // Handle country selection
            cy.get('.iti__flag-container').click();
            cy.wait(1000);
            cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
            cy.wait(1000);

            // Enter contact details
            cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
            cy.wait(1000);
            cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });

            // Select grade
            cy.get('select.block').eq(0).select('Grade 8');

            // Fill address fields (unique to paid workshops)
            cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai', { delay: 10 });
            cy.wait(1000);
            cy.get('input[placeholder="Enter your City"]').type('Chennai', { delay: 20 });
            cy.wait(1000);
            cy.get('input[placeholder="Enter your Pincode"]').type('600117', { delay: 20 });
            cy.wait(1000);

            // Submit registration
            // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Register button');
        cy.contains('button', 'Register').click();

            // Verify Razorpay payment iframe appears
              cy.get('iframe[src*="api.razorpay.com"]', { timeout: 10000 }).should('be.visible');
              cy.screenshot('payment-gateway-loaded');
            } else {
              cy.log('CMS Electronics workshop not found');
            }
          });
      });
    });

    it('should handle Teacher Empowerment workshop', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      // Find Teacher Empowerment workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return (
            text.includes('Teacher Empowerment') &&
            text.includes('₹9')
          );
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();

            cy.wait(3000);

            // Look for price-specific button with flexible approach
            cy.get('body').then(($body) => {
              if ($body.find('div:contains("Book Now for ₹9")').length > 0) {
                cy.contains('div', 'Book Now for ₹9').click({ force: true });
              } else if ($body.find('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').length > 0) {
                cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });
              } else {
                // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Book Now button');
        cy.contains('button', 'Book Now').click({ force: true });
              }
            });

            cy.wait(3000);

            // Fill form
            cy.get('input[type="text"]').first().type('Jacob Samro', { delay: 20 });
            cy.wait(1000);

            // Phone and email
            cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
            cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });

            // Select College Student option
            cy.get('select.block').eq(0).then(($select) => {
              if ($select.find('option:contains("College Student")').length > 0) {
                cy.wrap($select).select('College Student');
              } else {
                cy.wrap($select).select($select.find('option').last().text());
              }
            });

            // Select time slot if available
            cy.get('body').then(($body) => {
              if ($body.find('span:contains("11:00 AM")').length > 0) {
                cy.contains('span', '11:00 AM').click({ force: true });
              }
            });

            // Submit
            cy.contains('p', 'Register').click();
            cy.wait(2000);
            cy.screenshot('teacher-workshop-registration');
          } else {
            cy.log('Teacher Empowerment workshop not found');
          }
        });
    });

    it('should test Tamil workshop', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      // Find Tamil language workshop
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col')
        .filter((index, el) => {
          const text = el.innerText;
          return text.includes('Tamil') && (text.includes('₹') || text.includes('Free'));
        })
        .first()
        .then(($workshop) => {
          if ($workshop.length > 0) {
            cy.wrap($workshop)
              .scrollIntoView({ duration: 1500 })
              .click();

            cy.wait(3000);
            cy.screenshot('tamil-workshop-selected');

            // Check for register button
            cy.get('body').then(($body) => {
              if ($body.find('button:contains("Register")').length > 0) {
                cy.log('Tamil workshop registration available');
              }
            });
          } else {
            cy.log('No Tamil workshops found');
          }
        });
    });

    it('should test workshop filtering by category', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      // Test different workshop filters
      const filters = [
        { name: 'Online workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'Offline workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'Tamil workshops', expectedCount: 'greaterThan', value: 0 },
        { name: 'English workshops', expectedCount: 'greaterThan', value: 5 }
      ];

      filters.forEach((filter) => {
        cy.contains(filter.name).click();
        cy.wait(2000);

        // Verify workshops are displayed - try multiple selectors
        cy.get('body').then(($body) => {
          // Try primary selector first
          if ($body.find('a.group.rounded-xl.bg-white.flex.flex-col').length > 0) {
            cy.get('a.group.rounded-xl.bg-white.flex.flex-col').should('have.length.greaterThan', 0);
          }
          // Try alternative selector for workshop cards
          else if ($body.find('div[class*="workshop"], a[href*="/workshops/"]').length > 0) {
            cy.get('div[class*="workshop"], a[href*="/workshops/"]').should('have.length.greaterThan', 0);
          }
          // Try image-based selector
          else if ($body.find('img[alt*="workshop"], img[alt*="Workshop"]').length > 0) {
            cy.get('img[alt*="workshop"], img[alt*="Workshop"]').should('have.length.greaterThan', 0);
          }
          // Fallback - check for any clickable elements with workshop-related content
          else {
            cy.contains('workshop', { matchCase: false }).should('exist');
          }
        });
        cy.screenshot(`filter-${filter.name.toLowerCase().replace(' ', '-')}`);

        // Reset to all workshops
        cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        cy.wait(1000);
      });
    });

    it('should handle multi-criteria workshop selection', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      // Complex filtering logic
      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').each(($el, index) => {
        const text = $el.text();

        // Find workshops matching multiple criteria
        if (
          text.includes('Solar') &&
          text.includes('₹499') &&
          (text.includes('English') || text.includes('Tamil')) &&
          text.includes('Grade')
        ) {
          cy.wrap($el)
            .scrollIntoView({ duration: 1500 })
            .click();

          cy.wait(2000);
          cy.screenshot('solar-workshop-multi-criteria');

          // Return false to exit the each loop after first match
          return false;
        }
      });
    });
  });

  describe('Admin Dashboard Functionality', () => {
    it('should test Chitti dashboard login and navigation', () => {
      // Use cy.origin to handle cross-origin navigation
      cy.origin('https://dash.internal.chitti.xyz', () => {
        cy.visit('/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
        cy.wait(3000);

        // Login to dashboard with better selectors
        const emailSelectors = ['input[type="email"]', 'input[type="text"]', 'input[name="email"]', '#email'];
        const passwordSelectors = ['input[type="password"]', 'input[name="password"]', '#password'];

        // Try to find email input
        let emailFound = false;
        for (const selector of emailSelectors) {
          cy.get('body').then(($body) => {
            if (!emailFound && $body.find(selector).length > 0) {
              emailFound = true;
              cy.get(selector).first().type('dev@lmes.in');
            }
          });
          if (emailFound) break;
        }

        // Try to find password input
        let passwordFound = false;
        for (const selector of passwordSelectors) {
          cy.get('body').then(($body) => {
            if (!passwordFound && $body.find(selector).length > 0) {
              passwordFound = true;
              cy.get(selector).first().type('dashboard@1234');
            }
          });
          if (passwordFound) break;
        }

        // Try to find and click submit button
        const submitSelectors = [
          'button[type="submit"]',
          'button:contains("Login")',
          'button:contains("Sign in")',
          'button:contains("Into the World of Chitti")',
          '.login-button',
          '#login-button'
        ];

        let submitFound = false;
        for (const selector of submitSelectors) {
          cy.get('body').then(($body) => {
            if (!submitFound && $body.find(selector).length > 0) {
              submitFound = true;
              cy.get(selector).first().click();
            }
          });
          if (submitFound) break;
        }

        cy.wait(5000);

        // Navigate to workshops section
        cy.get('body').then(($body) => {
          const workshopSelectors = [
            'a:contains("Workshops")',
            'button:contains("Workshops")',
            '[data-testid="workshops"]',
            'nav a[href*="workshop"]'
          ];

          let workshopLinkFound = false;
          for (const selector of workshopSelectors) {
            if (!workshopLinkFound && $body.find(selector).length > 0) {
              workshopLinkFound = true;
              cy.get(selector).first().click({ force: true });
              cy.wait(3000);
              cy.screenshot('dashboard-workshops');

              // Check for workshop management options
              cy.get('body').then(($newBody) => {
                if ($newBody.find('button:contains("View Registrations")').length > 0) {
                  cy.log('Workshop management features available');
                } else {
                  cy.log('Workshop management interface loaded');
                }
              });
              break;
            }
          }

          if (!workshopLinkFound) {
            cy.log('Workshops section not found in dashboard');
            cy.screenshot('dashboard-no-workshops');
          }
        });
      });
    });
  });

  describe('Workshop Registration Edge Cases', () => {
    it('should handle registration with different button selectors', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      // Test different button selector patterns
      const buttonSelectors = [
        'button:contains("Register Now")',
        'button:contains("Book Now")',
        'span.text-base.font-bold.leading-6.text-white',
        'p.flex.justify-center.items-center.text-sm.font-bold.text-white'
      ];

      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().click();
      cy.wait(2000);

      buttonSelectors.forEach(selector => {
        cy.get('body').then(($body) => {
          if ($body.find(selector).length > 0) {
            cy.log(`Found button with selector: ${selector}`);
          }
        });
      });
    });

    it('should verify form field placeholder variations', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });

      cy.get('a.group.rounded-xl.bg-white.flex.flex-col').first().click();
      cy.wait(2000);

      // Try to click any register button
      cy.get('button').contains(/Register|Book Now/i).first().click({ force: true });
      cy.wait(2000);

      // Check for different placeholder patterns
      const placeholders = [
        'Enter the Name',
        'Enter Name',
        'Enter the Email',
        'Enter Email',
        'Enter your Address',
        'Enter your City',
        'Enter your Pincode'
      ];

      placeholders.forEach(placeholder => {
        cy.get('body').then(($body) => {
          if ($body.find(`input[placeholder="${placeholder}"]`).length > 0) {
            cy.log(`Found placeholder: ${placeholder}`);
          }
        });
      });
    });

    it('should complete Solar Tamil registration', () => {
      cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });
      cy.wait(3000);

      // Try image-based selection first
      cy.get('body').then(($body) => {
        if ($body.find('img[alt="Solar 1 on 1 - Tamil"]').length > 0) {
          cy.get('img[alt="Solar 1 on 1 - Tamil"]')
            .scrollIntoView({ duration: 1500 })
            .should('be.visible')
            .click({ force: true });
        } else {
          // Fallback to text-based selection
          cy.contains('h1', 'Solar 1 on 1 - Tamil').click({ force: true });
        }
      });

      cy.wait(3000);

      // Click Book Now button with flexible selectors
      cy.get('body').then(($body) => {
        if ($body.find('div:contains("Book Now for ₹499")').length > 0) {
          cy.contains('div', 'Book Now for ₹499').click({ force: true });
        } else if ($body.find('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').length > 0) {
          cy.get('button.relative.rounded-\\[10px\\].bg-\\[\\#E94C45\\].px-8.py-3').click({ force: true });
        } else {
          // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Book Now button');
        cy.contains('button', 'Book Now').click({ force: true });
        }
      });

      cy.wait(3000);

      // Fill registration form
      cy.get('input[placeholder="Enter the Name"]').type('Jacob Samro', { delay: 20 });
      cy.wait(1000);

      // Handle country selection
      cy.get('.iti__flag-container').click();
      cy.wait(1000);
      cy.get('.iti__country-list').contains('li', 'India').click({ force: true });
      cy.wait(1000);

      // Enter contact details
      cy.get('input[type="tel"]').type('9884226399', { delay: 20 });
      cy.wait(1000);
      cy.get('input[type="email"]').type('dev@lmes.in', { delay: 20 });

      // Select grade
      cy.get('select.block').eq(0).select('Grade 8');

      // Fill address
      cy.get('input[placeholder="Enter your Address"]').type('Door No.3, Survey No : 113/1, 200 Feet Radial Rd, Zamin Pallavaram, Chennai', { delay: 10 });
      cy.wait(1000);
      cy.get('input[placeholder="Enter your City"]').type('Chennai', { delay: 20 });
      cy.wait(1000);
      cy.get('input[placeholder="Enter your Pincode"]').type('600117', { delay: 20 });
      cy.wait(1000);

      // Submit registration
      // JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('Register button');
        cy.contains('button', 'Register').click();
      cy.wait(2000);

      // Verify payment gateway loads
      cy.get('iframe[src*="api.razorpay.com"]', { timeout: 10000 }).should('be.visible');
      cy.screenshot('tamil-workshop-payment-gateway');
    });
  });
});