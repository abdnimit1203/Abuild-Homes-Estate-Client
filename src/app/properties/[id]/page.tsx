"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  MapPin,
  DollarSign,
  Heart,
  ShieldCheck,
  Star,
  User,
  Send,
  BedDouble,
  Car,
  Maximize2,
  ChevronRight,
  Mail,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import { Property, Review } from "@/types";

export default function PropertyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [wishlisting, setWishlisting] = useState(false);

  // Fetch Property Details
  const { data: property, isLoading: propertyLoading } = useQuery<Property>({
    queryKey: ["property-detail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/properties/${id}`);
      return res.data;
    },
  });

  // Fetch Property Reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery<Review[]>({
    queryKey: ["property-reviews", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/reviews?id=${id}`);
      return res.data || [];
    },
  });

  // Handle Add to Wishlist
  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      router.push("/login");
      return;
    }
    if (!property) return;

    setWishlisting(true);
    try {
      const wishlistItem = {
        // Only store email as user reference — name resolved live on read
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
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    } finally {
      setWishlisting(false);
    }
  };

  // Handle Submit Review
  const handleSubmitReview = async (e: React.FormEvent) => {
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
      const newReview = {
        propertyID: id,
        propertyTitle: property?.propertyTitle || "Property",
        agentName: property?.agentName || "Agent",
        agentEmail: property?.agentEmail || "",
        // Only store the email — name and photo are resolved live from users collection on read
        userEmail: user.email,
        reviewDescription: reviewText.trim(),
        rating: reviewRating,
        reviewTime: Date.now(),
      };

      await axiosPublic.post("/api/v1/reviews", newReview);
      toast.success("Review submitted successfully!");
      setReviewText("");
      refetchReviews();
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (propertyLoading) {
    return (
      <div className="max-w-5xl mx-auto py-12 space-y-8 animate-pulse">
        <div className="h-96 bg-base-200 rounded-3xl" />
        <div className="h-8 bg-base-200 rounded-lg w-2/3" />
        <div className="h-4 bg-base-200 rounded-lg w-1/3" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <Link href="/properties" className="text-[#38B6FF] underline mt-4 inline-block">
          Return to All Properties
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-base-content/60">
        <Link href="/" className="hover:text-[#38B6FF]">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/properties" className="hover:text-[#38B6FF]">
          All Properties
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-base-content truncate max-w-xs">{property.propertyTitle}</span>
      </div>

      {/* Main Property Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image & Specs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden shadow-xl bg-base-300">
            <Image
              src={property.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
              alt={property.propertyTitle}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="w-4 h-4" />
                {property.status}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              {property.propertyTitle}
            </h1>
            <p className="text-sm sm:text-base text-base-content/70 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#38B6FF] flex-shrink-0" />
              {property.propertyLocation}
            </p>
          </div>

          {/* Quick Property Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10">
            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-[#38B6FF]/15 text-[#38B6FF] flex-shrink-0">
                <BedDouble className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Bedrooms</p>
                <p className="text-sm font-bold text-base-content truncate">3-4 Rooms</p>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-500 flex-shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Parking</p>
                <p className="text-sm font-bold text-base-content truncate">Dedicated</p>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0 p-2.5 sm:p-0 rounded-xl bg-base-100/60 dark:bg-base-100/30 sm:bg-transparent dark:sm:bg-transparent">
              <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-500 flex-shrink-0">
                <Maximize2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-base-content/60">Total Area</p>
                <p className="text-sm font-bold text-base-content truncate">2,400 sqft</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-base-content">About This Estate</h3>
            <p className="text-sm text-base-content/75 leading-relaxed">
              Experience the pinnacle of sophisticated living. This verified architectural
              masterpiece features bespoke finishes, sunlit open-concept living spaces, panoramic
              views, and seamless access to central transportation, shopping, and international schools.
            </p>
          </div>
        </div>

        {/* Right: Booking / Action Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-base-200/60 dark:bg-base-200/90 border border-base-content/10 shadow-xl space-y-6 sticky top-28">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-base-content/60">
                Price Guidance
              </span>
              <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center">
                <DollarSign className="w-6 h-6 text-[#38B6FF]" />
                {property.priceRange}
              </p>
            </div>

            {/* Agent Profile Card */}
            <div className="p-4 rounded-2xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/10 flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-base-300 flex-shrink-0">
                <Image
                  src={property.agentImage || "https://i.ibb.co/3CM7zGR/agent-dp.jpg"}
                  alt={property.agentName || "Agent"}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-base-content/60">Listing Agent</p>
                <p className="text-sm font-bold text-base-content truncate">
                  {property.agentName || "Agent"}
                </p>
                <p className="text-xs text-[#38B6FF] truncate">{property.agentEmail}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleAddToWishlist}
                disabled={wishlisting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                {wishlisting ? "Adding..." : "Add To Wishlist"}
              </button>

              <p className="text-xs text-center text-base-content/50 leading-relaxed">
                Add to your wishlist to submit a direct purchase offer or negotiate price in your
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Reviews Section */}
      <div className="pt-10 border-t border-base-content/10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-base-content flex items-center gap-2">
              Property Reviews & Ratings
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 border border-amber-400/40">
                {reviews.length} {reviews.length === 1 ? "Review" : "Reviews"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-base-content/60">
              Verified testimonials and experiences shared by buyers and residents
            </p>
          </div>
        </div>

        {/* Existing Reviews List (One by one, vertically stacked with prominent yellow borders) */}
        {reviews.length > 0 ? (
          <div className="flex flex-col gap-5 w-full">
            {reviews.map((r, i) => {
              const userName =
                r.username ||
                r.userName ||
                (r.userEmail ? r.userEmail.split("@")[0] : "Verified Resident");
              const userPhoto =
                r.userPhoto ||
                r.userImage ||
                "https://i.ibb.co/5x6DN2n/blank-dp.png";
              const formattedDate = r.reviewTime
                ? new Date(
                    typeof r.reviewTime === "number" || !isNaN(Number(r.reviewTime))
                      ? Number(r.reviewTime)
                      : r.reviewTime
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Verified Review";

              return (
                <div
                  key={r._id || i}
                  className="rounded-3xl border-2 border-amber-400 dark:border-amber-400/90 bg-base-100 dark:bg-neutral-900/90 p-5 sm:p-7 shadow-md hover:shadow-lg transition-all duration-200 space-y-4"
                >
                  {/* Primary User Header (User Focus) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* User Profile Info */}
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Prominent User Avatar */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-400 ring-4 ring-amber-400/25 bg-base-300 shadow-md flex-shrink-0">
                        <img
                          src={userPhoto}
                          alt={userName}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://i.ibb.co/5x6DN2n/blank-dp.png";
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Name, Email, & Verification Badge */}
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-base-content tracking-tight truncate">
                            {userName}
                          </h3>
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-400/15 text-amber-700 dark:text-amber-400 border border-amber-400/30 uppercase tracking-wider">
                            <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                            Verified Resident
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-base-content/70">
                          {r.userEmail && (
                            <span className="flex items-center gap-1 font-medium truncate">
                              <Mail className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                              <span className="truncate">{r.userEmail}</span>
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-base-content/50">
                            <Calendar className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Star Rating Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 self-start sm:self-center">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className={`w-4 h-4 ${
                              starIdx < (r.rating || 5)
                                ? "fill-amber-400 text-amber-400"
                                : "text-base-content/20"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-black text-amber-700 dark:text-amber-400 ml-1">
                        {(r.rating || 5).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  {/* Review Description Box */}
                  <div className="pt-3 border-t border-amber-400/20">
                    <p className="text-sm sm:text-base text-base-content/90 leading-relaxed font-medium bg-amber-400/5 dark:bg-amber-400/5 p-4 rounded-2xl border border-amber-400/15 italic">
                      &ldquo;{r.reviewDescription}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 rounded-3xl border-2 border-dashed border-amber-400/40 bg-amber-400/5 p-6 space-y-2">
            <p className="text-sm font-bold text-base-content">
              No reviews submitted yet for this estate.
            </p>
            <p className="text-xs text-base-content/60">
              Be the first verified buyer or visitor to share your review!
            </p>
          </div>
        )}

        {/* Add Review Form */}
        <form
          onSubmit={handleSubmitReview}
          className="p-6 sm:p-7 rounded-3xl border-2 border-amber-400/80 bg-base-100 dark:bg-neutral-900/90 shadow-lg space-y-5 max-w-3xl"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-base-content uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              Write a Review
            </h3>
            {user && (
              <div className="flex items-center gap-2 text-xs text-base-content/70">
                <img
                  src={user.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                  alt={user.displayName || "You"}
                  className="w-5 h-5 rounded-full object-cover border border-amber-400"
                />
                <span className="font-semibold">{user.displayName || "You"}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-base-content/80">Select Rating:</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setReviewRating(star)}
                  className="p-1 text-amber-400 hover:scale-110 transition focus:outline-none"
                  title={`${star} star${star > 1 ? "s" : ""}`}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= reviewRating
                        ? "fill-amber-400 text-amber-400"
                        : "text-base-content/20"
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
              Your Feedback & Experience
            </label>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience about this property, location quality, neighborhood, or pricing..."
              className="w-full p-3.5 rounded-2xl bg-base-200 border border-base-content/15 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-base-content placeholder:text-base-content/40 transition"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={submittingReview}
              className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-500 text-neutral-900 shadow-md shadow-amber-400/25 hover:shadow-lg hover:shadow-amber-400/35 transition inline-flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {submittingReview ? "Submitting Review..." : "Publish Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
