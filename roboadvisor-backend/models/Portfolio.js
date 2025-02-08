
const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    assets: [
        {
            symbol: String,
            name: String,
            quantity: Number,
            purchasePrice: Number
        }
    ],
    allocation: { type: Map, of: Number }, // e.g., { "AAPL": 50, "TSLA": 50 }
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
