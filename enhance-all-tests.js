const fs = require('fs');
const path = require('path');
const glob = require('glob');

// AI enhancement template to add to each test file
const aiEnhancementTemplate = `
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
            cy.jarvisAnalyze(\`Test failure: \${this.currentTest.title}\`);
            
            // AI: Explain the error
            if (this.currentTest.err) {
                cy.aiExplainError(this.currentTest.err.message);
            }
            
            // Discord: Send failure notification
            cy.analyzeAndReport(\`Failed: \${this.currentTest.title}\`);
            
            // AI: Suggest better selectors if needed
            cy.aiSuggestSelector('failed element');
        } else {
            cy.log('✅ Test Passed Successfully');
        }
    });
`;

// Function to check if file already has AI enhancements
function hasAIEnhancements(content) {
    return content.includes('aiDebugFailure') || 
           content.includes('jarvisAnalyze') || 
           content.includes('AI-POWERED ENHANCEMENTS');
}

// Function to add AI commands to specific test actions
function enhanceTestContent(content, fileName) {
    let enhanced = content;
    
    // Add AI verification after cy.visit
    enhanced = enhanced.replace(
        /cy\.visit\(([^)]+)\);/g,
        `cy.visit($1);
        
        // AI: Verify page loaded correctly
        cy.askGroq('Analyze this page and confirm it loaded correctly').then(response => {
            cy.log('🤖 AI Page Analysis:', response);
        });`
    );
    
    // Add JARVIS visual check before critical actions
    enhanced = enhanced.replace(
        /cy\.contains\((['"])button\1,\s*(['"])([^'"]+)\2\)/g,
        `// JARVIS: Verify button is visible
        cy.jarvisVerifyVisible('$3 button');
        cy.contains($1button$1, $2$3$2)`
    );
    
    // Add AI validation after form submissions
    enhanced = enhanced.replace(
        /cy\.contains\((['"])([^'"]*[Rr]egister[^'"]*)\1\)\.click\(\)/g,
        `cy.contains($1$2$1).click();
        
        // AI: Verify registration action
        cy.askGroq('Did the registration/submission complete successfully?').then(response => {
            cy.log('🤖 AI Submission Check:', response);
        })`
    );
    
    return enhanced;
}

// Function to enhance a single test file
function enhanceTestFile(filePath) {
    const fileName = path.basename(filePath);
    
    // Skip already enhanced files and special test files
    if (fileName.includes('_AI_Enhanced') || 
        fileName.includes('ai-test') || 
        fileName.includes('verify-ai') ||
        fileName.includes('jarvis-reports')) {
        console.log(`⏭️  Skipping ${fileName} (already enhanced or AI test file)`);
        return false;
    }
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if already has AI enhancements
    if (hasAIEnhancements(content)) {
        console.log(`✅ ${fileName} already has AI enhancements`);
        return false;
    }
    
    // Find the describe block
    const describeMatch = content.match(/describe\(['"]([^'"]+)['"]/);
    if (!describeMatch) {
        console.log(`⚠️  ${fileName} - No describe block found`);
        return false;
    }
    
    // Add AI enhancement after the describe line
    const describeIndex = content.indexOf(describeMatch[0]);
    const afterDescribe = content.indexOf('{', describeIndex) + 1;
    
    // Insert AI enhancements
    content = content.slice(0, afterDescribe) + 
              aiEnhancementTemplate + 
              content.slice(afterDescribe);
    
    // Enhance test content with AI commands
    content = enhanceTestContent(content, fileName);
    
    // Write the enhanced file
    fs.writeFileSync(filePath, content);
    console.log(`🚀 Enhanced ${fileName} with AI capabilities`);
    return true;
}

// Main execution
console.log('🤖 Starting AI Enhancement for All Test Files...\n');

// Get all test files
const testFiles = glob.sync('cypress/e2e/**/*.cy.js');
console.log(`Found ${testFiles.length} test files\n`);

let enhancedCount = 0;
let skippedCount = 0;

// Enhance each file
testFiles.forEach(file => {
    if (enhanceTestFile(file)) {
        enhancedCount++;
    } else {
        skippedCount++;
    }
});

console.log('\n' + '='.repeat(50));
console.log('✅ AI Enhancement Complete!');
console.log(`📊 Results:`);
console.log(`   - Enhanced: ${enhancedCount} files`);
console.log(`   - Skipped: ${skippedCount} files`);
console.log(`   - Total: ${testFiles.length} files`);
console.log('='.repeat(50));
console.log('\n🎉 Your entire test suite is now AI-powered!');
console.log('🤖 Features added to each test:');
console.log('   ✅ Groq AI analysis');
console.log('   ✅ JARVIS visual debugging');
console.log('   ✅ Automatic failure analysis');
console.log('   ✅ Discord notifications');
console.log('   ✅ Smart error explanations');
console.log('   ✅ AI-powered selector suggestions');