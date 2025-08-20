#!/usr/bin/env node

/**
 * JARVIS Break Reminder Service
 * Runs in background and monitors system usage
 * Sends notifications every hour of continuous use
 */

const notifier = require('node-notifier');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Configuration
const CONFIG = {
    checkInterval: 60000,        // Check every minute
    breakInterval: 3600000,      // 1 hour in milliseconds
    idleThreshold: 300000,       // 5 minutes of idle = break taken
    snoozeTime: 600000,          // Snooze for 10 minutes
    logFile: path.join(__dirname, 'break-reminder.log'),
    stateFile: path.join(__dirname, '.break-reminder-state.json')
};

// State management
let state = {
    lastActivityTime: Date.now(),
    lastBreakTime: Date.now(),
    sessionStartTime: Date.now(),
    totalActiveTime: 0,
    reminderCount: 0,
    snoozedUntil: 0
};

// Load previous state if exists
const loadState = () => {
    try {
        if (fs.existsSync(CONFIG.stateFile)) {
            const savedState = JSON.parse(fs.readFileSync(CONFIG.stateFile, 'utf8'));
            state = { ...state, ...savedState };
            log('State loaded from previous session');
        }
    } catch (error) {
        log('Error loading state: ' + error.message);
    }
};

// Save current state
const saveState = () => {
    try {
        fs.writeFileSync(CONFIG.stateFile, JSON.stringify(state, null, 2));
    } catch (error) {
        log('Error saving state: ' + error.message);
    }
};

// Logging function
const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    
    // Console output
    console.log(logMessage.trim());
    
    // File logging
    try {
        fs.appendFileSync(CONFIG.logFile, logMessage);
    } catch (error) {
        console.error('Failed to write to log file:', error.message);
    }
};

// Check if user is active (using Windows idle time)
const getUserIdleTime = () => {
    return new Promise((resolve) => {
        // Get idle time using Windows API
        exec('powershell -Command "Add-Type @\' using System; using System.Runtime.InteropServices; public class IdleTime { [DllImport(\\"user32.dll\\")] public static extern bool GetLastInputInfo(ref LASTINPUTINFO plii); [StructLayout(LayoutKind.Sequential)] public struct LASTINPUTINFO { public uint cbSize; public uint dwTime; } public static uint GetIdleTime() { LASTINPUTINFO info = new LASTINPUTINFO(); info.cbSize = (uint)Marshal.SizeOf(info); GetLastInputInfo(ref info); return ((uint)Environment.TickCount - info.dwTime); } } \'@; [IdleTime]::GetIdleTime()"', 
        (error, stdout, stderr) => {
            if (error) {
                // Fallback: assume active
                resolve(0);
            } else {
                const idleMs = parseInt(stdout.trim()) || 0;
                resolve(idleMs);
            }
        });
    });
};

// Send break notification
const sendBreakNotification = (urgency = 'normal') => {
    const messages = {
        normal: {
            title: '⏰ JARVIS Break Reminder',
            message: "You've been working for 1 hour. Time for a 5-minute break!",
            sound: true,
            icon: path.join(__dirname, 'jarvis-icon.png'),
            actions: ['Take Break', 'Snooze 10 min']
        },
        urgent: {
            title: '🚨 JARVIS Health Alert',
            message: "You've been working for 2+ hours continuously! Please take a break NOW.",
            sound: true,
            icon: path.join(__dirname, 'jarvis-icon.png'),
            actions: ['Take Break', 'Snooze 5 min']
        },
        gentle: {
            title: '💡 JARVIS Tip',
            message: "Remember to stretch, look away from screen, and stay hydrated!",
            sound: false,
            icon: path.join(__dirname, 'jarvis-icon.png')
        }
    };
    
    const notification = messages[urgency] || messages.normal;
    
    notifier.notify({
        title: notification.title,
        message: notification.message,
        sound: notification.sound,
        icon: notification.icon,
        wait: true,
        timeout: 10,
        appID: 'JARVIS Break Reminder'
    }, (err, response, metadata) => {
        if (err) {
            log('Notification error: ' + err.message);
        } else {
            log(`Break notification sent (${urgency})`);
            state.reminderCount++;
        }
    });
    
    // Also show in console with colors
    console.log('\x1b[33m╔════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[33m║         JARVIS BREAK REMINDER ACTIVE           ║\x1b[0m');
    console.log('\x1b[33m╠════════════════════════════════════════════════╣\x1b[0m');
    console.log('\x1b[33m║\x1b[0m  Working Time: \x1b[36m1 hour continuous\x1b[0m              \x1b[33m║\x1b[0m');
    console.log('\x1b[33m║\x1b[0m  Recommendation: \x1b[32mTake a 5-minute break\x1b[0m        \x1b[33m║\x1b[0m');
    console.log('\x1b[33m║\x1b[0m  • Stand up and stretch                       \x1b[33m║\x1b[0m');
    console.log('\x1b[33m║\x1b[0m  • Look at something 20 feet away             \x1b[33m║\x1b[0m');
    console.log('\x1b[33m║\x1b[0m  • Drink some water                           \x1b[33m║\x1b[0m');
    console.log('\x1b[33m╚════════════════════════════════════════════════╝\x1b[0m');
    
    // Try to speak if JARVIS is running
    exec('powershell -Command "Add-Type -AssemblyName System.Speech; $speak = New-Object System.Speech.Synthesis.SpeechSynthesizer; $speak.Speak(\'Sir, you have been working for an hour. Please take a short break.\')"', 
    (error) => {
        if (!error) {
            log('Voice reminder spoken');
        }
    });
};

