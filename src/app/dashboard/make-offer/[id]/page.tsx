"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";
import HeaderText from "@/components/common/HeaderText";
import { MapPin, DollarSign, Send, ArrowLeft, Calendar, Tag } from "lucide-react";
import toast from "react-hot-toast";
import { WishlistItem } from "@/types";

export default function MakeOfferPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();

  const [offeredAmount, setOfferedAmount] = useState<number | "">("");
  const [buyingDate, setBuyingDate] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: item, isLoading } = useQuery<WishlistItem>({
    queryKey: ["wishlist-offer-item", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/wishlists/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!item || !user) return;

    const amount = Number(offeredAmount);
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid monetary offer amount");
      return;
    }

    if (item.minPrice && amount < item.minPrice) {
      toast.error(`Offer amount cannot be less than minimum price ($${item.minPrice})`);
      return;
    }

    if (item.maxPrice && amount > item.maxPrice) {
      toast.error(`Offer amount cannot exceed maximum guidance price ($${item.maxPrice})`);
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading("Submitting offer to agent...");
    try {
      const offerData = {
        propertyID: item.propertyID || item._id,
        propertyTitle: item.propertyTitle,
        propertyLocation: item.propertyLocation,
        propertyImage: item.propertyImage,
        agentName: item.agentName,
        agentEmail: item.agentEmail,
        // buyerName intentionally omitted — resolved live from users collection on read
        buyerEmail: user.email,
        offeredAmount: amount,
        buyingDate: buyingDate || new Date().toISOString().split("T")[0],
        status: "pending",
      };

      await axiosPublic.post("/api/v1/offers", offerData);
      toast.success("Offer submitted! Awaiting agent review.", { id: toastId });
      router.push("/dashboard/property-bought");
    } catch (err: any) {
      toast.error(err.message || "Failed to submit offer", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12 animate-pulse space-y-4">
        <div className="h-8 bg-base-200 rounded w-1/3" />
        <div className="h-64 bg-base-200 rounded-3xl" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="font-bold">Item not found</p>
        <button
          onClick={() => router.push("/dashboard/wishlist")}
          className="text-xs text-[#38B6FF] underline"
        >
          Back to Wishlist
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-base-content/60 hover:text-base-content"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-base-content">Submit Purchase Offer</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Propose your valuation directly to the listing agent for consideration
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 sm:p-8 rounded-3xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm space-y-5"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-content/70">Property Title</label>
          <input
            type="text"
            readOnly
            value={item.propertyTitle}
            className="w-full px-4 py-2.5 rounded-xl bg-base-300/60 border border-base-content/10 text-sm font-semibold text-base-content cursor-not-allowed"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-content/70">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              readOnly
              value={item.propertyLocation}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-300/60 border border-base-content/10 text-sm text-base-content cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">Agent Name</label>
            <input
              type="text"
              readOnly
              value={item.agentName}
              className="w-full px-4 py-2.5 rounded-xl bg-base-300/60 border border-base-content/10 text-sm text-base-content cursor-not-allowed"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">Price Guidance</label>
            <input
              type="text"
              readOnly
              value={item.priceRange}
              className="w-full px-4 py-2.5 rounded-xl bg-base-300/60 border border-base-content/10 text-sm font-bold text-emerald-600 dark:text-emerald-400 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Offer Input */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-bold text-base-content">
            Your Proposed Offer Amount ($USD) *
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#38B6FF]" />
            <input
              type="number"
              required
              min={item.minPrice || 1000}
              max={item.maxPrice || 10000000}
              value={offeredAmount}
              onChange={(e) => setOfferedAmount(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={`Enter amount between ${item.minPrice} and ${item.maxPrice}`}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-sm font-bold text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-content/70">Preferred Closing Date</label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="date"
              value={buyingDate}
              onChange={(e) => setBuyingDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/10 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition active:scale-95 flex items-center justify-center gap-2 mt-4"
        >
          <Send className="w-4 h-4" />
          {submitting ? "Submitting..." : "Send Offer to Agent"}
        </button>
      </form>
    </div>
  );
}
