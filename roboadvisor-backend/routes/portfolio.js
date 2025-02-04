const express = require('express');
const { createPortfolio, getPortfolios } = require('../controllers/portfolioController');
const router = express.Router();

router.post('/', createPortfolio);
router.get('/', getPortfolios);

module.exports = router;
