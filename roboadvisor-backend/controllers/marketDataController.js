const { getMarketPrice } = require('../utils/marketData');

exports.getStockData = async (req, res) => {
    try {
        const { symbol } = req.params;
        const marketData = await getMarketPrice(symbol);

        if (!marketData) {
            return res.status(404).json({ error: 'Stock data not found' });
        }

        res.json(marketData);
    } catch (error) {
        console.error('Error in market data controller:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
