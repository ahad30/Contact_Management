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
      "/Dashboard/Projects": "projects",
      "/Dashboard/HeroBanner": "heroBanner",
      "/Dashboard/Partners": "partners",
      "/Dashboard/Services": "services",
      "/Dashboard/Testimonials": "testimonials",
      "/Dashboard/Settings": "settings",
      "/Dashboard/Analytics": "analytics",
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
      id: "projects",
      path: "/Dashboard/Projects",
      label: "Projects",
    },
    {
      id: "heroBanner",
      path: "/Dashboard/HeroBanner",
      label: "Hero Banner",
    },
    {
      id: "partners",
      path: "/Dashboard/Partners",
      label: "Partners & Team",
    },
    {
      id: "services",
      path: "/Dashboard/Services",
      label: "Services",
    },
    {
      id: "testimonials",
      path: "/Dashboard/Testimonials",
      label: "Testimonials",
    }
  ];

  const customMenuStyle = {
    backgroundColor: "#1E466A",
  };

  const customItemStyle = {
    color: "#FFFFFF",
  };

  return (
    <div
      className={`fixed md:relative transition ${
        hamburger ? "left-0" : "left-[-30rem]"
      } md:left-0 z-[30] transition-all duration-500`}
    >
    <Card className="h-screen no-scrollbar overflow-y-scroll py-2 shadow-xl shadow-blue-gray-900/5 bg-primary rounded-none">
        <div className="flex items-center justify-between">
          <div className="mb-2 mt-3 pl-5">
            <Typography variant="h5" color="white">
              <a href="/" className="font-bold text-2xl">
                <svg
                  id="logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64.06 32"
                  width={64}
                  height={32}
                  className=" text-white"
                >
                  <rect
                    id="line1"
                    x="12.31"
                    width="6.78"
                    height="32"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                    }}
                    transform="matrix(1,0,0,1,0,0)"
                  />
                  <polygon
                    id="angle1"
                    points="0 32 6.78 32 12.31 0 5.53 0 0 32"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                      visibility: "visible",
                    }}
                    transform="matrix(1,0,0,1,0,0)"
                  />
                  <rect
                    id="line2"
                    x="25.88"
                    width="6.78"
                    height="32"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                    }}
                    transform="matrix(1,0,0,1,0,0)"
                  />
                  <polygon
                    id="angle2"
                    points="32.66 32 39.44 32 44.97 0 38.19 0 32.66 32"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                      visibility: "visible",
                    }}
                    transform="matrix(1,0,0,1,-0.25744,0)"
                  />
                  <rect
                    id="line3"
                    x="44.97"
                    width="6.78"
                    height="32"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                    }}
                    transform="matrix(1,0,0,1,0,0)"
                  />
                  <polygon
                    id="angle3"
                    points="57.28 0 51.75 32 58.53 32 64.06 0 57.28 0"
                    strokeWidth="0"
                    style={{
                      translate: "none",
                      rotate: "none",
                      scale: "none",
                      transformOrigin: "0px 0px",
                      visibility: "visible",
                    }}
                    transform="matrix(1,0,0,1,-0.25744,0)"
                  />
                </svg>
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
