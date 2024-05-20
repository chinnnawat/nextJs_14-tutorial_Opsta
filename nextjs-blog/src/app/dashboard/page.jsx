// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchCardData } from '@/app/lib/data';
import RecentRevenue from '../ui/dashboard/recent-revenue';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import CardWrapper from '../ui/dashboard/cards';
import { 
  CardsSkeleton, 
  CardSkeleton, 
  RevenueChartSkeleton, 
  LatestInvoicesSkeleton,
  DashboardSkeleton,
} from '../ui/skeletons';
import { Suspense } from 'react';
 
export default async function Page() {

  const cardData = await fetchCardData();


  const revenue = await fetchRevenue();
  // console.log(revenue);
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  const chartHeight = 350;
  // const { yAxisLabels, topLabel } = generateYAxis(revenue);
  return (
    <main>
      <div className='mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8'>
        <div className='w-full md:col-span-8'>
          <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Dashboard
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card */}
            <Suspense fallback={<CardSkeleton/>}>
              <CardWrapper/>
            </Suspense>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8 ">
            {/* Component */}
            <RecentRevenue/>
            <LatestInvoices/>
          </div>
        </div>
      </div>
      {/* <DashboardSkeleton/> */}
    </main>
  );
}