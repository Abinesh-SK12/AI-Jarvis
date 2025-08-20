/**
 * AI Configuration Module for JARVIS
 * Multi-Modal AI Brain with 5 FREE AI Providers Working Together
 */

class AIConfig {
  constructor() {
    this.loadConfiguration();
    this.initializeMultiModalBrain();
  }

  loadConfiguration() {
    // Check if Cypress is available
    const getCypressEnv = (key) => {
      if (typeof Cypress !== 'undefined' && Cypress.env) {
        return Cypress.env(key);
      }
      return null;
    };
    
    // Multi-Modal Brain Configuration - ALL FREE APIs
    this.config = {
      // 1. Google Gemini - General Intelligence & Vision
      gemini: {
        apiKey: getCypressEnv('GEMINI_API_KEY') || process.env.GEMINI_API_KEY, // Set in .env file
        model: 'gemini-1.5-flash',
        enabled: true,
        specialties: ['code-analysis', 'debugging', 'vision', 'general-qa'],
        rateLimit: 60, // requests per minute
        lastUsed: 0
      },
      
      // 2. Groq - Fast Inference with Llama & Mixtral
      groq: {
        apiKey: getCypressEnv('GROQ_API_KEY') || process.env.GROQ_API_KEY, // Set in .env file
        models: {
          llama3: 'llama3-70b-8192',
          mixtral: 'mixtral-8x7b-32768',
          gemma: 'gemma-7b-it'
        },
        enabled: true,
        specialties: ['fast-analysis', 'code-generation', 'refactoring'],
        rateLimit: 30,
        lastUsed: 0
      },
      
      // 3. Hugging Face - Specialized Models
      huggingface: {
        apiKey: getCypressEnv('HF_API_KEY') || process.env.HF_API_KEY, // Set in .env file
        models: {
          codeGen: 'Salesforce/codegen-350M-mono',
          sentiment: 'distilbert-base-uncased-finetuned-sst-2-english',
          zeroShot: 'facebook/bart-large-mnli',
          codeSearch: 'huggingface/CodeBERTa-small-v1'
        },
        enabled: true,
        specialties: ['code-search', 'sentiment-analysis', 'classification'],
        rateLimit: 100,
        lastUsed: 0
      },
      
      // 4. Cohere - Text Analysis & Generation
      cohere: {
        apiKey: getCypressEnv('COHERE_API_KEY') || process.env.COHERE_API_KEY, // Set in .env file
        model: 'command-light',
        enabled: true,
        specialties: ['summarization', 'classification', 'extraction'],
        rateLimit: 100,
        lastUsed: 0
      },
      
      // 5. Local Ollama - Fully Offline
      ollama: {
        url: 'http://localhost:11434',
        models: {
          primary: 'gpt-oss:20b',  // Your installed 20B model
          code: 'gpt-oss:20b',     // Using same model for code
          tiny: 'phi3:mini'        // Your installed Phi3 mini
        },
        enabled: false, // Will auto-enable if Ollama is running
        specialties: ['private-analysis', 'offline-mode', 'unlimited-requests'],
        rateLimit: Infinity,
        lastUsed: 0
      },
      // Paid APIs (Optional)
      openai: {
        apiKey: getCypressEnv('OPENAI_API_KEY') || process.env.OPENAI_API_KEY,
        model: getCypressEnv('OPENAI_MODEL') || process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
        enabled: !!getCypressEnv('OPENAI_API_KEY') || !!process.env.OPENAI_API_KEY
      },
      anthropic: {
        apiKey: getCypressEnv('ANTHROPIC_API_KEY') || process.env.ANTHROPIC_API_KEY,
        model: getCypressEnv('CLAUDE_MODEL') || process.env.CLAUDE_MODEL || 'claude-3-opus-20240229',
        enabled: !!getCypressEnv('ANTHROPIC_API_KEY') || !!process.env.ANTHROPIC_API_KEY
      },
      
      // Analysis Settings
      analysis: {
        confidenceThreshold: parseFloat(getCypressEnv('AI_CONFIDENCE_THRESHOLD') || process.env.AI_CONFIDENCE_THRESHOLD || '0.8'),
        maxRetries: parseInt(getCypressEnv('AI_MAX_RETRIES') || process.env.AI_MAX_RETRIES || '3'),
        timeout: parseInt(getCypressEnv('AI_TIMEOUT') || process.env.AI_TIMEOUT || '30000'),
        temperature: 0.3,
        maxTokens: 2000
      },
      
      // Pattern Recognition
      patternRecognition: {
        enabled: getCypressEnv('ENABLE_PATTERN_RECOGNITION') !== 'false' && process.env.ENABLE_PATTERN_RECOGNITION !== 'false',
        cacheSize: parseInt(getCypressEnv('PATTERN_CACHE_SIZE') || process.env.PATTERN_CACHE_SIZE || '100'),
        minOccurrences: parseInt(getCypressEnv('PATTERN_MIN_OCCURRENCES') || process.env.PATTERN_MIN_OCCURRENCES || '2')
      },
      
      // Self-Healing
      selfHealing: {
        aiEnabled: getCypressEnv('ENABLE_AI_SELF_HEALING') !== 'false' && process.env.ENABLE_AI_SELF_HEALING !== 'false',
        autoApplyFixes: getCypressEnv('AUTO_APPLY_FIXES') === 'true' || process.env.AUTO_APPLY_FIXES === 'true'
      }
    };
  }

