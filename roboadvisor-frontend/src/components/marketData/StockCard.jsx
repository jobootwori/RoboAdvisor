import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { bgGradient, varAlpha } from 'src/theme/styles';

// Utility functions for formatting
import { fNumber, fPercent } from 'src/utils/format-number';

import { CONFIG } from 'src/config-global';

export default function StockCard({ symbol, price, change, changesPercentage }) {
  const theme = useTheme();
  const isPositive = change >= 0;

  console.log("StockCard received:", { symbol, price, change, changesPercentage });

  return (
    <Card
      sx={{
        ...bgGradient({
          color: `135deg, ${varAlpha(
            theme.vars.palette[isPositive ? 'success' : 'error'].lighterChannel,
            0.48
          )}, ${varAlpha(theme.vars.palette[isPositive ? 'success' : 'error'].lightChannel, 0.48)}`,
        }),
        p: 3,
        boxShadow: 3,
        position: 'relative',
        color: `${isPositive ? 'success' : 'error'}.darker`,
        backgroundColor: 'common.white',
        minWidth: 275,
      }}
    >
      {/* 📍 Shape Square Background */}
      <SvgColor
        src={`${CONFIG.site.basePath}/assets/background/shape-square.svg`}
        sx={{
          top: 0,
          left: -20,
          width: 240,
          height: 240,
          opacity: 0.24,
          position: 'absolute',
          zIndex: -1,
          color: `${isPositive ? 'success' : 'error'}.main`,
        }}
      />

      {/* 🔺 Trending Arrow & Percentage Change */}
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {/* 🔺 Trending Arrow */}
        <Iconify
          width={20}
          icon={isPositive ? 'eva:trending-up-fill' : 'eva:trending-down-fill'}
        />

        {/* 📊 Percentage Change */}
        <Typography variant="subtitle2" color={isPositive ? 'success.main' : 'error.main'}>
          {isPositive ? '+' : ''}
          {changesPercentage}
          {/* {fPercent(changesPercentage)} */}
        </Typography>
      </Box>

      {/* 🏷️ Stock Details */}
      <CardContent>
        <Typography variant="h5">{symbol}</Typography>
        <Typography variant="h6">${fNumber(price)}</Typography>
        <Typography color={isPositive ? 'success.main' : 'error.main'}>
          {isPositive ? '+' : ''}
          {fNumber(change)}
        </Typography>
      </CardContent>
    </Card>
  
    // <Card sx={{ minWidth: 275, m: 2, p: 2, boxShadow: 3 }}>
    //   <CardContent>
    //     <Typography variant="h5">{symbol}</Typography>
    //     <Typography variant="h6">${price}</Typography>
    //     <Typography color={change < 0 ? 'error' : 'success'}>
    //       {change} ({changesPercentage})
    //     </Typography>
    //   </CardContent>
    // </Card>
  );
}
