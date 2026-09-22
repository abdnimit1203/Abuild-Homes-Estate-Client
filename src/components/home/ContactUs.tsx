"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function ContactUs() {
  return (
    <section className="py-12">
      <div className="relative rounded-3xl overflow-hidden min-h-[420px] flex items-center shadow-2xl">
        <Image
          src="/assets/home/contact-home.jpg"
          alt="Contact ABuild Homes"
          fill
          unoptimized
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center z-0"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-neutral-950/75 backdrop-blur-[2px] z-[1]" />

        <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-10 text-white space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38B6FF]/20 border border-[#38B6FF]/40 text-[#38B6FF] text-xs font-bold uppercase tracking-wider">
            Get In Touch
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Find Your Best <span className="text-[#38B6FF]">Real Estate</span> Opportunity
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            We provide a complete service for the acquisition, valuation, and verified purchase of
            prestigious residential and commercial properties. Contact our team today.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/about-us"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition inline-flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:abdnimit1203@gmail.com"
              className="px-6 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition inline-flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-[#38B6FF]" />
              abdnimit1203@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
