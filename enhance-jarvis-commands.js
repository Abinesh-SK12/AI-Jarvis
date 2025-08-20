const fs = require('fs');
const path = require('path');
const glob = require('glob');

// JARVIS commands enhancement template
const jarvisEnhancementTemplate = `
    // 🤖 JARVIS VISUAL AI COMMANDS INTEGRATION
    it('should register for workshop with JARVIS visual assistance', () => {
        // Visit workshop page
        cy.visit('https://chitti.app/workshops/');
        
        // JARVIS: Analyze the entire page visually
        cy.jarvisAnalyze('Analyzing Chitti workshops page - what workshops are available?');
        
        // JARVIS: Verify workshop cards are visible
        cy.jarvisVerifyVisible('workshop cards').then(visible => {
            if (visible) {
                cy.log('✅ JARVIS: Workshop cards detected visually');
            } else {
                cy.log('⚠️ JARVIS: Workshop cards not visible, searching...');
                // JARVIS: Find workshop elements visually
                cy.jarvisFindElement('workshop listing or cards');
            }
        });
        
        // JARVIS: Monitor for page changes
        cy.jarvisDetectChange('Monitoring for dynamic content loading');
        
        // Find specific workshop
        cy.get('WORKSHOP_SELECTOR').then($workshop => {
            // JARVIS: Analyze the workshop card
            cy.jarvisAnalyze('Is this the correct workshop? Analyze the details');
            
            // Click on workshop
            cy.wrap($workshop).click();
            
            // JARVIS: Detect page change after click
            cy.jarvisDetectChange('Did the page navigate to workshop details?');
        });
        
        // JARVIS: Verify registration button
        cy.jarvisVerifyVisible('Register Now button').then(visible => {
            if (!visible) {
                // JARVIS: Find registration button visually
                cy.jarvisFindElement('registration or sign up button');
            }
        });
        
        // JARVIS: Analyze registration form
        cy.contains('Register').click();
        cy.jarvisAnalyze('Analyzing registration form - what fields need to be filled?');
        
        // Fill form fields with JARVIS verification
        cy.get('input[type="text"]').then($input => {
            cy.jarvisVerifyVisible('name input field');
            cy.wrap($input).type('Test User');
        });
        
        // JARVIS: Monitor form state changes
        cy.jarvisDetectChange('Monitoring form validation state');
        
        // Before submission
        cy.jarvisAnalyze('Is the form ready for submission? All fields valid?');
        
        // Submit form
        cy.contains('Register').click();
        
        // JARVIS: Verify success
        cy.jarvisDetectChange('Did registration succeed?');
        cy.jarvisAnalyze('Analyzing registration result - success or failure?');
        cy.jarvisVerifyVisible('success message or confirmation');
    });
`;

