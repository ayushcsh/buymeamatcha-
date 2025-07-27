'use client'
import React from 'react'
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import MatchaIcon from '@/app/icon/matcha';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import { useStyleRegistry } from 'styled-jsx';
import SlidersIcon from '@/app/icon/slidersicon';





const pacifico = Pacifico({
  subsets: ['latin'],
  weight: '400',
});


const Navbar = () => {
  const { data: session } = useSession();
  const [isopen, setisopen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <nav>

      <div className="relative  z-50 flex h-[95px] w-full max-w-[95vw] items-center justify-center bg-[#FAF7F2] mx-auto md:mr-[65px]">
        <div className="lefftnav  p-4  pt-[30px]  flex-1 pl-[60px] hidden sm:flex">
          <ul className="font-circular flex gap-10 text-[20px]   ">
            <Link className='hover:text-[#85A662]' href={"/faq"}>FAQ</Link>
            <Link className='hover:text-[#85A662]' href={"/wall-of-love"}>Wall of love</Link>
            <Link className='hover:text-[#85A662]' href={"/resources"}>Resources</Link>
          </ul>
        </div>
        <div onClick={() => setSidebarOpen(!sidebarOpen)} className='block  md:hidden  h-[30px] w-[30px] mt-[10px]'>
          <SlidersIcon /></div>
        <Link href={"/"}>
          <div className='flex  justify-center'>
            <MatchaIcon />
            <div className={`${pacifico.className} text-2xl text-black pt-[30px] hidden sm:flex md:translate-y-[-10px] `}>
              Buy me a matcha
            </div>

          </div>
        </Link>

        {session ? (
          <><div className="rightnav flex items-center p-4 gap-2 flex-1 justify-end">
            {/* Dropdown */}
            <div className="relative inline-block text-left">
              <button
                onClick={() => setisopen(!isopen)}
                onBlur={() => setTimeout(() => setisopen(false), 500)}
                type="button"
                className="text-[14px] inline-flex items-center gap-x-1.5 rounded-[50px] bg-[#FAF7F2] px-3 py-1 font-semibold text-gray-900 hover:bg-[#F2ECE4]"
              >
                Welcome {session.user.username}
                <svg className="size-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                className={`absolute ${isopen ? '' : 'hidden'} right-0 z-10 mt-2 w-40 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5`}
              >
                <div className="py-1">
                  <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700">Dashboard</Link>
                  <Link href={`/${session.user.username}`} className="block px-4 py-2 text-sm text-gray-700">Your Page</Link>
                  <button onClick={signOut} className="block w-full px-4 py-2 text-left text-sm text-gray-700">Sign out</button>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={signOut}
              className="text-[14px] px-4 py-2 bg-[#85A662] h-[40px] rounded-[50px] font-circular"
            >
              Logout
            </button>
          </div>
          </>
        ) : (
          <div className="rightnav flex p-4  gap-6 md:gap-10 pt-[30px] flex-1 justify-end ">
            {/* <input className = " h-[50px] w-[212px] bg-white rounded-full  translate-y-[-10px]" type="text"  /> */}
            <Link href={"/login"}>
              <button className='font-circular text-[20px]  p-2 pl-[10px]  bg-[#85A662] h-[50px] w-[90px] rounded-[50px]'>login</button>
            </Link>
            
          </div>
        )}

      </div>


      {/* sliding side bar */}

      <div className={`fixed top-0 left-0 z-0 w-full h-full bg-[#FAF7F2] bg-opacity-50  transition-transform duration-300 ease-in-out block shadow md  md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex flex-col gap-4 mt-[100px] ">
          

          <Link href="/faq" onClick={() => setSidebarOpen(false)} className="text-lg hover:text-[#85A662] font-circular text-[24px]">FAQ</Link>
          <Link href="/wall-of-love" onClick={() => setSidebarOpen(false)} className="text-lg hover:text-[#85A662] font-circular text-[24px]">Wall of love</Link>
          <Link href="/resources" onClick={() => setSidebarOpen(false)} className="text-lg hover:text-[#85A662] font-circular text-[24px]">Resources</Link>
        </div>
        <div>
          <Link href="/login">
            <button onClick={() => setSidebarOpen(false)} className='fixed bottom-10 bg-[#85A662] h-[60px] w-[90%] text-white text-[23px] px-4 py-2 rounded ml-[20px]'>
              Start my page
            </button>
          </Link>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
