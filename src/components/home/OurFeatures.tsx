"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Compass, Building, BookOpen } from "lucide-react";

export default function OurFeatures() {
  const features = [
    {
      title: "Explore Property",
      icon: Compass,
      desc: "Explore our diverse range of properties. From cozy homes to modern luxury apartments, find your perfect fit with transparent valuations.",
    },
    {
      title: "Find Agency & Agents",
      icon: Building,
      desc: "Connect with verified agents offering specialized services. Find the right partner for your real-estate investment goals with confidence.",
    },
    {
      title: "Property Guide & Bidding",
      icon: BookOpen,
      desc: "Access valuable market insights, fair price ranges, and an integrated offer system to negotiate the best deal directly with agents.",
    },
  ];

  return (
    <section className="py-12">
      <div className="rounded-3xl overflow-hidden bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 p-6 sm:p-10 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Feature Image */}
          <div className="lg:col-span-5 relative w-full h-[380px] lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://i.ibb.co/1z26NVY/sa.jpg"
              alt="Luxury Architecture"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Right Feature Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#38B6FF]">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                Our Distinctive <span className="text-[#38B6FF]">Features</span>
              </h2>
              <p className="text-sm sm:text-base text-base-content/70 leading-relaxed pt-2">
                Discover a curated selection of properties designed to meet diverse lifestyles.
                From picturesque locations to modern amenities, each verified listing showcases
                exceptional quality and transparent pricing.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {features.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-base-100/60 dark:bg-base-100/40 border border-base-content/5 hover:border-[#38B6FF]/30 transition shadow-sm"
                >
                  <div className="p-2.5 rounded-xl bg-[#38B6FF]/15 text-[#38B6FF] flex-shrink-0 mt-0.5">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-base-content">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-base-content/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
