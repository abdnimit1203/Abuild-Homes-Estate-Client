"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic, axiosSecure } from "@/lib/api";
import { MapPin, DollarSign, Edit, Trash2, Building, Clock, CheckCircle2, XCircle, Search, Filter, X, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function AddedPropertiesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const { data, isLoading, refetch } = useQuery<{ propertiesData: Property[]; countData: number }>({
    queryKey: ["agent-added-properties", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/v1/properties?email=${user?.email}`);
      return res.data;
    },
  });

  const properties = data?.propertiesData || [];

  const filteredProperties = React.useMemo(() => {
    return properties.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.propertyTitle?.toLowerCase().includes(query) ||
        p.propertyLocation?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [properties, statusFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleDelete = async (id: string, title: string) => {
    const isConfirmed = await confirmDelete({
      title: "Delete Property Listing?",
      text: `Are you sure you want to permanently delete "${title}"? This cannot be reverted.`,
      confirmButtonText: "Yes, delete it!",
    });
    if (!isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/v1/properties/${id}`);
      toast.success(`Deleted listing "${title}"`);
      refetch();
    } catch (err) {
      toast.error("Failed to delete property listing");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">My Added Properties</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Manage your listings, review admin verification status, and update details
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total: <span className="font-extrabold text-[#38B6FF]">{properties.length}</span>
          </span>
          <Link
            href="/dashboard/add-property"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-sm transition inline-flex items-center gap-1.5"
          >
            Add New Listing
          </Link>
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
              placeholder="Search by title or location..."
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

          {/* Status Dropdown Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#38B6FF]" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full sm:w-auto pl-8 pr-8 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs font-bold text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] cursor-pointer appearance-none"
              >
                <option value="all">All Statuses ({properties.length})</option>
                <option value="verified">Verified ({properties.filter((p) => p.status === "verified").length})</option>
                <option value="pending">Pending ({properties.filter((p) => p.status === "pending").length})</option>
                <option value="rejected">Rejected ({properties.filter((p) => p.status === "rejected").length})</option>
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
            Showing <strong className="text-base-content">{filteredProperties.length}</strong> of {properties.length} listings
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-[#38B6FF] font-semibold">Filters active</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-40 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="space-y-4">
          {filteredProperties.map((p) => (
            <div
              key={p._id}
              className="p-5 sm:p-6 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-base-300 flex-shrink-0">
                  <Image
                    src={p.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
                    alt={p.propertyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-base-content">{p.propertyTitle}</h3>
                  <p className="text-xs text-base-content/70 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#38B6FF]" />
                    {p.propertyLocation}
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    {p.priceRange}
                  </p>
                </div>
              </div>

              {/* Status and Controls */}
              <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
                <div>
                  {p.status === "verified" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  )}
                  {p.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" /> Pending Verification
                    </span>
                  )}
                  {p.status === "rejected" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}
                  {p.status === "fraud" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950/20 text-rose-500 border border-rose-800/30">
                      Fraud Restricted
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/update-property/${p._id}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-base-100 dark:bg-base-200 border border-base-content/15 hover:border-[#38B6FF] text-base-content transition"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#38B6FF]" /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id, p.propertyTitle)}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <Building className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching listings found" : "You haven't added any properties"}
            </p>
            <p className="text-xs text-base-content/60 max-w-sm mx-auto mt-1">
              {hasActiveFilters
                ? "No property listings match your search query or status filter. Try clearing your filters."
                : "Click \"Add New Listing\" to publish your first verified property."}
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
