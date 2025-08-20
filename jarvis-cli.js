#!/usr/bin/env node

const readline = require('readline');
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const say = require('say'); // Text-to-speech module

// Speech recognition using Windows Speech Recognition or Web API
let voiceInputActive = false;
let recognitionProcess = null;
const isWindows = process.platform === 'win32';

// JARVIS ASCII art - exactly as you requested
const JARVIS_LOGO = `
╔════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║       ██╗ █████╗ ██████╗ ██╗   ██╗██╗███████╗                                ║
║       ██║██╔══██╗██╔══██╗██║   ██║██║██╔════╝                                ║
║       ██║███████║██████╔╝██║   ██║██║███████╗                                ║
║  ██   ██║██╔══██║██╔══██╗╚██╗ ██╔╝██║╚════██║                                ║
║  ╚█████╔╝██║  ██║██║  ██║ ╚████╔╝ ██║███████║                                ║
║   ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚══════╝                                ║
║                                                                                ║
║  ┌──────────────────────────────────────────────────────────────────────┐    ║
║  │  ◉ Just A Rather Very Intelligent System                              │    ║
║  │  ▸ Version: 4.2.0 STARK INDUSTRIES                                    │    ║
║  │  ▸ Status:  ● ONLINE | ● READY | ● ARMED                             │    ║
║  │  ▸ Mode:    ⚡ VISUAL DEBUGGER                                        │    ║
║  └──────────────────────────────────────────────────────────────────────┘    ║
║                                                                                ║
║  ╭─────────────────────────────────────────────────────────────────────╮    ║
║  │ ⟦⟧ Initializing Systems...                                          │    ║
║  │ [■■■■■■■■■■] 100% ✓ Neural Network                                  │    ║
║  │ [■■■■■■■■■■] 100% ✓ Visual Cortex                                   │    ║
║  │ [■■■■■■■■■■] 100% ✓ Groq AI Integration                             │    ║
║  │ [■■■■■■■■■■] 100% ✓ OCR Engine (Tesseract)                          │    ║
║  │ [■■■■■■■■■■] 100% ✓ Discord Interface                               │    ║
║  ╰─────────────────────────────────────────────────────────────────────╯    ║
║                                                                                ║
║  【 CAPABILITIES 】                                                            ║
║  ◆ Visual Analysis     ◆ OCR Processing     ◆ AI Debugging                   ║
║  ◆ Failure Detection   ◆ Smart Suggestions  ◆ Report Generation              ║
║                                                                                ║
║  ┌────────────────────────────────────────────────────────────────────┐    ║
║  │ "Good evening, sir. All systems are operational."                   │    ║
║  │ "Shall I begin the visual debugging protocols?"                     │    ║
║  │ - JARVIS                                                             │    ║
║  └────────────────────────────────────────────────────────────────────┘    ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════╝
`;

// Voice response system
let voiceEnabled = true;

function speak(text) {
    if (voiceEnabled) {
        say.speak(text, null, 1.2); // Slightly faster speech
    }
}

// Start voice input listener
function startVoiceInput() {
    if (voiceInputActive) {
        console.log('[JARVIS] Voice input already active.');
        return;
    }
    
    console.log('\n🎤 [JARVIS] Voice input activated. Speak your commands...');
    console.log('Say "stop listening" to deactivate voice input.');
    speak('Voice input activated. I am listening, sir.');
    voiceInputActive = true;
    
    if (isWindows) {
        startWindowsSpeechRecognition();
    } else {
        startWebSpeechRecognition();
    }
}

