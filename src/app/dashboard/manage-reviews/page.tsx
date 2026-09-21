"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { Star, Trash2, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import { Review } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function ManageReviewsPage() {
  const { data: reviews = [], isLoading, refetch } = useQuery<Review[]>({
    queryKey: ["admin-all-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/reviews");
      return res.data || [];
    },
  });

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const isConfirmed = await confirmDelete({
      title: "Remove Customer Review?",
      text: "Are you sure you want to permanently delete this customer review from the site?",
      confirmButtonText: "Yes, delete review",
    });
    if (!isConfirmed) return;

    try {
      await axiosPublic.delete(`/api/v1/reviews/${id}`);
      toast.success("Review deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-base-content">Manage All Reviews</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Moderate community feedback, remove inappropriate content, and maintain quality
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div
              key={r._id}
              className="p-5 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-base-300 flex-shrink-0 mt-0.5">
                  <Image
                    src={r.userImage || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                    alt={r.userName || "User"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-base-content truncate">{r.userName}</p>
                    <span className="text-xs text-base-content/50">({r.userEmail})</span>
                  </div>
                  <p className="text-xs font-semibold text-[#38B6FF]">
                    Property: {r.propertyTitle}
                  </p>
                  <p className="text-xs text-base-content/80 leading-relaxed italic">
                    &ldquo;{r.reviewDescription}&rdquo;
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < (r.rating || 5) ? "fill-amber-400 text-amber-400" : "text-base-content/20"
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 transition"
                  title="Delete Review"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <MessageSquare className="w-12 h-12 text-base-content/20 mx-auto" />
          <p className="text-lg font-bold text-base-content">No reviews found in the system</p>
        </div>
      )}
    </div>
  );
}
