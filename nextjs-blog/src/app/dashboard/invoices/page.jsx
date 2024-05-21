import { fetchInvoicePage } from "@/app/lib/data";
import { lusitana } from '@/app/ui/fonts';
import { CreateInvoice, UpdateInvoice } from "@/app/ui/invoices/buttons";
import Pagination from "@/app/ui/invoices/pagination";
import Search from "@/app/ui/search";

export const metadata = {
    title: 'Invoices',
};

export default async function Page({searchParams}){
    const query = searchParams?.query || '';
    const page = Number(searchParams?.page) || 1;

    // const totalPage = await fetchInvoicePage(query)

    return(
        <div className="w-full">
            <div className="flex w-full items-center justify-between">
                <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..."/>
                <CreateInvoice/>
            </div>
            <div>
                <Pagination totalPage={6}/>
            </div>
        </div>
    )
}