"use client";

import React from "react";
import Image from "next/image";
import { BookOpen, Sparkles, Smartphone, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Rental() {
  return (
    <section className="py-12 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-base-content tracking-tight">
          Seamless Rentals & <span className="text-[#38B6FF]">Property Insights</span>
        </h2>
        <p className="text-sm sm:text-base text-base-content/70 max-w-xl mx-auto">
          Navigate your leasing journey effortlessly with our curated articles, real estate
          market reports, and management tips.
        </p>
      </div>

      <div className="rounded-3xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 divide-y divide-base-content/10 overflow-hidden shadow-lg">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 sm:p-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#38B6FF]/15 text-[#38B6FF]">
              <BookOpen className="w-3.5 h-3.5" /> For Tenants
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-base-content">
              Rental Insights for Tenants
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Unlock solutions to all your leasing queries through our step-by-step guides. Learn
              how to inspect a property, review tenancy contracts, and ensure fair utility billing.
            </p>
            <Link
              href="/all-properties"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#38B6FF] hover:underline"
            >
              Browse Rental Homes <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://i.ibb.co/Yk7pCjt/houseforest.jpg"
              alt="House in forest"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 sm:p-10">
          <div className="order-2 md:order-1 relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://i.ibb.co/D5T8yRr/home004.jpg"
              alt="Modern Home"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="order-1 md:order-2 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500">
              <Sparkles className="w-3.5 h-3.5" /> For Landlords & Agents
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-base-content">
              Empower Your Property Management Journey
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Keep abreast of the latest market trends with our guides on pricing strategy, tenant
              vetting, and maximizing returns through verified real estate listings.
            </p>
            <Link
              href="/career"
              className="inline-flex items-center gap-2 text-sm font-bold text-emerald-500 hover:underline"
            >
              Partner as an Agent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 sm:p-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500">
              <Smartphone className="w-3.5 h-3.5" /> Mobile App
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-base-content">
              Bring ABuild Homes Wherever You Go
            </h3>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Carry ABuild Homes Estate in the palm of your hand as your trusted companion.
              Instant notifications when your property offer gets accepted.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="relative w-36 h-11 cursor-pointer hover:opacity-90 transition">
                <Image
                  src="https://i.ibb.co/p4khSnC/get-on-playstore.png"
                  alt="Get on Google Play"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative w-36 h-11 cursor-pointer hover:opacity-90 transition">
                <Image
                  src="https://i.ibb.co/3FKNkYB/getonapple.png"
                  alt="Get on Apple App Store"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1260&q=80"
              alt="Mobile living"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
