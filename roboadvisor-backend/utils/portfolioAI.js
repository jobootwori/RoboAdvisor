const { getMarketPrice } = require('./marketData');

exports.assessRisk = (riskLevel, goals, horizon) => {
    if (horizon < 3) return 'High';
    if (horizon >= 3 && horizon < 7) return 'Medium';
    return 'Low';
};

exports.recommendAllocation = async (riskAssessment) => {
    let stocks = ['AAPL', 'MSFT', 'TSLA'];
    let bonds = ['BND', 'AGG', 'TLT'];

    if (riskAssessment === 'High') {
        stocks.push('NVDA', 'AMD', 'GOOGL'); // Growth stocks
    } else if (riskAssessment === 'Medium') {
        bonds.push('LQD', 'MUB'); // Safe bonds
    } else {
        bonds.push('VCSH', 'ICSH'); // Conservative bonds
    }

    const stockPrices = await Promise.all(stocks.map(symbol => getMarketPrice(symbol)));
    const bondPrices = await Promise.all(bonds.map(symbol => getMarketPrice(symbol)));

    return {
        stocks: stockPrices,
        bonds: bondPrices,
        stockAllocation: riskAssessment === 'High' ? 80 : riskAssessment === 'Medium' ? 60 : 40,
        bondAllocation: riskAssessment === 'High' ? 20 : riskAssessment === 'Medium' ? 40 : 60
    };
};
