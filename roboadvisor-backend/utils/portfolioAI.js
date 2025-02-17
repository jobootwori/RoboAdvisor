// portfolioAI.js
const { getInvestmentAdviceHeuristic } = require("./investmentAdviceService");

// Assess risk using a simple heuristic based on time horizon.
function assessRisk(riskLevel, goals, horizon) {
  if (horizon < 3) return "High";
  if (horizon >= 3 && horizon < 7) return "Medium";
  return "Low";
}

// Recommend asset allocation using heuristic reasoning.
async function recommendAllocation(riskAssessment, riskLevel, goals, horizon) {
  // Build a portfolio object with the necessary details.
  const portfolio = {
    riskLevel,
    investmentGoals: goals,
    timeHorizon: horizon,
  };

  // Get heuristic investment advice.
  const adviceResult = getInvestmentAdviceHeuristic(portfolio);

  // Return only the allocation percentages.
  return adviceResult.allocation;
}

module.exports = { assessRisk, recommendAllocation };




// // portfolioAI.js === with Open AI
// const { getInvestmentAdvice } = require('./openaiService.js');

// // Assess risk using a simple heuristic based on the time horizon.
// // You can further refine this by also considering the user's declared risk level.
// exports.assessRisk = (riskLevel, goals, horizon) => {
//   if (horizon < 3) return 'High';
//   if (horizon >= 3 && horizon < 7) return 'Medium';
//   return 'Low';
// };

// // Recommend asset allocation using OpenAI for a more intelligent, dynamic suggestion.
// exports.recommendAllocation = async (riskAssessment, riskLevel, goals, horizon) => {
//   // Build a prompt to instruct the AI to output a JSON object with allocation percentages.
//   const prompt = `
// You are a financial advisor. Based on the following user profile:
// - Risk Assessment: ${riskAssessment}
// - Declared Risk Level: ${riskLevel}
// - Investment Goals: ${goals}
// - Time Horizon: ${horizon} years

// Provide a JSON object with the recommended allocation percentages for stocks and bonds. 
// For example: {"stockAllocation":70, "bondAllocation":30}.
// Output only the JSON object without any additional text.
// `;

//   try {
//     const adviceText = await getInvestmentAdvice(prompt);
//     // Parse the JSON output from the AI
//     const allocation = JSON.parse(adviceText);
//     return allocation;
//   } catch (error) {
//     console.error("Error in recommendAllocation:", error);
//     // Fallback default allocation based on riskAssessment
//     if (riskAssessment === 'High') return { stockAllocation: 80, bondAllocation: 20 };
//     if (riskAssessment === 'Medium') return { stockAllocation: 60, bondAllocation: 40 };
//     return { stockAllocation: 40, bondAllocation: 60 };
//   }
// };
