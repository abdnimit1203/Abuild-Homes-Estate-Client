"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import { Sparkles } from "lucide-react";

export default function MarqueeSection() {
  return (
    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-[#38B6FF] via-[#0284C7] to-[#38B6FF] text-white py-3.5 shadow-lg my-6">
      <Marquee speed={45} pauseOnHover gradient={false}>
        <div className="flex items-center gap-6 text-sm font-semibold tracking-wide px-4">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            Welcome to ABuild Homes Estate — Your Gateway to Luxury Living!
          </span>
          <span>•</span>
          <span>Verified Luxury Properties Across Bangladesh, USA, France & UK</span>
          <span>•</span>
          <span>Secure Direct Bidding with Real-Time Agent Negotiation</span>
          <span>•</span>
          <span>Seamless Stripe Payments for Accepted Offers</span>
          <span>•</span>
        </div>
      </Marquee>
    </div>
  );
}
