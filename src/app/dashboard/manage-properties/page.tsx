"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "@/lib/api";
import { 
  Check, 
  X, 
  Trash2, 
  Building, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle,
  ArrowRightLeft,
  MapPin,
  Mail,
  DollarSign
} from "lucide-react";
import toast from "react-hot-toast";
import { Property } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function ManagePropertiesPage() {
  const { data, isLoading, refetch } = useQuery<{ propertiesData: Property[]; countData: number }>({
    queryKey: ["admin-all-properties"],
    queryFn: async () => {
      const res = await axiosPublic.get("/api/v1/properties");
      return res.data;
    },
  });

  const properties = data?.propertiesData || [];
  const pendingCount = properties.filter((p) => p.status === "pending").length;

  const handleVerify = async (id: string) => {
    try {
      await axiosPublic.patch(`/api/v1/make-verified?id=${id}`);
      toast.success("Property verified and published publicly!");
      refetch();
    } catch (err) {
      toast.error("Failed to verify property");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axiosPublic.patch(`/api/v1/make-rejected?id=${id}`);
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
      await axiosPublic.delete(`/api/v1/properties/${id}`);
      toast.success("Property deleted from database");
      refetch();
    } catch (err) {
      toast.error("Failed to delete property");
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Manage All Properties</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Verify pending listings, reject non-compliant submissions, or remove listings
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-2xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total: <span className="font-extrabold text-[#38B6FF]">{properties.length}</span>
          </div>
          {pendingCount > 0 && (
            <div className="px-3.5 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500">
              Pending: {pendingCount}
            </div>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : properties.length > 0 ? (
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
                {properties.map((p) => (
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
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10">
          <Building className="w-12 h-12 text-base-content/20 mx-auto mb-3" />
          <p className="text-lg font-bold text-base-content">No properties in the database</p>
          <p className="text-xs text-base-content/60 mt-1">
            New listings submitted by agents will appear here for verification.
          </p>
        </div>
      )}
    </div>
  );
}
