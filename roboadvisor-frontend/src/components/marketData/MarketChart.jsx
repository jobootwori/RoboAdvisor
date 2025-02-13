'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MarketChart() {
    const [symbol, setSymbol] = useState('AAPL');
    const [data, setData] = useState([]);
    const [latestPrice, setLatestPrice] = useState(null);

    useEffect(() => {
        fetchMarketData(symbol);
    }, []);

    const fetchMarketData = async (symbol) => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/market/stock/${symbol}`);
            const price = response.data.price;
            const date = new Date().toLocaleTimeString();

            setLatestPrice(price);
            setData((prevData) => [...prevData.slice(-9), { time: date, price }]); // Keep last 10 data points
        } catch (error) {
            console.error('Error fetching market data:', error);
        }
    };

    return (
        <Card sx={{ mt: 2, p: 2 }}>
            <CardContent>
                <Typography variant="h5">Live Market Data</Typography>
                <TextField
                    label="Stock Symbol"
                    variant="outlined"
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                    sx={{ mt: 2, mr: 2 }}
                />
                <Button onClick={() => fetchMarketData(symbol)} variant="contained">
                    Get Data
                </Button>

                {latestPrice && (
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {symbol} Price: ${latestPrice}
                    </Typography>
                )}

                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" />
                        <YAxis domain={['auto', 'auto']} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
