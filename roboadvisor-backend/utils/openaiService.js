// openaiService.js

// const openaiModule = require("openai");
// const Configuration = openaiModule.Configuration;
// import pkg from "openai";

import OpenAI from "openai";
// const OpenAIApi = openaiModule.OpenAIApi;

// const { Configuration, OpenAIApi } = pkg;
//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
const openai = new OpenAI();
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const configuration = new Configuration({
// apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

async function getInvestmentAdvice(prompt) {
  // Build a prompt that summarizes the portfolio details
//   const prompt = `You are a financial advisor. Based on the following portfolio details:
  
// Portfolio Name: ${portfolio.name}
// Risk Level: ${portfolio.riskLevel}
// Investment Goals: ${portfolio.investmentGoals}
// Time Horizon: ${portfolio.timeHorizon} years
// Current Assets: ${JSON.stringify(portfolio.assets)}

// Provide clear, actionable investment advice including asset allocation suggestions and risk management recommendations.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // You can choose a model that suits your needs
      store: true,
      messages: [
        { role: "system", content: "You are a helpful financial advisor." },
        { role: "user", content: prompt },
      ],
      max_tokens: 250,
      temperature: 0.7,
    });
    return completion.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching investment advice:", error.message);
    return "No investment advice available at this time.";
  }
}

export { getInvestmentAdvice };
