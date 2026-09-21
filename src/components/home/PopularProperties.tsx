"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import HeaderText from "../common/HeaderText";
import MiniCard from "../Cards/MiniCard";
import { Property } from "@/types";
import { ArrowRight } from "lucide-react";

export default function PopularProperties() {
  const { data, isLoading, error } = useQuery<{ propertiesData: Property[]; countData: number }>({
    queryKey: ["popular-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/properties?status=verified");
      return res.data;
    },
  });

  const properties = data?.propertiesData || [];

  return (
    <section className="py-12">
      <HeaderText
        headerText="Our Popular"
        headerText2="Properties"
        headerText3="Browse our hand-picked selection of top-rated verified estates"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="h-44 rounded-2xl bg-base-200/80 animate-pulse border border-base-content/10 p-4 flex gap-4"
            >
              <div className="w-40 h-full bg-base-300 rounded-xl" />
              <div className="flex-1 space-y-3 py-2">
                <div className="h-5 w-3/4 bg-base-300 rounded-md" />
                <div className="h-4 w-1/2 bg-base-300 rounded-md" />
                <div className="h-4 w-1/3 bg-base-300 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {properties.slice(0, 6).map((property) => (
            <MiniCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-base-200/50 rounded-2xl border border-base-content/10">
          <p className="text-sm text-base-content/70">No verified properties listed at this moment.</p>
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold button-1"
        >
          See All Properties
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
