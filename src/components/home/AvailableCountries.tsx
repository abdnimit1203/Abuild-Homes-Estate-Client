"use client";

import React from "react";
import Image from "next/image";
import HeaderText from "../common/HeaderText";

const countries = [
  { name: "Bangladesh", image: "/assets/home/bangladesh.jpg", color: "from-emerald-500/80 to-emerald-700/80" },
  { name: "Paris, France", image: "/assets/home/paris.jpg", color: "from-sky-500/80 to-blue-700/80" },
  { name: "London, UK", image: "/assets/home/london.jpg", color: "from-rose-500/80 to-red-700/80" },
  { name: "USA", image: "/assets/home/america.jpg", color: "from-indigo-500/80 to-indigo-700/80" },
  { name: "Spain", image: "/assets/home/spain.jpg", color: "from-amber-500/80 to-orange-700/80" },
];

export default function AvailableCountries() {
  return (
    <section className="py-12">
      <HeaderText
        headerText="We are Available in Many"
        headerText2="Well-Known Countries"
        headerText3="Explore verified properties across the globe with our expanding international presence"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-4">
        {countries.map((item, idx) => (
          <div
            key={idx}
            className="group relative h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-base-content/10 transition-all duration-300 hover:-translate-y-1.5"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              unoptimized
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 group-hover:opacity-75 transition-opacity`} />
            <div className="absolute inset-0 flex items-end p-4 z-10">
              <p className="text-white font-bold text-base sm:text-lg tracking-wide drop-shadow-md">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
