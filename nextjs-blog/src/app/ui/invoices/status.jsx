import clsx from "clsx";
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
export default function InvoiceStatus ({status}) {
    return (
        <span
         className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-sm',
            {
                'bg-gray-100 text-gray-500': status === 'pending',
                'bg-green-500 text-white': status === 'paid',
            },
         )}
        >
            {/* pending Status */}
            {status === 'pending' ? (
                <>
                    Pending
                    <ClockIcon/>
                </>
            ) : null}


            {/* paid Status */}
            {status === 'paid' ? (
                <>
                    Paid
                    <ClockIcon/>
                </>
            ) : null}
        </span>
    )
}