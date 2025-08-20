/**
 * Self-Healing Test Agent
 * Automatically analyzes test failures, fixes issues, and reruns tests
 */

// Note: File system operations are handled by Cypress tasks
// This runs in the browser context, not Node.js

class SelfHealingAgent {
  constructor() {
    this.maxRetries = 3;
    this.failurePatterns = new Map();
    this.fixes = new Map();
    this.generatedTestsPath = 'cypress/e2e/generated';
    
    this.initializeFailurePatterns();
  }

  /**
   * Initialize common failure patterns and their fixes
   */
  initializeFailurePatterns() {
    // Element not found errors
    this.failurePatterns.set(/Timed out retrying after \d+ms: Expected to find element: `(.+)`, but never found it/, {
      type: 'element_not_found',
      fix: this.fixElementNotFound.bind(this)
    });

    // Element visibility issues
    this.failurePatterns.set(/This element `(.+)` is not visible/, {
      type: 'element_not_visible',
      fix: this.fixElementVisibility.bind(this)
    });

    // Click interception issues
    this.failurePatterns.set(/`cy.click\(\)` failed because this element is covered by another element/, {
      type: 'element_covered',
      fix: this.fixElementCovered.bind(this)
    });

    // Network/API failures
    this.failurePatterns.set(/cy\.request\(\) failed|Network request failed/, {
      type: 'network_failure',
      fix: this.fixNetworkFailure.bind(this)
    });

    // Assertion failures
    this.failurePatterns.set(/expected '(.+)' to (equal|contain|have\.text) '(.+)'/, {
      type: 'assertion_failure',
      fix: this.fixAssertionFailure.bind(this)
    });

    // Timeout issues
    this.failurePatterns.set(/cy\.wait\(\) timed out/, {
      type: 'timeout',
      fix: this.fixTimeout.bind(this)
    });
  }

  /**
   * Analyze test failure and determine fix strategy
   */
  analyzeFailure(error, testCode) {
    console.log('🔍 Analyzing test failure...');
    
    for (const [pattern, handler] of this.failurePatterns) {
      const match = error.message.match(pattern);
      if (match) {
        console.log(`✅ Identified failure type: ${handler.type}`);
        return {
          type: handler.type,
          match: match,
          fix: handler.fix,
          originalError: error
        };
      }
    }
    
    // Unknown failure type
    console.log('❓ Unknown failure type, will try generic fixes');
    return {
      type: 'unknown',
      fix: this.fixGeneric.bind(this),
      originalError: error
    };
  }

  /**
   * Fix element not found errors
   */
  async fixElementNotFound(failureInfo, testCode) {
    const selector = failureInfo.match[1];
    console.log(`🔧 Fixing element not found: ${selector}`);
    
    const fixes = [];
    
    // Strategy 1: Add wait before element selection
    fixes.push({
      description: 'Add explicit wait',
      code: testCode.replace(
        `cy.get('${selector}')`,
        `cy.wait(2000).get('${selector}', { timeout: 10000 })`
      )
    });
    
    // Strategy 2: Try alternative selectors
    const alternativeSelectors = this.generateAlternativeSelectors(selector);
    for (const altSelector of alternativeSelectors) {
      fixes.push({
        description: `Use alternative selector: ${altSelector}`,
        code: testCode.replace(selector, altSelector)
      });
    }
    
    // Strategy 3: Add force option for actions
    if (testCode.includes('.click()')) {
      fixes.push({
        description: 'Add force option to click',
        code: testCode.replace('.click()', '.click({ force: true })')
      });
    }
    
    return fixes;
  }

