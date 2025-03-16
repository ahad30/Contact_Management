"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useGetProjectsQuery } from "@/redux/Feature/Admin/projects/projects";
import { Spin } from "antd";

export function Work() {
  const containerRef = useRef(null);
  const { data: projects, isLoading , error} = useGetProjectsQuery();

  // Use the newer ref pattern with Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-300%"]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  if(projects?.length === 0 || error){
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-4xl font-semibold">No Projects Found</h1>
      </div>
    );
  }

  return (
    <motion.section 
      ref={containerRef}
      className="h-[300vh] mb-16 mt-16"
    >
      <div className="overflow-hidden mx-auto flex items-center justify-start px-4 sticky top-0 
      h-[100vh]">
        <motion.div className="flex gap-6" style={{ x }}>
          {/* Header Section */}
          <motion.div className="min-w-[500px] ml-14 flex flex-col h-[450px] relative">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-6xl font-semibold">Work</h2>
                <div className="bg-white text-black border border-gray-300 w-[70px] h-[70px] rounded-full flex items-center justify-center">
                  <span className="text-lg">{projects?.length || 0}</span>
                </div>
              </div>
            </div>
            <p className="text-2xl text-black text-justify w-[300px]">
              A selection of our crafted work, built from scratch by our talented in-house team.
            </p>
            <div className="w-[300px]">
              <Link href="/case-studies">
                <button className="text-center px-8 py-4 rounded-full border border-black hover:bg-black hover:text-white transition-colors absolute bottom-0">
                  Case Studies
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Work Items */}
          {projects?.map((project) => (
            <motion.div
              key={project._id}
              className="min-w-[600px] h-[450px] relative rounded-3xl flex-shrink-0"
              initial={{ opacity: 0, y: 150 }}
              whileInView={{ opacity: 1, y: 0 }}  
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
             
                <div className="relative w-full h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover rounded-3xl w-[600px] h-[450px]"
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between bg-black/50 rounded-3xl">
                    {/* Latest Badge */}
                    {project.isLatest === "Yes" && (
                      <div className="self-end">
                        <span className="bg-[#6366F1] text-white px-6 py-2 rounded-full">
                          Latest
                        </span>
                      </div>
                    )}

                    {/* Bottom Content */}
                    <div className="absolute bottom-0 py-8 text-white">
                      <h3 className="text-4xl font-semibold mb-4">{project.title}</h3>
                      <div className="flex gap-3">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 rounded-full border border-white/50 text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
            </motion.div>
          ))}

          {/* View More Card */}
          <motion.div
            className="min-w-[500px] ms-[300px] h-[400px] flex justify-start"
          >
           <div className="flex flex-col items-center justify-start gap-6">
           <h3 className="text-4xl font-semibold">View More</h3>
            <Link
              href="/case-studies"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-black hover:bg-black hover:text-white transition-colors"
            >
              Case Studies
            </Link>
           </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
