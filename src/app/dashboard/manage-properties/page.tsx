"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic, axiosSecure } from "@/lib/api";
import {
  Building,
  Building2,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Clock,
  Ban,
  Search,
  Filter,
  RotateCcw,
  Check,
  X,
  AlertTriangle,
  ArrowRightLeft,
  Mail,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function ManagePropertiesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const { data, isLoading, refetch } = useQuery<{ propertiesData: Property[]; countData: number }>({
    queryKey: ["admin-all-properties"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/properties");
      return res.data;
    },
  });

  const properties = data?.propertiesData || [];
  const pendingCount = properties.filter((p) => p.status === "pending").length;

  const filteredProperties = React.useMemo(() => {
    return properties.filter((p) => {
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.propertyTitle?.toLowerCase().includes(query) ||
        p.propertyLocation?.toLowerCase().includes(query) ||
        p.agentName?.toLowerCase().includes(query) ||
        p.agentEmail?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [properties, statusFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleVerify = async (id: string) => {
    try {
      await axiosSecure.patch(`/api/v1/make-verified?id=${id}`);
      toast.success("Property verified and published publicly!");
      refetch();
    } catch (err) {
      toast.error("Failed to verify property");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axiosSecure.patch(`/api/v1/make-rejected?id=${id}`);
      toast.success("Property marked as rejected");
      refetch();
    } catch (err) {
      toast.error("Failed to reject property");
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirmDelete({
      title: "Permanently Delete Property?",
      text: "Are you sure you want to remove this property listing from the platform? This cannot be undone.",
      confirmButtonText: "Yes, delete property",
    });
    if (!isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/v1/properties/${id}`);
      toast.success("Property deleted from database");
      refetch();
    } catch (err) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Manage All Properties</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Verify pending listings, reject non-compliant submissions, or remove listings
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total: <span className="font-extrabold text-[#38B6FF]">{properties.length}</span>
          </div>
          {pendingCount > 0 && (
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500">
              Pending: {pendingCount}
            </div>
          )}
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
              placeholder="Search by title, location, agent..."
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
                <option value="pending">Pending ({properties.filter((p) => p.status === "pending").length})</option>
                <option value="verified">Verified ({properties.filter((p) => p.status === "verified").length})</option>
                <option value="rejected">Rejected ({properties.filter((p) => p.status === "rejected").length})</option>
                <option value="fraud">Fraud ({properties.filter((p) => p.status === "fraud").length})</option>
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
            Showing <strong className="text-base-content">{filteredProperties.length}</strong> of {properties.length} properties
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-[#38B6FF] font-semibold">Filters active</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredProperties.length > 0 ? (
        <div className="space-y-2 w-full max-w-full min-w-0">
          {/* Mobile Horizontal Scroll Indicator */}
          <div className="sm:hidden flex items-center justify-between px-1 text-xs text-base-content/50">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#38B6FF]" />
              Swipe table horizontally to view all columns & actions
            </span>
          </div>

          {/* Table with Dedicated Horizontal Scroller (scroll bar isolated to this container on mobile, full width on PC) */}
          <div className="w-full max-w-full table-scroller rounded-3xl border border-base-content/15 bg-base-100 dark:bg-base-200/50 shadow-sm">
            <table className="table w-full min-w-[640px] md:min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-base-200/90 dark:bg-base-300 text-xs font-black uppercase tracking-wider text-base-content border-b-2 border-base-content/20">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Property</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Agent</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Price Range</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Status</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/10">
                {filteredProperties.map((p) => (
                  <tr key={p._id} className="hover:bg-base-300/30 transition-colors">
                    {/* Property with Image & Location */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl overflow-hidden bg-base-300 flex-shrink-0 relative border border-base-content/10">
                          {p.propertyImage ? (
                            <img
                              src={p.propertyImage}
                              alt={p.propertyTitle}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).src =
                                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&auto=format&fit=crop&q=80";
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-base-content/30">
                              <Building className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-[200px] lg:max-w-[260px]">
                          <p className="font-bold text-base-content truncate" title={p.propertyTitle}>
                            {p.propertyTitle}
                          </p>
                          <p className="text-xs text-base-content/60 flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-[#38B6FF] flex-shrink-0" />
                            <span className="truncate">{p.propertyLocation}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Agent */}
                    <td className="py-3 px-3 sm:px-4 text-xs border-r border-base-content/10">
                      <p className="font-bold text-base-content">{p.agentName}</p>
                      <p className="text-base-content/60 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3 text-base-content/40" />
                        {p.agentEmail}
                      </p>
                    </td>

                    {/* Price Range */}
                    <td className="py-3 px-3 sm:px-4 font-bold text-emerald-600 dark:text-emerald-400 border-r border-base-content/10">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs">
                        {p.priceRange}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          p.status === "verified"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : p.status === "pending"
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : p.status === "fraud"
                            ? "bg-rose-950/20 text-rose-500 border border-rose-800/30"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {p.status === "verified" && <CheckCircle2 className="w-3 h-3" />}
                        {p.status === "pending" && <Clock className="w-3 h-3" />}
                        {p.status === "rejected" && <XCircle className="w-3 h-3" />}
                        {p.status === "fraud" && <AlertTriangle className="w-3 h-3" />}
                        {p.status}
                      </span>
                    </td>

                    {/* Moderation Actions & Delete Button */}
                    <td className="py-3 px-3 sm:px-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        {p.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleVerify(p._id)}
                              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-sm transition inline-flex items-center gap-1"
                              title="Verify and Approve"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Verify</span>
                            </button>
                            <button
                              onClick={() => handleReject(p._id)}
                              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition inline-flex items-center gap-1"
                              title="Reject Listing"
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}

                        {/* Separate Delete Button */}
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-2 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
                          title="Permanently Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <Building className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching properties found" : "No properties in the database"}
            </p>
            <p className="text-xs text-base-content/60 mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "No properties match your current search query or status filter. Try clearing filters or using different keywords."
                : "New listings submitted by agents will appear here for verification."}
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
