"use client"
import React, { useContext, useState } from 'react'
import "../../globals.css";
import Dashboard from '@/app/(dashboards)/Dashboard/Dashboard';
import Navbar from '@/app/(dashboards)/Dashboard/Navbar/Navbar';

import HomeProvider, { HomeContextProvider } from '@/components/HomeProvider/HomeProvider';

const DashboardLayout = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  const { hamburger } = useContext(HomeContextProvider);


  const handleClick = () => {
    setToggle(!toggle);
  }
  return (
    <>
    
        <HomeProvider>
          <div className="overflow-y-hidden overflow-x-hidden">
            <div className="md:flex md:flex-row justify-start h-screen relative">
              <div
                className={`${toggle ? "max-w-[4.5%]" : "w-[20%]"
                  }  duration-500 transition`}
              >
                <Dashboard />

              </div>

              <div className={`block ${hamburger ? "w-[60%]" : "-ml-[500px]"
                } lg:hidden  duration-700 absolute z-50`}>

                <Dashboard view={"mobile"} />
              </div>


              <div className="relative w-[100%]">
                <div className={` text-gray-900 h-screen overflow-y-scroll scrollbar-0`}>
                  <Navbar handleClick={handleClick} toggle={toggle} />
                  <div className={`py-5 w-[88%] lg:max-w-[90%] mx-auto`}>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HomeProvider>
 

    </>
  )
}

export default DashboardLayout;