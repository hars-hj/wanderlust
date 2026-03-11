const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

module.exports.chatController = async (req, res) => {

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "Message is required"
    });
  }


  const prompt = `Extract the travel details from this text.

Return ONLY JSON in this format:

{
 "destination": "",
 "startDate": "",
 "endDate": ""
}

STRICTLY FOLLOW THE FORMATE GIVEN ABOVE.

Text:${message}`;

  const response = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.LLM_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const result = response.data.choices[0].message.content;
  console.log(result);
   // to check if the response is in correct json formate or not.
//   let parsed;

    try {
    parsed = JSON.parse(result);
    } catch(err) {
    return res.status(500).json({
        success:false,
        message:"LLM returned invalid JSON",
        raw: result
    });
    }

const { destination, startDate, endDate } = parsed;
console.log(destination);
console.log(startDate);
console.log(endDate);


    const prompt2 = `
            You are an expert travel planner.

            Create a detailed travel itinerary.

            Destination: ${destination}
            Start Date: ${startDate}
            End Date: ${endDate}

            Requirements:
            - Provide a day-by-day itinerary
            - Include major attractions
            - Include food recommendations
            - Include travel tips
            - Keep it concise and practical

            Format:

            Day 1:
            Morning:
            Afternoon:
            Evening:

            Day 2:
            Morning:
            Afternoon:
            Evening:
            `;

             const response2 = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt2 }]
            },
            {
            headers: {
                Authorization: `Bearer ${process.env.LLM_API_KEY}`,
                "Content-Type": "application/json"
            }
            }
        );

        const finalresult = response2.data.choices[0].message.content;


  res.json({
    success: true,
     data: finalresult
  });
};