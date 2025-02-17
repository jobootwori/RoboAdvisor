'use client';

import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Stack, MenuItem } from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PortfolioForm({ onPortfolioCreated }) {
  const [name, setName] = useState('');
  const [riskLevel, setRiskLevel] = useState('');
  const [investmentGoals, setInvestmentGoals] = useState('');
  const [timeHorizon, setTimeHorizon] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `${SERVER_URL}/api/portfolios`,
        { name, riskLevel, investmentGoals, timeHorizon, assets: [] }, // Empty assets initially
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onPortfolioCreated(response.data); // Update parent component
    } catch (error) {
      console.error('Error creating portfolio:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
      <TextField spacing={3}
        label="Portfolio Name"
        sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField spacing={3}
        select
        label="Risk Level"
        sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }}
        value={riskLevel}
        onChange={(e) => setRiskLevel(e.target.value)}
        required
      >
        <MenuItem value="Low">Low</MenuItem>
        <MenuItem value="Medium">Medium</MenuItem>
        <MenuItem value="High">High</MenuItem>
      </TextField>
      <TextField
        select
        label="Investment Goal"
        sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }}
        value={investmentGoals}
        onChange={(e) => setInvestmentGoals(e.target.value)}
        required
      >
        <MenuItem value="Retirement">Retirement</MenuItem>
        <MenuItem value="Wealth Growth">Wealth Growth</MenuItem>
        <MenuItem value="Short-Term Gains">Short-Term Gains</MenuItem>
      </TextField>

      <TextField
        label="Time Horizon (Years)"
        sx={{ width: { xs: '100%', sm: '80%', md: '60%', lg: '50%' } }}
        type="number"
        value={timeHorizon}
        onChange={(e) => setTimeHorizon(e.target.value)}
        required
      />
      </Stack>
      <Button type="submit" variant="contained"   sx={{ mt: 1.5 , mb: 1.5}} >
        Create Portfolio
      </Button>
      
    </form>
  );
}
