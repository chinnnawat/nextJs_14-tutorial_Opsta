'use client';
 
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({placeholder}){
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    // เข้าถึง path ปัจจุบันของ URL
    const pathname = usePathname();

    // debounce => ป้องกันคำค้นหาบ่อยๆ
    const handlerSearch = useDebouncedCallback((term)=>{
        console.log(`Searching... ${term}`);
        const params = new URLSearchParams(searchParams);
        
        // set page number
        params.set('page', '1');

        if (term) {
            params.set('query', term);
          } else {
            params.delete('query');
          }
            replace(`${pathname}?${params.toString()}`); // replace เพื่ออัปเดต URL ด้วยพารามิเตอร์การค้นหาใหม่
        }, 300); // handlerSearch ที่จะรันหลังจากผู้ใช้หยุดพิมพ์ไปแล้ว 300 มิลลิวินาที

    return(
        <div className='relative flex flex-1 flex-shrink-0'>
            <label htmlFor="search" className='sr-only'>
                Search
            </label>
            <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                placeholder={placeholder}
                onChange={(e)=>{
                    handlerSearch(e.target.value || '');
                }}
                defaultValue={searchParams.get('query') || ''}
            />
            <MagnifyingGlassIcon className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900'/>
        </div>
    )
}