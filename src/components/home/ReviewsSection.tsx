"use client";

import React, { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import HeaderText from "../common/HeaderText";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { Review } from "@/types";
import { normaliseReview } from "@/lib/normaliseReview";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperCore } from "swiper";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ReviewsSection() {
  const swiperRef = useRef<SwiperCore | null>(null);

  const { data: rawReviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get("/api/v1/reviews");
        return res.data || [];
      } catch (err) {
        console.error("Error fetching reviews:", err);
        return [];
      }
    },
  });

  // Apply the shared normaliseReview adapter once — no inline fallback chains below
  const reviews = rawReviews.map(normaliseReview);

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="text-center mb-10">
        <HeaderText
          headerText="What Our Clients"
          headerText2="Say About Us"
          headerText3="Dont just take our word for it... Check the latest real reviews from verified homeowners and buyers"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="p-8 rounded-3xl bg-gradient-to-br from-orange-400/30 to-amber-300/30 border border-orange-300/20 animate-pulse min-h-[360px] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-full bg-orange-300/40" />
                <div className="h-4 w-32 bg-orange-300/40 rounded" />
                <div className="h-16 bg-orange-300/30 rounded-xl" />
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-orange-200/20">
                <div className="w-12 h-12 rounded-full bg-orange-300/50" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-24 bg-orange-300/40 rounded" />
                  <div className="h-3 w-32 bg-orange-300/30 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : reviews.length > 0 ? (
        <div className="relative group">
          {/* Custom Navigation Controls */}
          <div className="flex justify-end items-center gap-2 mb-4 px-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="reviews-prev-btn p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white transition-all duration-200 border border-orange-500/20 shadow-sm cursor-pointer active:scale-95"
              aria-label="Previous review slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="reviews-next-btn p-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white transition-all duration-200 border border-orange-500/20 shadow-sm cursor-pointer active:scale-95"
              aria-label="Next review slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Swiper Slider with 3 slides per view on desktop */}
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={reviews.length > 3}
            className="reviews-swiper w-full !pb-14"
          >
            {reviews.map((review, idx) => {
              return (
                <SwiperSlide key={review._id || idx} className="h-auto">
                  {/* Clean Modern Review Card */}
                  <div className="h-full flex flex-col justify-between text-left p-5 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-orange-500/40 dark:border-slate-700 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group/card">
                    <div className="space-y-3">
                      {/* Top Bar: Quote Icon & 5 Golden Stars */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-orange-400 text-orange-400"
                            />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-slate-200 dark:text-slate-700 rotate-180" />
                      </div>

                      {/* Review Body Text */}
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic line-clamp-4">
                        &ldquo;{review.reviewDescription}&rdquo;
                      </p>
                    </div>

                    {/* Bottom Area: Buyer Profile & Property Pill */}
                    <div className="pt-4 mt-4 space-y-3 border-t border-slate-100 dark:border-slate-700">
                      {/* Buyer Picture & Buyer Name */}
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-sm flex-shrink-0">
                          <img
                            src={review.displayPhoto}
                            alt={review.displayName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://i.ibb.co/5x6DN2n/blank-dp.png";
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
                            {review.displayName}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span>Verified Client</span>
                          </div>
                        </div>
                      </div>

                      {/* Property Title Tag */}
                      {review.propertyTitle && (
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-600/50">
                          <BsFillBuildingsFill className="text-orange-500 text-xs flex-shrink-0" />
                          <span className="truncate">
                            Property: {review.propertyTitle}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="text-center py-12 bg-base-200/40 rounded-3xl border border-base-content/10">
          <p className="text-base text-base-content/70">No reviews published yet.</p>
        </div>
      )}
    </section>
  );
}
