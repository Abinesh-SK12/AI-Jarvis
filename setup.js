#!/usr/bin/env node

/**
 * Cypress AI Debug Assistant - Setup Script
 * Automatically configures the project for first-time users
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
╔══════════════════════════════════════════════════════════╗
║     🤖 CYPRESS AI DEBUG ASSISTANT - SETUP WIZARD 🤖      ║
║                                                          ║
║     AI-Powered Testing with Visual Debugging            ║
╚══════════════════════════════════════════════════════════╝
  `, colors.cyan);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(colors.yellow + prompt + colors.reset, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function checkPrerequisites() {
  print('\n📋 Checking prerequisites...', colors.blue);
  
  // Check Node.js
  try {
    const nodeVersion = execSync('node --version').toString().trim();
    print(`  ✅ Node.js ${nodeVersion} installed`, colors.green);
  } catch (error) {
    print(`  ❌ Node.js not found. Please install Node.js 18 or higher`, colors.red);
    process.exit(1);
  }
  
  // Check npm
  try {
    const npmVersion = execSync('npm --version').toString().trim();
    print(`  ✅ npm ${npmVersion} installed`, colors.green);
  } catch (error) {
    print(`  ❌ npm not found`, colors.red);
    process.exit(1);
  }
  
  // Check if .env exists
  const envExists = fs.existsSync('.env');
  if (envExists) {
    print(`  ℹ️  .env file already exists`, colors.yellow);
  } else {
    print(`  ℹ️  .env file will be created`, colors.cyan);
  }
}

async function setupEnvironment() {
  print('\n🔧 Setting up environment variables...', colors.blue);
  
  let config = {};
  
  // Check if .env exists
  if (fs.existsSync('.env')) {
    const overwrite = await question('  .env already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      print('  Keeping existing .env file', colors.yellow);
      return;
    }
  }
  
  // Copy .env.example
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env');
    print('  ✅ Created .env from template', colors.green);
  }
  
  print('\n🔑 API Key Configuration:', colors.bright);
  
  // Groq API Key
  print('\n  Groq API Key (Required for AI features)', colors.cyan);
  print('  Get yours at: https://console.groq.com/keys', colors.blue);
  const groqKey = await question('  Enter your Groq API key (or press Enter to skip): ');
  
  if (groqKey) {
    config.GROQ_API_KEY = groqKey;
    print('  ✅ Groq API key configured', colors.green);
  } else {
    print('  ⚠️  Skipped - AI features will not work without this key', colors.yellow);
  }
  
  // Discord Webhook
  print('\n  Discord Webhook (Optional for notifications)', colors.cyan);
  print('  Create one in: Server Settings > Integrations > Webhooks', colors.blue);
  const discordWebhook = await question('  Enter Discord webhook URL (or press Enter to skip): ');
  
  if (discordWebhook) {
    config.DISCORD_WEBHOOK_URL = discordWebhook;
    print('  ✅ Discord webhook configured', colors.green);
  } else {
    print('  ℹ️  Skipped - Discord notifications disabled', colors.yellow);
  }
  
  // Update .env file
  if (Object.keys(config).length > 0) {
    let envContent = fs.readFileSync('.env', 'utf8');
    
    for (const [key, value] of Object.entries(config)) {
      const regex = new RegExp(`^${key}=.*$`, 'gm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${key}=${value}`);
      } else {
        envContent += `\n${key}=${value}`;
      }
    }
    
    fs.writeFileSync('.env', envContent);
    print('\n  ✅ Environment variables saved to .env', colors.green);
  }
}

async function installDependencies() {
  print('\n📦 Installing dependencies...', colors.blue);
  
  const skipInstall = await question('  Skip npm install? (y/N): ');
  if (skipInstall.toLowerCase() === 'y') {
    print('  Skipped dependency installation', colors.yellow);
    return;
  }
  
  try {
    print('  Installing packages (this may take a few minutes)...', colors.cyan);
    execSync('npm install', { stdio: 'inherit' });
    print('  ✅ Dependencies installed successfully', colors.green);
  } catch (error) {
    print('  ❌ Failed to install dependencies', colors.red);
    print('  Please run: npm install', colors.yellow);
  }
}

async function createDirectories() {
  print('\n📁 Creating required directories...', colors.blue);
  
  const dirs = [
    'cypress/screenshots',
    'cypress/videos',
    'cypress/failure-reports',
    'cypress/jarvis-reports',
    'cypress/downloads'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      print(`  ✅ Created ${dir}`, colors.green);
    } else {
      print(`  ℹ️  ${dir} already exists`, colors.yellow);
    }
  });
}

async function runTestDemo() {
  print('\n🧪 Would you like to run a demo test?', colors.blue);
  const runDemo = await question('  Run demo test? (Y/n): ');
  
  if (runDemo.toLowerCase() === 'n') {
    print('  Skipped demo test', colors.yellow);
    return;
  }
  
  print('\n  Running AI-powered test demo...', colors.cyan);
  try {
    execSync('npx cypress run --spec "cypress/e2e/Groq/ai_test.cy.js" --browser chrome', { 
      stdio: 'inherit' 
    });
    print('  ✅ Demo test completed!', colors.green);
  } catch (error) {
    print('  ⚠️  Demo test had some failures (this is normal for demo)', colors.yellow);
  }
}

function printNextSteps() {
  print('\n' + '='.repeat(60), colors.cyan);
  print('\n✨ Setup Complete! Here are your next steps:', colors.green + colors.bright);
  
  print('\n1. Add your API keys to .env file:', colors.yellow);
  print('   - Groq API key (required): https://console.groq.com', colors.reset);
  print('   - Discord webhook (optional): Your Discord server', colors.reset);
  
  print('\n2. Run your first test:', colors.yellow);
  print('   npm test                    # Run all tests', colors.reset);
  print('   npm run cy:open             # Open Cypress UI', colors.reset);
  print('   npm run test:ai             # Run with AI debugging', colors.reset);
  
  print('\n3. Available AI Commands:', colors.yellow);
  print('   cy.askGroq()                # Ask AI about the page', colors.reset);
  print('   cy.jarvisAnalyze()          # Visual analysis with OCR', colors.reset);
  print('   cy.analyzeAndReport()       # Send to Discord', colors.reset);
  
  print('\n4. Documentation:', colors.yellow);
  print('   - README.md                 # Full documentation', colors.reset);
  print('   - docs/AI_DEBUGGING_GUIDE.md # AI features guide', colors.reset);
  
  print('\n🚀 Happy Testing with AI!', colors.green + colors.bright);
  print('\n"Sometimes you gotta run before you can walk" - Tony Stark', colors.cyan);
  print('\n' + '='.repeat(60), colors.cyan);
}

async function main() {
  printHeader();
  
  try {
    await checkPrerequisites();
    await setupEnvironment();
    await installDependencies();
    await createDirectories();
    await runTestDemo();
    printNextSteps();
    
    print('\n', colors.reset);
    process.exit(0);
  } catch (error) {
    print(`\n❌ Setup failed: ${error.message}`, colors.red);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run setup
main();