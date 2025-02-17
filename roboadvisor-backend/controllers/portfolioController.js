
// portfolioController.js
const Portfolio = require("../models/Portfolio");
const { assessRisk, recommendAllocation } = require("../utils/portfolioAI");
const { getInvestmentAdviceHeuristic } = require("../utils/investmentAdviceService");

// Create Portfolio with Heuristic Investment Advice
async function createPortfolio(req, res) {
  try {
    const { name, assets, riskLevel, investmentGoals, timeHorizon } = req.body;

    // Step 1: Compute Risk Assessment
    const riskAssessment = assessRisk(riskLevel, investmentGoals, timeHorizon);

    // Step 2: Get Recommended Allocation using heuristic reasoning
    const allocation = await recommendAllocation(riskAssessment, riskLevel, investmentGoals, timeHorizon);

    // Optionally, get the full textual advice as well.
    const heuristicAdvice = getInvestmentAdviceHeuristic({
      name,
      riskLevel,
      investmentGoals,
      timeHorizon,
      assets,
    });

    // Combine allocation and textual advice into one object.
    const combinedRecommendation = {
      allocation, // e.g., { stockAllocation: 60, bondAllocation: 40 }
      advice: heuristicAdvice.advice,
    };

    // Create the portfolio document with the recommended allocation and risk assessment.
    const portfolio = new Portfolio({
      user: req.user.id,
      name,
      assets,
      riskLevel,
      investmentGoals,
      timeHorizon,
      recommendedAllocation: combinedRecommendation,
      riskAssessment,
    });

    await portfolio.save();
    res.status(201).json(portfolio);
  } catch (error) {
    console.error("Error creating portfolio:", error);
    res.status(500).json({ error: "Error creating portfolio" });
  }
}

// Get User Portfolios
async function getPortfolios(req, res) {
  try {
     console.log("User ID from token:", req.user.id); // Debugging
    const portfolios = await Portfolio.find({ user: req.user.id });
     if (!portfolios.length) {
            return res.status(404).json({ error: "No portfolios found for this user" });
        }

    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ error: "Error fetching portfolios" });
  }
}

async function getPortfolioById(req, res) {
  try {
    const portfolio = await Portfolio.findOne({
      _id: req.params.id,
      user: req.user.id, // Ensure the portfolio belongs to the user
    });

    if (!portfolio) {
      console.error("❌ Portfolio not found:", req.params.id);
      return res.status(404).json({ error: "Portfolio not found or not accessible" });
    }

    res.json(portfolio);
  } catch (error) {
    console.error("❌ Error fetching portfolio:", error);
    res.status(500).json({ error: "Error fetching portfolio" });
  }
}

// Update Portfolio
async function updatePortfolio(req, res) {
  try {
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPortfolio);
  } catch (error) {
    res.status(500).json({ error: "Error updating portfolio" });
  }
}

// Delete Portfolio
async function deletePortfolio(req, res) {
  try {
    await Portfolio.findByIdAndDelete(req.params.id);
    res.json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting portfolio" });
  }
}

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};

// // portfolioController.js
// const Portfolio = require("../models/Portfolio");
// const { assessRisk, recommendAllocation } = require("../utils/portfolioAI");
// const { getInvestmentAdviceHeuristic } = require("../utils/investmentAdviceService");

// // Create Portfolio with Heuristic Investment Advice
// async function createPortfolio(req, res) {
//   try {
//     const { name, assets, riskLevel, investmentGoals, timeHorizon } = req.body;

//     // Step 1: Compute Risk Assessment
//     const riskAssessment = assessRisk(riskLevel, investmentGoals, timeHorizon);

//     // Step 2: Get Recommended Allocation using heuristic reasoning
//     const allocation = await recommendAllocation(riskAssessment, riskLevel, investmentGoals, timeHorizon);

//     // Optionally, get the full textual advice as well.
//     const heuristicAdvice = getInvestmentAdviceHeuristic({
//       name,
//       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       assets,
//     });

//     // Combine allocation and textual advice into one object.
//     const combinedRecommendation = {
//       allocation, // e.g., { stockAllocation: 60, bondAllocation: 40 }
//       advice: heuristicAdvice.advice,
//     };

//     // Create the portfolio document with the recommended allocation and risk assessment.
//     const portfolio = new Portfolio({
//       user: req.user.id,
//       name,
//       assets,
//       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       recommendedAllocation: combinedRecommendation,
//       riskAssessment,
//     });

//     await portfolio.save();
//     res.status(201).json(portfolio);
//   } catch (error) {
//     console.error("Error creating portfolio:", error);
//     res.status(500).json({ error: "Error creating portfolio" });
//   }
// }

