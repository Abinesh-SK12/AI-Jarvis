/**
 * Enhanced AI API Integration Module
 * Supports GPT-4, Claude, and Groq APIs for intelligent failure analysis
 */

// File system operations are not available in browser context
// These will be handled differently

class AIAPIIntegration {
  constructor() {
    // Load API configurations - Prioritizing FREE APIs
    this.config = {
      gemini: {
        apiKey: Cypress.env('GEMINI_API_KEY') || process.env.GEMINI_API_KEY, // Set in .env file
        model: Cypress.env('GEMINI_MODEL') || 'gemini-1.5-flash',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models'
      },
      groq: {
        apiKey: Cypress.env('GROQ_API_KEY') || process.env.GROQ_API_KEY,
        model: 'llama3-70b-8192',
        endpoint: 'https://api.groq.com/openai/v1/chat/completions'
      },
      openai: {
        apiKey: Cypress.env('OPENAI_API_KEY') || process.env.OPENAI_API_KEY,
        model: Cypress.env('OPENAI_MODEL') || 'gpt-4-turbo-preview',
        endpoint: 'https://api.openai.com/v1/chat/completions'
      },
      anthropic: {
        apiKey: Cypress.env('ANTHROPIC_API_KEY') || process.env.ANTHROPIC_API_KEY,
        model: Cypress.env('CLAUDE_MODEL') || 'claude-3-opus-20240229',
        endpoint: 'https://api.anthropic.com/v1/messages'
      }
    };

    // Determine which API to use (priority order)
    this.activeAPI = this.determineActiveAPI();
    
    // Pattern recognition storage
    this.failurePatterns = this.loadFailurePatterns();
    
    // Fix suggestions cache
    this.fixSuggestionsCache = new Map();
  }

  determineActiveAPI() {
    // Prioritize FREE APIs first
    if (this.config.gemini.apiKey) return 'gemini';
    if (this.config.groq.apiKey) return 'groq';
    if (this.config.openai.apiKey) return 'openai';
    if (this.config.anthropic.apiKey) return 'anthropic';
    return null;
  }

  loadFailurePatterns() {
    // In browser context, we can't read files directly
    // Return default patterns or load from Cypress fixtures
    return {
      patterns: [],
      solutions: {}
    };
  }

  saveFailurePattern(pattern, solution) {
    this.failurePatterns.patterns.push(pattern);
    this.failurePatterns.solutions[pattern.id] = solution;
    
    // In browser context, store patterns in memory only
    // Could potentially use localStorage or send to a backend
    console.log('Pattern saved in memory:', pattern.id);
  }

  async analyzeFailureWithAI(failureData) {
    if (!this.activeAPI) {
      console.warn('No AI API configured. Please set OPENAI_API_KEY, ANTHROPIC_API_KEY, or GROQ_API_KEY');
      return this.getFallbackAnalysis(failureData);
    }

    // Check if we've seen this pattern before
    const knownPattern = this.findKnownPattern(failureData);
    if (knownPattern) {
      return this.formatKnownSolution(knownPattern, failureData);
    }

    // Prepare enhanced prompt with context
    const prompt = this.buildEnhancedPrompt(failureData);
    
    try {
      let analysis;
      switch (this.activeAPI) {
        case 'gemini':
          analysis = await this.callGemini(prompt, failureData);
          break;
        case 'groq':
          analysis = await this.callGroq(prompt, failureData);
          break;
        case 'openai':
          analysis = await this.callOpenAI(prompt, failureData);
          break;
        case 'anthropic':
          analysis = await this.callClaude(prompt, failureData);
          break;
      }

      // Process and enhance the analysis
      const enhancedAnalysis = await this.enhanceAnalysis(analysis, failureData);
      
      // Store pattern for future use
      this.storeNewPattern(failureData, enhancedAnalysis);
      
      return enhancedAnalysis;
    } catch (error) {
      console.error('AI API Error:', error);
      return this.getFallbackAnalysis(failureData);
    }
  }