  /**
   * Fix element visibility issues
   */
  async fixElementVisibility(failureInfo, testCode) {
    console.log('🔧 Fixing element visibility issue');
    
    return [
      {
        description: 'Scroll element into view',
        code: testCode.replace(
          /cy\.get\((.+?)\)/g,
          'cy.get($1).scrollIntoView()'
        )
      },
      {
        description: 'Wait for element to be visible',
        code: testCode.replace(
          /cy\.get\((.+?)\)/g,
          'cy.get($1).should("be.visible")'
        )
      },
      {
        description: 'Use force option',
        code: testCode.replace(
          /\.(click|type|select)\(/g,
          '.$1({ force: true }'
        )
      }
    ];
  }

  /**
   * Fix element covered issues
   */
  async fixElementCovered(failureInfo, testCode) {
    console.log('🔧 Fixing element covered issue');
    
    return [
      {
        description: 'Use force click',
        code: testCode.replace('.click()', '.click({ force: true })')
      },
      {
        description: 'Click at specific position',
        code: testCode.replace('.click()', '.click("center")')
      },
      {
        description: 'Clear overlays before clicking',
        code: `cy.get('body').click(0, 0); // Clear any overlays\n${testCode}`
      }
    ];
  }

  /**
   * Fix network failures
   */
  async fixNetworkFailure(failureInfo, testCode) {
    console.log('🔧 Fixing network failure');
    
    return [
      {
        description: 'Add retry with exponential backoff',
        code: testCode.replace(
          /cy\.request\((.+?)\)/g,
          'cy.request($1).retry(3, { delay: 1000 })'
        )
      },
      {
        description: 'Add timeout to request',
        code: testCode.replace(
          /cy\.request\({/g,
          'cy.request({ timeout: 30000, '
        )
      },
      {
        description: 'Add intercept with stub',
        code: `cy.intercept('GET', '**/api/**', { fixture: 'mock-response.json' }).as('apiCall');\n${testCode}`
      }
    ];
  }

  /**
   * Fix assertion failures
   */
  async fixAssertionFailure(failureInfo, testCode) {
    const [, actual, assertion, expected] = failureInfo.match;
    console.log(`🔧 Fixing assertion: expected '${actual}' to ${assertion} '${expected}'`);
    
    return [
      {
        description: 'Add wait before assertion',
        code: testCode.replace(
          /\.should\(/g,
          '.wait(1000).should('
        )
      },
      {
        description: 'Use contains instead of exact match',
        code: testCode.replace(
          `.should('have.text', '${expected}')`,
          `.should('contain', '${expected}')`
        )
      },
      {
        description: 'Make assertion case-insensitive',
        code: testCode.replace(
          /\.should\('(have\.text|contain)', '(.+?)'\)/g,
          (match, assertion, text) => `.invoke('text').then(text => expect(text.toLowerCase()).to.include('${text.toLowerCase()}'))`
        )
      }
    ];
  }

  /**
   * Fix timeout issues
   */
  async fixTimeout(failureInfo, testCode) {
    console.log('🔧 Fixing timeout issue');
    
    return [
      {
        description: 'Increase timeout',
        code: testCode.replace(
          /cy\.wait\((\d+)\)/g,
          (match, ms) => `cy.wait(${parseInt(ms) * 2}, { timeout: ${parseInt(ms) * 3} })`
        )
      },
      {
        description: 'Replace wait with proper assertion',
        code: testCode.replace(
          /cy\.wait\(\d+\)/g,
          'cy.get("body").should("be.visible")'
        )
      }
    ];
  }

  /**
   * Generic fixes for unknown failures
   */
  async fixGeneric(failureInfo, testCode) {
    console.log('🔧 Applying generic fixes');
    
    return [
      {
        description: 'Add retries to commands',
        code: `Cypress.config('defaultCommandTimeout', 10000);\n${testCode}`
      },
      {
        description: 'Add viewport size',
        code: `cy.viewport(1280, 720);\n${testCode}`
      },
      {
        description: 'Clear cookies and local storage',
        code: `cy.clearCookies();\ncy.clearLocalStorage();\n${testCode}`
      }
    ];
  }

  /**
   * Generate alternative selectors
   */
  generateAlternativeSelectors(selector) {
    const alternatives = [];
    
    // If it's a class selector, try ID or data-test
    if (selector.startsWith('.')) {
      const className = selector.substring(1);
      alternatives.push(`[class*="${className}"]`);
      alternatives.push(`[data-test="${className}"]`);
      alternatives.push(`[data-testid="${className}"]`);
    }
    
    // If it's an ID selector, try class or data attributes
    if (selector.startsWith('#')) {
      const id = selector.substring(1);
      alternatives.push(`.${id}`);
      alternatives.push(`[id="${id}"]`);
      alternatives.push(`[data-test="${id}"]`);
    }
    
    // Don't add jQuery-specific pseudo-selectors as they're not valid for querySelector
    
    return alternatives;
  }

  /**
   * Execute test with retry and self-healing
   */
  async executeWithHealing(testFunction, testName) {
    let retryCount = 0;
    let lastError = null;
    let testCode = testFunction.toString();
    
    while (retryCount < this.maxRetries) {
      try {
        console.log(`\n🏃 Running test: ${testName} (Attempt ${retryCount + 1}/${this.maxRetries})`);
        
        // Execute the test
        await eval(`(${testCode})()`);
        
        console.log(`✅ Test passed on attempt ${retryCount + 1}`);
        
        // Save successful version if it was healed
        if (retryCount > 0) {
          this.saveHealedTest(testName, testCode, lastError);
        }
        
        return { success: true, attempts: retryCount + 1 };
        
      } catch (error) {
        console.log(`❌ Test failed on attempt ${retryCount + 1}: ${error.message}`);
        lastError = error;
        
        if (retryCount < this.maxRetries - 1) {
          // Analyze failure and get fixes
          const failureAnalysis = this.analyzeFailure(error, testCode);
          const possibleFixes = await failureAnalysis.fix(failureAnalysis, testCode);
          
          if (possibleFixes.length > 0) {
            // Try the first fix
            const fix = possibleFixes[0];
            console.log(`🔄 Applying fix: ${fix.description}`);
            testCode = fix.code;
          } else {
            console.log('❌ No fixes available');
            break;
          }
        }
        
        retryCount++;
      }
    }
    
    // Test failed after all retries
    return { 
      success: false, 
      attempts: retryCount,
      error: lastError,
      finalCode: testCode
    };
  }

  /**
   * Save healed test to file
   */
  saveHealedTest(testName, healedCode, originalError) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const filename = `healed_${testName.replace(/\s+/g, '_')}_${timestamp}.cy.js`;
    
    const content = `/**
 * Auto-healed test
 * Original failure: ${originalError.message}
 * Generated at: ${new Date().toISOString()}
 */

describe('Auto-healed: ${testName}', () => {
  it('${testName} (healed)', () => {
    ${healedCode}
  });
});

/* Original error details:
${JSON.stringify(originalError, null, 2)}
*/`;
    
    // Use Cypress task to write file
    cy.task('writeFile', {
      path: `${this.generatedTestsPath}/${filename}`,
      content: content
    });
    console.log(`💾 Saved healed test to: ${filename}`);
  }

  /**
   * Generate new test cases based on page analysis
   */
  async generateTestCases(pageUrl) {
    console.log(`🤖 Generating test cases for: ${pageUrl}`);
    
    const testCases = [];
    
    // Visit the page and analyze
    cy.visit(pageUrl);
    
    // Find all interactive elements
    const elements = await this.findInteractiveElements();
    
    // Generate test for each element
    for (const element of elements) {
      const testCase = this.generateTestForElement(element, pageUrl);
      if (testCase) {
        testCases.push(testCase);
      }
    }
    
    // Save generated tests
    this.saveGeneratedTests(testCases, pageUrl);
    
    return testCases;
  }

  /**
   * Find interactive elements on the page
   */
  async findInteractiveElements() {
    const elements = [];
    
    // Find buttons
    cy.get('button:visible').each(($el) => {
      elements.push({
        type: 'button',
        selector: this.getSelector($el),
        text: $el.text().trim(),
        element: $el
      });
    });
    
    // Find links
    cy.get('a:visible').each(($el) => {
      elements.push({
        type: 'link',
        selector: this.getSelector($el),
        text: $el.text().trim(),
        href: $el.attr('href'),
        element: $el
      });
    });
    
    // Find inputs
    cy.get('input:visible, textarea:visible, select:visible').each(($el) => {
      elements.push({
        type: 'input',
        selector: this.getSelector($el),
        inputType: $el.attr('type') || 'text',
        placeholder: $el.attr('placeholder'),
        element: $el
      });
    });
    
    return elements;
  }

  /**
   * Get best selector for element
   */
  getSelector(element) {
    // Priority: data-test > id > class > tag
    if (element.attr('data-test')) {
      return `[data-test="${element.attr('data-test')}"]`;
    }
    if (element.attr('data-testid')) {
      return `[data-testid="${element.attr('data-testid')}"]`;
    }
    if (element.attr('id')) {
      return `#${element.attr('id')}`;
    }
    if (element.attr('class')) {
      const classes = element.attr('class').split(' ').filter(c => c.length > 0);
      if (classes.length > 0) {
        return `.${classes[0]}`;
      }
    }
    return element.prop('tagName').toLowerCase();
  }

  /**
   * Generate test for specific element
   */
  generateTestForElement(element, pageUrl) {
    switch (element.type) {
      case 'button':
        return {
          name: `Should click button "${element.text}"`,
          code: `
cy.visit('${pageUrl}');
cy.get('${element.selector}').should('be.visible');
cy.get('${element.selector}').click();
// Add assertion based on expected behavior`
        };
        
      case 'link':
        return {
          name: `Should navigate via link "${element.text}"`,
          code: `
cy.visit('${pageUrl}');
cy.get('${element.selector}').should('be.visible');
cy.get('${element.selector}').should('have.attr', 'href', '${element.href}');
cy.get('${element.selector}').click();
cy.url().should('include', '${element.href}');`
        };
        
      case 'input':
        return {
          name: `Should interact with ${element.inputType} input`,
          code: `
cy.visit('${pageUrl}');
cy.get('${element.selector}').should('be.visible');
cy.get('${element.selector}').type('Test input value');
cy.get('${element.selector}').should('have.value', 'Test input value');`
        };
        
      default:
        return null;
    }
  }

  /**
   * Save generated tests to file
   */
  saveGeneratedTests(testCases, pageUrl) {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const pageName = pageUrl.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `generated_${pageName}_${timestamp}.cy.js`;
    
    const content = `/**
 * Auto-generated test cases
 * Page: ${pageUrl}
 * Generated at: ${new Date().toISOString()}
 * Total test cases: ${testCases.length}
 */

describe('Auto-generated tests for ${pageUrl}', () => {
${testCases.map(tc => `
  it('${tc.name}', () => {
    ${tc.code}
  });
`).join('\n')}
});`;
    
    // Use Cypress task to write file
    cy.task('writeFile', {
      path: `${this.generatedTestsPath}/${filename}`,
      content: content
    });
    console.log(`💾 Saved ${testCases.length} generated tests to: ${filename}`);
  }
}

// Export singleton instance
module.exports = new SelfHealingAgent();