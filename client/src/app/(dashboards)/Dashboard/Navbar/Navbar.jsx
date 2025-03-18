"use client";
import React, { useContext, useState, useEffect } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { HomeContextProvider } from '../../../../components/HomeProvider/HomeProvider';
import { Button, Input, Dropdown, Menu, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { IoSearch } from "react-icons/io5";
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import Image from 'next/image';
import { Badge } from '@material-tailwind/react';
import { IoIosNotifications } from "react-icons/io";

const { Search } = Input;

const Navbar = ({ handleClick, toggle }) => {
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();
  const router = useRouter();

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove('authToken', { path: '/' });
    toast.success('Logout successful');
    router.push("/Logout");
  };

  // User profile dropdown menu
  const profileMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="bg-gray-100 text-sm px-3 py-2 sticky top-0 z-[15] w-full text-white">
           
      <div className='flex justify-between lg:justify-end gap-6 items-center'>
      <div
          className="lg:hidden focus:ring-1 cursor-pointer"
          onClick={() => setHamburger(!hamburger)}
        >
          <HiMenuAlt1 size={20} className="cursor-pointer text-black" />
    </div>
      <div className='flex items-center justify-end gap-5'>
      <div className='hidden lg:flex'>
      <Space direction="vertical">
      <Search
      placeholder="Search..."
      onSearch={onSearch}
      style={{
        width: 500,
        borderRadius: "9999px",
        height: "40px",
      }}
    />
      </Space>
      </div>
     
     <Badge content="5">
      <IoIosNotifications className="text-2xl text-[#4880FF]" />
    </Badge>
 

        {/* Right Side: User Profile and Logout */}
        <div className='flex items-center'>
          {/* Bank Admin Section */}
          <p className="mr-4 text-[12px] text-black hidden lg:block">
         Mohimin Ahad <br />
          <span className='text-[10px] font-bold text-black'>Admin</span>
          </p>


          {/* User Profile Dropdown */}
          <Dropdown overlay={profileMenu} trigger={['click']} arrow>
            <div className="flex items-center gap-2 cursor-pointer">
              <Image
               src="/user.png"
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
             <DownOutlined className="text-black text-[12px]" />
            </div>

          </Dropdown>

          {/* Logout Button */}
          {/* <Button className='hidden lg:block ml-4' onClick={handleLogout}>
            Logout
          </Button> */}
        </div>
    </div>
      </div>
    </div>
  );
};

export default Navbar;