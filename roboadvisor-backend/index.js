require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
connectDB();

app.use(express.json());
app.use(cors(
    {
    origin: 'http://localhost:3033', // Allow requests from your Next.js frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow these HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow these headers
    credentials: true, // Allow cookies if needed
}
));
app.use(morgan('dev'));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolios', require('./routes/portfolio'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