// // Get User Portfolios
// async function getPortfolios(req, res) {
//   try {
//     const portfolios = await Portfolio.find({ user: req.user.id });
//     res.json(portfolios);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching portfolios" });
//   }
// }

// // Update Portfolio
// async function updatePortfolio(req, res) {
//   try {
//     const updatedPortfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedPortfolio);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating portfolio" });
//   }
// }

// // Delete Portfolio
// async function deletePortfolio(req, res) {
//   try {
//     await Portfolio.findByIdAndDelete(req.params.id);
//     res.json({ message: "Portfolio deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting portfolio" });
//   }
// }

// module.exports = {
//   createPortfolio,
//   getPortfolios,
//   updatePortfolio,
//   deletePortfolio,
// };

// // import Portfolio from "../models/Portfolio.js";
// // import { assessRisk, recommendAllocation } from "../utils/portfolioAI.js";
// // import { getInvestmentAdviceHeuristic } from "../utils/investmentAdviceService.js";

// // // Create Portfolio with Heuristic AI Integration
// // export async function createPortfolio(req, res) {
// //   try {
// //     const { name, assets, riskLevel, investmentGoals, timeHorizon } = req.body;

// //     // Step 1: Compute Risk Assessment
// //     const riskAssessment = assessRisk(riskLevel, investmentGoals, timeHorizon);

// //     // Step 2: Get Recommended Allocation using heuristic reasoning
// //     const allocation = await recommendAllocation(riskAssessment, riskLevel, investmentGoals, timeHorizon);


// //     // Use the heuristic advice service to get a recommendation.
// //     const heuristicAdvice = getInvestmentAdviceHeuristic({
// //       name,
// //       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       assets,
//     });

//     // Combine allocation and textual advice into one object.
//     const combinedRecommendation = {
//       allocation, // e.g., { stockAllocation: 60, bondAllocation: 40 }
//       advice: heuristicAdvice.advice,
//     };
    
//     // Create the portfolio document with the recommended allocation
//     const portfolio = new Portfolio({
//       user: req.user.id,
//       name,
//       assets,
//       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       recommendedAllocation: combinedRecommendation,
//       riskAssessment,
//     });

//     await portfolio.save();
//     res.status(201).json(portfolio);
//   } catch (error) {
//     console.error("Error creating portfolio:", error);
//     res.status(500).json({ error: "Error creating portfolio" });
//   }
// }


// const Portfolio = require("../models/Portfolio");
// const { assessRisk, recommendAllocation } = require("../utils/portfolioAI"); // AI Functions
// const { getInvestmentAdvice } = require("../utils/openaiService");

// // Create Portfolio with AI Integration
// exports.createPortfolio = async (req, res) => {
//   try {
//     const { name, assets, riskLevel, investmentGoals, timeHorizon } = req.body;

//     // **Step 1: Compute Risk Analysis**
//     const riskAssessment = assessRisk(riskLevel, investmentGoals, timeHorizon);

//     // **Step 2: Get Market-Based Recommendations**
//     const marketAllocation = await recommendAllocation(riskAssessment);

//     // Step 3: Get AI-generated investment advice using OpenAI
//     const aiAdvice = await getInvestmentAdvice({
//       name,
//       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       assets,
//     });

//     // Combine the recommendations into one object for storage
//     const recommendedAllocation = {
//       marketAllocation,
//       aiAdvice,
//     };

//         // Create the portfolio document
//     const portfolio = new Portfolio({
//       user: req.user.id,
//       name,
//       assets,
//       riskLevel,
//       investmentGoals,
//       timeHorizon,
//       recommendedAllocation: combinedRecommendation, // Store AI-based recommendations
//       riskAssessment, // Store computed risk level
//     });

//     await portfolio.save();
//     res.status(201).json(portfolio);
//   } catch (error) {
//     res.status(500).json({ error: "Error creating portfolio" });
//   }
// };

// // Get User Portfolios
// exports.getPortfolios = async (req, res) => {
//   try {
//     const portfolios = await Portfolio.find({ user: req.user.id });
//     res.json(portfolios);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching portfolios" });
//   }
// };

// // Update Portfolio
// exports.updatePortfolio = async (req, res) => {
//   try {
//     const updatedPortfolio = await Portfolio.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updatedPortfolio);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating portfolio" });
//   }
// };

// // Delete Portfolio
// exports.deletePortfolio = async (req, res) => {
//   try {
//     await Portfolio.findByIdAndDelete(req.params.id);
//     res.json({ message: "Portfolio deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting portfolio" });
//   }
// };
