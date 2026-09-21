"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ShieldCheck } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaGlobe } from "react-icons/fa6";

export default function Footer() {
  const { theme, resolvedTheme } = useTheme();
  const isDark = theme === "dark" || resolvedTheme === "dark";

  return (
    <footer className="mt-20 border-t border-base-content/10 bg-base-200/50 dark:bg-base-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Logo & Mission */}
          <div className="space-y-4 md:col-span-1">
            <div className="py-2">
              <img
                src={isDark ? "/assets/home/logoDark.png" : "/assets/home/logoMain.png"}
                alt="ABuild Homes Estates Logo"
                className="h-10 sm:h-11 md:h-12 w-auto max-w-[190px] sm:max-w-[220px] object-contain"
              />
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Your premier online real-estate destination. Verified luxury homes, seamless bidding, and transparent property acquisition.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li>
                <Link href="/" className="hover:text-[#38B6FF] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-[#38B6FF] transition">
                  All Properties
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-[#38B6FF] transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-[#38B6FF] transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
              Trust & Security
            </h3>
            <ul className="space-y-2 text-sm text-base-content/80">
              <li className="flex items-center gap-1.5 text-xs text-base-content/70">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Verified Properties Guarantee
              </li>
              <li className="flex items-center gap-1.5 text-xs text-base-content/70">
                <ShieldCheck className="w-4 h-4 text-[#38B6FF]" />
                Encrypted Stripe Checkout
              </li>
              <li className="flex items-center gap-1.5 text-xs text-base-content/70">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                Agent Identity Verification
              </li>
            </ul>
          </div>

          {/* Col 4: Author Attribution & Portfolio Concept */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-base-content/60">
              Developer & Attribution
            </h3>
            <p className="text-xs text-base-content/70 leading-relaxed">
              Engineered with dedication by <strong className="text-base-content font-bold">Abdullah Ibne Ali</strong> (<span className="text-[#38B6FF]">abd_nimit</span>).
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href="https://Abdullah1203.github.io/web-portfolio"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-base-100 hover:bg-[#38B6FF] hover:text-white border border-base-content/10 shadow-sm transition"
                aria-label="Portfolio"
              >
                <FaGlobe className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/abdnimit1203"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-base-100 hover:bg-[#38B6FF] hover:text-white border border-base-content/10 shadow-sm transition"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/abdullah-ibne-ali"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-base-100 hover:bg-[#38B6FF] hover:text-white border border-base-content/10 shadow-sm transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/abd_nimit"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-base-100 hover:bg-[#38B6FF] hover:text-white border border-base-content/10 shadow-sm transition"
                aria-label="Twitter"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/abd_nimit"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-base-100 hover:bg-[#38B6FF] hover:text-white border border-base-content/10 shadow-sm transition"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-base-content/10 flex flex-col sm:flex-row items-center justify-between text-xs text-base-content/60 gap-4">
          <p>© {new Date().getFullYear()} ABuild Homes Estates. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with Next.js & TypeScript by{" "}
            <a
              href="https://Abdullah1203.github.io/web-portfolio"
              target="_blank"
              rel="noreferrer"
              className="text-[#38B6FF] font-semibold hover:underline"
            >
              Abdullah Ibne Ali
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
