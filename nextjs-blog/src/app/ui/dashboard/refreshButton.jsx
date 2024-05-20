'use client';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function RefreshButton(){
    return(
        <div className="flex items-center pb-2 pt-6 cursor-pointer"
        onClick={() => window.location.reload()}
        >
            <ArrowPathIcon className="h-5 w-5 text-gray-500" />
            <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
    )
}