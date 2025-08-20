/**
 * AI Debugger Commands - Simplified version for better Cypress integration
 */

// Command to analyze current failure state
Cypress.Commands.add('aiDebugFailure', function() {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
  // Get current test info
  const testInfo = {
    title: this.currentTest?.title || 'Unknown test',
    state: this.currentTest?.state || 'unknown'
  };
  
  // Get current URL and page info
  cy.url().then(url => {
    cy.document().then(doc => {
      // Extract page information
      const pageInfo = {
        url: url,
        title: doc.title,
        hasErrors: doc.body.innerText.includes('error') || doc.body.innerText.includes('Error'),
        elementCount: doc.querySelectorAll('*').length,
        formCount: doc.querySelectorAll('form').length,
        buttonCount: doc.querySelectorAll('button').length,
        inputCount: doc.querySelectorAll('input').length
      };
      
      // Build AI prompt
      const prompt = `
        Analyze this test failure and provide debugging help:
        
        Test: "${testInfo.title}"
        URL: ${pageInfo.url}
        Page Title: "${pageInfo.title}"
        
        Page Stats:
        - Total elements: ${pageInfo.elementCount}
        - Forms: ${pageInfo.formCount}
        - Buttons: ${pageInfo.buttonCount}
        - Input fields: ${pageInfo.inputCount}
        - Has error text: ${pageInfo.hasErrors}
        
        Please provide:
        1. What likely went wrong
        2. Common causes for this type of failure
        3. 2-3 specific things to check or fix
        
        Keep response concise and actionable.
      `;
      
      // Call Groq API
      cy.request({
        method: 'POST',
        url: 'https://api.groq.com/openai/v1/chat/completions',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: {
          model: 'llama3-8b-8192',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
          temperature: 0.3
        },
        failOnStatusCode: false
      }).then(response => {
        if (response.status === 200) {
          const analysis = response.body.choices[0].message.content;
          
          // Log formatted analysis
          cy.log('🤖 AI Debug Analysis:');
          cy.log(analysis);
          
          // Also log to console for visibility
          console.log('\n🤖 ===== AI DEBUG ANALYSIS =====\n');
          console.log(analysis);
          console.log('\n===============================\n');
        } else {
          cy.log('⚠️ Could not get AI analysis');
        }
      });
    });
  });
});

// Command to analyze specific error
Cypress.Commands.add('aiExplainError', (error) => {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
  const prompt = `
    Explain this Cypress error in simple terms:
    
    Error: ${error.message || error}
    
    Provide:
    1. What this error means in plain English
    2. Most common cause
    3. How to fix it
    
    Keep it brief and practical.
  `;
  
  return cy.request({
    method: 'POST',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.3
    }
  }).then(response => {
    const explanation = response.body.choices[0].message.content;
    cy.log('🤖 Error Explanation:', explanation);
    return explanation;
  });
});

// Command to suggest better selectors
Cypress.Commands.add('aiSuggestSelector', (description) => {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
  const prompt = `
    I need to find a "${description}" element on a webpage.
    
    Suggest 3 different CSS selectors I could try, from most to least specific.
    Consider common patterns for this type of element.
    
    Format as:
    1. [selector] - [why this might work]
    2. [selector] - [why this might work]
    3. [selector] - [why this might work]
  `;
  
  return cy.request({
    method: 'POST',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: {
      model: 'llama3-8b-8192',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 300,
      temperature: 0.5
    }
  }).then(response => {
    const suggestions = response.body.choices[0].message.content;
    cy.log('🤖 Selector Suggestions:', suggestions);
    return suggestions;
  });
});