"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NavigationModal({ isOpen, onClose }) {
  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: "-100%"
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: {
      opacity: 0,
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/30 backdrop-blur-md z-40"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 bg-black mt-10 mb-10 max-w-[1090px] mx-auto px-20 py-16 rounded-3xl"
          >
            {/* Modal Header */}
            <div className="container mx-auto px-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl text-white">Navigation</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white hover:opacity-80 transition-opacity border border-gray-300 rounded-full text-xl"
                >
                  <X size={25} />
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <motion.div 
              className="container mx-auto px-4 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <motion.nav className="space-y-6">
                <NavLink href="/case-studies">
                  <div className="flex items-center">
                    Case Studies
                    <span className="ml-4 text-white border border-gray-300 rounded-full px-6 py-5 text-xl">13</span>
                  </div>
                </NavLink>
                <NavLink href="/our-agency">Our Agency</NavLink>
                <NavLink href="/contact">Contact Us</NavLink>
                <NavLink href="/news">News</NavLink>
              </motion.nav>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavLink({ href, children }) {
  return (
    <motion.a
      href={href}
      className="block text-white text-5xl font-semibold hover:text-gray-300 transition-colors"
      whileHover={{ x: 20 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {children}
    </motion.a>
  );
} 