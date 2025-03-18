"use client";
import React, { useState, useEffect, useContext } from "react";
import { Card, Typography } from "@material-tailwind/react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import { HomeContextProvider } from "@/components/HomeProvider/HomeProvider";

const Dashboard = ({ view, toggle }) => {
  const [activeItem, setActiveItem] = useState();
  const { hamburger, setHamburger } = useContext(HomeContextProvider);
  const pathName = usePathname();
 
  // Set active menu item based on current pathname
  useEffect(() => {
    const pathToIdMapping = {
      "/Dashboard/AdminHome": "dashboard",
      "/Dashboard/Contact": "contacts",

    };
    setActiveItem(pathToIdMapping[pathName] || "");
  }, [pathName]);

  const menuItems = [
    {
      id: "dashboard",
      path: "/Dashboard/AdminHome",
      label: "Dashboard",
    },
    {
      id: "contacts",
      path: "/Dashboard/Contact",
      label: "Contacts",
    },

  ];

  const customMenuStyle = {
    backgroundColor: "#f5f5f5",
  };

  const customItemStyle = {
    color: "#000000",
  };

  return (
    <div
      className={`fixed md:relative transition ${
        hamburger ? "left-0" : "left-[-30rem]"
      } md:left-0 z-[30] transition-all duration-500`}
    >
    <Card className="h-screen no-scrollbar overflow-y-scroll py-2  bg-gray-100 rounded-none shadow-none">
        <div className="flex items-center justify-between">
          <div className="mb-2 mt-3 pl-5">
            <Typography variant="h5" color="white">
              <a href="/" className="font-bold text-2xl">
                 <Image
                              src="/cyber_craft.png"
                              alt="CyberCraft Bangladesh"
                              width={150}
                              height={100}
                            />
              </a>
            </Typography>
          </div>
          {view === "mobile" && hamburger && (
            <div className="block lg:hidden">
              <button onClick={() => setHamburger(!hamburger)}>
                <RxCross1
                  size={24}
                  className="bg-cyan-800 py-1 px-1 rounded-md text-white"
                />
              </button>
            </div>
          )}
        </div>

        <Menu
         className="custom-menu"
          style={customMenuStyle}
          mode="inline"
          selectedKeys={[activeItem]}
          onClick={(e) => setActiveItem(e.key)}
          items={menuItems.map((item) => ({
            key: item.id,
            label: (
              <Link href={item.path}>
                <span style={customItemStyle}>{item.label}</span>
              </Link>
            ),
          }))}
        />
      </Card>
    </div>
  );
};

export default Dashboard;
