const axios = require('axios');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query';

exports.getMarketPrice = async (symbol) => {
    try {
        const response = await axios.get(ALPHA_VANTAGE_URL, {
            params: {
                function: 'GLOBAL_QUOTE',
                symbol,
                apikey: ALPHA_VANTAGE_API_KEY
            }
        });

        const data = response.data['Global Quote'];

        if (!data || !data['05. price']) {
            throw new Error('Stock data not available');
        }


        return {
            
            symbol: data['01. symbol'],
            price: parseFloat(data['05. price']),
            change: parseFloat(data['09. change']),
            percentChange: data['10. change percent'],
            lastUpdated: data['07. latest trading day']
        };
        
    } catch (error) {
        console.error('Error fetching live market data:', error);
        return null;
    }
};
