"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, DollarSign, ArrowRight, ShieldCheck } from "lucide-react";
import { Property } from "@/types";

interface AllPropertiesCardProps {
  property: Property;
}

export default function AllPropertiesCard({ property }: AllPropertiesCardProps) {
  const {
    _id,
    propertyImage,
    propertyLocation,
    priceRange,
    propertyTitle,
    agentName,
    agentImage,
    status,
  } = property;

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row rounded-2xl overflow-hidden bg-base-100 dark:bg-base-200/80 border border-base-content/10 hover:border-[#38B6FF]/50 shadow-md hover:shadow-xl transition-all duration-300"
    >
      {/* Property Image Banner */}
      <div className="relative w-full sm:w-72 h-56 sm:h-auto flex-shrink-0 bg-base-300 overflow-hidden">
        <Image
          src={propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
          alt={propertyTitle}
          fill
          sizes="(max-width: 640px) 100vw, 288px"
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            {status}
          </span>
        </div>
      </div>

      {/* Property Details Container */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-base-content hover:text-[#38B6FF] transition-colors line-clamp-1">
            {propertyTitle}
          </h3>

          <p className="text-sm text-base-content/70 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#38B6FF] flex-shrink-0" />
            <span>{propertyLocation}</span>
          </p>

          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-base-content/50 block">
              Valuation Range
            </span>
            <p className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <DollarSign className="w-5 h-5 text-[#38B6FF]" />
              {priceRange}
            </p>
          </div>
        </div>

        {/* Agent Info & Details Button */}
        <div className="pt-4 border-t border-base-content/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-full overflow-hidden bg-base-300 flex-shrink-0 border border-base-content/10">
              <Image
                src={agentImage || "https://i.ibb.co/3CM7zGR/agent-dp.jpg"}
                alt={agentName || "Agent"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-xs text-base-content/50 font-medium">Assigned Agent</p>
              <p className="text-xs font-bold text-base-content truncate">{agentName || "Agent"}</p>
            </div>
          </div>

          <Link
            href={`/properties/${_id}`}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-sm shadow-[#38B6FF]/30 transition active:scale-95"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
