// 'use client';

import { CONFIG } from 'src/config-global';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopPerformers from 'src/components/marketData/TopPerformers';


// ----------------------------------------------------------------------
import dynamic from 'next/dynamic';

// ----------------------------------------------------------------------

const MarketChart = dynamic(() => import('src/components/marketData/MarketChart'), { ssr: false }); // ✅ Fix SSR issue
export const metadata = { title: `Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <Box sx={{ p: 4 }}>
      {/* <Typography variant="h4" sx={{ mb: 4 }}>
        Document and Image Upload
      </Typography> */}

      {/* Display the UploadAvatar for single uploads */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upload a Profile Image or Single File
        </Typography>
        <UploadAvatar />
      </Box> */}

      {/* Display the UploadBox for compact file uploads */}
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Quick Upload Box
        </Typography>
        <UploadBox placeholder="Drag and drop files or click to upload" />
      </Box> */}

      {/* Display the Upload component for managing multiple files */}
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Get Live Market Data
        </Typography>
        <TopPerformers />
        <MarketChart />
        {/* <PortfolioForm onPortfolioCreated={() => window.location.reload()} />
            <PortfolioList />  */}
      </Box>
    </Box>
  );
}