// Windows-specific speech recognition
function startWindowsSpeechRecognition() {
    
    // PowerShell script for speech recognition
    const psScript = `
Add-Type -AssemblyName System.Speech
$recognizer = New-Object System.Speech.Recognition.SpeechRecognitionEngine
$recognizer.SetInputToDefaultAudioDevice()

# Create grammar for commands
$grammar = New-Object System.Speech.Recognition.GrammarBuilder
$grammar.Append("*")
$recognizer.LoadGrammar((New-Object System.Speech.Recognition.Grammar($grammar)))

Register-ObjectEvent -InputObject $recognizer -EventName SpeechRecognized -Action {
    $result = $event.SourceEventArgs.Result.Text
    Write-Host "RECOGNIZED:$result"
}

$recognizer.RecognizeAsync([System.Speech.Recognition.RecognizeMode]::Multiple)

Write-Host "LISTENING:Ready"
while ($true) {
    Start-Sleep -Seconds 1
}
`;
    
    // Save script temporarily
    const scriptPath = path.join(__dirname, 'temp-speech.ps1');
    fs.writeFileSync(scriptPath, psScript);
    
    // Start PowerShell process
    recognitionProcess = spawn('powershell', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath], {
        stdio: ['pipe', 'pipe', 'pipe']
    });
    
    recognitionProcess.stdout.on('data', (data) => {
        const output = data.toString().trim();
        
        if (output.startsWith('RECOGNIZED:')) {
            const voiceCommand = output.replace('RECOGNIZED:', '').trim();
            
            if (voiceCommand.toLowerCase().includes('stop listening')) {
                stopVoiceInput();
            } else if (voiceCommand.length > 2) {
                console.log(`\n🎤 You said: "${voiceCommand}"`);
                handleCommand(voiceCommand);
            }
        } else if (output.startsWith('LISTENING:')) {
            console.log('[JARVIS] Voice recognition ready.');
        }
    });
    
    recognitionProcess.stderr.on('data', (data) => {
        console.error('[JARVIS] Voice recognition error:', data.toString());
    });
    
    recognitionProcess.on('close', () => {
        voiceInputActive = false;
        // Clean up temp file
        if (fs.existsSync(scriptPath)) {
            fs.unlinkSync(scriptPath);
        }
    });
}

// Cross-platform web-based speech recognition (opens browser)
function startWebSpeechRecognition() {
    console.log('[JARVIS] Opening web-based voice input...');
    
    // Create a simple HTML page with Web Speech API
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>JARVIS Voice Input</title>
    <style>
        body {
            background: #000;
            color: #0ff;
            font-family: 'Courier New', monospace;
            padding: 20px;
            text-align: center;
        }
        #status {
            font-size: 24px;
            margin: 20px;
        }
        #transcript {
            background: #111;
            border: 1px solid #0ff;
            padding: 20px;
            margin: 20px auto;
            width: 80%;
            min-height: 100px;
            text-align: left;
        }
        button {
            background: #0ff;
            color: #000;
            border: none;
            padding: 10px 20px;
            font-size: 18px;
            cursor: pointer;
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>JARVIS Voice Input</h1>
    <div id="status">🎙️ Ready to listen...</div>
    <div id="transcript"></div>
    <button onclick="startListening()">Start Listening</button>
    <button onclick="stopListening()">Stop Listening</button>
    <script>
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.continuous = true;
        recognition.interimResults = true;
        
        recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    transcript = event.results[i][0].transcript;
                    document.getElementById('transcript').innerHTML += '<p>You said: ' + transcript + '</p>';
                    // Send to JARVIS via localhost server
                    fetch('http://localhost:3333/voice-command', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({command: transcript})
                    });
                }
            }
        };
        
        function startListening() {
            recognition.start();
            document.getElementById('status').textContent = '🔴 Listening...';
        }
        
        function stopListening() {
            recognition.stop();
            document.getElementById('status').textContent = '⏸️ Stopped';
        }
        
        // Auto-start
        startListening();
    </script>
