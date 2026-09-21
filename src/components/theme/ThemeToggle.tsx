"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-base-200/50 border border-base-content/10 animate-pulse" />
    );
  }

  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "mytheme" : "dark")}
      aria-label="Toggle Theme"
      className="relative p-2.5 rounded-xl bg-base-100 hover:bg-base-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-700/80 border border-base-content/15 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 group overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-icon"
            initial={{ y: -20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center text-amber-400"
          >
            <Sun className="w-5 h-5 transition-transform group-hover:rotate-45" />
          </motion.div>
        ) : (
          <motion.div
            key="light-icon"
            initial={{ y: -20, opacity: 0, rotate: 45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: -45 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex items-center justify-center text-[#38B6FF]"
          >
            <Moon className="w-5 h-5 transition-transform group-hover:-rotate-12" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
