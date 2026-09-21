"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeaderText from "@/components/common/HeaderText";
import { Phone, Mail, MapPin, Award, ShieldCheck, HeartHandshake, Cpu } from "lucide-react";

export default function AboutUsPage() {
  const pillars = [
    {
      title: "Expertise",
      icon: Award,
      desc: "Backed by seasoned real estate professionals with deep market valuation expertise.",
    },
    {
      title: "Transparency",
      icon: ShieldCheck,
      desc: "Clear listings, direct agent negotiations, and verified property records without hidden markups.",
    },
    {
      title: "Customer-Centric",
      icon: HeartHandshake,
      desc: "Dedicated to simplifying the journey from discovery to offer acceptance and deed closing.",
    },
    {
      title: "Tech-Driven",
      icon: Cpu,
      desc: "Modern digital workflows, instant offer status tracking, and encrypted Stripe checkout.",
    },
  ];

  return (
    <div className="space-y-12 pb-20">
      <HeaderText
        headerText="About"
        headerText2="ABuild Homes"
        headerText3="Pioneering modern, transparent real-estate discovery and digital acquisitions"
      />

      {/* Hero Image */}
      <div className="relative w-full h-[280px] sm:h-[380px] rounded-3xl overflow-hidden shadow-xl">
        <Image
          src="https://i.ibb.co/crndkJx/prope2.jpg"
          alt="Luxury Architecture"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent flex items-end p-8">
          <p className="text-white text-xl sm:text-2xl font-bold">
            Empowering Dreamers, Home Seekers & Visionary Agents
          </p>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content">
          Welcome to ABuild Homes Estates
        </h2>
        <p className="text-sm sm:text-base text-base-content/75 leading-relaxed">
          At ABuild Homes Estate, we are dedicated to simplifying and enhancing your property
          buying, selling, and leasing experience. With a passion for refined architectural design
          and a commitment to integrity, we strive to be your trusted partner across every
          milestone.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
        {pillars.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ y: -6 }}
            className="p-6 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 hover:border-[#38B6FF]/40 shadow-sm transition space-y-3 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-[#38B6FF]/15 text-[#38B6FF] mx-auto flex items-center justify-center">
              <item.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-base-content">{item.title}</h3>
            <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Direct Contact Cards */}
      <div className="pt-10 space-y-6">
        <h2 className="text-center text-xl font-bold text-base-content uppercase tracking-wider">
          Direct Contact Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 rounded-2xl bg-base-200/40 border border-base-content/10 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#38B6FF]/15 text-[#38B6FF] mx-auto flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <p className="text-xs text-base-content/60 font-semibold">Phone Support</p>
            <p className="text-sm font-bold text-base-content">+8801 1234 2113</p>
          </div>

          <div className="p-6 rounded-2xl bg-base-200/40 border border-base-content/10 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#38B6FF]/15 text-[#38B6FF] mx-auto flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <p className="text-xs text-base-content/60 font-semibold">Email Inquiries</p>
            <p className="text-sm font-bold text-base-content">abdnimit1203@gmail.com</p>
          </div>

          <div className="p-6 rounded-2xl bg-base-200/40 border border-base-content/10 text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#38B6FF]/15 text-[#38B6FF] mx-auto flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <p className="text-xs text-base-content/60 font-semibold">Headquarters</p>
            <p className="text-sm font-bold text-base-content">Dhaka, Bangladesh & NYC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
