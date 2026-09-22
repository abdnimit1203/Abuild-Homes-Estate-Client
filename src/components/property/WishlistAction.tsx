"use client";

/**
 * WishlistAction — deep module for Wishlist management on a Property detail page.
 *
 * Interface (small):
 *   <WishlistAction property={property} user={user} />
 *
 * Implementation (large, hidden):
 *   - Fetch user's wishlist
 *   - Determine membership (isWishlisted)
 *   - Add / remove mutations with optimistic toast feedback
 *   - Login redirect when unauthenticated
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { Heart, HeartOff } from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { User as FirebaseUser } from "firebase/auth";

interface WishlistActionProps {
  property: Property;
  user: FirebaseUser | null;
}

export default function WishlistAction({ property, user }: WishlistActionProps) {
  const router = useRouter();
  const [wishlisting, setWishlisting] = useState(false);

  const { data: userWishlist = [], refetch } = useQuery<any[]>({
    queryKey: ["user-wishlist", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/wishlists?email=${user?.email}`);
      return res.data || [];
    },
  });

  const currentWishlistItem = userWishlist.find(
    (item: any) => item.propertyID === property._id
  );
  const isWishlisted = Boolean(currentWishlistItem);

  const handleAdd = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/login");
      return;
    }
    setWishlisting(true);
    try {
      const wishlistItem = {
        userEmail: user.email,
        propertyID: property._id,
        propertyTitle: property.propertyTitle,
        propertyLocation: property.propertyLocation,
        propertyImage: property.propertyImage,
        priceRange: property.priceRange,
        minPrice: property.minPrice,
        maxPrice: property.maxPrice,
        agentName: property.agentName,
        agentEmail: property.agentEmail,
        agentImage: property.agentImage,
      };
      await axiosPublic.post("/api/v1/wishlists", wishlistItem);
      toast.success("Saved to your wishlist!");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    } finally {
      setWishlisting(false);
    }
  };

  const handleRemove = async () => {
    if (!currentWishlistItem?._id) return;
    setWishlisting(true);
    try {
      await axiosPublic.delete(`/api/v1/wishlists/${currentWishlistItem._id}`);
      toast.success("Removed from your wishlist!");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove from wishlist");
    } finally {
      setWishlisting(false);
    }
  };

  return (
    <div className="space-y-3">
      {isWishlisted ? (
        <button
          onClick={handleRemove}
          disabled={wishlisting}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-rose-500/15 hover:bg-rose-500/25 text-rose-600 dark:text-rose-400 border border-rose-500/30 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <HeartOff className="w-4 h-4" />
          {wishlisting ? "Removing..." : "Remove From Wishlist"}
        </button>
      ) : (
        <button
          onClick={handleAdd}
          disabled={wishlisting}
          className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-pink-700 hover:bg-pink-800 text-white shadow-lg shadow-pink-700/30 transition active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Heart className="w-4 h-4 fill-white" />
          {wishlisting ? "Adding..." : "Add To Wishlist"}
        </button>
      )}
      <p className="text-xs text-center text-base-content/50 leading-relaxed">
        {isWishlisted
          ? "This property is in your wishlist. Manage purchase offers in your dashboard."
          : "Add to your wishlist to submit a direct purchase offer or negotiate price in your dashboard."}
      </p>
    </div>
  );
}
