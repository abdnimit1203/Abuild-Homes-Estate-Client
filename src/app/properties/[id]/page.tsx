"use client";

/**
 * PropertyDetailsPage — thin orchestrator.
 *
 * Owns only:
 *   - Fetching the Property
 *   - Rendering the property image, specs, agent card, and breadcrumb
 *   - Passing (property, user) to WishlistAction and ReviewIntake at their seams
 *
 * Wishlist and Review concerns are fully owned by their own deep modules.
 */

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  MapPin,
  DollarSign,
  ShieldCheck,
  BedDouble,
  Car,
  Maximize2,
  ChevronRight,
} from "lucide-react";
import { Property } from "@/types";
import WishlistAction from "@/components/property/WishlistAction";
import ReviewIntake from "@/components/property/ReviewIntake";

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { user } = useAuth();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ["property-detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/properties/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 space-y-8 animate-pulse">
        <div className="h-96 bg-base-200 rounded-3xl" />
        <div className="h-8 bg-base-200 rounded-lg w-2/3" />
        <div className="h-4 bg-base-200 rounded-lg w-1/3" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <Link href="/properties" className="text-[#38B6FF] underline mt-4 inline-block">
          Return to All Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60">
        <Link href="/" className="hover:text-[#38B6FF]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/properties" className="hover:text-[#38B6FF]">Properties</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-base-content truncate max-w-xs">{property.propertyTitle}</span>
      </div>

      {/* Main Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image & Specs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl bg-base-300">
            <Image
              src={property.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
              alt={property.propertyTitle}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="w-4 h-4" />
                {property.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              {property.propertyTitle}
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#38B6FF] flex-shrink-0" />
              {property.propertyLocation}
            </p>
          </div>

          {/* Quick Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10">
            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-[#38B6FF]/15 text-[#38B6FF] flex-shrink-0">
                <BedDouble className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Bedrooms</p>
                <p className="text-sm font-bold text-base-content truncate">3-4 Rooms</p>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Parking</p>
                <p className="text-sm font-bold text-base-content truncate">Dedicated</p>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500 flex-shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Total Area</p>
                <p className="text-sm font-bold text-base-content truncate">2,400 sqft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-base-content">About This Estate</h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              Experience the pinnacle of sophisticated living. This verified architectural
              masterpiece features bespoke finishes, sunlit open-concept living spaces, panoramic
              views, and seamless access to central transportation, shopping, and international schools.
            </p>
          </div>
        </div>

        {/* Right: Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-base-200/60 dark:bg-base-200/90 border border-base-content/10 shadow-xl space-y-6 sticky top-28">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                Price Guidance
              </span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center">
                <DollarSign className="w-6 h-6 text-[#38B6FF]" />
                {property.priceRange}
              </p>
            </div>

            {/* Agent Card */}
            <div className="p-4 rounded-2xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/10 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-base-300 flex-shrink-0">
                <Image
                  src={property.agentImage || "https://i.ibb.co/3CM7zGR/agent-dp.jpg"}
                  alt={property.agentName || "Agent"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/60">Listing Agent</p>
                <p className="text-sm font-bold text-base-content truncate">
                  {property.agentName || "Agent"}
                </p>
                <p className="text-xs text-[#38B6FF] truncate">{property.agentEmail}</p>
              </div>
            </div>

            {/* Wishlist seam */}
            <WishlistAction property={property} user={user} />
          </div>
        </div>
      </div>

      {/* Reviews seam */}
      <div className="pt-10 border-t border-base-content/10">
        <ReviewIntake propertyId={id} property={property} user={user} />
      </div>
    </div>
  );
}
