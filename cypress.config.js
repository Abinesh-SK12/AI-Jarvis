const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ovn7sm",
  e2e: {
    baseUrl: "https://chitti.app",
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    trashAssetsBeforeRuns: true,
    // Increase timeout for screenshots
    taskTimeout: 60000,
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const fs = require('fs');
      const path = require('path');
      
      // Load environment variables from .env file
      require('dotenv').config();
      
      // Tesseract.js for OCR
      const Tesseract = require('tesseract.js');
      const axios = require('axios');
      const FormData = require('form-data');
      
      // Discord webhook URL
      const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK_URL || 
        'https://discordapp.com/api/webhooks/1403245289996943360/JrXeSUh8f1wi8vOkPBtPfITuhxsB1yuTeU1NdOg4XnESh9CEBSG_embYnGkBl5PONxUz';
      
      // AI Integration - Store for analysis
      let testHistory = {};
      let lastFailure = null;
      
      on('task', {
        writeFile({ path: filePath, content }) {
          const dir = path.dirname(filePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          fs.writeFileSync(filePath, content);
          return null;
        },
        log(message) {
          console.log(message);
          return null;
        },
        
        // JARVIS Visual Debugging Tasks
        async extractTextFromScreenshot({ screenshotPath }) {
          console.log('🤖 JARVIS: Performing OCR on screenshot...');
          
          try {
            let actualPath = screenshotPath;
            
            // Try to find the screenshot in various locations
            const glob = require('glob');
            
            // Search for the screenshot in all subdirectories
            const pattern = path.join(__dirname, 'cypress', 'screenshots', '**', `${screenshotPath}.png`);
            const matches = glob.sync(pattern);
            
            let foundPath = null;
            if (matches.length > 0) {
              foundPath = matches[0];
              console.log('✅ JARVIS: Found screenshot at:', foundPath);
            }
            
            if (!foundPath) {
              console.log('⚠️ Screenshot not found. Pattern used:', pattern);
              return 'Screenshot not found for OCR analysis. The screenshot may still be processing.';
            }
            
            actualPath = foundPath;
            
            // Perform OCR
            const result = await Tesseract.recognize(
              actualPath,
              'eng',
              {
                logger: m => console.log('OCR Progress:', m.progress)
              }
            );
            
            console.log('✅ JARVIS: OCR complete. Extracted', result.data.text.length, 'characters');
            return result.data.text;
          } catch (error) {
            console.error('❌ JARVIS: OCR failed:', error);
            return 'OCR extraction failed: ' + error.message;
          }
        },
        
        async extractTextFromLastScreenshot() {
          const screenshotsDir = path.join(__dirname, 'cypress', 'screenshots');
          
          try {
            // Get most recent screenshot
            const files = fs.readdirSync(screenshotsDir)
              .filter(f => f.endsWith('.png'))
              .map(f => ({
                name: f,
                path: path.join(screenshotsDir, f),
                time: fs.statSync(path.join(screenshotsDir, f)).mtime
              }))
              .sort((a, b) => b.time - a.time);
            
            if (files.length === 0) {
              return 'No screenshots available';
            }
            
            const latestScreenshot = files[0].path;
            console.log('🤖 JARVIS: Analyzing screenshot:', files[0].name);
            
            const result = await Tesseract.recognize(latestScreenshot, 'eng');
            return result.data.text;
          } catch (error) {
            console.error('❌ JARVIS: OCR failed:', error);
            return 'OCR extraction failed';
          }
        },
        
        captureFailureScreenshot({ name, testName }) {
          console.log(`📸 JARVIS: Emergency screenshot for ${testName}`);
          // Return screenshot path for further processing
          return path.join(__dirname, 'cypress', 'screenshots', `${name}.png`);
        },
        
        async emergencyVisualAnalysis({ screenshot, error, testName }) {
          console.log('🚨 JARVIS: Emergency Visual Analysis Protocol Activated');
          console.log('Test:', testName);
          console.log('Error:', error);
          
          // In a real implementation, this would do OCR and analysis
          // For now, we'll just log the information
          return {
            status: 'analyzed',
            testName,
            error,
            timestamp: new Date().toISOString()
          };
        },
        
        async compareScreenshots({ before, after }) {
          // Simple comparison - in production you'd use image diff libraries
          console.log('🤖 JARVIS: Comparing screenshots...');
          
          const beforePath = path.join(__dirname, 'cypress', 'screenshots', `${before}.png`);
          const afterPath = path.join(__dirname, 'cypress', 'screenshots', `${after}.png`);
          
          if (!fs.existsSync(beforePath) || !fs.existsSync(afterPath)) {
            return [];
          }
          
          // For now, return mock changes
          return [
            { type: 'element_added', description: 'New button appeared' },
            { type: 'text_changed', description: 'Header text modified' }
          ];
        },
        
        async findElementVisually({ description }) {
          console.log(`🔍 JARVIS: Visually searching for "${description}"...`);
          
          // In production, this would use computer vision
          // For demo, return mock coordinates
          if (description.toLowerCase().includes('button')) {
            return { x: 640, y: 360 }; // Center of default viewport
          }
          
          return null;
        },
        
        // Discord Integration Tasks
        async sendDiscordReport(data) {
          console.log('📨 Sending report to Discord...');
          
          try {
            // Create embed message
            const embed = {
              title: `🚨 Test Failed: ${data.testName}`,
              description: data.aiAnalysis || 'Analyzing failure...',
              color: 0xff0000,
              fields: [
                {
                  name: '❌ Error',
                  value: `\`\`\`${data.error?.message?.substring(0, 500) || 'Unknown'}\`\`\``,
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
                  name: '👁️ OCR Text',
                  value: `\`\`\`${(data.ocrText || '').substring(0, 200)}...\`\`\``,
                  inline: false
                }
              ],
              footer: {
                text: 'Cypress AI Debug Assistant'
              },
              timestamp: data.timestamp
            };
            
            // Send main message
            await axios.post(DISCORD_WEBHOOK, {
              username: 'Cypress AI Assistant',
              embeds: [embed]
            });
            
            // Send screenshot if available
            if (data.screenshot && fs.existsSync(data.screenshot)) {
              const form = new FormData();
              form.append('file', fs.createReadStream(data.screenshot));
              form.append('payload_json', JSON.stringify({
                content: `📸 Screenshot for: **${data.testName}**`
              }));
              
              await axios.post(DISCORD_WEBHOOK, form, {
                headers: form.getHeaders()
              });
            }
            
            console.log('✅ Discord notification sent!');
            return true;
          } catch (error) {
            console.error('❌ Discord send failed:', error.message);
            return false;
          }
        },
        
        async handleFailureReport({ testName, error, url, timestamp, screenshotName }) {
          console.log('🚨 Handling failure report for Discord...');
          
          try {
            // Take screenshot path
            const screenshotPath = path.join(__dirname, 'cypress', 'screenshots', `${screenshotName}.png`);
            
            // Try OCR if screenshot exists
            let ocrText = '';
            if (fs.existsSync(screenshotPath)) {
              try {
                const result = await Tesseract.recognize(screenshotPath, 'eng');
                ocrText = result.data.text;
              } catch (e) {
                console.log('OCR failed:', e.message);
              }
            }
            
            // Get AI analysis
            const groqApiKey = process.env.GROQ_API_KEY;
            let aiAnalysis = '';
            
            if (groqApiKey) {
              try {
                const response = await axios.post(
                  'https://api.groq.com/openai/v1/chat/completions',
                  {
                    model: 'llama3-8b-8192',
                    messages: [{
                      role: 'user',
                      content: `Analyze this test failure (be concise, 2-3 sentences):
                        Test: ${testName}
                        Error: ${error.message}
                        URL: ${url}
                        OCR Text: ${ocrText.substring(0, 200)}
                        
                        What went wrong and how to fix it?`
                    }],
                    max_tokens: 200,
                    temperature: 0.3
                  },
                  {
                    headers: {
                      'Authorization': `Bearer ${groqApiKey}`,
                      'Content-Type': 'application/json'
                    }
                  }
                );
                
                if (response.data?.choices?.[0]?.message?.content) {
                  aiAnalysis = response.data.choices[0].message.content;
                }
              } catch (e) {
                console.log('AI analysis failed:', e.message);
              }
            }
            
            // Send to Discord
            const embed = {
              title: `🚨 Test Failed: ${testName}`,
              description: aiAnalysis || 'Test failure detected',
              color: 0xff0000,
              fields: [
                {
                  name: '❌ Error',
                  value: `\`\`\`${error.message.substring(0, 500)}\`\`\``,
                  inline: false
                },
                {
                  name: '🌐 URL',
                  value: url,
                  inline: true
                },
                {
                  name: '⏰ Time',
                  value: new Date(timestamp).toLocaleString(),
                  inline: true
                }
              ],
              footer: {
                text: 'Cypress AI Debug Assistant'
              },
              timestamp: timestamp
            };
            
            await axios.post(DISCORD_WEBHOOK, {
              username: 'Cypress AI Assistant',
              embeds: [embed]
            });
            
            console.log('✅ Failure report sent to Discord!');
            return true;
          } catch (error) {
            console.error('Failed to send Discord report:', error.message);
            return false;
          }
        },
        
        async sendQuickDiscord(payload) {
          try {
            await axios.post(DISCORD_WEBHOOK, {
              username: 'Cypress AI Assistant',
              ...payload
            });
            return true;
          } catch (error) {
            console.error('Discord send failed:', error.message);
            return false;
          }
        },
        
        // AI Integration Tasks
        storeTestHistory(testData) {
          const { title, state, duration } = testData;
          if (!testHistory[title]) {
            testHistory[title] = [];
          }
          testHistory[title].push({
            timestamp: new Date().toISOString(),
            status: state,
            duration
          });
          
          // Keep only last 10 runs per test
          if (testHistory[title].length > 10) {
            testHistory[title].shift();
          }
          
          // Save to file for persistence
          const historyFile = path.join(__dirname, 'cypress', 'test-history.json');
          fs.writeFileSync(historyFile, JSON.stringify(testHistory, null, 2));
          
          return null;
        },
        
        storeLastFailure(failureData) {
          lastFailure = failureData;
          return null;
        },
        
        getLastFailure() {
          return lastFailure;
        },
        
        loadTestHistory() {
          const historyFile = path.join(__dirname, 'cypress', 'test-history.json');
          if (fs.existsSync(historyFile)) {
            testHistory = JSON.parse(fs.readFileSync(historyFile, 'utf8'));
          }
          return testHistory;
        },
        
        saveFailurePattern(pattern) {
          const patternsFile = path.join(__dirname, 'cypress', 'failure-patterns.json');
          let patterns = { patterns: [], solutions: {} };
          
          if (fs.existsSync(patternsFile)) {
            patterns = JSON.parse(fs.readFileSync(patternsFile, 'utf8'));
          }
          
          patterns.patterns.push(pattern.pattern);
          patterns.solutions[pattern.pattern.id] = pattern.solution;
          
          fs.writeFileSync(patternsFile, JSON.stringify(patterns, null, 2));
          return null;
        },
        
        executeCommand(command, options = {}) {
          const { exec } = require('child_process');
          return new Promise((resolve) => {
            exec(command, (error, stdout, stderr) => {
              if (error && options.failOnNonZeroExit !== false) {
                console.error(`Command error: ${error.message}`);
                resolve({ error: error.message, stdout, stderr });
              } else {
                resolve({ stdout, stderr, error: null });
              }
            });
          });
        }
      });
      
      // Override screenshot timeout
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' || browser.name === 'electron') {
          // Increase timeout for screenshots
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--disable-gpu');
        }
        return launchOptions;
      });
      
      // Pass environment variables to Cypress for AI integration
      config.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyByXv-2GduOIpp6YF5OpnFaIzeHzGqGlLw';
      config.env.GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
      config.env.GROQ_API_KEY = process.env.GROQ_API_KEY;
      config.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
      config.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
      config.env.CLAUDE_MODEL = process.env.CLAUDE_MODEL;
      config.env.OPENAI_MODEL = process.env.OPENAI_MODEL;
      config.env.AI_CONFIDENCE_THRESHOLD = process.env.AI_CONFIDENCE_THRESHOLD;
      config.env.AUTO_APPLY_FIXES = process.env.AUTO_APPLY_FIXES;
      config.env.ENABLE_PATTERN_RECOGNITION = process.env.ENABLE_PATTERN_RECOGNITION;
      config.env.ENABLE_AI_SELF_HEALING = process.env.ENABLE_AI_SELF_HEALING;
      
      return config;
    },
  },
  
  env: {
    // Self-healing configuration
    globalSelfHealing: false, // Set to true to enable self-healing globally
    selfHealingMaxRetries: 3,
    selfHealingTimeout: 30000
  }
});
