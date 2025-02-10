const express = require('express');
const { getStockData } = require('../controllers/marketDataController');

const router = express.Router();

router.get('/stock/:symbol', getStockData); // ✅ Stock Market API Route

module.exports = router;
