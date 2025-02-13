'use client';

import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function MarketData() {
    const [symbol, setSymbol] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState('');

    const fetchMarketData = async () => {
        try {
            setError('');
            setData(null);

            const response = await axios.get(`${SERVER_URL}/api/market/stock/${symbol}`);
            setData(response.data);
        } catch (err) {
            setError('Failed to fetch market data. Please check the symbol.');
        }
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography variant="h5">Stock Market Data</Typography>
                <TextField
                    label="Enter Stock Symbol"
                    variant="outlined"
                    fullWidth
                    value={symbol}
                    onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                />
                <Button onClick={fetchMarketData} variant="contained" sx={{ mt: 2 }}>
                    Get Market Data
                </Button>

                {error && <Typography color="error">{error}</Typography>}

                {data && (
                    <div>
                        <Typography variant="h6">{data.symbol}</Typography>
                        <Typography>Price: ${data.price}</Typography>
                        <Typography>Change: {data.change} ({data.changesPercentage})</Typography>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
