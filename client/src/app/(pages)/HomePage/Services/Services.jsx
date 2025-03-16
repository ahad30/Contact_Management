"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useGetServicesQuery } from "@/redux/Feature/Admin/services/services";
import { Image } from "antd";
import { useGetPartnerGoalsQuery } from "@/redux/Feature/Admin/partnerGoals/partnerGoals";




export function Services() {
  const { data: services, isLoading, error } = useGetServicesQuery();
  const {data: partnerGoals, isLoading: partnerGoalsLoading, error: partnerGoalsError} = useGetPartnerGoalsQuery();

  const partnerData = partnerGoals?.filter(partner => partner.selectLayout === "Agency");

console.log(partnerData);
  if (isLoading) return <div>Loading...</div>;
  if(services?.length === 0 || error){
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-semibold">No Services Found</h1>
      </div>
    );
  }
  return (
    <section className="bg-black text-white py-28">
      <div className="container mx-auto px-4">
        {/* Latest Case Study */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium">Our team of experts can help you with...</h2>
        
        </div>

        {/* Services List */}
        <div className="space-y-20">
          {services?.map((service) => (
            <Link href={""} key={service._id}>
              <motion.div
                className="group relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Service Title */}
                <div className="flex items-center justify-between">
                  <h2 className="text-6xl font-semibold mb-4 mt-5 relative">
                    <motion.span
                      className="inline-block"
                      whileHover={{ x: 40 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      {service.serviceTitle}
                    </motion.span>
                  </h2>
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                  >
                    <div className="p-3">
                      <ArrowRight className="w-16 h-16" />
                    </div>
                  </motion.div>
                </div>
                
                <div className="absolute right-[145px] top-1/2 -translate-y-1/2 w-[200px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {
                  service.isLatest === "Yes" && (
                    <p className="text-gray-500 text-center text-base">Latest Case Study</p>
                  )
                }
                  <p className="text-white text-center text-xl">
                  {service.servicePartner}

                  </p>
                </div>
                

                {/* Hover Image */}
                <div className="absolute right-[80px] top-1/2 -translate-y-1/2 w-[70px] h-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="relative w-full h-full">
                    <Image
                      src={service.image}
                      alt={service.serviceTitle}
                      width={70}
                      height={70}
                      className="object-cover rounded-full"
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Agency Info */}
        <div className="mt-32 flex justify-between items-center">
        {
          partnerData?.map(partner => (
            <>
            <div className="max-w-[600px]">
            <motion.h3 
              className="text-6xl text-[#6366F1] mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {partner.title}
            </motion.h3>
            
            <motion.p 
              className="text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {partner.description}
            </motion.p>
          </div>

         <div className="flex flex-col justify-end">
          <div className="flex gap-6">
            <motion.div 
              className="rounded-full border border-[#6366F1] px-8 py-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xl"> {partner.stateValue1}</span>
              <span className="text-xl"> {partner.statTitle1}</span>
            </motion.div>
            <motion.div 
              className="rounded-full border border-[#6366F1] px-8 py-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-xl"> {partner.stateValue2}</span>
              <span className="text-xl"> {partner.statTitle2}</span>
            </motion.div>
          </div>
         </div>
         </>
        ))
        }
        </div>
      </div>
    </section>
  );
} 