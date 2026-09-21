import React from "react";
import Banner from "@/components/home/Banner";
import AvailableCountries from "@/components/home/AvailableCountries";
import PopularProperties from "@/components/home/PopularProperties";
import MarqueeSection from "@/components/home/MarqueeSection";
import OurFeatures from "@/components/home/OurFeatures";
import ReviewsSection from "@/components/home/ReviewsSection";
import Rental from "@/components/home/Rental";
import ContactUs from "@/components/home/ContactUs";

export default function HomePage() {
  return (
    <div className="space-y-10 sm:space-y-16">
      <Banner />
      <AvailableCountries />
      <PopularProperties />
      <MarqueeSection />
      <OurFeatures />
      <ReviewsSection />
      <Rental />
      <ContactUs />
    </div>
  );
}
