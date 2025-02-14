
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
    riskLevel: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    investmentGoals: { type: String, required: true }, // Long-term, Short-term
    timeHorizon: { type: Number, required: true }, // Years
    recommendedAllocation: { type: Object }, // AI-generated asset allocation
    riskAssessment: { type: String } // Computed risk level
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
