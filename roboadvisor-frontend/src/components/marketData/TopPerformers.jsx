'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import StockCard from './StockCard';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function TopPerformers() {
    const [topStocks, setTopStocks] = useState({ gainers: [], losers: [] });

    useEffect(() => {
        fetchTopStocks();
    }, []);

    const fetchTopStocks = async () => {
        try {
            const response = await axios.get(`${SERVER_URL}/api/market/top-performers`);
            console.log("API Response:", response.data); 
            setTopStocks(response.data);
        } catch (error) {
            console.error('Error fetching top stocks:', error);
        }
    };

    return (
        <div>
            <Typography variant="h4" gutterBottom>🔥 Top Market Performers</Typography>
            
               {/* Gainers Section */}
            <Typography variant="h5" sx={{ mt: 3 }}>🚀 Top Gainers</Typography>
            <Grid container spacing={2}>
                {topStocks.gainers?.map((stock, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StockCard 
                            symbol={stock.symbol} 
                            price={stock.price} 
                            change={stock.change} 
                            changesPercentage={stock.changesPercentage} 
                        />
                    </Grid>
                ))}
            </Grid>

            {/* Losers Section */}
            <Typography variant="h5" sx={{ mt: 5 }}>📉 Top Losers</Typography>
            <Grid container spacing={2}>
                {topStocks.losers?.map((stock, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                        <StockCard 
                            symbol={stock.symbol} 
                            price={stock.price} 
                            change={stock.change} 
                            changesPercentage={stock.changesPercentage} 
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
