const { getMarketPrice } = require('../utils/marketData');
const { getTopPerformers } = require('../utils/marketData');

exports.getTopPerformers = async (req, res) => {
    try {
        const marketData = await getTopPerformers();

        if (!marketData) {
            return res.status(404).json({ error: `No top gainers/losers data available.` });
        }

        res.json(marketData);
    } catch (error) {
        console.error('Error fetching top market performers:', error);
        res.status(500).json({ error: 'Error fetching top stocks' });
    }
};


exports.getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;
        const marketData = await getMarketPrice(symbol);

        if (!marketData) {
            return res.status(404).json({ error: 'Stock data not found for ${symbol}' });
        }

        res.json(marketData);
    } catch (error) {
        console.error('Error in market data controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
