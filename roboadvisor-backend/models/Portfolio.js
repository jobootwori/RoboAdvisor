const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    assets: [
        {
            symbol: String,
            quantity: Number,
            purchasePrice: Number,
            currentPrice: Number
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
