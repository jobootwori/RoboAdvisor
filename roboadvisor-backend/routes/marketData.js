const express = require('express');
const { getStockData } = require('../controllers/marketDataController');
const { getTopPerformers } = require('../controllers/marketDataController');

const router = express.Router();

router.get('/stock/:symbol', getStockData); // ✅ Stock Market API Route
router.get('/top-performers', getTopPerformers); // ✅ Route to fetch top gainers

module.exports = router;
