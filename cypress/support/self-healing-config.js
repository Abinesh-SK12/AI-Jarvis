/**
 * Self-Healing Agent Configuration
 */

module.exports = {
  // Enable/disable self-healing globally
  enabled: true,
  
  // Maximum number of retry attempts
  maxRetries: 3,
  
  // Delay between retries (ms)
  retryDelay: 1000,
  
  // Save healed tests
  saveHealedTests: true,
  
  // Generate test cases automatically
  autoGenerateTests: true,
  
  // Paths
  paths: {
    generatedTests: 'cypress/e2e/generated',
    healedTests: 'cypress/e2e/healed',
    reports: 'cypress/reports/self-healing'
  },
  
  // Failure patterns and fixes
  customPatterns: [
    {
      pattern: /Custom error pattern/,
      type: 'custom_error',
      fix: (failureInfo, testCode) => {
        // Custom fix logic
        return [{
          description: 'Custom fix',
          code: testCode.replace('old', 'new')
        }];
      }
    }
  ],
  
  // Elements to ignore during test generation
  ignoreSelectors: [
    '[data-test="ignore"]',
    '.advertisement',
    '.cookie-banner'
  ],
  
  // Notification settings
  notifications: {
    onSuccess: true,
    onFailure: true,
    onHealing: true,
    webhook: process.env.SELF_HEALING_WEBHOOK
  },
  
  // Reporting
  reporting: {
    generateReport: true,
    includeScreenshots: true,
    includeVideos: true,
    format: 'html' // 'html', 'json', 'junit'
  },
  
  // AI-powered suggestions (future enhancement)
  ai: {
    enabled: false,
    model: 'gpt-4',
    apiKey: process.env.OPENAI_API_KEY,
    maxSuggestions: 3
  },
  
  // Performance settings
  performance: {
    parallel: true,
    workers: 4,
    timeout: 30000
  },
  
  // Fix strategies in order of preference
  fixStrategies: [
    'wait_and_retry',
    'alternative_selectors',
    'force_actions',
    'scroll_into_view',
    'clear_overlays',
    'increase_timeout',
    'mock_network',
    'refresh_page'
  ],
  
  // Test generation settings
  testGeneration: {
    maxTestsPerPage: 50,
    includeNegativeTests: true,
    includeAccessibilityTests: true,
    includePerfTests: false,
    testTimeout: 10000
  }
};