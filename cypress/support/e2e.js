// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-real-events/support'
import 'cypress-iframe';

// Import screenshot fix to prevent timeouts
import './screenshot-fix';

// Import self-healing commands (opt-in - use smart commands explicitly)
import './commands-self-healing';

// Temporarily disable global self-healing to fix the error
// import './e2e-global-healing';

// TEMPORARILY DISABLED - AI features causing test failures
// Uncomment these when AI integration issues are resolved

// // Import Groq AI commands
// import './groq-commands';

// // Import AI Failure Analyzer
// import './ai-failure-analyzer';

// // Import AI Debugger Commands
// import './ai-debugger-commands';

// // Import JARVIS Visual Debugger
// import './jarvis-visual-debugger';

// // Import Discord AI Reporter
// import './discord-ai-reporter';

// // Import JARVIS Unified Reporter - Consolidates all reports
// import './jarvis-unified-reporter';

// // Import Enhanced AI Integration
// import { initializeAI } from './ai-init';

// // Initialize AI-powered failure analysis
// initializeAI();