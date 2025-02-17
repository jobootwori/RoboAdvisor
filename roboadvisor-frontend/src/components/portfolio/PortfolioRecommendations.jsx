import { Card, CardContent, Typography } from '@mui/material';

export default function PortfolioRecommendations({ allocation }) {
    return (
        <Card sx={{ minWidth: 275, m: 2, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5">Investment Recommendations</Typography>
                <Typography variant="body1">
                    📈 Stocks Allocation: {allocation?.stockAllocation}%<br />
                    📉 Bonds Allocation: {allocation?.bondAllocation}%<br />
                </Typography>
            </CardContent>
        </Card>
    );
}
