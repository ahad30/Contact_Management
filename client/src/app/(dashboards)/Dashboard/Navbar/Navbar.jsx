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
import { useLogoutMutation } from '@/redux/Feature/auth/authApi';

const { Search } = Input;

const Navbar = ({ handleClick, toggle }) => {
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();
  const router = useRouter();
  const [logout] = useLogoutMutation();


  // Handle logout
  const handleLogout = async() => {
      await logout().unwrap();
    localStorage.clear();
  
    // Show a success message
    toast.success('Logout successful');
  
    // Redirect to the logout page
    router.push("/Logout");
  };

  // User profile dropdown menu
  const profileMenu = (
    <Menu>
      <Menu.Item key="logout">
        <button className='hidden lg:block' onClick={handleLogout}>
          Logout
        </button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;