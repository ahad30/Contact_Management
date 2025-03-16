"use client";

import { useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";
import { Image } from "antd";
import { motion } from "framer-motion";


export function Partner() {
  const {data: partnerGoals, isLoading: partnerGoalsLoading, error: partnerGoalsError} = useGetPartnerGoalsQuery();
  const partnerData = partnerGoals?.filter(partner => partner.selectLayout === "Partner");
  if(partnerGoalsLoading){
    return <div>Loading...</div>
  }

  if(partnerGoals?.length === 0 || partnerGoalsError){
    return <div>No Partner Found</div>
  }

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-20">
          
         {partnerData?.map(partner => (
          <>
          <div className="flex-1">
            <motion.h2 
              className="text-6xl md:text-7xl font-semibold mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {partner.title}
            </motion.h2>

            <motion.p 
              className="text-2xl text-gray-600 max-w-[600px] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {partner.description}
            </motion.p>

            {/* Trusted Brands */}
            <motion.div 
              className="mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
             
              <div className="flex gap-6 items-center px-8">
                   {partner.brandsImage.map(brand => (
                <div className="w-16 h-16 rounded-full bg-gray-500 text-white flex items-center justify-center p-3 -ml-12">
                    <img src={brand} alt="brand" width={64} height={64} />
                </div>
                   ))}

                <h3 className="text-2xl text-gray-500">Brands who've trusted us...</h3>
              </div>
            </motion.div>
          </div>

    
          <div className="flex-1 flex flex-col justify-end">
            <motion.div 
              className="bg-gray-100 rounded-3xl p-16"
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
          </>
          ))}
        </div>
      </div>
    </section>
  );
} 