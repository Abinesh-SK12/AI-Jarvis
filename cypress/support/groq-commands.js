// Groq AI integration for Cypress
Cypress.Commands.add('askGroq', (prompt) => {
  const apiKey = Cypress.env('GROQ_API_KEY'); // Set in .env file
  
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
      max_tokens: 500
    }
  }).then((response) => {
    return response.body.choices[0].message.content;
  });
});