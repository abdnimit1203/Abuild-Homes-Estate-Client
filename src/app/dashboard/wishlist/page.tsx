"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { MapPin, DollarSign, Tag, Trash2, Heart, ArrowRight, Search, Filter, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { WishlistItem } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function WishlistPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [locationFilter, setLocationFilter] = React.useState("all");

  const { data: wishlist = [], isLoading, refetch } = useQuery<WishlistItem[]>({
    queryKey: ["my-wishlist", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/wishlists?email=${user?.email}`);
      return res.data || [];
    },
  });

  const uniqueLocations = React.useMemo(() => {
    const locs = new Set<string>();
    wishlist.forEach((item) => {
      if (item.propertyLocation) locs.add(item.propertyLocation.trim());
    });
    return Array.from(locs).sort();
  }, [wishlist]);

  const filteredWishlist = React.useMemo(() => {
    return wishlist.filter((item) => {
      const titleMatch = (item.propertyTitle || "").toLowerCase().includes(searchTerm.toLowerCase());
      const locationMatch = (item.propertyLocation || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = titleMatch || locationMatch;

      const matchesLocation =
        locationFilter === "all" ? true : item.propertyLocation?.trim() === locationFilter;

      return matchesSearch && matchesLocation;
    });
  }, [wishlist, searchTerm, locationFilter]);

  const hasActiveFilters = searchTerm !== "" || locationFilter !== "all";
  const resetFilters = () => {
    setSearchTerm("");
    setLocationFilter("all");
  };

  const handleRemove = async (id: string, title: string) => {
    const isConfirmed = await confirmDelete({
      title: "Remove from Wishlist?",
      text: `Are you sure you want to remove "${title}" from your wishlist?`,
      confirmButtonText: "Yes, remove it!",
    });
    if (!isConfirmed) return;

    try {
      await axiosPublic.delete(`/api/v1/wishlists/${id}`);
      toast.success(`Removed "${title}" from wishlist`);
      refetch();
    } catch (err) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-base-content">My Wishlist Properties</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Review your saved estates, negotiate valuations, or submit a formal purchase offer
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-base-200/40 p-3.5 sm:p-4 rounded-2xl border border-base-content/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search wishlist by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-base-100 border border-base-content/10 focus:outline-none focus:border-[#38B6FF] text-base-content placeholder:text-base-content/40 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-base-100 px-3 py-2 rounded-xl border border-base-content/10 text-xs text-base-content/80">
            <Filter className="w-3.5 h-3.5 text-base-content/50" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-base-100 hover:bg-base-200 border border-base-content/10 text-rose-500 hover:text-rose-600 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-base-content/60 px-1">
        <span>
          Showing <strong className="text-base-content">{filteredWishlist.length}</strong> of{" "}
          <strong className="text-base-content">{wishlist.length}</strong> saved properties
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredWishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWishlist.map((item) => (
            <div
              key={item._id}
              className="rounded-2xl overflow-hidden bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
            >
              <div className="relative h-48 w-full bg-base-300">
                <Image
                  src={item.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
                  alt={item.propertyTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-base-content line-clamp-1">
                    {item.propertyTitle}
                  </h3>
                  <p className="text-xs text-base-content/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#38B6FF]" />
                    {item.propertyLocation}
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
                    {item.priceRange}
                  </p>
                </div>

                <div className="pt-3 border-t border-base-content/10 flex items-center justify-between gap-2">
                  <Link
                    href={`/dashboard/make-offer/${item._id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-sm transition"
                  >
                    <Tag className="w-3.5 h-3.5" /> Make Offer
                  </Link>

                  <button
                    onClick={() => handleRemove(item._id, item.propertyTitle)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <Heart className="w-12 h-12 text-base-content/20 mx-auto" />
          <p className="text-lg font-bold text-base-content">
            {hasActiveFilters ? "No saved properties match your filters" : "Your wishlist is currently empty"}
          </p>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="text-[#38B6FF] hover:underline font-semibold"
              >
                Clear all filters to view all saved properties
              </button>
            ) : (
              "Browse our verified property collection and bookmark the homes that inspire you."
            )}
          </p>
          {!hasActiveFilters && (
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] text-white mt-2"
            >
              Explore Properties <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
