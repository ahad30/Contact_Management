"use client";

import React from 'react';
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ScrollText = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform the text position based on scroll
  const x = useTransform(scrollYProgress, [0, 1], ["-50%", "80%"]);

  return (
    <section 
      ref={targetRef} 
      className="py-32 w-full overflow-hidden"
    >
      <div className="min-w-[1400px] relative">
        <motion.div 
          className=""
          style={{ x }}
        >
          <motion.div
            className=""
    
  
          >
          <p className='text-8xl font-bold text-black block'>
            Elevate your digital presence
          </p>
           
          </motion.div>
        
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollText;