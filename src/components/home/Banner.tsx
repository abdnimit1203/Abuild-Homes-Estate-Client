"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Home as HomeIcon, DollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Banner() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && (theme === "dark" || resolvedTheme === "dark");

  const handleSearch = () => {
    router.push("/all-properties");
  };

  return (
    <div className="relative w-full min-h-[620px] rounded-3xl overflow-hidden shadow-2xl flex items-center">
      {/* Dynamic Animated Background Images with Smooth Crossfade */}
      <AnimatePresence mode="sync">
        {isDark ? (
          <motion.div
            key="dark-banner"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url(/assets/home/banner-dark.png)" }}
          >
            {/* Soft dark overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/85 via-neutral-950/60 to-transparent" />
          </motion.div>
        ) : (
          <motion.div
            key="light-banner"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: "url(/assets/home/banner.png)" }}
          >
            {/* Soft light overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 py-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38B6FF]/15 border border-[#38B6FF]/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#38B6FF] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
              Premium Real Estate Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
            Discover Your <br />
            <span className="text-[#38B6FF]">Dream Home</span> With Confidence
          </h1>

          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
            Where every brick tells a unique and captivating story. Explore verified luxury
            apartments, villas, and modern residential spaces with seamless offer management.
          </p>

          {/* Quick Search Bar with Glassmorphic styling */}
          <div className="p-4 sm:p-5 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/60 dark:border-neutral-700/60 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* City Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#38B6FF]" />
                Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-sm font-semibold bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 focus:outline-none focus:border-[#38B6FF] text-neutral-900 dark:text-white cursor-pointer"
              >
                <option value="" className="text-neutral-800 dark:text-neutral-200 bg-base-100">All Locations</option>
                <option value="Gulshan" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Gulshan, Dhaka</option>
                <option value="Banani" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Banani, Dhaka</option>
                <option value="Uttara" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Uttara, Dhaka</option>
                <option value="New York" className="text-neutral-800 dark:text-neutral-200 bg-base-100">New York, USA</option>
                <option value="Paris" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Paris, France</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
                <HomeIcon className="w-3.5 h-3.5 text-[#38B6FF]" />
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-sm font-semibold bg-transparent border-b border-neutral-300 dark:border-neutral-700 py-1.5 focus:outline-none focus:border-[#38B6FF] text-neutral-900 dark:text-white cursor-pointer"
              >
                <option value="" className="text-neutral-800 dark:text-neutral-200 bg-base-100">All Categories</option>
                <option value="Apartment" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Modern Apartment</option>
                <option value="Villa" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Luxury Villa</option>
                <option value="Penthouse" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Penthouse</option>
                <option value="Estate" className="text-neutral-800 dark:text-neutral-200 bg-base-100">Country Estate</option>
              </select>
            </div>

            {/* Submit Action */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full py-2.5 px-4 rounded-xl bg-[#38B6FF] hover:bg-[#2fa3e6] text-white font-bold text-sm shadow-md shadow-[#38B6FF]/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                Find Homes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
