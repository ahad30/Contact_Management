"use client";

import { motion } from "framer-motion";
import TeamImage from "../../../../../public/team.jpg";
import { useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import Image from "next/image";

export function Team() {
  const {data: partnerGoals, isLoading: partnerGoalsLoading, error: partnerGoalsError} = useGetPartnerGoalsQuery();
  const partnerData = partnerGoals?.filter(partner => partner.selectLayout === "Team");
  if(partnerGoalsLoading){
    return <div>Loading...</div>
  }

  if(partnerGoals?.length === 0 || partnerGoalsError){
    return <div>No Team Brands Found</div>
  }

  return (
    <section className="" >
      {/* Parallax Image Section */}
      <motion.div 
        className="px-16"
      >
        <Image
          src={TeamImage}
          alt="Our Team"
          className="object-cover mx-auto lg:w-[1200px] lg:h-[500px] rounded-xl"

        />
      </motion.div>

      {/* Content Section */}
      <div className="bg-white py-32">
        <div className="container mx-auto px-4">
          {partnerData?.map(partner => (
            <>
          <motion.h2
            className="text-xl md:text-5xl font-semibold mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
             {partner.title}
            </motion.h2>

  
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, staggerChildren: 0.1 }}
          >
            {partner?.brandsImage?.map((logo, index) => (
              <motion.div
                key={index}
                className="w-full flex items-center justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <img
                  src={logo}
                  alt={"brand"}
                  className="max-w-[110px] h-[100px] grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
          </>
          ))}
        </div>
      </div>
    </section>
  );
} 