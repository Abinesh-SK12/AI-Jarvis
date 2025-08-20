/**
 * JARVIS Animated Startup Sequence
 * Creates a realistic boot-up animation like in Iron Man movies
 */

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m'
};

// Arc Reactor ASCII Art
const ARC_REACTOR = `
           ${colors.cyan}╭─────────╮
         ╭─┤${colors.yellow}◉◉◉◉◉◉◉${colors.cyan}├─╮
        ╱  ╰─────────╯  ╲
       │  ${colors.blue}╱═══════════╲${colors.cyan}  │
       │ ${colors.blue}║${colors.bright}${colors.yellow}  ⚡ ARC ⚡  ${colors.reset}${colors.blue}║${colors.cyan} │
       │ ${colors.blue}║${colors.bright}${colors.yellow}  REACTOR   ${colors.reset}${colors.blue}║${colors.cyan} │
       │  ${colors.blue}╲═══════════╱${colors.cyan}  │
        ╲  ╭─────────╮  ╱
         ╰─┤${colors.yellow}◉◉◉◉◉◉◉${colors.cyan}├─╯
           ╰─────────╯${colors.reset}
`;

// STARK Industries Logo
const STARK_LOGO = `
${colors.red}╔════════════════════════════════════════╗
║   ${colors.white}███████╗${colors.red}╔╦╗╔═╗╦═╗╦╔═  ${colors.white}██╗███╗   ██╗${colors.red} ║
║   ${colors.white}██╔════╝${colors.red} ║ ╠═╣╠╦╝╠╩╗  ${colors.white}██║████╗  ██║${colors.red} ║
║   ${colors.white}███████╗${colors.red} ║ ╩ ╩╩╚═╩ ╩  ${colors.white}██║██╔██╗ ██║${colors.red} ║
║   ${colors.white}╚════██║${colors.red}              ${colors.white}██║██║╚██╗██║${colors.red} ║
║   ${colors.white}███████║${colors.red}              ${colors.white}██║██║ ╚████║${colors.red} ║
║   ${colors.white}╚══════╝${colors.red}              ${colors.white}╚═╝╚═╝  ╚═══╝${colors.red} ║
║   ${colors.yellow}I N D U S T R I E S${colors.red}                  ║
╚════════════════════════════════════════╝${colors.reset}
`;

// Loading animation frames
const loadingFrames = [
    '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'
];

// System boot messages
const bootMessages = [
    { delay: 100, text: 'Initializing JARVIS Core System...', color: colors.cyan },
    { delay: 150, text: 'Loading Neural Network Architecture...', color: colors.blue },
    { delay: 200, text: 'Connecting to Groq AI Backend...', color: colors.green },
    { delay: 120, text: 'Calibrating Visual Recognition Systems...', color: colors.yellow },
    { delay: 180, text: 'Establishing Discord Communication Channel...', color: colors.magenta },
    { delay: 100, text: 'Loading OCR Engine (Tesseract.js)...', color: colors.cyan },
    { delay: 150, text: 'Synchronizing with Cypress Framework...', color: colors.blue },
    { delay: 200, text: 'Activating Self-Healing Protocols...', color: colors.green },
    { delay: 100, text: 'All Systems Operational', color: colors.bright + colors.green }
];

// Animated progress bar
function animateProgressBar(label, duration = 1000) {
    return new Promise((resolve) => {
        const width = 40;
        let progress = 0;
        const increment = width / (duration / 50);
        
        const interval = setInterval(() => {
            progress += increment;
            const filled = Math.min(Math.floor(progress), width);
            const empty = Math.max(0, width - filled);
            
            const bar = `${colors.green}${'█'.repeat(filled)}${colors.dim}${'░'.repeat(empty)}${colors.reset}`;
            const percentage = Math.min(100, Math.floor((progress / width) * 100));
            
            process.stdout.write(`\r  ${label} [${bar}] ${percentage}%`);
            
            if (progress >= width) {
                clearInterval(interval);
                console.log(` ${colors.green}✓${colors.reset}`);
                resolve();
            }
        }, 50);
    });
}

// Holographic text effect
function holographicText(text, color = colors.cyan) {
    const glitchChars = ['░', '▒', '▓', '█'];
    let result = '';
    
    for (let char of text) {
        if (Math.random() > 0.9 && char !== ' ') {
            result += color + glitchChars[Math.floor(Math.random() * glitchChars.length)] + colors.reset;
        } else {
            result += color + char + colors.reset;
        }
    }
    
    return result;
}

// Main startup sequence
async function startJARVIS() {
    console.clear();
    
    // Show STARK Industries logo
    console.log(STARK_LOGO);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show Arc Reactor
    console.log(ARC_REACTOR);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════${colors.reset}\n`);
    
    // Boot sequence
    for (const message of bootMessages) {
        await new Promise(resolve => setTimeout(resolve, message.delay));
        console.log(`  ${message.color}▸${colors.reset} ${message.text}`);
    }
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════${colors.reset}\n`);
    
    // Progress bars for subsystems
    await animateProgressBar('Neural Network    ', 600);
    await animateProgressBar('Visual Cortex     ', 700);
    await animateProgressBar('Language Model    ', 800);
    await animateProgressBar('Debugging Engine  ', 500);
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════${colors.reset}\n`);
    
    // Final message with holographic effect
    const finalMessage = holographicText('J.A.R.V.I.S. FULLY OPERATIONAL', colors.yellow);
    console.log(`  ${finalMessage}`);
    
    console.log(`\n  ${colors.white}"Good evening, sir. All systems are at your disposal."${colors.reset}`);
    console.log(`  ${colors.dim}- JARVIS${colors.reset}\n`);
    
    // Show capabilities with icons
    console.log(`${colors.bright}${colors.magenta}  【 ACTIVE CAPABILITIES 】${colors.reset}`);
    console.log(`  ${colors.green}◉${colors.reset} Visual Analysis     ${colors.green}◉${colors.reset} OCR Processing`);
    console.log(`  ${colors.green}◉${colors.reset} AI Debugging        ${colors.green}◉${colors.reset} Failure Detection`);
    console.log(`  ${colors.green}◉${colors.reset} Smart Suggestions   ${colors.green}◉${colors.reset} Report Generation`);
    console.log(`  ${colors.green}◉${colors.reset} Discord Integration ${colors.green}◉${colors.reset} Self-Healing Tests`);
    
    console.log(`\n${colors.bright}${colors.cyan}════════════════════════════════════════════════════${colors.reset}\n`);
}

// Export for use
module.exports = { startJARVIS, holographicText, colors };

// Auto-run if called directly
if (require.main === module) {
    startJARVIS();
}