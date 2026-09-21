"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { ArrowLeft, Save, MapPin, DollarSign, Globe, Compass, Home } from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import ImageUpload from "@/components/common/ImageUpload";

export default function UpdatePropertyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  // Granular location address fields
  const [houseNumber, setHouseNumber] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  const [division, setDivision] = useState("");
  const [country, setCountry] = useState("");
  const [continent, setContinent] = useState("");
  const [legacyLocation, setLegacyLocation] = useState("");

  const [imageURL, setImageURL] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [saving, setSaving] = useState(false);

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ["property-to-edit", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/properties/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (property) {
      setTitle(property.propertyTitle || "");
      setHouseNumber(property.houseNumber || "");
      setRoadNumber(property.roadNumber || "");
      setDivision(property.division || "");
      setCountry(property.country || "");
      setContinent(property.continent || "");
      setLegacyLocation(property.propertyLocation || "");

      setImageURL(property.propertyImage || "");
      setMinPrice(property.minPrice || "");
      setMaxPrice(property.maxPrice || "");
    }
  }, [property]);

  // Live assembled address for preview and backward compatibility
  const assembledAddress = useMemo(() => {
    const parts = [
      houseNumber.trim() ? `House ${houseNumber.trim()}` : "",
      roadNumber.trim() ? `Road ${roadNumber.trim()}` : "",
      division.trim(),
      country.trim(),
      continent.trim(),
    ].filter(Boolean);

    if (parts.length > 0) return parts.join(", ");
    return legacyLocation;
  }, [houseNumber, roadNumber, division, country, continent, legacyLocation]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a property title");
      return;
    }

    if (!assembledAddress) {
      toast.error("Please provide at least one location address detail");
      return;
    }

    if (!minPrice || !maxPrice) {
      toast.error("Please specify both minimum and maximum price boundaries");
      return;
    }

    if (Number(minPrice) > Number(maxPrice)) {
      toast.error("Minimum price cannot exceed maximum price");
      return;
    }

    if (!imageURL) {
      toast.error("Please upload an image or provide an image URL");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("Updating property listing...");

    try {
      const updateData = {
        propertyTitle: title.trim(),
        propertyLocation: assembledAddress,
        houseNumber: houseNumber.trim(),
        roadNumber: roadNumber.trim(),
        division: division.trim(),
        country: country.trim(),
        continent: continent.trim(),
        propertyImage: imageURL,
        minPrice: Number(minPrice),
        maxPrice: Number(maxPrice),
        priceRange: `$${Number(minPrice).toLocaleString()} - $${Number(maxPrice).toLocaleString()}`,
        agentName: property?.agentName,
      };

      await axiosPublic.patch(`/api/v1/properties/${id}`, updateData);
      toast.success("Listing updated successfully!", { id: toastId });
      router.push("/dashboard/added-properties");
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Failed to update property", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto py-12 animate-pulse space-y-4">
        <div className="h-8 bg-base-200 rounded w-1/3" />
        <div className="h-72 bg-base-200 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-base-content/60 hover:text-base-content"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-base-content">Edit Property Listing</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Modify listing title, granular location, price boundaries, or imagery
        </p>
      </div>

      <form
        onSubmit={handleUpdate}
        className="p-6 sm:p-8 rounded-3xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm space-y-6"
      >
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-base-content/70">Property Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
          />
        </div>

        {/* Granular Location Section */}
        <div className="space-y-3 pt-2 border-t border-base-content/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-base-content/80 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#38B6FF]" /> Granular Location Address *
            </label>
            <span className="text-[11px] text-base-content/50">Auto-merges into unified address</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-base-content/60">House / Building No.</label>
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40" />
                <input
                  type="text"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  placeholder="e.g. 24B, Suite 401"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-base-content/60">Road / Street Name</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40" />
                <input
                  type="text"
                  value={roadNumber}
                  onChange={(e) => setRoadNumber(e.target.value)}
                  placeholder="e.g. Road 11, Banani"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-base-content/60">Division / State / Province</label>
              <input
                type="text"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                placeholder="e.g. Dhaka, California"
                className="w-full px-3 py-2 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-base-content/60">Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40" />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Bangladesh, United States"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
                />
              </div>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[11px] font-semibold text-base-content/60">Continent</label>
              <div className="relative">
                <Compass className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-base-content/40" />
                <input
                  type="text"
                  value={continent}
                  onChange={(e) => setContinent(e.target.value)}
                  placeholder="e.g. Asia, North America, Europe"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
                />
              </div>
            </div>
          </div>

          {/* Live Assembled Preview */}
          {assembledAddress ? (
            <div className="p-3 rounded-xl bg-[#38B6FF]/10 border border-[#38B6FF]/20 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#38B6FF] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-semibold text-[#38B6FF] uppercase tracking-wider">
                  Assembled Address Preview:
                </p>
                <p className="text-xs text-base-content font-medium mt-0.5">{assembledAddress}</p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Pricing Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-base-content/10">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">Minimum Price ($USD) *</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#38B6FF]" />
              <input
                type="number"
                required
                min={1}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">Maximum Price ($USD) *</label>
            <div className="relative">
              <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#38B6FF]" />
              <input
                type="number"
                required
                min={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
              />
            </div>
          </div>
        </div>

        {/* Image Upload Component */}
        <div className="pt-2 border-t border-base-content/10">
          <ImageUpload
            value={imageURL}
            onChange={setImageURL}
            label="Property Image *"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving Changes..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
