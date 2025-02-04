const axios = require('axios');

exports.getMarketPrice = async (symbol) => {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query`, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: process.env.ALPHA_VANTAGE_API_KEY
            }
        });
        return response.data['Global Quote']['05. price'];
    } catch (error) {
        console.error('Error fetching market data:', error);
        return null;
    }
};