  buildEnhancedPrompt(failureData) {
    const { testName, error, url, dom, screenshot, testCode, previousRuns } = failureData;
    
    return `You are JARVIS, an advanced AI debugging assistant for Cypress tests. Analyze this test failure and provide actionable insights.

# TEST FAILURE CONTEXT

## Test Information
- **Test Name**: ${testName}
- **URL**: ${url}
- **Timestamp**: ${failureData.timestamp}
- **Browser**: ${failureData.browser || 'Unknown'}

## Error Details
- **Type**: ${error.name}
- **Message**: ${error.message}
- **Stack Trace**: 
\`\`\`
${error.stack}
\`\`\`

## DOM Analysis
- **Elements Present**: ${this.extractDOMInfo(dom)}
- **Page State**: ${this.analyzePageState(dom)}

## Test Code (if available)
\`\`\`javascript
${testCode || 'Not available'}
\`\`\`

## Previous Test Runs
${previousRuns ? this.formatPreviousRuns(previousRuns) : 'First run'}

${screenshot ? '## Screenshot Analysis\nA screenshot was captured showing the failure state.' : ''}

# REQUIRED ANALYSIS

Please provide:

1. **Root Cause Analysis** (Be specific about what went wrong)
2. **Immediate Fix** (Code that can be applied right now)
3. **Long-term Solution** (Refactoring suggestions)
4. **Pattern Recognition** (Is this a recurring issue?)
5. **Self-Healing Suggestions** (Selectors or strategies that would be more resilient)

Format your response as structured JSON:
\`\`\`json
{
  "rootCause": "...",
  "immediateFix": {
    "description": "...",
    "code": "..."
  },
  "longTermSolution": "...",
  "pattern": {
    "type": "selector|timing|network|state",
    "confidence": 0.0-1.0
  },
  "selfHealing": {
    "selectors": ["..."],
    "strategy": "..."
  }
}
\`\`\``;
  }

  async callGemini(prompt, failureData) {
    try {
      const response = await cy.request({
        method: 'POST',
        url: `${this.config.gemini.endpoint}/${this.config.gemini.model}:generateContent?key=${this.config.gemini.apiKey}`,
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          contents: [{
            parts: [{
              text: prompt + '\n\nIMPORTANT: Respond with valid JSON only, following the exact format requested.'
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            topK: 1,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: 'HARM_CATEGORY_HARASSMENT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_HATE_SPEECH',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
              threshold: 'BLOCK_NONE'
            },
            {
              category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
              threshold: 'BLOCK_NONE'
            }
          ]
        },
        failOnStatusCode: false
      });

      if (response.status === 200 && response.body.candidates?.[0]?.content?.parts?.[0]?.text) {
        const content = response.body.candidates[0].content.parts[0].text;
        
        // Try to parse JSON from the response
        try {
          // Remove markdown code blocks if present
          const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
          if (jsonMatch) {
            return JSON.parse(jsonMatch[1]);
          }
          
          // Try direct JSON parse
          return JSON.parse(content);
        } catch (parseError) {
          // If JSON parsing fails, extract information from text
          return this.parseGeminiTextResponse(content);
        }
      } else {
        console.warn('Gemini API response issue:', response.status);
        throw new Error('Invalid Gemini response');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      // Fall back to Groq if Gemini fails
      if (this.config.groq.apiKey) {
        console.log('Falling back to Groq API...');
        return this.callGroq(prompt, failureData);
      }
      throw error;
    }
  }

  parseGeminiTextResponse(text) {
    // Enhanced parser for Gemini text responses
    const analysis = {
      rootCause: '',
      immediateFix: {
        description: '',
        code: ''
      },
      longTermSolution: '',
      pattern: {
        type: 'unknown',
        confidence: 0.5
      },
      selfHealing: {
        selectors: [],
        strategy: 'retry'
      }
    };

    // Extract root cause
    const rootCauseMatch = text.match(/root\s*cause[:\s]*([^\n.]+)/i);
    if (rootCauseMatch) analysis.rootCause = rootCauseMatch[1].trim();

    // Extract immediate fix
    const fixMatch = text.match(/immediate\s*fix[:\s]*([^\n]+)/i);
    if (fixMatch) analysis.immediateFix.description = fixMatch[1].trim();

    // Extract code snippets
    const codeMatch = text.match(/```(?:javascript)?\n([\s\S]*?)\n```/);
    if (codeMatch) analysis.immediateFix.code = codeMatch[1];

    // Extract pattern type
    if (text.includes('selector') || text.includes('element')) analysis.pattern.type = 'selector';
    else if (text.includes('timeout') || text.includes('timing')) analysis.pattern.type = 'timing';
    else if (text.includes('network') || text.includes('api')) analysis.pattern.type = 'network';
    else if (text.includes('state')) analysis.pattern.type = 'state';

    // Extract selectors
    const selectorMatches = text.match(/['"`]([.#\[][^'"`]+)['"`]/g);
    if (selectorMatches) {
      analysis.selfHealing.selectors = selectorMatches.map(s => s.replace(/['"`]/g, ''));
    }

    return analysis;
  }

