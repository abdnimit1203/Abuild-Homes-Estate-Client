"use client";

/**
 * ReviewIntake — deep module for the Review section on a Property detail page.
 *
 * Interface (small):
 *   <ReviewIntake propertyId={id} property={property} user={user} />
 *
 * Implementation (large, hidden):
 *   - Fetch reviews for the property
 *   - normaliseReview() adapter: resolves the aliased username/userPhoto fields once
 *   - Review list rendering with formatted dates
 *   - Review submission form with star rating, validation, and optimistic toast
 *   - Login redirect when unauthenticated
 *
 * Candidates addressed:
 *   - Candidate 2: extracted from the god page
 *   - Candidate 4: normaliseReview adapter from shared lib
 */

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { ShieldCheck, Star, Mail, Calendar, Send } from "lucide-react";
import toast from "react-hot-toast";
import { Property, Review } from "@/types";
import { User as FirebaseUser } from "firebase/auth";
import { normaliseReview } from "@/lib/normaliseReview";

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------
interface ReviewIntakeProps {
  propertyId: string;
  property: Property | undefined;
  user: FirebaseUser | null;
}

export default function ReviewIntake({ propertyId, property, user }: ReviewIntakeProps) {
  const router = useRouter();
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);

  const { data: rawReviews = [], refetch } = useQuery<Review[]>({
    queryKey: ["property-reviews", propertyId],
    enabled: Boolean(propertyId),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/reviews?id=${propertyId}`);
      return res.data || [];
    },
  });

  // Apply normaliseReview adapter once — callers use displayName / displayPhoto
  const reviews = rawReviews.map(normaliseReview);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review");
      router.push("/login");
      return;
    }
    if (!reviewText.trim()) {
      toast.error("Review text cannot be empty");
      return;
    }

    setSubmittingReview(true);
    try {
      await axiosPublic.post("/api/v1/reviews", {
        propertyID: propertyId,
        propertyTitle: property?.propertyTitle || "Property",
        agentName: property?.agentName || "Agent",
        agentEmail: property?.agentEmail || "",
        userEmail: user.email,
        reviewDescription: reviewText.trim(),
        rating: reviewRating,
        reviewTime: Date.now(),
      });
      toast.success("Review submitted successfully!");
      setReviewText("");
      refetch();
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <h2 className="sm:text-2xl font-black text-base-content flex items-center gap-2 text-lg">
            Property Reviews &amp; Ratings
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/30">
              {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-base-content/60">
            Verified testimonials and experiences shared by buyers and residents
          </p>
        </div>
      </div>

      {/* Submit form — appears above the review list */}
      <form
        onSubmit={handleSubmit}
        className="p-5 sm:p-7 rounded-2xl border border-[#38B6FF]/30 bg-gradient-to-b from-[#38B6FF]/5 via-base-100 to-base-100 dark:from-[#38B6FF]/10 dark:via-neutral-900/90 dark:to-neutral-900/90 shadow-lg space-y-5 max-w-3xl"
      >
        <div className="flex items-center justify-between pb-3 border-b border-base-content/10">
          <h3 className="text-sm sm:text-base font-extrabold text-[#38B6FF] uppercase tracking-wider flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            Write a Review
          </h3>
          {user && (
            <div className="flex items-center gap-2 text-xs text-base-content/70">
              <img
                src={user.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                alt={user.displayName || "You"}
                className="w-5 h-5 rounded-full object-cover border border-[#38B6FF]/40"
              />
              <span className="font-semibold">{user.displayName || "You"}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-base-content/80">Your Rating:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setReviewRating(star)}
                className="p-1 text-amber-400 hover:scale-125 transition-transform focus:outline-none cursor-pointer"
                title={`${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= reviewRating
                      ? "fill-amber-400 text-amber-400"
                      : "text-base-content/20 hover:text-amber-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            ({reviewRating} of 5 Stars)
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-base-content/80">
            Your Feedback &amp; Experience
          </label>
          <textarea
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience about this property, location quality, neighborhood, or pricing..."
            className="w-full p-3.5 rounded-xl bg-base-200/80 dark:bg-base-200/50 border border-base-content/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content placeholder:text-base-content/40 transition"
          />
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={submittingReview}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md shadow-[#38B6FF]/25 hover:shadow-lg transition inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            {submittingReview ? "Submitting Review..." : "Publish Review"}
          </button>
        </div>
      </form>

      {/* Review list */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {reviews.map((r, i) => (
            <div
              key={r._id || i}
              className="rounded-2xl border border-base-content/10 bg-base-100 dark:bg-base-200/50 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 space-y-3.5"
            >
              {/* User header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-base-content/15 bg-base-300 shadow-sm flex-shrink-0">
                    <img
                      src={r.displayPhoto}
                      alt={r.displayName}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://i.ibb.co/5x6DN2n/blank-dp.png";
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-0.5 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-base-content truncate">
                        {r.displayName}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        Verified Resident
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-base-content/60">
                      {r.userEmail && (
                        <span className="flex items-center gap-1 truncate">
                          <Mail className="w-3 h-3 text-base-content/40 flex-shrink-0" />
                          <span className="truncate">{r.userEmail}</span>
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-base-content/40">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        {r.formattedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Star rating badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/15 border border-amber-400/30 self-start sm:self-center">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-3.5 h-3.5 ${
                          starIdx < (r.rating || 5)
                            ? "fill-amber-400 text-amber-400"
                            : "text-base-content/20"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-amber-700 dark:text-amber-400 ml-0.5">
                    {(r.rating || 5).toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Review body */}
              <div className="pt-2">
                <p className="text-sm sm:text-base text-base-content/85 leading-relaxed font-normal p-3.5 sm:p-4 rounded-xl bg-base-200/60 dark:bg-base-300/40 border border-base-content/5 italic">
                  &ldquo;{r.reviewDescription}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 rounded-2xl border border-dashed border-base-content/20 bg-base-200/30 p-6 space-y-2">
          <p className="text-sm font-bold text-base-content">
            No reviews submitted yet for this estate.
          </p>
          <p className="text-xs text-base-content/60">
            Be the first verified buyer or visitor to share your review!
          </p>
        </div>
      )}
    </div>
  );
}
