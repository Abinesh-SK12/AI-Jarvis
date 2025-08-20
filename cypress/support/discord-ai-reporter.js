/**
 * Discord AI Debug Assistant & Reporter
 * Automatically sends test failures with screenshots and AI analysis to Discord
 */

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// Discord webhook URL from environment
const DISCORD_WEBHOOK = Cypress.env('DISCORD_WEBHOOK_URL') || 
  'https://discordapp.com/api/webhooks/1403245289996943360/JrXeSUh8f1wi8vOkPBtPfITuhxsB1yuTeU1NdOg4XnESh9CEBSG_embYnGkBl5PONxUz';

// Store for failure data
let discordReportData = {
  testName: '',
  error: null,
  screenshot: null,
  ocrText: '',
  aiAnalysis: '',
  url: '',
  timestamp: null
};

/**
 * Send failure report to Discord with screenshot
 */
async function sendToDiscord(data) {
  try {
    console.log('📨 Sending failure report to Discord...');
    
    // Create Discord embed message
    const embed = {
      title: `🚨 Test Failed: ${data.testName}`,
      description: data.aiAnalysis || 'AI analysis in progress...',
      color: 0xff0000, // Red color for failures
      fields: [
        {
          name: '❌ Error',
          value: `\`\`\`${data.error?.message?.substring(0, 500) || 'Unknown error'}\`\`\``,
          inline: false
        },
        {
          name: '🌐 URL',
          value: data.url || 'N/A',
          inline: true
        },
        {
          name: '⏰ Time',
          value: new Date(data.timestamp).toLocaleString(),
          inline: true
        },
        {
          name: '👁️ OCR Text Preview',
          value: `\`\`\`${data.ocrText?.substring(0, 300) || 'No text extracted'}...\`\`\``,
          inline: false
        }
      ],
      footer: {
        text: 'Cypress AI Debug Assistant',
        icon_url: 'https://www.cypress.io/images/layouts/cypress-logo.svg'
      },
      timestamp: data.timestamp
    };
    
    // Send to Discord
    await axios.post(DISCORD_WEBHOOK, {
      username: 'Cypress AI Assistant',
      avatar_url: 'https://www.cypress.io/images/layouts/cypress-logo.svg',
      embeds: [embed]
    });
    
    console.log('✅ Discord notification sent successfully!');
    
    // If we have a screenshot, send it as a follow-up
    if (data.screenshot) {
      await sendScreenshotToDiscord(data.screenshot, data.testName);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Failed to send Discord notification:', error);
    return false;
  }
}

/**
 * Send screenshot to Discord
 */
async function sendScreenshotToDiscord(screenshotPath, testName) {
  try {
    // Check if file exists
    if (!fs.existsSync(screenshotPath)) {
      console.log('⚠️ Screenshot file not found:', screenshotPath);
      return;
    }
    
    const form = new FormData();
    form.append('file', fs.createReadStream(screenshotPath));
    form.append('payload_json', JSON.stringify({
      content: `📸 Screenshot for: **${testName}**`
    }));
    
    await axios.post(DISCORD_WEBHOOK, form, {
      headers: form.getHeaders()
    });
    
    console.log('✅ Screenshot sent to Discord!');
  } catch (error) {
    console.error('❌ Failed to send screenshot:', error);
  }
}

/**
 * Cypress command to manually send to Discord
 */
Cypress.Commands.add('sendToDiscord', (message, screenshot = null) => {
  const data = {
    testName: Cypress.currentTest?.title || 'Manual Report',
    error: { message: message },
    screenshot: screenshot,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
  
  return sendToDiscord(data);
});

/**
 * Enhanced JARVIS analyze with Discord integration
 */
Cypress.Commands.add('analyzeAndReport', (customMessage = '') => {
  cy.log('🤖 AI Debug Assistant: Starting analysis...');
  
  const screenshotName = `discord-debug-${Date.now()}`;
  const reportData = {
    testName: Cypress.currentTest?.title || 'Unknown Test',
    url: '',
    timestamp: new Date().toISOString(),
    error: { message: customMessage || 'Test failure detected' }
  };
  
  // Capture screenshot
  cy.screenshot(screenshotName, { 
    capture: 'viewport',
    overwrite: true
  });
  
  cy.wait(1000);
  
  // Get current URL
  cy.url().then(url => {
    reportData.url = url;
  });
  
  // Extract text with OCR
  cy.task('extractTextFromScreenshot', { 
    screenshotPath: screenshotName
  }).then((ocrText) => {
    reportData.ocrText = ocrText;
    
    // Get AI analysis
    const apiKey = Cypress.env('GROQ_API_KEY');
    const prompt = `
      Analyze this test failure for Discord notification:
      
      Test: ${reportData.testName}
      URL: ${reportData.url}
      Error: ${reportData.error.message}
      
      OCR Text from screenshot:
      "${ocrText?.substring(0, 500)}"
      
      Provide a concise analysis (3-4 sentences max):
      1. What went wrong?
      2. Likely cause
      3. Quick fix suggestion
      
      Be brief and actionable for Discord notification.
    `;
    
    cy.request({
      method: 'POST',
      url: 'https://api.groq.com/openai/v1/chat/completions',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: {
        model: 'llama3-8b-8192',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 300,
        temperature: 0.3
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        reportData.aiAnalysis = response.body.choices[0].message.content;
      } else {
        reportData.aiAnalysis = 'AI analysis unavailable';
      }
      
      // Get screenshot path
      const screenshotPath = path.join(
        Cypress.config('screenshotsFolder'),
        Cypress.spec.relative,
        `${screenshotName}.png`
      );
      reportData.screenshot = screenshotPath;
      
      // Send everything to Discord
      cy.task('sendDiscordReport', reportData);
    });
  });
});

/**
 * Hook into test failures for automatic Discord reporting
 */
Cypress.on('fail', (error, runnable) => {
  console.log('🚨 Test failure detected - preparing Discord report...');
  
  // Capture failure data
  discordReportData.testName = runnable.fullTitle();
  discordReportData.error = {
    message: error.message,
    stack: error.stack,
    name: error.name
  };
  discordReportData.url = window.location.href;
  discordReportData.timestamp = new Date().toISOString();
  
  // Take emergency screenshot
  const screenshotName = `failure-${Date.now()}`;
  
  // We'll handle the Discord notification in the task
  cy.task('handleFailureReport', {
    testName: discordReportData.testName,
    error: discordReportData.error,
    url: discordReportData.url,
    timestamp: discordReportData.timestamp,
    screenshotName: screenshotName
  });
  
  // Re-throw error to maintain Cypress flow
  throw error;
});

/**
 * Discord notification templates
 */
const discordTemplates = {
  success: (testName) => ({
    embeds: [{
      title: `✅ Test Passed: ${testName}`,
      color: 0x00ff00,
      timestamp: new Date().toISOString()
    }]
  }),
  
  warning: (message) => ({
    embeds: [{
      title: '⚠️ Warning',
      description: message,
      color: 0xffff00,
      timestamp: new Date().toISOString()
    }]
  }),
  
  info: (title, description) => ({
    embeds: [{
      title: `ℹ️ ${title}`,
      description: description,
      color: 0x0099ff,
      timestamp: new Date().toISOString()
    }]
  })
};

/**
 * Quick Discord notification commands
 */
Cypress.Commands.add('discordSuccess', (message) => {
  cy.task('sendQuickDiscord', discordTemplates.success(message));
});

Cypress.Commands.add('discordWarning', (message) => {
  cy.task('sendQuickDiscord', discordTemplates.warning(message));
});

Cypress.Commands.add('discordInfo', (title, description) => {
  cy.task('sendQuickDiscord', discordTemplates.info(title, description));
});

// Export for use
module.exports = { 
  sendToDiscord, 
  sendScreenshotToDiscord,
  discordTemplates
};