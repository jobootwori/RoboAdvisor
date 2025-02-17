// investmentAdviceService.js
function getInvestmentAdviceHeuristic(portfolio) {
    const { riskLevel, investmentGoals, timeHorizon } = portfolio;
  
    // Determine allocation percentages based on time horizon and risk level.
    let allocation;
    let explanation = "";
  
    if (timeHorizon < 3 || riskLevel === "High") {
      allocation = { stockAllocation: 80, bondAllocation: 20 };
      explanation = "Given your short time horizon and/or high risk tolerance, an aggressive allocation with a higher percentage of stocks is recommended.";
    } else if (timeHorizon >= 3 && timeHorizon < 7 || riskLevel === "Medium") {
      allocation = { stockAllocation: 60, bondAllocation: 40 };
      explanation = "A moderate allocation balancing stocks and bonds is advised for your risk profile and time horizon.";
    } else {
      allocation = { stockAllocation: 40, bondAllocation: 60 };
      explanation = "With a longer time horizon and/or lower risk tolerance, a conservative allocation with a higher percentage of bonds is recommended.";
    }
  
    // Further adjust advice based on investment goals.
    const goalText = investmentGoals.toLowerCase();
    if (goalText.includes("retirement")) {
      explanation += " Since your goal is retirement, diversifying with a stable, long-term mix is important.";
    } else if (goalText.includes("growth")) {
      explanation += " Given your focus on growth, consider investing in high-growth sectors while managing risk.";
    } else if (goalText.includes("income")) {
      explanation += " If generating income is a priority, consider including dividend-paying stocks and bonds.";
    }
  
    return {
      allocation,
      advice: explanation,
    };
  }
  
  module.exports = { getInvestmentAdviceHeuristic };
  