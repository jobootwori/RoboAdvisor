const express = require('express');
const { createPortfolio, getPortfolios, getPortfolioById, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const { protect } = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

router.post('/', protect, createPortfolio);
router.get('/', protect, getPortfolios);
router.get('/:id', protect, getPortfolioById);
router.put('/:id', protect, updatePortfolio);
router.delete('/:id', protect, deletePortfolio);

module.exports = router;

