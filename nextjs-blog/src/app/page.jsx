import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import styles from '@/app/ui/home.module.css'
import { lusitana } from "@/app/ui/fonts"
import ChinLogo from '@/app/ui/chin_logo.jsx'
import Image from 'next/image';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <ChinLogo/>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg px-6 py-10 bg-gray-50 md:w-2/5 md:px-20">
          <p className={` ${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Chin</strong> This is the example for the{' '}
              <a href="https://nextjs.org/learn/" className="text-blue-500">
                  Next.js Learn Course
              </a>
              , Love You so much very much.
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-0"  
            >
              <span>Login</span><ArrowRightIcon className="w-5 md:w-6" />
            </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src = "/hero-mobile.png"
            width={560}
            height={620}
            // className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
      
    </main>
  );
}