  // Initialize Multi-Modal Brain System
  initializeMultiModalBrain() {
    this.brain = {
      taskQueue: [],
      activeModels: [],
      consensusThreshold: 0.7,
      learningMemory: new Map(),
      
      // Task routing based on specialty
      taskRouter: {
        'debug-error': ['gemini', 'groq'],
        'generate-code': ['groq', 'ollama'],
        'analyze-failure': ['gemini', 'cohere'],
        'find-selector': ['huggingface', 'gemini'],
        'explain-code': ['gemini', 'groq'],
        'suggest-fix': ['groq', 'gemini', 'ollama'],
        'visual-analysis': ['gemini'],
        'performance': ['groq', 'ollama'],
        'security': ['huggingface', 'groq']
      }
    };
    
    // Check which providers are actually available (silently on module load)
    this.checkProviderAvailability(true);
  }
  
  // Check provider availability
  async checkProviderAvailability(silent = false) {
    // Check if Ollama is running locally
    try {
      const response = await fetch('http://localhost:11434/api/tags');
      if (response.ok) {
        this.config.ollama.enabled = true;
        if (!silent) console.log('🟢 Ollama detected - Local AI enabled');
      }
    } catch (e) {
      this.config.ollama.enabled = false;
    }
    
    // Validate API keys
    if (!silent) {
      if (!this.config.groq.apiKey || this.config.groq.apiKey === 'gsk_demo_free_key') {
        console.log('🟡 Groq: Using demo key - Get free key at groq.com');
      } else if (this.config.groq.apiKey.startsWith('gsk_')) {
        console.log('🟢 Groq: API key configured');
      }
      
      if (!this.config.huggingface.apiKey || this.config.huggingface.apiKey === 'hf_free_token') {
        console.log('🟡 HuggingFace: Using demo key - Get free key at huggingface.co');
      } else if (this.config.huggingface.apiKey.startsWith('hf_')) {
        console.log('🟢 HuggingFace: API key configured');
      }
      
      if (!this.config.cohere.apiKey || this.config.cohere.apiKey === 'trial_key') {
        console.log('🟡 Cohere: Using trial key - Get free key at cohere.ai');
      } else {
        console.log('🟢 Cohere: API key configured');
      }
      
      console.log('🧠 Multi-Modal Brain Status:');
      console.log(`  ✓ Gemini: ${this.config.gemini.enabled ? 'Ready' : 'Disabled'}`);
      console.log(`  ✓ Groq: ${this.config.groq.enabled ? 'Ready' : 'Disabled'}`);
      console.log(`  ✓ HuggingFace: ${this.config.huggingface.enabled ? 'Ready' : 'Disabled'}`);
      console.log(`  ✓ Cohere: ${this.config.cohere.enabled ? 'Ready' : 'Disabled'}`);
      console.log(`  ✓ Ollama: ${this.config.ollama.enabled ? 'Ready (Local)' : 'Not Running'}`);
    }
  }
  
