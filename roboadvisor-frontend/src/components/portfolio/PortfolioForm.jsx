'use client';

import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem } from '@mui/material';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export default function PortfolioForm({ onPortfolioCreated }) {
    const [name, setName] = useState('');
    const [riskLevel, setRiskLevel] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.post(
                `${SERVER_URL}/api/portfolios`,
                { name, riskLevel, assets: [] }, // Empty assets initially
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onPortfolioCreated(response.data); // Update parent component
        } catch (error) {
            console.error('Error creating portfolio:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Portfolio Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
            <TextField select label="Risk Level" fullWidth value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)} required>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
            </TextField>
            <Button type="submit" variant="contained">Create Portfolio</Button>
        </form>
    );
}
