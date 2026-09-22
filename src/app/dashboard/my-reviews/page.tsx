"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { Star, Trash2, Quote, MessageSquare, Search, Filter, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Review } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function MyReviewsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [ratingFilter, setRatingFilter] = React.useState("all");

  const { data: reviews = [], isLoading, refetch } = useQuery<Review[]>({
    queryKey: ["user-my-reviews", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/reviews?email=${user?.email}`);
      return res.data || [];
    },
  });

  const filteredReviews = React.useMemo(() => {
    return reviews.filter((r) => {
      const titleMatch = (r.propertyTitle || "").toLowerCase().includes(searchTerm.toLowerCase());
      const agentMatch = (r.agentName || "").toLowerCase().includes(searchTerm.toLowerCase());
      const textMatch = (r.reviewDescription || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSearch = titleMatch || agentMatch || textMatch;

      const matchesRating =
        ratingFilter === "all" ? true : (r.rating || 5).toString() === ratingFilter;

      return matchesSearch && matchesRating;
    });
  }, [reviews, searchTerm, ratingFilter]);

  const hasActiveFilters = searchTerm !== "" || ratingFilter !== "all";
  const resetFilters = () => {
    setSearchTerm("");
    setRatingFilter("all");
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    const isConfirmed = await confirmDelete({
      title: "Delete Review?",
      text: "Are you sure you want to permanently remove this review? This action cannot be undone.",
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
        <h1 className="text-2xl font-extrabold text-base-content">My Property Reviews</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Manage all the ratings and feedback you have submitted across properties
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-base-200/40 p-3.5 sm:p-4 rounded-2xl border border-base-content/10">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40" />
          <input
            type="text"
            placeholder="Search by property, agent, or review text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-base-100 border border-base-content/10 focus:outline-none focus:border-[#38B6FF] text-base-content placeholder:text-base-content/40 transition"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-base-100 px-3 py-2 rounded-xl border border-base-content/10 text-xs text-base-content/80">
            <Filter className="w-3.5 h-3.5 text-base-content/50" />
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-transparent border-none text-xs font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
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
          Showing <strong className="text-base-content">{filteredReviews.length}</strong> of{" "}
          <strong className="text-base-content">{reviews.length}</strong> reviews
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredReviews.length > 0 ? (
        <div className="space-y-4">
          {filteredReviews.map((r) => (
            <div
              key={r._id}
              className="p-5 sm:p-6 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-base text-base-content">{r.propertyTitle}</h3>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < (r.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "text-base-content/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-base-content/80 leading-relaxed italic">
                  &ldquo;{r.reviewDescription}&rdquo;
                </p>

                <p className="text-[11px] text-base-content/50">Agent: {r.agentName}</p>
              </div>

              <button
                onClick={() => handleDelete(r._id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <MessageSquare className="w-12 h-12 text-base-content/20 mx-auto" />
          <p className="text-lg font-bold text-base-content">
            {hasActiveFilters ? "No reviews match your filters" : "No reviews submitted yet"}
          </p>
          <p className="text-xs text-base-content/60">
            {hasActiveFilters ? (
              <button
                onClick={resetFilters}
                className="text-[#38B6FF] hover:underline font-semibold"
              >
                Clear all filters to see all reviews
              </button>
            ) : (
              "Visit any property details page to share your experience with the community."
            )}
          </p>
        </div>
      )}
    </div>
  );
}
