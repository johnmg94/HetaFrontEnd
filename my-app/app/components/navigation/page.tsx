// Not the right one I'm using

'use client';

import Link from 'next/link'
import { usePathname } from 'next/navigation';
// import clsx from 'clsx'

// const links = [
//     { name: }
// ]
export default function NavBar() {

    return (
        <div>
       <form>
        <label className="block">
            <span className="block text-sm font-medium text-slate-700">Search</span>
            <input type="text" value="GDP" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"/>
        </label>
       </form>
       </div>
    );
}