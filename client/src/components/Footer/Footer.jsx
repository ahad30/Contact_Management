"use client";

import { Button } from "antd";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background py-16 mt-20">
    
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Column */}
          <div className="space-y-12 flex-1">
            <h2 className="text-4xl md:text-4xl font-semibold  w-full">
              We love crafting unforgettable digital experiences, brands and
              websites with people like you.
            </h2>

            <div className="space-y-6">
              <h3 className="text-lg font-medium">Get in touch</h3>
              <div className="space-y-2 font-semibold ">
                <p className="text-xl">+44 207 112 82 85</p>
                <p className="text-xl">contact@artistsweb.com</p>
              </div>
              <p className="text-xl font-semibold">
                Artistsweb, 18 Soho Square, London, W1D 3QL, United Kingdom
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-between flex-1">
            {/* Social Links */}
            <div className="flex justify-end mt-7 mb-11">
              <div className="bg-black text-white w-full lg:w-[80%] rounded-3xl px-7 py-6 flex items-center gap-6 justify-between">
               <div> <span className="text-lg">Follow us</span></div>
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Instagram className="h-8 w-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Facebook className="h-8 w-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Twitter className="h-8 w-8" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <span className="font-bold text-3xl">W.</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Get Started Card */}
           <div className="flex justify-end">
           <div className="bg-[#ecf1f4] rounded-3xl p-8 space-y-7  w-full lg:w-[80%] text-center">
              <h3 className="text-3xl font-medium">Let's get started</h3>
              <p className="text-gray-600">
                We'd love to hear about your project.
              </p>
              <Button className="w-full rounded-full text-lg h-14 bg-[#6366F1] hover:bg-[#5558E6] text-white">
                Get in touch
              </Button>
            </div>
           </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-8 border-t border-gray-200 text-gray-500 text-sm">
          <p>© 2025 Artistweb Ltd · All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