  async callOpenAI(prompt, failureData) {
    const response = await cy.request({
      method: 'POST',
      url: this.config.openai.endpoint,
      headers: {
        'Authorization': `Bearer ${this.config.openai.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: this.config.openai.model,
        messages: [
          {
            role: 'system',
            content: 'You are JARVIS, an expert AI assistant specializing in Cypress test automation and debugging.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      }
    });

    return JSON.parse(response.body.choices[0].message.content);
  }

  async callClaude(prompt, failureData) {
    const response = await cy.request({
      method: 'POST',
      url: this.config.anthropic.endpoint,
      headers: {
        'x-api-key': this.config.anthropic.apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      },
      body: {
        model: this.config.anthropic.model,
        max_tokens: 2000,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3
      }
    });

    // Parse Claude's response
    const content = response.body.content[0].text;
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    return jsonMatch ? JSON.parse(jsonMatch[1]) : JSON.parse(content);
  }

  async callGroq(prompt, failureData) {
    const response = await cy.request({
      method: 'POST',
      url: this.config.groq.endpoint,
      headers: {
        'Authorization': `Bearer ${this.config.groq.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: this.config.groq.model,
        messages: [
          {
            role: 'system',
            content: 'You are JARVIS, an expert AI assistant. Respond with valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      }
    });

    const content = response.body.choices[0].message.content;
    try {
      return JSON.parse(content);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
      return jsonMatch ? JSON.parse(jsonMatch[1]) : this.parseTextResponse(content);
    }
  }

  parseTextResponse(text) {
    // Fallback parser for non-JSON responses
    return {
      rootCause: text.match(/root cause[:\s]*(.*?)(?:\n|$)/i)?.[1] || 'Analysis failed',
      immediateFix: {
        description: 'See analysis',
        code: ''
      },
      longTermSolution: 'Review test implementation',
      pattern: {
        type: 'unknown',
        confidence: 0.5
      },
      selfHealing: {
        selectors: [],
        strategy: 'retry'
      }
    };
  }

  async enhanceAnalysis(analysis, failureData) {
    // Add code snippets for immediate fixes
    if (analysis.immediateFix && !analysis.immediateFix.code) {
      analysis.immediateFix.code = this.generateFixCode(analysis, failureData);
    }

    // Add historical context
    analysis.historicalContext = await this.getHistoricalContext(failureData);

    // Add confidence score
    analysis.confidence = this.calculateConfidence(analysis, failureData);

    // Add auto-fix capability
    analysis.autoFixAvailable = this.canAutoFix(analysis);

    return analysis;
  }

  generateFixCode(analysis, failureData) {
    const { error } = failureData;
    
    // Generate specific fix code based on error type
    if (error.message.includes('not found')) {
      return `// Wait for element and use multiple selectors
cy.get('[data-testid="target"]', { timeout: 10000 })
  .should('be.visible')
  .click();

// Or use resilient selector strategy
cy.contains('Button Text').click();`;
    }
    
    if (error.message.includes('timeout')) {
      return `// Increase timeout and add retry logic
cy.get('selector', { timeout: 15000 })
  .should('exist')
  .should('be.visible')
  .click();`;
    }

    return '// Implement suggested fix from analysis';
  }

  findKnownPattern(failureData) {
    // Search for similar patterns in history
    for (const pattern of this.failurePatterns.patterns) {
      if (this.matchesPattern(failureData, pattern)) {
        return this.failurePatterns.solutions[pattern.id];
      }
    }
    return null;
  }

  matchesPattern(failureData, pattern) {
    // Implement pattern matching logic
    const errorSimilarity = failureData.error.name === pattern.errorType;
    const messageSimilarity = failureData.error.message.includes(pattern.messagePattern);
    const urlSimilarity = failureData.url.includes(pattern.urlPattern || '');
    
    return errorSimilarity && messageSimilarity && urlSimilarity;
  }

  storeNewPattern(failureData, analysis) {
    const pattern = {
      id: Date.now().toString(),
      errorType: failureData.error.name,
      messagePattern: failureData.error.message.substring(0, 50),
      urlPattern: new URL(failureData.url).pathname,
      timestamp: failureData.timestamp
    };
    
    this.saveFailurePattern(pattern, analysis);
  }

  extractDOMInfo(domHtml) {
    if (!domHtml) return 'No DOM available';
    
    const info = [];
    
    // Enhanced DOM analysis
    const elements = {
      forms: (domHtml.match(/<form[^>]*>/g) || []).length,
      buttons: (domHtml.match(/<button[^>]*>/g) || []).length,
      inputs: (domHtml.match(/<input[^>]*>/g) || []).length,
      links: (domHtml.match(/<a[^>]*>/g) || []).length,
      images: (domHtml.match(/<img[^>]*>/g) || []).length,
      divs: (domHtml.match(/<div[^>]*>/g) || []).length
    };
    
    Object.entries(elements).forEach(([type, count]) => {
      if (count > 0) info.push(`${count} ${type}`);
    });
    
    // Check for specific frameworks
    if (domHtml.includes('ng-')) info.push('Angular detected');
    if (domHtml.includes('data-react')) info.push('React detected');
    if (domHtml.includes('data-v-')) info.push('Vue detected');
    
    // Check for error states
    if (domHtml.match(/error|Error|failed|Failed/)) info.push('error messages visible');
    if (domHtml.match(/loading|Loading|spinner/)) info.push('loading state');
    if (domHtml.match(/disabled|Disabled/)) info.push('disabled elements');
    
    return info.join(', ') || 'standard page elements';
  }

  analyzePageState(dom) {
    if (!dom) return 'unknown';
    
    const states = [];
    
    if (dom.includes('loading') || dom.includes('spinner')) states.push('loading');
    if (dom.includes('error') || dom.includes('failed')) states.push('error');
    if (dom.includes('success') || dom.includes('complete')) states.push('success');
    if (dom.includes('modal') || dom.includes('dialog')) states.push('modal-open');
    if (dom.includes('disabled')) states.push('has-disabled-elements');
    
    return states.length > 0 ? states.join(', ') : 'normal';
  }

  formatPreviousRuns(previousRuns) {
    return previousRuns.map(run => 
      `- ${run.timestamp}: ${run.status} (${run.duration}ms)`
    ).join('\n');
  }

  async getHistoricalContext(failureData) {
    // Load historical data for this test
    const historyFile = path.join(__dirname, '..', 'test-history.json');
    
    if (fs.existsSync(historyFile)) {
      const history = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
      const testHistory = history[failureData.testName] || [];
      
      return {
        totalRuns: testHistory.length,
        failureRate: testHistory.filter(r => r.status === 'failed').length / testHistory.length,
        averageDuration: testHistory.reduce((sum, r) => sum + r.duration, 0) / testHistory.length,
        lastSuccess: testHistory.filter(r => r.status === 'passed').pop()
      };
    }
    
    return null;
  }

  calculateConfidence(analysis, failureData) {
    let confidence = 0.5;
    
    // Increase confidence based on analysis completeness
    if (analysis.rootCause) confidence += 0.1;
    if (analysis.immediateFix?.code) confidence += 0.2;
    if (analysis.pattern?.type !== 'unknown') confidence += 0.1;
    if (analysis.selfHealing?.selectors?.length > 0) confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  canAutoFix(analysis) {
    return analysis.immediateFix?.code && 
           analysis.confidence > 0.7 && 
           analysis.pattern?.type !== 'unknown';
  }

  getFallbackAnalysis(failureData) {
    // Enhanced fallback analysis with better heuristics
    const { error } = failureData;
    let pattern = { type: 'unknown', confidence: 0.3 };
    let selectors = [];
    let strategy = 'retry';
    let immediateFix = { description: '', code: '' };

    // Determine pattern based on error message
    if (error.message.includes('not found') || error.message.includes('does not exist')) {
      pattern = { type: 'selector', confidence: 0.7 };
      immediateFix.description = 'Element selector may have changed. Try using a more stable selector.';
      immediateFix.code = `// Use data-testid or stable class\ncy.get('[data-testid="element"]').click();`;
      selectors = ['[data-testid]', '[role]', 'button', 'a'];
      strategy = 'multiple-selectors';
    } else if (error.message.includes('timeout')) {
      pattern = { type: 'timing', confidence: 0.6 };
      immediateFix.description = 'Increase timeout or add wait conditions';
      immediateFix.code = `cy.get('selector', { timeout: 15000 }).should('be.visible');`;
      strategy = 'wait-retry';
    } else if (error.message.includes('network') || error.message.includes('500') || error.message.includes('404')) {
      pattern = { type: 'network', confidence: 0.6 };
      immediateFix.description = 'Network or API issue detected';
      immediateFix.code = `cy.intercept('GET', '/api/**').as('apiCall');\ncy.wait('@apiCall');`;
      strategy = 'network-retry';
    }

    return {
      rootCause: `Test failed with ${failureData.error.name}: ${failureData.error.message}`,
      immediateFix: {
        description: 'Review the error message and stack trace',
        code: '// Manual fix required'
      },
      longTermSolution: 'Consider adding better error handling and retry logic',
      pattern: {
        type: 'unknown',
        confidence: 0.3
      },
      selfHealing: {
        selectors: [],
        strategy: 'manual'
      },
      confidence: 0.3,
      autoFixAvailable: false,
      fallbackMode: true
    };
  }

  formatKnownSolution(solution, failureData) {
    return {
      ...solution,
      appliedToTest: failureData.testName,
      fromCache: true,
      confidence: Math.min(solution.confidence * 1.1, 1.0) // Boost confidence for known solutions
    };
  }

  // Auto-fix application method
  async applyAutoFix(analysis, failureData) {
    if (!analysis.autoFixAvailable) {
      return { success: false, reason: 'No auto-fix available' };
    }

    try {
      // Read the test file
      const testFile = failureData.testFile;
      const testContent = fs.readFileSync(testFile, 'utf8');
      
      // Apply the fix
      const fixedContent = this.injectFix(testContent, analysis.immediateFix.code, failureData);
      
      // Write back the fixed content
      fs.writeFileSync(testFile, fixedContent);
      
      return {
        success: true,
        fixApplied: analysis.immediateFix.description,
        code: analysis.immediateFix.code
      };
    } catch (error) {
      return {
        success: false,
        reason: error.message
      };
    }
  }

  injectFix(testContent, fixCode, failureData) {
    // Intelligent code injection based on failure location
    const lines = testContent.split('\n');
    const errorLine = this.findErrorLine(lines, failureData);
    
    if (errorLine !== -1) {
      // Insert fix before the problematic line
      lines.splice(errorLine, 0, fixCode);
    }
    
    return lines.join('\n');
  }

  findErrorLine(lines, failureData) {
    // Find the line number from stack trace
    const stackMatch = failureData.error.stack.match(/:(\d+):\d+/);
    if (stackMatch) {
      return parseInt(stackMatch[1]) - 1;
    }
    return -1;
  }
}

// Export singleton instance
module.exports = new AIAPIIntegration();