"use client";

import { useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Goals() {
  const {data: partnerGoals, isLoading: partnerGoalsLoading, error: partnerGoalsError} = useGetPartnerGoalsQuery();
  const partnerData = partnerGoals?.filter(partner => partner.selectLayout === "Goals");
  if(partnerGoalsLoading){
    return <div>Loading...</div>
  }

  if(partnerGoals?.length === 0 || partnerGoalsError){
    return <div>No Goals Found</div>
  }
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-20">
      {partnerData?.map(partner => (
        <>
          <div className="flex-1">
            <motion.h2 
              className="text-xl md:text-5xl font-semibold mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
             {partner.title}
            </motion.h2>

            <motion.div 
              className="py-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-7xl font-semibold mb-4">{partner.stateValue1}</h3>
                  <p className="text-xl text-gray-600">{partner.statTitle1}</p>
                </div>
                <div className="text-center">
                  <h3 className="text-7xl font-semibold mb-4">{partner.stateValue2}</h3>
                  <p className="text-xl text-gray-600">{partner.statTitle2}</p>
                </div>
              </div>
            </motion.div>

          
          </div>

      
          <div className="flex-1 flex flex-col justify-end">
          <motion.p 
              className="text-2xl text-gray-600 max-w-[600px] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
            {partner?.description}
            </motion.p>
         
          </div>
          </>
          ))}
        </div>
      </div>
    </section>
  );
} 