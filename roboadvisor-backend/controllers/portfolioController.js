const Portfolio = require('../models/Portfolio');
const { assessRisk, recommendAllocation } = require('../utils/portfolioAI'); // AI Functions

// Create Portfolio
exports.createPortfolio = async (req, res) => {
    try {
        const { name, assets, riskLevel, investmentGoals, timeHorizon } = req.body;

        // **Step 1: Compute Risk Analysis**
        const riskAssessment = assessRisk(riskLevel, investmentGoals, timeHorizon);

        // **Step 2: Get Market-Based Recommendations**
        const recommendedAllocation = await recommendAllocation(riskAssessment);

        const portfolio = new Portfolio({
            user: req.user.id, 
            name,
            assets,
            riskLevel,
            investmentGoals,
            timeHorizon,
            recommendedAllocation, // Store AI-based recommendations
            riskAssessment, // Store computed risk level
        });

        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Error creating portfolio' });
    }

};

// Get User Portfolios
exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user.id });
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching portfolios' });
    }
};

// Update Portfolio
exports.updatePortfolio = async (req, res) => {
    try {
        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedPortfolio);
    } catch (error) {
        res.status(500).json({ error: 'Error updating portfolio' });
    }
};

// Delete Portfolio
exports.deletePortfolio = async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting portfolio' });
    }
};
