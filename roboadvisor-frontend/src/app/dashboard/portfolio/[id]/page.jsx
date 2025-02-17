'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  Box,
} from '@mui/material';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Loading from 'src/app/loading';
import { LoadingScreen } from 'src/components/loading-screen';

// Register chart elements for react-chartjs-2
ChartJS.register(ArcElement, Tooltip, Legend);

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PortfolioDetail() {
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState('');
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) fetchPortfolio();
  }, [id]);

  const fetchPortfolio = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      const response = await axios.get(`${SERVER_URL}/api/portfolios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('✅ Portfolio fetched:', response.data);

      setPortfolio(response.data);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setError('Error fetching portfolio data. Please try again later.');
    }
  };

  if (error)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );

  if (!portfolio)
    return (
      <Typography>
        <LoadingScreen
          portal={null}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        />
      </Typography>
    );

  // Prepare data for the allocation pie chart
  const allocationData = {
    labels: ['Stocks', 'Bonds'],
    datasets: [
      {
        data: [
          portfolio.recommendedAllocation?.allocation?.stockAllocation || 0,
          portfolio.recommendedAllocation?.allocation?.bondAllocation || 0,
        ],
        backgroundColor: ['#4caf50', '#f44336'], // Green for stocks, Red for bonds
      },
    ],
  };

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        Portfolio Details: {portfolio.name}
      </Typography>

      {/* Portfolio Summary */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Risk Level: {portfolio.riskLevel}</Typography>
          <Typography variant="h6">Risk Assessment: {portfolio.riskAssessment}</Typography>
          <Typography variant="h6">Investment Goals: {portfolio.investmentGoals}</Typography>
          <Typography variant="h6">Time Horizon: {portfolio.timeHorizon} years</Typography>
        </CardContent>
      </Card>

      {/* Recommended Allocation */}
      <Card sx={{ mb: 2, p: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recommended Allocation
          </Typography>
          <Typography variant="body1">
            Stocks: {portfolio.recommendedAllocation?.allocation?.stockAllocation || 'N/A'}% |
            Bonds: {portfolio.recommendedAllocation?.allocation?.bondAllocation || 'N/A'}%
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {portfolio.recommendedAllocation?.advice || ''}
          </Typography>
          <div style={{ maxWidth: 300, marginTop: '16px' }}>
            <Pie data={allocationData} />
          </div>
        </CardContent>
      </Card>

      {/* Assets List */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Assets
          </Typography>
          {portfolio.assets && portfolio.assets.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Purchase Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolio.assets.map((asset, index) => (
                  <TableRow key={index}>
                    <TableCell>{asset.symbol}</TableCell>
                    <TableCell>{asset.name}</TableCell>
                    <TableCell>{asset.quantity}</TableCell>
                    <TableCell>{asset.purchasePrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Typography>No assets added.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            onClick={() => router.push(`/dashboard/portfolio/edit/${portfolio._id}`)}
          >
            Edit Portfolio
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            onClick={() => router.push(`/dashboard/portfolio/rebalance/${portfolio._id}`)}
          >
            Rebalance Portfolio
          </Button>
        </Grid>
        <Grid item>
          <Button variant="text" color="secondary" onClick={() => router.push('/dashboard')}>
            Back to Portfolios
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
