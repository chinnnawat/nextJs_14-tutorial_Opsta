import clsx from 'clsx';
import Image from 'next/image';
import { fetchLatestInvoices } from '@/app/lib/data';
import { lusitana } from '@/app/ui/fonts'

export default async function LatestInvoices(){
    const latestInvoices = await fetchLatestInvoices();

    return(
        <div className='flex w-full flex-col md:col-span-4'>
            <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Latest Invoices
            </h2>
            <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
                <div className='bg-white px-6'>
                    {latestInvoices.map((invoice, i) => {
                        return(
                            <div
                                key={invoice.id}
                            ></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}