"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic, axiosSecure } from "@/lib/api";
import { Star, Trash2, MessageSquare, Search, Filter, X, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Review } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function ManageReviewsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [ratingFilter, setRatingFilter] = React.useState<string>("all");

  const { data: reviews = [], isLoading, refetch } = useQuery<Review[]>({
    queryKey: ["admin-all-reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/reviews");
      return res.data || [];
    },
  });

  const filteredReviews = React.useMemo(() => {
    return reviews.filter((r) => {
      const matchesRating = ratingFilter === "all" || String(r.rating || 5) === ratingFilter;
      const query = searchQuery.trim().toLowerCase();
      const userName = (r.username || r.userName || "").toLowerCase();
      const userEmail = (r.userEmail || "").toLowerCase();
      const propertyTitle = (r.propertyTitle || "").toLowerCase();
      const desc = (r.reviewDescription || "").toLowerCase();
      const matchesSearch =
        !query ||
        userName.includes(query) ||
        userEmail.includes(query) ||
        propertyTitle.includes(query) ||
        desc.includes(query);
      return matchesRating && matchesSearch;
    });
  }, [reviews, ratingFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || ratingFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setRatingFilter("all");
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const isConfirmed = await confirmDelete({
      title: "Remove Customer Review?",
      text: "Are you sure you want to permanently delete this customer review from the site?",
      confirmButtonText: "Yes, delete review",
    });
    if (!isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/v1/reviews/${id}`);
      toast.success("Review deleted successfully");
      refetch();
    } catch (err) {
      toast.error("Failed to delete review");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Manage All Reviews</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Moderate community feedback, remove inappropriate content, and maintain quality
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total Reviews: <strong className="text-[#38B6FF]">{reviews.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-base-100 dark:bg-base-200/50 border border-base-content/15 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by reviewer name, email, property, or content..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs sm:text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Rating Dropdown Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#38B6FF]" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="w-full sm:w-auto pl-8 pr-8 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs font-bold text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] cursor-pointer appearance-none"
              >
                <option value="all">All Ratings ({reviews.length})</option>
                <option value="5">5 Stars ({reviews.filter((r) => (r.rating || 5) === 5).length})</option>
                <option value="4">4 Stars ({reviews.filter((r) => r.rating === 4).length})</option>
                <option value="3">3 Stars ({reviews.filter((r) => r.rating === 3).length})</option>
                <option value="2">2 Stars ({reviews.filter((r) => r.rating === 2).length})</option>
                <option value="1">1 Star ({reviews.filter((r) => r.rating === 1).length})</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
                title="Clear all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs text-base-content/60 pt-1 border-t border-base-content/10">
          <span>
            Showing <strong className="text-base-content">{filteredReviews.length}</strong> of {reviews.length} reviews
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-[#38B6FF] font-semibold">Filters active</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-28 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((r) => (
            <div
              key={r._id}
              className="p-5 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-base-300 flex-shrink-0 mt-0.5 border border-amber-400">
                  <img
                    src={r.userPhoto || r.userImage || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                    alt={r.username || r.userName || "User"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://i.ibb.co/5x6DN2n/blank-dp.png";
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-base-content truncate">
                      {r.username || r.userName || (r.userEmail ? r.userEmail.split("@")[0] : "User")}
                    </p>
                    <span className="text-xs text-base-content/50 truncate">({r.userEmail})</span>
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
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching reviews found" : "No reviews found in the system"}
            </p>
            <p className="text-xs text-base-content/60 mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "No reviews match your search query or rating filter. Try clearing your filters."
                : "Customer reviews for properties will appear here for administrative moderation."}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-[#38B6FF] hover:bg-[#2fa3e6] text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
