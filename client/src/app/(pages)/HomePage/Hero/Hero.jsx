"use client";

import { useGetHeroBannersQuery } from "@/redux/Feature/Admin/heroBanner/heroBanner";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion, useScroll, useTransform } from "framer-motion";


export function Hero() {
  const { data: heroBanner, isLoading, error } = useGetHeroBannersQuery();
  const [count, setCount] = useState(15);
  const numbers = [15, 25, 35, 45];
  let index = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      index = (index + 1) % numbers.length;
      setCount(numbers[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (heroBanner?.length === 0 || error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-semibold">No Hero Banner Found</h1>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 pt-32 pb-20">
      <div className="">
        {/* Main Heading */}
        <div className="">
          <h1  className="text-6xl md:text-8xl font-semibold mb-20">
            {heroBanner[0]?.title.split(" ").map((title, index) => (
              <>
                {index <= 1 ? (
                  <span
                    key={index}
                    className={`inline ${
                      index === 1 ? "text-[#6366F1]" : ""
                    } me-4`}
                  >
                    {title}
                  </span>
                ) : (
                  <p key={index}>{title}</p>
                )}
              </>
            ))}
          </h1>
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 flex-1">
          {/* Awards Section */}
          <div className="flex items-center gap-4">
            <div className="bg-black text-white w-[70px] h-[70px] rounded-full flex items-center justify-center">
              <span className="text-3xl font-semibold">
  
                    <motion.span
                      key={count}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 50 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {count}
                    </motion.span>
              </span>
            </div>
            <span className="text-2xl text-gray-500">
              <Typewriter
                words={heroBanner[0]?.achievementTitles || []}
                loop={true}
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={500}
              />
            </span>
          </div>

          {/* Description and CTA */}
          <div className="flex flex-col md:flex-row flex-1 justify-end">
            <p className="text-2xl md:text-2xl font-medium max-w-[500px]">
              {heroBanner[0]?.subTitle}
            </p>
            <button className="bg-[#6366F1] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5558E6] transition-colors">
              {heroBanner[0]?.buttonTitle}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
