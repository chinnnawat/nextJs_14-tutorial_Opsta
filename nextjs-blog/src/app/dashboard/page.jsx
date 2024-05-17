// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
 
export default async function Page() {
  const revenue = await fetchRevenue();
  // console.log(revenue);
  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }
  const chartHeight = 350;
  // const { yAxisLabels, topLabel } = generateYAxis(revenue);
  return (
    <main>
      <div className='w-full md:col-span-4'>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard
        </h1>
        <div className='rounded-xl bg-gray-50 p-4'>
            {/* y-axis */}
            <div
              className='mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex'
            >
              {revenue.map((item, index) => (
                <div key={index}>
                  <p>{item.revenue}</p>
                </div>
              ))}
            </div>
            {revenue.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                {/* Bar */}
                <div
                  className='w-full rounded-md bg-blue-300'
                  style={{
                    height: `${(chartHeight / 10)* item.revenue}`
                  }}
                ></div>
                {/* x-axis */}
                <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                    {item.month}
                  </p>
              </div>))}
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* <Card title="Collected" value={totalPaidInvoices} type="collected" /> */}
          {/* <Card title="Pending" value={totalPendingInvoices} type="pending" /> */}
          {/* <Card title="Total Invoices" value={numberOfInvoices} type="invoices" /> */}
          {/* <Card
            title="Total Customers"
            value={numberOfCustomers}
            type="customers"
          /> */}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {/* <RevenueChart revenue={revenue}  /> */}
          {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
        </div>
      </div>
    </main>
  );
}