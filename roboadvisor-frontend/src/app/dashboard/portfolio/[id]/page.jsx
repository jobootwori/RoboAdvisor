'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PortfolioDetail() {
    const [portfolio, setPortfolio] = useState(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${SERVER_URL}/api/portfolios/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPortfolio(response.data);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        }
    };

    if (!portfolio) return <Typography>Loading...</Typography>;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">{portfolio.name}</Typography>
                <Typography>Risk Level: {portfolio.riskLevel}</Typography>
                <Typography variant="h6">Assets:</Typography>
                <ul>
                    {portfolio.assets.map((asset, index) => (
                        <li key={index}>{asset.symbol} - {asset.quantity} shares @ ${asset.purchasePrice}</li>
                    ))}
                </ul>
                <Button onClick={() => router.push('/dashboard')}>Back to Portfolios</Button>
            </CardContent>
        </Card>
    );
}
