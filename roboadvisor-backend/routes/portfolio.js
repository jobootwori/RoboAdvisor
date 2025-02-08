const express = require('express');
const { createPortfolio, getPortfolios, updatePortfolio, deletePortfolio } = require('../controllers/portfolioController');
const { authenticate } = require('../middlewares/authMiddleware'); // Protect routes

const router = express.Router();

router.post('/', authenticate, createPortfolio);
router.get('/', authenticate, getPortfolios);
router.put('/:id', authenticate, updatePortfolio);
router.delete('/:id', authenticate, deletePortfolio);

module.exports = router;

