const axios = require('axios');

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
const ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query';

const FMP_API_KEY = process.env.FMP_API_KEY;
const FMP_URL = 'https://financialmodelingprep.com/api/v3';

// ✅ Fetch top-performing stocks dynamically
exports.getTopPerformers = async () => {
    try {
        const gainersResponse = await axios.get(`${FMP_URL}/stock_market/gainers?apikey=${FMP_API_KEY}`);
        
        const losersResponse = await axios.get(`${FMP_URL}/stock_market/losers?apikey=${FMP_API_KEY}`);

        // 🔍 Debug full API response
        console.log("🔍 Gainers Response:", gainersResponse.data);
        console.log("🔍 Losers Response:", losersResponse.data);
        
       if (!gainersResponse.data || !losersResponse.data) {
            throw new Error(`❌ No top gainers/losers data available.`);
        }
        

        // Extract top gainers
        // const topGainers = response.data['top_gainers'].slice(0, 5); // Get top 5 gainers

        

         // Extracting top gainers and losers
      
        // Fetch detailed market price for each stock

        return {
            gainers: gainersResponse.data.slice(0, 5).map(stock => ({
                symbol: stock.symbol,
                name: stock.name,
                price: stock.price,
                change: stock.change,
                // changesPercentage:  `${stock.changesPercentage.toFixed(2)}%`
                changesPercentage: typeof stock.changesPercentage === "number" 
                    ? `${stock.changesPercentage.toFixed(2)}%` 
                    : "N/A" // ✅ Fixes undefined issue
            })),
            losers: losersResponse.data.slice(0, 5).map(stock => ({
                symbol: stock.symbol,
                name: stock.name,
                price: stock.price,
                change: stock.change,
                // changesPercentage:  `${stock.changesPercentage.toFixed(2)}%`
                changesPercentage: typeof stock.changesPercentage === "number" 
                    ? `${stock.changesPercentage.toFixed(2)}%` 
                    : "N/A" // ✅ Fixes undefined issue
            }))
        };
    } catch (error) {
        console.error(`❌ Error fetching top market performers:`, error.message);
        return { gainers: [], losers: [] };
    }
};
        // Fetch detailed market price for each stock
//         const topStocks = await Promise.all(topGainers.map(async (stock) => {
//             const marketData = await exports.getMarketPrice(stock.ticker);
//             return {
//                 symbol: stock.ticker,
//                 name: stock.name,
//                 price: marketData?.price || 'N/A',
//                 change: marketData?.change || 'N/A',
//                 changesPercentage: marketData?.changesPercentage || 'N/A'
//             };
//         }));

//         return topStocks;
//     } catch (error) {
//         console.error('Error fetching top market performers:', error);
//         return [];
//     }
// };

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
            changesPercentage: data['10. change percent'],
            lastUpdated: data['07. latest trading day']
        };
        
    } catch (error) {
        console.error('Error fetching live market data:', error);
        return null;
    }
};
