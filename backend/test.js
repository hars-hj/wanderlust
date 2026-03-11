
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
async function test() {
  
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: "Hello" }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

 console.log(res.data);
}

test();