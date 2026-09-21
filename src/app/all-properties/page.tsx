"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import HeaderText from "@/components/common/HeaderText";
import AllPropertiesCard from "@/components/Cards/AllPropertiesCard";
import { Search, ArrowUpDown, Filter } from "lucide-react";
import { Property } from "@/types";

export default function AllPropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default");

  const { data, isLoading, refetch } = useQuery<{ propertiesData: Property[]; countData: number }>({
    queryKey: ["all-properties", sortOrder],
    queryFn: async () => {
      let url = "/api/v1/properties?status=verified";
      if (sortOrder === "asc") url += "&sort=asc";
      if (sortOrder === "desc") url += "&sort=desc";
      const res = await axiosPublic.get(url);
      return res.data;
    },
  });

  const properties = data?.propertiesData || [];

  const filteredProperties = properties.filter((p) => {
    const term = searchTerm.toLowerCase();
    return (
      p.propertyTitle?.toLowerCase().includes(term) ||
      p.propertyLocation?.toLowerCase().includes(term) ||
      p.priceRange?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 pb-16">
      <HeaderText
        headerText="Explore All"
        headerText2="Properties"
        headerText3="Browse verified listings across prime metropolitan and suburban locations"
      />

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/50" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by property title, address, or location..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF]/40 text-base-content"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-base-content/60 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#38B6FF]" />
            Sort:
          </span>
          <button
            onClick={() => setSortOrder("default")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              sortOrder === "default"
                ? "bg-[#38B6FF] text-white shadow-sm"
                : "bg-base-100 dark:bg-neutral-800/80 text-base-content/70 hover:bg-base-300"
            }`}
          >
            Default
          </button>
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              sortOrder === "asc"
                ? "bg-[#38B6FF] text-white shadow-sm"
                : "bg-base-100 dark:bg-neutral-800/80 text-base-content/70 hover:bg-base-300"
            }`}
          >
            Price: Low to High
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              sortOrder === "desc"
                ? "bg-[#38B6FF] text-white shadow-sm"
                : "bg-base-100 dark:bg-neutral-800/80 text-base-content/70 hover:bg-base-300"
            }`}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      {/* Property Cards Grid */}
      {isLoading ? (
        <div className="space-y-6">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-56 rounded-2xl bg-base-200/70 animate-pulse border border-base-content/10 p-6 flex gap-6"
            >
              <div className="w-72 h-full bg-base-300 rounded-xl" />
              <div className="flex-1 space-y-4 py-2">
                <div className="h-6 w-2/3 bg-base-300 rounded" />
                <div className="h-4 w-1/3 bg-base-300 rounded" />
                <div className="h-4 w-1/4 bg-base-300 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="space-y-6">
          {filteredProperties.map((property) => (
            <AllPropertiesCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/40 rounded-3xl border border-base-content/10 space-y-3">
          <p className="text-lg font-bold text-base-content">No properties match your criteria</p>
          <p className="text-sm text-base-content/60">
            Try adjusting your search terms or reset the filters.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#38B6FF] text-white mt-2"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
}
