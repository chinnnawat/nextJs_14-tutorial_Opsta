import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts'
import Link from 'next/link';
import RefreshButton from './refreshButton';

export default async function LatestInvoices(){

    const datas = await fetchLatestInvoices()
    // console.log(datas);
    return(
        <div className="w-full md:col-span-4">
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className='flex-grow flex-col'>
                <div className='bg-white px-6 rounded-xl'>
                    {datas.map((data) => (
                        <div
                            key={data.id}
                            className='flex flex-row items-center justify-between py-4'
                        >
                            <div className='flex items-center'>
                                <Image
                                    src={data.image_url}
                                    alt={`${data.name}`}
                                    width={32}
                                    height={32}
                                    className='mr-4 rounded-full'
                                />
                                <div className='min-w-0'>
                                    <p className='truncate text-sm font-semibold md:text-base text-black'>
                                        {data.customers}
                                    </p>
                                    <p className='hidden text-sm text-gray-500 sm:block'>
                                        {data.email}
                                    </p>
                                </div>
                            </div>
                            <p
                                className={`${lusitana.className} truncate text-sm font-medium md:text-base text-black`}
                            >
                                {data.amount}
                            </p>
                        </div>
                    ))}
                </div>
                    {/* <Link href={`/dashboard`} className='inline-block' replace>
                        <div className="flex items-center pb-2 pt-6">
                            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
                            <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
                        </div>
                    </Link> */}
                    <RefreshButton/>
            </div>
        </div>
    )
}