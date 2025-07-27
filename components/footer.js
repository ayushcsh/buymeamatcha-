import React from 'react'
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from 'next/link';


const footer = () => {
  return (
    <footer>
      <div className='bottom-0 flex  w-[80vw] mx-auto md:mt-[100px] mt-[60px] mb-[50px]'>
        <div>
          <p>© Buy Me a Matcha</p>
        </div>

        <div className='flex ml-[15vw] '>
          <ul className=' gap-4 font-circular hidden sm:flex'>
            <Link href={"/"}><li className='hover:text-[#85A662]'>About Us</li></Link>
            <Link href={"/"}><li className='hover:text-[#85A662]'>Contact Us</li></Link>
            <Link href={"/"}><li className='hover:text-[#85A662]'>Privacy Policy</li></Link>
            <Link href={"/"}><li className='hover:text-[#85A662]'>Terms & Conditions</li></Link>
            <Link href={"/"}><li className='hover:text-[#85A662]'>Cancellation/Refund Policies</li></Link>
          </ul>

          <div className='flex ml-[40px] gap-3  sm:translate-y-[2px]'>
            <Link href="https://www.linkedin.com/in/ayush-kumar-a8a1592a4/" target="_blank">
              <IoLogoLinkedin className="h-[20px] w-[20px] md:h-[30px] md:w-[50px]" />
            </Link>
            <Link href="https://www.instagram.com/_ayush_765/" target="_blank">
              <FaInstagram className="h-[20px] w-[20px] md:h-[30px] md:w-[30px]" />
            </Link>
            <Link href="https://github.com/ayushcsh" target="_blank">
              <FaGithub className="h-[20px] w-[20px] md:h-[30px] md:w-[30px]" />
            </Link>
          </div>

        </div>

      </div>

      <div>

      </div>
    </footer>
  )
}

export default footer