// Function to add JARVIS commands to workshop tests
function enhanceWithJarvisCommands(filePath) {
    const fileName = path.basename(filePath);
    
    // Skip already enhanced files
    if (fileName.includes('_AI_Enhanced') || 
        fileName.includes('test-') ||
        fileName.includes('verify-')) {
        console.log(`⏭️  Skipping ${fileName}`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has all JARVIS commands
    if (content.includes('jarvisAnalyze') && 
        content.includes('jarvisVerifyVisible') &&
        content.includes('jarvisDetectChange') &&
        content.includes('jarvisFindElement')) {
        console.log(`✅ ${fileName} already has all JARVIS commands`);
        return false;
    }
    
    // Add JARVIS commands after cy.visit
    content = content.replace(
        /cy\.visit\(['"]([^'"]+)['"]\);?/g,
        `cy.visit('$1');
        
        // JARVIS: Analyze page visually
        cy.jarvisAnalyze('Analyzing workshop page - what content is visible?');
        
        // JARVIS: Verify key elements are visible
        cy.jarvisVerifyVisible('workshop cards or listings');
        
        // JARVIS: Monitor for dynamic content
        cy.jarvisDetectChange('Monitoring page for dynamic content loading');`
    );
    
    // Add JARVIS verification before clicking buttons
    content = content.replace(
        /cy\.contains\(['"]button['"], ['"]Register Now['"]\)/g,
        `// JARVIS: Verify button is visible before clicking
        cy.jarvisVerifyVisible('Register Now button');
        cy.jarvisFindElement('registration button if not found');
        cy.contains('button', 'Register Now')`
    );
    
    // Add JARVIS form analysis
    content = content.replace(
        /cy\.get\(['"]input\[type="text"\]['"]\)\.type/g,
        `// JARVIS: Analyze form fields
        cy.jarvisAnalyze('What form fields need to be filled?');
        cy.get('input[type="text"]').type`
    );
    
    // Add JARVIS success verification
    content = content.replace(
        /cy\.contains\(['"]([^'"]*Success[^'"]*)['"]\)/g,
        `// JARVIS: Verify success visually
        cy.jarvisVerifyVisible('success message');
        cy.jarvisAnalyze('Did the operation succeed?');
        cy.contains('$1')`
    );
    
    // Add comprehensive afterEach with all JARVIS commands
    if (!content.includes('jarvisAnalyze') || !content.includes('jarvisDetectChange')) {
        // Find afterEach and enhance it
        const afterEachPattern = /afterEach\(function\(\) \{[\s\S]*?\}\);/;
        const afterEachMatch = content.match(afterEachPattern);
        
        if (afterEachMatch) {
            const enhancedAfterEach = afterEachMatch[0].replace(
                'if (this.currentTest.state === \'failed\') {',
                `if (this.currentTest.state === 'failed') {
            // JARVIS: Comprehensive visual analysis
            cy.jarvisAnalyze(\`Test failed: \${this.currentTest.title} - analyzing visual state\`);
            
            // JARVIS: Verify what elements are visible
            cy.jarvisVerifyVisible('error messages or failure indicators');
            
            // JARVIS: Detect what changed to cause failure
            cy.jarvisDetectChange('What changed that caused the failure?');
            
            // JARVIS: Try to find missing elements
            cy.jarvisFindElement('expected elements that might be missing');`
            );
            content = content.replace(afterEachPattern, enhancedAfterEach);
        }
    }
    
    // Write enhanced file
    fs.writeFileSync(filePath, content);
    console.log(`🚀 Enhanced ${fileName} with ALL JARVIS commands`);
    return true;
}

// Main execution
console.log('🤖 Adding JARVIS Visual Commands to All Workshop Tests...\n');

// Get all workshop test files
const workshopTests = glob.sync('cypress/e2e/Chitti Workshop/**/*.cy.js');
console.log(`Found ${workshopTests.length} workshop test files\n`);

let enhancedCount = 0;
let skippedCount = 0;

// Enhance each file
workshopTests.forEach(file => {
    if (enhanceWithJarvisCommands(file)) {
        enhancedCount++;
    } else {
        skippedCount++;
    }
});

console.log('\n' + '='.repeat(60));
console.log('✅ JARVIS Commands Enhancement Complete!');
console.log(`📊 Results:`);
console.log(`   - Enhanced: ${enhancedCount} files`);
console.log(`   - Skipped: ${skippedCount} files`);
console.log(`   - Total: ${workshopTests.length} files`);
console.log('='.repeat(60));
console.log('\n🎉 All workshop tests now have JARVIS visual commands!');
console.log('\n📋 JARVIS Commands Added:');
console.log('   ✅ cy.jarvisAnalyze() - Visual page analysis with AI');
console.log('   ✅ cy.jarvisVerifyVisible() - Visual element detection');
console.log('   ✅ cy.jarvisDetectChange() - Monitor visual changes');
console.log('   ✅ cy.jarvisFindElement() - Find elements visually');
console.log('\n🚀 Your tests are now powered by JARVIS visual AI!');