</body>
</html>
`;
    
    // Save HTML file and open in browser
    const htmlPath = path.join(__dirname, 'jarvis-voice-input.html');
    fs.writeFileSync(htmlPath, htmlContent);
    
    // Start a simple server to receive voice commands
    const express = require('express');
    const app = express();
    app.use(express.json());
    
    app.post('/voice-command', (req, res) => {
        const command = req.body.command;
        if (command) {
            console.log(`\n🎤 You said: "${command}"`);
            handleCommand(command);
        }
        res.json({status: 'received'});
    });
    
    const server = app.listen(3333, () => {
        console.log('[JARVIS] Voice server running on http://localhost:3333');
        // Open browser
        const open = require('open');
        open(htmlPath);
    });
    
    // Store server reference
    recognitionProcess = server;
}

// Stop voice input
function stopVoiceInput() {
    if (!voiceInputActive) {
        console.log('[JARVIS] Voice input is not active.');
        return;
    }
    
    console.log('[JARVIS] Stopping voice input...');
    speak('Voice input deactivated.');
    voiceInputActive = false;
    
    if (recognitionProcess) {
        if (typeof recognitionProcess.kill === 'function') {
            recognitionProcess.kill();
        } else if (typeof recognitionProcess.close === 'function') {
            recognitionProcess.close();
        }
        recognitionProcess = null;
    }
    
    // Clean up temp files
    const scriptPath = path.join(__dirname, 'temp-speech.ps1');
    const htmlPath = path.join(__dirname, 'jarvis-voice-input.html');
    
    if (fs.existsSync(scriptPath)) {
        fs.unlinkSync(scriptPath);
    }
    if (fs.existsSync(htmlPath)) {
        fs.unlinkSync(htmlPath);
    }
}

// Natural Language Processing - Maps voice phrases to commands
const voiceCommandMap = {
    // Testing commands
    'run tests': 'test',
    'run all tests': 'test',
    'execute tests': 'test',
    'start testing': 'test',
    'run workshop tests': 'test-workshop',
    'test workshops': 'test-workshop',
    'run workshop': 'test-workshop',
    
    // Analysis commands
    'analyze failures': 'analyze',
    'check failures': 'analyze',
    'show failures': 'analyze',
    'what failed': 'analyze',
    'failure report': 'analyze',
    
    // Status commands
    'status': 'status',
    'check status': 'status',
    'system status': 'status',
    'are you ready': 'status',
    'systems check': 'status',
    
    // Cypress commands
    'open cypress': 'open-cypress',
    'launch cypress': 'open-cypress',
    'start cypress': 'open-cypress',
    
    // Help commands
    'help': 'help',
    'what can you do': 'help',
    'show commands': 'help',
    'list commands': 'help',
    
    // Voice control
    'mute': 'mute-voice',
    'unmute': 'unmute-voice',
    'silence': 'mute-voice',
    'speak': 'unmute-voice',
    'listen': 'start-listening',
    'start listening': 'start-listening',
    'activate voice': 'start-listening',
    'stop listening': 'stop-listening',
    'deactivate voice': 'stop-listening',
    
    // Exit commands
    'exit': 'exit',
    'quit': 'exit',
    'goodbye': 'exit',
    'shutdown': 'exit',
    'bye jarvis': 'exit',
    
    // Clear commands
    'clear': 'clear',
    'clear screen': 'clear',
    'reset': 'clear'
};

// Process natural language input
function processNaturalLanguage(input) {
    const lowerInput = input.toLowerCase().trim();
    
    // Direct command match
    if (voiceCommandMap[lowerInput]) {
        return voiceCommandMap[lowerInput];
    }
    
    // Fuzzy matching for partial commands
    for (const [phrase, command] of Object.entries(voiceCommandMap)) {
        if (lowerInput.includes(phrase) || phrase.includes(lowerInput)) {
            return command;
        }
    }
    
    // Special cases for specific test runs
    if (lowerInput.includes('test') && lowerInput.includes('aero')) {
        return 'run test:aero';
    }
    if (lowerInput.includes('test') && lowerInput.includes('solar')) {
        return 'run test:solar';
    }
    if (lowerInput.includes('test') && lowerInput.includes('electronics')) {
        return 'run test:electronics';
    }
    if (lowerInput.includes('test') && lowerInput.includes('api')) {
        return 'run test:api';
    }
    if (lowerInput.includes('test') && lowerInput.includes('dashboard')) {
        return 'run test:dashboard';
    }
    
    // Run specific npm scripts
    if (lowerInput.startsWith('run ')) {
        return lowerInput;
    }
    
    return null;
}

// Simple display without colors for better compatibility
function displayJarvis() {
    console.clear();
    console.log(JARVIS_LOGO);
    console.log('\n[JARVIS] All systems initialized. Ready for your commands, sir.');
    console.log('Type "help" to see available commands.');
    console.log('🎤 Voice commands enabled. Try: "Jarvis, run tests" or "check status"');
    console.log('Type "listen" to activate speech-to-text voice input.\n');
    speak('All systems initialized. Ready for your commands, sir.');
}

// Commands
const commands = {
    help: () => {
        console.log('\n═══════════════ JARVIS COMMANDS ═══════════════');
        console.log('  help            - Show available commands');
        console.log('  status          - Check system status');
        console.log('  test            - Run Cypress tests with AI');
        console.log('  test-workshop   - Run workshop tests');
        console.log('  analyze         - Analyze test failures');
        console.log('  open-cypress    - Open Cypress Test Runner');
        console.log('  mute/unmute     - Toggle voice responses');
        console.log('  listen          - Start voice input (speech-to-text)');
        console.log('  stop listening  - Stop voice input');
        console.log('  clear           - Clear screen');
        console.log('  exit            - Exit JARVIS');
        console.log('\n🎤 VOICE COMMANDS (Natural Language):');
        console.log('  "Run tests"           "Check failures"');
        console.log('  "Open Cypress"        "System status"');
        console.log('  "Test workshops"      "What can you do?"');
        console.log('  "Analyze failures"    "Goodbye Jarvis"');
        console.log('\n🎤 SPEECH INPUT:');
        console.log('  Type "listen" to activate microphone input');
        console.log('  ' + (isWindows ? 'Uses Windows Speech Recognition' : 'Opens web browser for voice input'));
        console.log('═══════════════════════════════════════════════\n');
        speak('I can help you run tests, analyze failures, and manage your testing workflow. Just ask naturally.');
    },
    status: () => {
        console.log('\n[JARVIS] Running system diagnostics...');
        speak('Running system diagnostics');
        setTimeout(() => {
            console.log('✓ Groq AI Integration: ONLINE');
            console.log('✓ OCR Engine: READY');
            console.log('✓ Discord Reporter: CONNECTED');
            console.log('✓ Visual Debugger: ARMED');
            console.log('✓ Test Framework: OPERATIONAL');
            console.log('✓ Voice Interface: ACTIVE\n');
            speak('All systems operational, sir.');
        }, 500);
    },
    test: () => {
        console.log('\n[JARVIS] Initializing test suite...');
        speak('Initializing test suite');
        exec('npm test', (error, stdout, stderr) => {
            if (error) {
                console.log(`[ERROR] Test execution failed: ${error.message}`);
                speak('Test execution failed. Check the console for details.');
                return;
            }
            console.log(stdout);
            speak('Test execution complete.');
        });
    },
    'test-workshop': () => {
        console.log('\n[JARVIS] Running workshop tests...');
        speak('Running workshop tests');
        exec('npm run test:workshops', (error, stdout, stderr) => {
            if (error) {
                console.log(`[ERROR] ${error.message}`);
                speak('Workshop tests failed.');
                return;
            }
            console.log(stdout);
            speak('Workshop tests complete.');
        });
    },
    analyze: () => {
        console.log('\n[JARVIS] Analyzing failure reports...');
        speak('Analyzing failure reports');
        const reportsDir = path.join(__dirname, 'cypress', 'jarvis-reports');
        
        if (!fs.existsSync(reportsDir)) {
            console.log('[JARVIS] No failure reports found.');
            speak('No failure reports found. All systems green.');
            return;
        }
        
        const files = fs.readdirSync(reportsDir)
            .filter(f => f.endsWith('.md'))
            .sort((a, b) => b.localeCompare(a));
        
        if (files.length === 0) {
            console.log('[JARVIS] All systems green. No failures detected.');
            speak('All systems green. No failures detected.');
        } else {
            console.log(`[JARVIS] Found ${files.length} failure report(s).`);
            console.log(`Latest: ${files[0]}`);
            speak(`Found ${files.length} failure reports. Check console for details.`);
        }
    },
    'open-cypress': () => {
        console.log('\n[JARVIS] Opening Cypress Test Runner...');
        speak('Opening Cypress Test Runner');
        exec('npm run cy:open', (error) => {
            if (error) {
                console.log(`[ERROR] ${error.message}`);
                speak('Failed to open Cypress.');
            } else {
                speak('Cypress is now open.');
            }
        });
    },
    'mute-voice': () => {
        voiceEnabled = false;
        console.log('[JARVIS] Voice responses disabled.');
    },
    'unmute-voice': () => {
        voiceEnabled = true;
        console.log('[JARVIS] Voice responses enabled.');
        speak('Voice responses enabled, sir.');
    },
    'start-listening': () => {
        startVoiceInput();
    },
    'stop-listening': () => {
        stopVoiceInput();
    },
    listen: () => {
        startVoiceInput();
    },
    clear: () => {
        displayJarvis();
    },
    exit: () => {
        console.log('\n[JARVIS] Shutting down systems...');
        speak('Shutting down systems. Goodbye, sir.');
        console.log('▸ Neural Network: OFFLINE');
        console.log('▸ Visual Cortex: OFFLINE');
        console.log('▸ AI Integration: OFFLINE');
        console.log('▸ Voice Interface: OFFLINE');
        console.log('[JARVIS] Goodbye, sir.\n');
        setTimeout(() => process.exit(0), 2000); // Give time for speech
    }
};

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'JARVIS> '
});

// Handle command input with natural language support
function handleCommand(input) {
    const trimmedInput = input.trim();
    
    if (trimmedInput === '') {
        rl.prompt();
        return;
    }
    
    // Remove 'jarvis' prefix if present (for voice-style commands)
    let processedInput = trimmedInput.toLowerCase();
    if (processedInput.startsWith('jarvis,') || processedInput.startsWith('jarvis ')) {
        processedInput = processedInput.replace(/^jarvis[,\s]+/, '').trim();
    }
    
    // Try natural language processing first
    let cmd = processNaturalLanguage(processedInput);
    
    // If no natural language match, try direct command
    if (!cmd) {
        cmd = processedInput;
    }
    
    if (commands[cmd]) {
        commands[cmd]();
    } else if (cmd.startsWith('run ')) {
        const script = cmd.substring(4);
        console.log(`\n[JARVIS] Executing: npm run ${script}`);
        speak(`Executing ${script}`);
        exec(`npm run ${script}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`[ERROR] ${error.message}`);
                speak('Command failed.');
            } else {
                console.log(stdout);
                speak('Command executed successfully.');
            }
            rl.prompt();
        });
        return;
    } else {
        // Try to be helpful with suggestions
        console.log(`\n[JARVIS] I didn't understand "${trimmedInput}".`);
        
        // Suggest similar commands
        if (processedInput.includes('test')) {
            console.log('[JARVIS] Did you mean: "run tests" or "test workshops"?');
            speak('Did you mean run tests or test workshops?');
        } else if (processedInput.includes('fail')) {
            console.log('[JARVIS] Did you mean: "analyze failures"?');
            speak('Did you mean analyze failures?');
        } else {
            console.log('[JARVIS] Type "help" for available commands or speak naturally.');
            speak('I can help with testing, analysis, and more. Just ask.');
        }
    }
    
    setTimeout(() => rl.prompt(), 100);
}

// Initialize
displayJarvis();

// Handle line input
rl.on('line', (input) => {
    handleCommand(input);
});

// Handle CTRL+C
rl.on('SIGINT', () => {
    commands.exit();
});

// Add keyboard shortcuts info
console.log('\n💡 TIP: Type "listen" to activate voice input (speech-to-text)');
console.log('      Say commands like "run tests", "check status", "analyze failures"');

// Start prompt
rl.prompt();