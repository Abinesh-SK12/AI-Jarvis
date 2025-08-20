require('dotenv').config();
const axios = require('axios');

async function askGroq(prompt) {
  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama3-8b-8192", // or "mixtral-8x7b-32768" for bigger reasoning
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500
    },
    {
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices[0].message.content;
}

module.exports = { askGroq };
