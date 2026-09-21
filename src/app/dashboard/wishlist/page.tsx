"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { MapPin, DollarSign, Tag, Trash2, Heart, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";
import { WishlistItem } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function WishlistPage() {
  const { user } = useAuth();

  const { data: wishlist = [], isLoading, refetch } = useQuery<WishlistItem[]>({
    queryKey: ["my-wishlist", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/wishlists?email=${user?.email}`);
      return res.data || [];
    },
  });

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

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item) => (
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
          <p className="text-lg font-bold text-base-content">Your wishlist is currently empty</p>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Browse our verified property collection and bookmark the homes that inspire you.
          </p>
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] text-white mt-2"
          >
            Explore Properties <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
