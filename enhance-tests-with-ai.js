#!/usr/bin/env node

/**
 * Script to enhance all workshop tests with AI commands
 * Adds Groq and JARVIS commands intelligently to existing tests
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function print(message, color = '') {
  console.log(color + message + colors.reset);
}

// AI enhancements to add to tests
const AI_ENHANCEMENTS = {
  beforeEach: `
    beforeEach(() => {
        Cypress.on('uncaught:exception', () => false);
        
        // AI: Verify test environment is ready
        cy.window().then(() => {
            cy.log('🤖 AI Debug Assistant: Ready for testing');
        });
    });`,
    
  afterWorkshopLoad: `
        // AI: Verify correct workshop page loaded
        cy.askGroq('What workshop is displayed on this page? Is registration available?')
            .then(aiResponse => {
                cy.log('🤖 AI Workshop Analysis:', aiResponse);
                
                // Check if registration is actually available
                if (aiResponse.toLowerCase().includes('closed') || 
                    aiResponse.toLowerCase().includes('full') ||
                    aiResponse.toLowerCase().includes('unavailable')) {
                    cy.log('⚠️ AI Warning: Registration may be closed');
                    
                    // Take screenshot for visual analysis
                    cy.jarvisAnalyze('Workshop registration status check');
                }
            });
        
        // JARVIS: Visual verification of workshop details
        cy.jarvisVerifyVisible('workshop title').then(isVisible => {
            if (!isVisible) {
                cy.log('⚠️ JARVIS: Workshop title not visually detected');
            }
        });`,
    
  beforeRegisterClick: `
        // AI: Verify registration button is ready
        cy.askGroq('Is the registration button visible and clickable?')
            .then(response => {
                cy.log('🤖 AI Button Check:', response);
            });
        
        // JARVIS: Visual verification before clicking
        cy.jarvisVerifyVisible('Register Now button');`,
    
  afterFormFill: `
        // AI: Verify form is filled correctly
        cy.askGroq('Are all required form fields filled? Any validation errors visible?')
            .then(response => {
                cy.log('🤖 AI Form Validation:', response);
                
                if (response.toLowerCase().includes('error') || 
                    response.toLowerCase().includes('missing')) {
                    // Take screenshot for debugging
                    cy.screenshot('form-validation-check');
                    cy.jarvisAnalyze('Form validation error analysis');
                }
            });`,
    
  beforeFinalSubmit: `
        // JARVIS: Final visual check before submission
        cy.jarvisAnalyze('Pre-submission form validation check');
        
        // AI: Verify we're ready to submit
        cy.askGroq('Is the form ready for submission? All fields valid?')
            .then(response => {
                cy.log('🤖 AI Pre-Submit Check:', response);
            });`,
    
  afterSubmit: `
        // AI: Verify registration success
        cy.askGroq('Did the registration succeed? What message is displayed?')
            .then(response => {
                cy.log('🤖 AI Success Verification:', response);
                
                if (response.toLowerCase().includes('error') || 
                    response.toLowerCase().includes('failed')) {
                    // Analyze the error
                    cy.jarvisAnalyze('Registration failure analysis');
                    cy.analyzeAndReport('Registration failed - needs investigation');
                } else if (response.toLowerCase().includes('success')) {
                    cy.discordSuccess('Workshop registration successful!');
                }
            });
        
        // JARVIS: Capture final state
        cy.jarvisVerifyVisible('success message').then(isSuccess => {
            if (isSuccess) {
                cy.log('✅ JARVIS: Success message confirmed visually');
            } else {
                cy.log('⚠️ JARVIS: Success message not detected');
                cy.jarvisAnalyze('Post-registration state analysis');
            }
        });`,
        
  errorHandling: `
    // Enhanced error handling with AI
    afterEach(function() {
        if (this.currentTest.state === 'failed') {
            // AI analyzes the failure
            cy.aiDebugFailure();
            
            // JARVIS visual analysis
            cy.jarvisAnalyze('Test failure visual analysis');
            
            // Send to Discord with AI analysis
            cy.analyzeAndReport(\`Test failed: \${this.currentTest.title}\`);
        }
    });`
};

function enhanceTestFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    // Check if already enhanced
    if (content.includes('cy.askGroq') || content.includes('cy.jarvis')) {
      print(`  ⏭️  ${fileName} - Already has AI commands`, colors.yellow);
      return false;
    }
    
    print(`  🔧 Enhancing ${fileName}...`, colors.cyan);
    
    // Add AI verification after page visit
    content = content.replace(
      /cy\.visit\(['"]https:\/\/chitti\.app\/workshops\/['"]\);/g,
      `cy.visit('https://chitti.app/workshops/');
        
        // AI: Verify workshops page loaded correctly
        cy.askGroq('Is this the workshops listing page? How many workshops are visible?')
            .then(response => {
                cy.log('🤖 AI Page Verification:', response);
            });`
    );
    
    // Add visual verification after workshop selection
    content = content.replace(
      /\.click\(\);\s*cy\.wait\(5000\);/,
      `.click();
        cy.wait(5000);
        ${AI_ENHANCEMENTS.afterWorkshopLoad}`
    );
    
    // Add AI check before Register Now click
    content = content.replace(
      /cy\.contains\(['"]button['"], ['"]Register Now['"]\)/g,
      `${AI_ENHANCEMENTS.beforeRegisterClick}
        cy.contains('button', 'Register Now')`
    );
    
    // Add form validation after filling
    if (content.includes('cy.get(\'input[type="email"]\')')) {
      content = content.replace(
        /cy\.get\('input\[type="email"\]'\)\.type\([^)]+\);/g,
        (match) => `${match}
        ${AI_ENHANCEMENTS.afterFormFill}`
      );
    }
    
    // Add pre-submit verification
    content = content.replace(
      /cy\.contains\(['"]p['"], ['"]Register['"]\)\.click\(\);/g,
      `${AI_ENHANCEMENTS.beforeFinalSubmit}
        cy.contains('p', 'Register').click();`
    );
    
    // Add success verification
    content = content.replace(
      /cy\.contains\(['"]div['"], ['" ]Registration Successful['" ]\)\.should\(['"]exist['"]\);/g,
      `cy.contains('div', ' Registration Successful ').should('exist');
        ${AI_ENHANCEMENTS.afterSubmit}`
    );
    
    // Add error handling
    if (!content.includes('afterEach')) {
      content = content.replace(
        /}\);$/,
        `${AI_ENHANCEMENTS.errorHandling}
});`
      );
    }
    
    // Save enhanced file
    fs.writeFileSync(filePath, content);
    print(`  ✅ ${fileName} - Enhanced with AI commands`, colors.green);
    return true;
    
  } catch (error) {
    print(`  ❌ Error enhancing ${path.basename(filePath)}: ${error.message}`, colors.red);
    return false;
  }
}

function main() {
  print(`
╔══════════════════════════════════════════════════════════════╗
║     🤖 ENHANCING WORKSHOP TESTS WITH AI COMMANDS 🤖         ║
╚══════════════════════════════════════════════════════════════╝
  `, colors.cyan);
  
  const workshopDir = path.join(__dirname, 'cypress', 'e2e', 'Chitti Workshop', 'Online workshop');
  
  if (!fs.existsSync(workshopDir)) {
    print('❌ Workshop directory not found!', colors.red);
    process.exit(1);
  }
  
  const files = fs.readdirSync(workshopDir).filter(f => f.endsWith('.cy.js'));
  
  print(`\n📁 Found ${files.length} test files to enhance\n`, colors.blue);
  
  let enhanced = 0;
  let skipped = 0;
  
  files.forEach(file => {
    const filePath = path.join(workshopDir, file);
    if (enhanceTestFile(filePath)) {
      enhanced++;
    } else {
      skipped++;
    }
  });
  
  print(`\n📊 Summary:`, colors.cyan);
  print(`  ✅ Enhanced: ${enhanced} files`, colors.green);
  print(`  ⏭️  Skipped: ${skipped} files (already have AI)`, colors.yellow);
  print(`  📁 Total: ${files.length} files\n`, colors.blue);
  
  if (enhanced > 0) {
    print(`🎉 AI Enhancement Complete!`, colors.green);
    print(`\nYour tests now have:`, colors.cyan);
    print(`  • Groq AI page verification`, colors.green);
    print(`  • JARVIS visual analysis`, colors.green);
    print(`  • Automatic error debugging`, colors.green);
    print(`  • Discord notifications`, colors.green);
    print(`  • Form validation checks`, colors.green);
    print(`  • Success/failure analysis\n`, colors.green);
    
    print(`Run any test to see AI in action:`, colors.yellow);
    print(`  npm run test:workshops`, colors.cyan);
  }
}

// Run the enhancement
main();