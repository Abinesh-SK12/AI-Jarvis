console.log('Welcome to AI-Jarvis!');
console.log('Initializing AI assistant...');

class Jarvis {
    constructor() {
        this.name = 'Jarvis';
        this.version = '1.0.0';
        this.isActive = false;
    }

    activate() {
        this.isActive = true;
        console.log(`${this.name} v${this.version} is now active.`);
    }

    processCommand(command) {
        if (!this.isActive) {
            console.log('Jarvis is not active. Please activate first.');
            return;
        }
        console.log(`Processing command: ${command}`);
    }

    deactivate() {
        this.isActive = false;
        console.log(`${this.name} is now inactive.`);
    }
}

const jarvis = new Jarvis();
jarvis.activate();

module.exports = Jarvis;