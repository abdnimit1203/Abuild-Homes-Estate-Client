"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, DollarSign, ArrowRight } from "lucide-react";
import { Property } from "@/types";

interface MiniCardProps {
  property: Property;
}

export default function MiniCard({ property }: MiniCardProps) {
  const {
    _id,
    propertyTitle,
    status,
    priceRange,
    propertyLocation,
    propertyImage,
  } = property;

  return (
    <div className="group rounded-2xl overflow-hidden bg-base-100 dark:bg-base-200/80 border border-base-content/10 hover:border-[#38B6FF]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row h-full">
      {/* Property Image */}
      <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0 bg-base-300 overflow-hidden">
        <Image
          src={propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
          alt={propertyTitle}
          fill
          sizes="(max-width: 640px) 100vw, 192px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-sm">
            {status}
          </span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold text-base-content group-hover:text-[#38B6FF] transition-colors line-clamp-1">
            {propertyTitle}
          </h3>

          <p className="mt-1.5 text-xs text-base-content/70 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#38B6FF] flex-shrink-0" />
            <span className="truncate">{propertyLocation}</span>
          </p>

          <p className="mt-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-[#38B6FF]" />
            {priceRange}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-base-content/10">
          <span className="text-xs text-base-content/60 font-medium">Verified Home</span>
          <Link
            href={`/properties/${_id}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-sm shadow-[#38B6FF]/30 transition active:scale-95"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
