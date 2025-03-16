"use client";

import { useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import { motion } from "framer-motion";
import Image from "next/image";

const Banner = () => {
  const {data: partnerGoals, isLoading: partnerGoalsLoading, error: partnerGoalsError} = useGetPartnerGoalsQuery();
  const partnerData = partnerGoals?.filter(partner => partner.selectLayout === "Banner");

  if(partnerGoalsLoading){
    return <div>Loading...</div>
  }

  if(partnerData?.length === 0 || partnerGoalsError){
    return  <div className="h-screen flex items-center justify-center">
    <h1 className="text-4xl font-semibold">No  Banner Found</h1>
  </div>
  }
  return (
    <section className="relative h-screen overflow-hidden">

      <div className="absolute inset-0 bg-[#f5f5f5]">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `url(${partnerData[0]?.brandsImage[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </div>


      <div className="relative container mx-auto px-4 h-full flex justify-center items-center">
        <div className="max-w-[1000px]">
          <motion.h1 
            className="text-[3rem] md:text-[5.5rem] lg:text-[5rem] leading-[1.1]  font-medium"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
          {
            partnerData[0]?.title.split(" ").map((title, index) => (
              <>
                {index <= 1 && (
                  <span
                    key={index}
                    className={`inline me-4`}
                  >
                    {title}
                  </span>
                )}
                {index == 2 && (
                  <p
                    key={index}
                    className={`ms-20 text-[#6366F1]`}
                  >
                    {title}
                  </p>
                )}
                {index >= 3 && (
                  <span
                    key={index}
                    className={`me-4`}
                  >
                    {title}
                  </span>
                )}
              </>
            ))
            }
        
          </motion.h1>
        </div>
      </div>

   
    </section>
  );
};

export default Banner;