"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import vaporwave from './vaporwave.png';  // Import the image

const GradientOverlay = () => (
  <div className="absolute inset-0 bg-gradient-to-r from-[#000000] to-[#000000] opacity-10" />
);

const CustomTitle = () => (
  <motion.h1
    className="text-6xl md:text-9xl font-college text-center relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-[#92fe9d] to-[#00c9ff]"
    initial={{ scale: 0.9 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, yoyo: Infinity, ease: "easeInOut" }}
  >
    ProfInsight AI
  </motion.h1>
);

const Tagline = () => (
  <motion.p
    className="text-3xl md:text-5xl text-white p-8 rounded-lg shadow-lg font-code-squared relative z-10"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
  >
    Get the Full Picture on Your Professors
  </motion.p>
);

export default function Home() {
  return (
    <div 
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${vaporwave.src})`,  // Use the imported image
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat' 
      }}
    >
      <GradientOverlay />
      <div className="relative z-10 text-center px-4 py-8 bg-black bg-opacity-70 rounded-lg shadow-xl">
        <div className="mb-6">
          <CustomTitle />
        </div>
        <div className="mb-10">
          <Tagline />
        </div>
        <Link href="/chatbot" passHref>
          <motion.button
            className="mt-12 px-16 py-8 text-2xl font-semibold text-black bg-gradient-to-r from-[#92fe9d] to-[#00c9ff] rounded-full shadow-lg transition-transform transform hover:scale-105 relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