// Check if JARVIS is running
const isJarvisRunning = () => {
    return new Promise((resolve) => {
        exec('tasklist /FI "WINDOWTITLE eq JARVIS*" /FO CSV | find /I "node.exe"', (error, stdout) => {
            resolve(!error && stdout.includes('node.exe'));
        });
    });
};

// Main monitoring loop
const monitorActivity = async () => {
    try {
        const idleTime = await getUserIdleTime();
        const now = Date.now();
        const jarvisRunning = await isJarvisRunning();
        
        // Update activity status
        if (idleTime < 60000) { // Active if less than 1 minute idle
            state.lastActivityTime = now;
            
            // Check if it's time for a break
            const timeSinceBreak = now - state.lastBreakTime;
            const continuousWork = timeSinceBreak;
            
            if (continuousWork >= CONFIG.breakInterval && now > state.snoozedUntil) {
                // Determine urgency based on how long they've been working
                let urgency = 'normal';
                if (continuousWork >= CONFIG.breakInterval * 2) {
                    urgency = 'urgent';
                } else if (state.reminderCount % 3 === 2) {
                    urgency = 'gentle';
                }
                
                sendBreakNotification(urgency);
                
                // Update snooze time to prevent spam
                state.snoozedUntil = now + CONFIG.snoozeTime;
            }
            
            // Log status every 10 minutes
            if (now % 600000 < 60000) {
                const workMinutes = Math.floor(continuousWork / 60000);
                log(`Active session: ${workMinutes} minutes | JARVIS: ${jarvisRunning ? 'Running' : 'Not running'}`);
            }
        } else if (idleTime > CONFIG.idleThreshold) {
            // User has taken a break (idle for 5+ minutes)
            if (now - state.lastBreakTime > CONFIG.breakInterval) {
                state.lastBreakTime = now;
                state.snoozedUntil = 0;
                log('Break detected - timer reset');
            }
        }
        
        // Save state periodically
        if (now % 300000 < 60000) { // Every 5 minutes
            saveState();
        }
        
    } catch (error) {
        log('Monitor error: ' + error.message);
    }
};

// Handle process signals
process.on('SIGINT', () => {
    log('Service stopping...');
    saveState();
    process.exit(0);
});

process.on('SIGTERM', () => {
    log('Service terminated');
    saveState();
    process.exit(0);
});

// Initialize service
const init = () => {
    console.log('\x1b[36m╔════════════════════════════════════════════════╗\x1b[0m');
    console.log('\x1b[36m║     JARVIS BREAK REMINDER SERVICE v1.0        ║\x1b[0m');
    console.log('\x1b[36m╠════════════════════════════════════════════════╣\x1b[0m');
    console.log('\x1b[36m║\x1b[0m  Status: \x1b[32mACTIVE\x1b[0m                                \x1b[36m║\x1b[0m');
    console.log('\x1b[36m║\x1b[0m  Break Interval: \x1b[33m1 hour\x1b[0m                       \x1b[36m║\x1b[0m');
    console.log('\x1b[36m║\x1b[0m  Idle Threshold: \x1b[33m5 minutes\x1b[0m                    \x1b[36m║\x1b[0m');
    console.log('\x1b[36m║\x1b[0m  Running in: \x1b[33mBackground\x1b[0m                        \x1b[36m║\x1b[0m');
    console.log('\x1b[36m╚════════════════════════════════════════════════╝\x1b[0m');
    
    log('Break Reminder Service started');
    loadState();
    
    // Start monitoring
    setInterval(monitorActivity, CONFIG.checkInterval);
    
    // Initial check
    monitorActivity();
};

// Start the service
init();