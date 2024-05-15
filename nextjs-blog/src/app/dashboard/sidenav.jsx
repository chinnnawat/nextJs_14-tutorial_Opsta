import Link from "next/link";
import { PowerIcon } from '@heroicons/react/24/outline';
import ChinLogo from "@/app/ui/chin_logo";
import NavLinks from "@/app/dashboard/nav-links";

export default function Sidenav () {
    return(
        <div className="flex h-full flex-col px-3 py-4 md:px-2">
            <Link href={'/'}
                className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
            >
                <div className="w-32 text-white md:w-full">
                    <ChinLogo/>
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks/>
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form action="">
                    <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                        <PowerIcon className="w-6 text-black"/>
                        <div className="hidden md:block text-black">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    )
}