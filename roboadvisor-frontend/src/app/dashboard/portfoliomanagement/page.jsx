'use client';
// import MarketChart from 'src/components/marketData/MarketChart';
import MarketData from 'src/components/marketData/MarketData';
import { CONFIG } from 'src/config-global';
import PortfolioForm from 'src/components/portfolio/PortfolioForm';
import PortfolioList from 'src/components/portfolio/PortfolioList';
import { BlankView } from 'src/sections/blank/view';

// import dynamic from 'next/dynamic';

// ----------------------------------------------------------------------

// const MarketChart = dynamic(() => import('src/components/marketData/MarketChart'), { ssr: false }); // ✅ Fix SSR issue

// export const metadata = { title: `My Documents | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <div>
      <PortfolioForm onPortfolioCreated={() => window.location.reload()} />
      <PortfolioList />
    </div>
  );
}