  // Multi-Modal Analysis - Multiple AIs work together
  async multiModalAnalysis(task, context) {
    console.log('🧠 Multi-Modal Brain analyzing task:', task);
    
    // Determine which models to use for this task
    const modelsToUse = this.brain.taskRouter[task] || ['gemini', 'groq'];
    const enabledModels = modelsToUse.filter(m => this.config[m]?.enabled);
    
    if (enabledModels.length === 0) {
      console.log('⚠️ No AI models available, using fallback');
      return this.fallbackAnalysis(task, context);
    }
    
    // Run analysis in parallel with all suitable models
    const analyses = await Promise.allSettled(
      enabledModels.map(model => this.analyzeWithModel(model, task, context))
    );
    
    // Collect successful results
    const results = analyses
      .filter(r => r.status === 'fulfilled')
      .map(r => r.value);
    
    if (results.length === 0) {
      return this.fallbackAnalysis(task, context);
    }
    
    // Combine insights from all models
    return this.combineInsights(results, task);
  }
  
  // Analyze with specific model
  async analyzeWithModel(modelName, task, context) {
    const provider = this.config[modelName];
    if (!provider || !provider.enabled) {
      throw new Error(`Model ${modelName} not available`);
    }
    
    // Rate limiting
    const now = Date.now();
    const timeSinceLastUse = now - provider.lastUsed;
    const minInterval = 60000 / provider.rateLimit; // Convert to ms between requests
    
    if (timeSinceLastUse < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - timeSinceLastUse));
    }
    
    provider.lastUsed = Date.now();
    
    // Route to appropriate API
    switch (modelName) {
      case 'gemini':
        return this.analyzeWithGemini(task, context);
      case 'groq':
        return this.analyzeWithGroq(task, context);
      case 'huggingface':
        return this.analyzeWithHuggingFace(task, context);
      case 'cohere':
        return this.analyzeWithCohere(task, context);
      case 'ollama':
        return this.analyzeWithOllama(task, context);
      default:
        throw new Error(`Unknown model: ${modelName}`);
    }
  }
  
  // Gemini Analysis (Google's Free AI)
  async analyzeWithGemini(task, context) {
    const apiKey = this.config.gemini.apiKey;
    const prompt = this.buildPrompt(task, context);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3, maxOutputTokens: 1000 }
        })
      });
      
      const data = await response.json();
      return {
        model: 'gemini',
        confidence: 0.85,
        analysis: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response',
        specialty: 'general-intelligence'
      };
    } catch (error) {
      console.error('Gemini error:', error);
      return null;
    }
  }
  
  // Groq Analysis (Fast Llama3)
  async analyzeWithGroq(task, context) {
    const apiKey = this.config.groq.apiKey;
    if (!apiKey || apiKey === 'gsk_demo_free_key') {
      return null; // Skip if no real API key
    }
    
    const prompt = this.buildPrompt(task, context);
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.groq.models.llama3,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          max_tokens: 1000
        })
      });
      
      const data = await response.json();
      return {
        model: 'groq-llama3',
        confidence: 0.8,
        analysis: data.choices?.[0]?.message?.content || 'No response',
        specialty: 'fast-inference'
      };
    } catch (error) {
      console.error('Groq error:', error);
      return null;
    }
  }
  
  // HuggingFace Analysis (Specialized Models)
  async analyzeWithHuggingFace(task, context) {
    const apiKey = this.config.huggingface.apiKey;
    if (!apiKey || apiKey === 'hf_free_token') {
      return null; // Skip if no real API key
    }
    
    // Select appropriate model based on task
    let model = this.config.huggingface.models.codeGen;
    if (task.includes('classify') || task.includes('sentiment')) {
      model = this.config.huggingface.models.sentiment;
    } else if (task.includes('search')) {
      model = this.config.huggingface.models.codeSearch;
    }
    
    const prompt = this.buildPrompt(task, context);
    
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            temperature: 0.3,
            max_new_tokens: 500,
            return_full_text: false
          }
        })
      });
      
      const data = await response.json();
      return {
        model: `huggingface-${model.split('/').pop()}`,
        confidence: 0.75,
        analysis: data[0]?.generated_text || data[0]?.label || JSON.stringify(data),
        specialty: 'specialized-models'
      };
    } catch (error) {
      console.error('HuggingFace error:', error);
      return null;
    }
  }
  
  // Cohere Analysis (Text Analysis)
  async analyzeWithCohere(task, context) {
    const apiKey = this.config.cohere.apiKey;
    if (!apiKey || apiKey === 'trial_key') {
      return null; // Skip if no real API key
    }
    
    const prompt = this.buildPrompt(task, context);
    
    try {
      const response = await fetch('https://api.cohere.ai/v1/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.config.cohere.model,
          prompt: prompt,
          max_tokens: 500,
          temperature: 0.3,
          k: 0,
          stop_sequences: [],
          return_likelihoods: 'NONE'
        })
      });
      
      const data = await response.json();
      return {
        model: 'cohere',
        confidence: 0.7,
        analysis: data.generations?.[0]?.text || 'No response',
        specialty: 'text-analysis'
      };
    } catch (error) {
      console.error('Cohere error:', error);
      return null;
    }
  }
  
  // Ollama Analysis (Local AI)
  async analyzeWithOllama(task, context) {
    if (!this.config.ollama.enabled) {
      return null; // Skip if Ollama not running
    }
    
    const prompt = this.buildPrompt(task, context);
    const model = task.includes('code') ? 
      this.config.ollama.models.code : 
      this.config.ollama.models.primary;
    
    try {
      // Use AbortController for timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(`${this.config.ollama.url}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: model,
          prompt: prompt,
          stream: false,
          options: {
            temperature: 0.3,
            num_predict: 500
          }
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
      const data = await response.json();
      return {
        model: `ollama-${model}`,
        confidence: 0.85,
        analysis: data.response || 'No response',
        specialty: 'local-processing'
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Ollama request timed out - model may be loading or unavailable');
      } else {
        console.error('Ollama error:', error.message || error);
      }
      // Disable Ollama for this session to prevent further timeouts
      this.config.ollama.enabled = false;
      return null;
    }
  }
  
  // Combine insights from multiple models
  combineInsights(results, task) {
    console.log(`🧠 Combining insights from ${results.length} AI models`);
    
    // Weight insights by model confidence
    const weightedInsights = results.map(r => ({
      ...r,
      weight: r.confidence * (r.specialty === task ? 1.2 : 1.0)
    }));
    
    // Find consensus
    const consensus = this.findConsensus(weightedInsights);
    
    // Combine unique insights
    const combinedAnalysis = {
      task,
      consensus: consensus.agreed,
      confidenceLevel: consensus.confidence,
      insights: weightedInsights.map(w => ({
        model: w.model,
        specialty: w.specialty,
        analysis: w.analysis
      })),
      recommendation: this.generateRecommendation(weightedInsights, task),
      timestamp: new Date().toISOString()
    };
    
    // Store in learning memory
    this.brain.learningMemory.set(task, combinedAnalysis);
    
    return combinedAnalysis;
  }
  
  // Find consensus among models
  findConsensus(insights) {
    // Extract common patterns and agreements
    const allText = insights.map(i => i.analysis).join(' ');
    const words = allText.toLowerCase().split(/\s+/);
    const wordFreq = {};
    
    words.forEach(word => {
      if (word.length > 4) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });
    
    // Find most agreed upon concepts
    const topConcepts = Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word]) => word);
    
    const avgConfidence = insights.reduce((sum, i) => sum + i.confidence, 0) / insights.length;
    
    return {
      agreed: topConcepts,
      confidence: avgConfidence
    };
  }
  
  // Generate final recommendation
  generateRecommendation(insights, task) {
    const bestInsight = insights.reduce((best, current) => 
      current.weight > best.weight ? current : best
    );
    
    return {
      primary: bestInsight.analysis,
      confidence: bestInsight.confidence,
      source: bestInsight.model,
      alternativeSolutions: insights
        .filter(i => i.model !== bestInsight.model)
        .map(i => ({ model: i.model, solution: i.analysis.substring(0, 200) }))
    };
  }
  
  // Build prompt based on task
  buildPrompt(task, context) {
    const prompts = {
      'debug-error': `Debug this test error: ${context.error}\nCode: ${context.code}\nProvide specific fix.`,
      'generate-code': `Generate code for: ${context.description}\nFramework: Cypress\nBe concise.`,
      'analyze-failure': `Analyze test failure: ${context.failure}\nSuggest root cause and fix.`,
      'find-selector': `Find best selector for element: ${context.element}\nHTML: ${context.html}`,
      'explain-code': `Explain this code: ${context.code}\nBe clear and concise.`,
      'suggest-fix': `Suggest fix for: ${context.issue}\nContext: ${context.details}`
    };
    
    return prompts[task] || `Analyze: ${JSON.stringify(context)}`;
  }
  
  // Fallback analysis when no AI available
  fallbackAnalysis(task, context) {
    return {
      task,
      consensus: ['manual-review-needed'],
      confidenceLevel: 0.3,
      insights: [{
        model: 'fallback',
        specialty: 'basic-rules',
        analysis: 'AI providers unavailable. Using rule-based analysis.'
      }],
      recommendation: {
        primary: 'Please review manually or configure AI providers.',
        confidence: 0.3,
        source: 'fallback'
      }
    };
  }
  
  getActiveProvider() {
    // For backward compatibility
    if (this.config.gemini.enabled) return 'gemini';
    if (this.config.groq.enabled) return 'groq';
    if (this.config.ollama.enabled) return 'ollama';
    if (this.config.openai.enabled) return 'openai';
    if (this.config.anthropic.enabled) return 'anthropic';
    return null;
  }

  getProviderConfig(provider) {
    return this.config[provider] || null;
  }

  getAnalysisSettings() {
    return this.config.analysis;
  }

  getPatternSettings() {
    return this.config.patternRecognition;
  }

  getSelfHealingSettings() {
    return this.config.selfHealing;
  }

  isConfigured() {
    return this.getActiveProvider() !== null;
  }

  validateConfiguration() {
    const errors = [];
    const warnings = [];

    // Check for at least one API key (Gemini is always available)
    if (!this.isConfigured()) {
      warnings.push('Using default Gemini API key. Consider setting your own GEMINI_API_KEY for better limits.');
    }

    // Validate confidence threshold
    if (this.config.analysis.confidenceThreshold < 0 || this.config.analysis.confidenceThreshold > 1) {
      warnings.push('AI_CONFIDENCE_THRESHOLD should be between 0 and 1');
    }

    // Check for auto-apply without high confidence
    if (this.config.selfHealing.autoApplyFixes && this.config.analysis.confidenceThreshold < 0.7) {
      warnings.push('AUTO_APPLY_FIXES is enabled with low confidence threshold. Consider increasing AI_CONFIDENCE_THRESHOLD');
    }

    return { errors, warnings };
  }

  getConfigurationSummary() {
    const provider = this.getActiveProvider();
    
    return {
      provider: provider ? provider.toUpperCase() : 'None',
      model: provider ? this.config[provider].model : 'N/A',
      patternRecognition: this.config.patternRecognition.enabled ? 'Enabled' : 'Disabled',
      autoFix: this.config.selfHealing.autoApplyFixes ? 'Enabled' : 'Disabled',
      confidenceThreshold: `${(this.config.analysis.confidenceThreshold * 100).toFixed(0)}%`
    };
  }

  // Method to update configuration at runtime
  updateConfig(key, value) {
    const keys = key.split('.');
    let current = this.config;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
  }
}

// Export singleton instance
module.exports = new AIConfig();