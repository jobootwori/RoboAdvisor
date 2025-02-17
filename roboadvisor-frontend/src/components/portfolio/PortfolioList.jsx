'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Typography,
} from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`${SERVER_URL}/api/portfolios`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(response.data);
    } catch (error) {
      console.error('Error fetching portfolios:', error);
    }
  };

  const deletePortfolio = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`${SERVER_URL}/api/portfolios/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolios(portfolios.filter((portfolio) => portfolio._id !== id));
    } catch (error) {
      console.error('Error deleting portfolio:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Portfolios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Portfolio Name</TableCell>
            <TableCell>Risk Level</TableCell>
            <TableCell>Risk Assessment</TableCell>
            <TableCell>Recommended Allocation</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portfolios.map((portfolio) => (
            <TableRow key={portfolio._id}>
              <TableCell>{portfolio.name}</TableCell>
              <TableCell>{portfolio.riskLevel}</TableCell>
              <TableCell>{portfolio.riskAssessment}</TableCell>
              <TableCell>
               {portfolio.recommendedAllocation?.allocation?.stockAllocation ?? "N/A"}% Stocks,{' '}
                {portfolio.recommendedAllocation?.allocation?.bondAllocation ?? "N/A"}% Bonds
                <br />
                <Typography variant="body2" color="textSecondary">
                  {portfolio.recommendedAllocation?.advice ?? ""}
                </Typography> 
              </TableCell>
              <TableCell>
                <Button onClick={() => router.push(`/dashboard/portfolio/${portfolio._id}`)}>
                  View
                </Button>
                <Button onClick={() => deletePortfolio(portfolio._id)} color="error">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
