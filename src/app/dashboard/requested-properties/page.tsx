"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { 
  Check, 
  X, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  FileSpreadsheet, 
  ArrowRightLeft,
  Mail,
  User,
  Home,
  Search,
  Filter,
  RotateCcw
} from "lucide-react";
import toast from "react-hot-toast";
import { Offer } from "@/types";

export default function RequestedPropertiesPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const { data: offers = [], isLoading, refetch } = useQuery<Offer[]>({
    queryKey: ["agent-requested-offers", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/offers?agentEmail=${user?.email}`);
      return res.data || [];
    },
  });

  const pendingOffersCount = offers.filter((o) => o.status === "pending").length;

  const filteredOffers = React.useMemo(() => {
    return offers.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        o.propertyTitle?.toLowerCase().includes(query) ||
        o.buyerName?.toLowerCase().includes(query) ||
        o.buyerEmail?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [offers, statusFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  const handleAccept = async (id: string, title: string) => {
    try {
      await axiosPublic.patch(`/api/v1/accepted-offer?id=${id}&title=${encodeURIComponent(title)}`);
      toast.success("Offer accepted! Other pending offers on this property marked as rejected.");
      refetch();
    } catch (err) {
      toast.error("Failed to accept offer");
    }
  };

  const handleReject = async (id: string) => {
    try {
      await axiosPublic.patch(`/api/v1/rejected-offer?id=${id}`);
      toast.success("Offer rejected");
      refetch();
    } catch (err) {
      toast.error("Failed to reject offer");
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Incoming Buyer Offers</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Review and respond to purchase proposals submitted for your listings
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total Offers: <span className="font-extrabold text-[#38B6FF]">{offers.length}</span>
          </div>
          {pendingOffersCount > 0 && (
            <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-bold text-amber-500">
              Needs Review: {pendingOffersCount}
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
              placeholder="Search by property title, buyer name, or email..."
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
                <option value="all">All Offers ({offers.length})</option>
                <option value="pending">Pending Review ({offers.filter((o) => o.status === "pending").length})</option>
                <option value="accepted">Accepted ({offers.filter((o) => o.status === "accepted").length})</option>
                <option value="rejected">Rejected ({offers.filter((o) => o.status === "rejected").length})</option>
                <option value="bought">Bought / Paid ({offers.filter((o) => o.status === "bought").length})</option>
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
            Showing <strong className="text-base-content">{filteredOffers.length}</strong> of {offers.length} offers
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-[#38B6FF] font-semibold">Filters active</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredOffers.length > 0 ? (
        <div className="space-y-2 w-full max-w-full min-w-0">
          {/* Mobile Horizontal Scroll Indicator */}
          <div className="sm:hidden flex items-center justify-between px-1 text-xs text-base-content/50">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#38B6FF]" />
              Swipe table horizontally to review offers & take action
            </span>
          </div>

          {/* Table with Dedicated Scroller */}
          <div className="w-full max-w-full table-scroller rounded-3xl border border-base-content/15 bg-base-100 dark:bg-base-200/50 shadow-sm">
            <table className="table w-full min-w-[620px] md:min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-base-200/90 dark:bg-base-300 text-xs font-black uppercase tracking-wider text-base-content border-b-2 border-base-content/20">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Property Title</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Buyer Details</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Offered Amount</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Offer Status</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Offer Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/10">
                {filteredOffers.map((offer) => (
                  <tr key={offer._id} className="hover:bg-base-300/30 transition-colors">
                    {/* Property Title */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                          <Home className="w-4 h-4" />
                        </div>
                        <div className="max-w-[200px] lg:max-w-[240px]">
                          <p className="font-bold text-base-content truncate" title={offer.propertyTitle}>
                            {offer.propertyTitle}
                          </p>
                          {offer.propertyLocation && (
                            <p className="text-xs text-base-content/60 truncate">
                              {offer.propertyLocation}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Buyer Details */}
                    <td className="py-3 px-3 sm:px-4 text-xs border-r border-base-content/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-base-300 text-base-content font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                          {(offer.buyerName || "B").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-base-content">{offer.buyerName}</p>
                          <p className="text-base-content/60 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-base-content/40" />
                            {offer.buyerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Offered Price */}
                    <td className="py-3 px-3 sm:px-4 font-bold text-emerald-600 dark:text-emerald-400 border-r border-base-content/10">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-extrabold">
                        ${offer.offeredAmount?.toLocaleString()} USD
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          offer.status === "accepted"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            : offer.status === "pending"
                            ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : offer.status === "bought"
                            ? "bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/20"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        }`}
                      >
                        {offer.status === "accepted" && <CheckCircle2 className="w-3 h-3" />}
                        {offer.status === "pending" && <Clock className="w-3 h-3" />}
                        {offer.status === "bought" && <CheckCircle2 className="w-3 h-3" />}
                        {offer.status === "rejected" && <XCircle className="w-3 h-3" />}
                        {offer.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 sm:px-4 text-right">
                      {offer.status === "pending" ? (
                        <div className="inline-flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleAccept(offer._id, offer.propertyTitle)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm transition inline-flex items-center gap-1.5"
                          >
                            <Check className="w-3.5 h-3.5" /> Accept
                          </button>
                          <button
                            onClick={() => handleReject(offer._id)}
                            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition inline-flex items-center gap-1.5"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-base-content/50 italic px-2 py-1 rounded-lg bg-base-200">
                          {offer.status === "accepted" ? "Awaiting buyer checkout" : "Decision finalized"}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <FileSpreadsheet className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching buyer offers found" : "No buyer proposals at this moment"}
            </p>
            <p className="text-xs text-base-content/60 mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "No purchase proposals match your search query or status filter. Try clearing your filters."
                : "When prospective buyers submit purchase offers for your listings, they will appear here."}
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
