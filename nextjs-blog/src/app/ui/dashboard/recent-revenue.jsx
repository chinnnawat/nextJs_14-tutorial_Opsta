import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue } from '@/app/lib/data';
import RefreshButton from './refreshButton';

export default async function RecentRevenue() {
    const revenue = await fetchRevenue();
  // console.log(revenue);
    if (!revenue || revenue.length === 0) {
        return <p className="mt-4 text-gray-400">No data available.</p>;
    }
    const chartHeight = 350;
    
    return(
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Recent Revenue
            </h2>
            <div className='rounded-xl bg-gray-50 p-4'>
              <div className='mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4'>
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
                        height: `${(chartHeight / 10000)* item.revenue}px`
                        }}
                    ></div>
                    {/* x-axis */}
                        <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
                        {item.month}
                        </p>
                    </div>))}
              </div>
              <RefreshButton/>
          </div>
        </div>
    )
}