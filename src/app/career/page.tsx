"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeaderText from "@/components/common/HeaderText";
import { Briefcase, Users, Sparkles, Send } from "lucide-react";

export default function CareerPage() {
  return (
    <div className="space-y-12 pb-20">
      <HeaderText
        headerText="Join Our Team &"
        headerText2="Careers"
        headerText3="Be part of a visionary team shaping the digital future of real-estate"
      />

      <div className="rounded-3xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 p-6 sm:p-12 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#38B6FF]/15 text-[#38B6FF]">
              <Sparkles className="w-3.5 h-3.5" /> Work With Us
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
              Build Your Career at <span className="text-[#38B6FF]">ABuild Homes</span>
            </h1>
            <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
              At ABuild Homes, we foster a culture of technical excellence, creative freedom, and
              uncompromising dedication to our clients. Joining our team means collaborating with
              top-tier agents, engineers, and real estate analysts across the globe.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="mailto:abdnimit1203@gmail.com?subject=Job%20Application%20-%20ABuild%20Homes"
                className="px-6 py-3 rounded-xl text-sm font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md shadow-[#38B6FF]/30 transition inline-flex items-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Your Resume
              </a>
            </div>
          </div>

          {/* Right illustration */}
          <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg bg-base-300">
            <Image
              src="https://i.ibb.co/y0jSdH5/career.png"
              alt="Careers illustration"
              fill
              className="object-contain p-4"
            />
          </div>
        </div>
      </div>

      {/* Job Openings List */}
      <div className="max-w-3xl mx-auto text-center space-y-6 pt-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-base-content">Open Roles</h2>
          <p className="text-xs sm:text-sm text-base-content/60">
            Current active vacancies across our engineering and real-estate operations
          </p>
        </div>

        <div className="p-10 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-3">
          <Briefcase className="w-10 h-10 text-base-content/30 mx-auto" />
          <p className="font-bold text-base text-base-content">No active vacancies right now</p>
          <p className="text-xs text-base-content/60 max-w-md mx-auto">
            We are not actively recruiting for specific openings at this instant, but we always
            welcome passionate agents and engineers. Send us an open application!
          </p>
        </div>
      </div>
    </div>
  );
}
