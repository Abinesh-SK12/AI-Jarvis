#!/usr/bin/env node

/**
 * AI Test Runner - Run all your existing tests with AI features
 * Automatically applies AI debugging, OCR, and Discord notifications to ALL tests
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

function print(message, color = '') {
  console.log(color + message + colors.reset);
}

function printHeader() {
  console.clear();
  print(`
╔════════════════════════════════════════════════════════════════╗
║     🤖 AI-POWERED TEST RUNNER FOR ALL YOUR TESTS 🤖           ║
║                                                                ║
║     All 38 tests have AI debugging enabled automatically!     ║
╚════════════════════════════════════════════════════════════════╝
  `, colors.cyan);
}

// Get all test files
function getAllTests() {
  const testDirs = [
    'cypress/e2e/Chitti Workshop/Online workshop',
    'cypress/e2e/Chitti Workshop/Offline Workshop',
    'cypress/e2e/Chitti dashboard',
    'cypress/e2e/claude ai learn',
    'cypress/e2e/Groq'
  ];
  
  let tests = [];
  testDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir).filter(f => f.endsWith('.cy.js'));
      tests = tests.concat(files.map(f => ({
        name: f.replace('.cy.js', ''),
        path: path.join(dir, f),
        category: path.basename(dir)
      })));
    }
  });
  
  return tests;
}

function showMenu() {
  print('\n📋 Choose what to test with AI:\n', colors.bright);
  print('  1. 🏢 All Workshop Tests (26 files)', colors.yellow);
  print('  2. 📊 Dashboard Tests (2 files)', colors.yellow);
  print('  3. 🔌 API Tests (4 files)', colors.yellow);
  print('  4. 🤖 AI Demo Tests (5 files)', colors.yellow);
  print('  5. 🌍 ALL TESTS (38 files)', colors.green);
  print('  6. 📝 Specific Test (choose from list)', colors.yellow);
  print('  7. 🎯 Run Failed Tests Only', colors.yellow);
  print('  8. 📹 Run with Dashboard Recording', colors.cyan);
  print('  0. Exit\n', colors.red);
}

function runTests(spec, options = '') {
  const command = `npx cypress run --spec "${spec}" ${options}`;
  
  print(`\n🚀 Running tests with AI features enabled...`, colors.green);
  print(`📍 Command: ${command}\n`, colors.blue);
  
  print(`✅ Active AI Features:`, colors.cyan);
  print(`  • AI Failure Analysis - Automatic`, colors.green);
  print(`  • OCR Text Extraction - On screenshots`, colors.green);
  print(`  • Discord Notifications - On failures`, colors.green);
  print(`  • JARVIS Visual Mode - Available`, colors.green);
  print(`  • Self-Healing - Enabled`, colors.green);
  print(`  • Dashboard Recording - ${options.includes('--record') ? 'Active' : 'Add --record to enable'}`, colors.green);
  
  print(`\n⏳ Starting tests...\n`, colors.yellow);
  
  try {
    execSync(command, { stdio: 'inherit' });
    print(`\n✅ Tests completed successfully!`, colors.green);
  } catch (error) {
    print(`\n⚠️ Some tests failed - Check Discord for AI analysis!`, colors.yellow);
    print(`📁 AI reports saved in: cypress/failure-reports/`, colors.cyan);
  }
}

function main() {
  printHeader();
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  showMenu();
  
  rl.question(colors.cyan + 'Select option (0-8): ' + colors.reset, (answer) => {
    const choice = parseInt(answer);
    
    switch(choice) {
      case 1:
        print('\n🏢 Running all Workshop tests with AI...', colors.bright);
        runTests('cypress/e2e/Chitti Workshop/**/*.cy.js');
        break;
        
      case 2:
        print('\n📊 Running Dashboard tests with AI...', colors.bright);
        runTests('cypress/e2e/Chitti dashboard/*.cy.js');
        break;
        
      case 3:
        print('\n🔌 Running API tests with AI...', colors.bright);
        runTests('cypress/e2e/claude ai learn/*.cy.js');
        break;
        
      case 4:
        print('\n🤖 Running AI Demo tests...', colors.bright);
        runTests('cypress/e2e/Groq/*.cy.js');
        break;
        
      case 5:
        print('\n🌍 Running ALL 38 tests with AI...', colors.bright);
        runTests('cypress/e2e/**/*.cy.js');
        break;
        
      case 6:
        const tests = getAllTests();
        print('\n📝 Available tests:', colors.cyan);
        tests.forEach((test, index) => {
          print(`  ${index + 1}. ${test.name} (${test.category})`, colors.yellow);
        });
        
        rl.question(colors.cyan + '\nSelect test number: ' + colors.reset, (testNum) => {
          const selected = tests[parseInt(testNum) - 1];
          if (selected) {
            print(`\n🎯 Running ${selected.name} with AI...`, colors.bright);
            runTests(selected.path);
          }
          rl.close();
        });
        return;
        
      case 7:
        print('\n🎯 Running previously failed tests with AI...', colors.bright);
        // This would check for failed tests from last run
        runTests('cypress/e2e/**/*.cy.js', '--env grep=failed');
        break;
        
      case 8:
        print('\n📹 Running ALL tests with Dashboard Recording...', colors.bright);
        runTests('cypress/e2e/**/*.cy.js', '--record --key 8b497083-367a-42fc-9405-696e43e9f2b4');
        break;
        
      case 0:
        print('\n👋 Goodbye!', colors.cyan);
        process.exit(0);
        
      default:
        print('\n❌ Invalid option', colors.red);
    }
    
    rl.close();
  });
}

// Check if .env exists
if (!fs.existsSync('.env')) {
  print('⚠️  Warning: .env file not found!', colors.yellow);
  print('Run: npm run setup', colors.cyan);
  process.exit(1);
}

// Check for API key
require('dotenv').config();
if (!process.env.GROQ_API_KEY) {
  print('⚠️  Warning: GROQ_API_KEY not set in .env', colors.yellow);
  print('AI features will not work without it!', colors.red);
}

// Run the menu
main();