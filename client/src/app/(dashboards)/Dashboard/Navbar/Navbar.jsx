"use client"
import React, { useContext } from 'react'
import { CgMenuLeftAlt } from "react-icons/cg";
import { RiMenu3Line } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";
import { HomeContextProvider } from '../../../../components/HomeProvider/HomeProvider';
import Link from 'next/link';
import { Button } from 'antd';
import { usePathname } from 'next/navigation';



const Navbar = ({handleClick,toggle}) => {

  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname()
  

  return (
    
    <div className={`bg-primary text-sm px-3 py-2 sticky top-0 z-[15] w-full text-white`}>
    <div className='flex justify-between lg:justify-end items-center'>
    <div
          className="lg:hidden focus:ring-1 cursor-pointer"
          onClick={() => setHamburger(!hamburger)}
        >
          <HiMenuAlt1 size={20} className="cursor-pointer" />
    </div>
        
    {/* <div className='mt-3 hidden lg:block'>
   <button
   onClick={handleClick}
   >
   {
!toggle? <RiMenu3Line size={25}/> :
<CgMenuLeftAlt size={25}/>

   }</button>
    </div> */}

   
   
   <div className='flex items-center'>
   <Link href={`/Login`}>
    <Button className='hidden lg:block'>
      Logout
    </Button>
   </Link>

   </div>
    </div>
   </div>

  )
}

export default Navbar