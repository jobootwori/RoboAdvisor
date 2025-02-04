const Portfolio = require('../models/Portfolio');

exports.createPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.create({ ...req.body, user: req.user.id });
        res.status(201).json(portfolio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user.id });
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
