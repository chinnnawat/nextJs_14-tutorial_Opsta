'use client';

import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { generatePagination } from '@/app/lib/utils';


export default function Pagination({ totalPages }){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const totalpageNum = Number(totalPages)

    const createPageUrl = (pageNumber) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    const allPages = generatePagination(currentPage, totalpageNum);
    console.log(allPages);

    return(
        <div className='inline-flex'>

            <div className="flex -space-x-px">
                {/* hello */}
            </div>
        </div>
    )
}