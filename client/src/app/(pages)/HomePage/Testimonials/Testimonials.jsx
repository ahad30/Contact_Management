"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGetTestimonialsQuery } from "@/redux/Feature/Admin/testimonials/testimonials";
import { Spin } from "antd";

export function Testimonials() {
  const containerRef = useRef(null);
  const { data: testimonials, isLoading, error } = useGetTestimonialsQuery();


  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["500%", "-100%"]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if (testimonials?.length === 0 || error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-semibold">No Testimonials Found</h1>
      </div>
    );
  }

  return (
    <motion.section  
      ref={containerRef} 
      className="h-[250vh] bg-gradient-to-r from-blue-900 via-black to-[#111111]"
    >
      <div className="overflow-hidden mx-auto px-4 sticky top-0 
      h-[150vh]">
        <div className="max-w-7xl mx-auto px-4 w-full h-full flex items-center">
          <motion.div 
            className="w-full"
            style={{ y }}
          >
            <motion.div className="mb-16">
              <h2 className="text-5xl text-white font-bold mb-10">
                Client Feedback
              </h2>
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <h2 className="text-2xl text-white font-bold">
                  We're collaborators - We build tight-knit partnerships with our clients.
                </h2>
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 border-2 border-gray-300 rounded-full border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-gray-300 text-xl">Keep Scrolling</p>
                </div>
              </div>
            </motion.div>
            
            <div className="space-y-20 ">
              {testimonials?.map((testimonial) => (
                <motion.div
                  key={testimonial._id}
                  className="border border-gray-700 p-8 rounded-3xl h-[60vh] relative"
                  initial={{ opacity: 0, y: 150 }}
                  whileInView={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 1.5, ease: "easeInOut"}}
                >
                  <p className="text-2xl font-bold mb-8 leading-relaxed text-white">
                    "{testimonial.description}"
                  </p>
                  
                  <div className="flex items-center justify-between absolute bottom-0 left-0 p-10 w-full">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10">
                        <img 
                          src={testimonial.profileImage} 
                          alt={testimonial.companyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-lg text-white">{testimonial.authorName}</h4>
                      </div>
                    </div>
                    <p className="text-blue-400">{testimonial.companyName}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
 
        </div>
      </div>
    </motion.section >
  );
} 