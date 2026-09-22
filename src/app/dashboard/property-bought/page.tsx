"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { MapPin, DollarSign, CreditCard, CheckCircle2, Clock, XCircle, ShoppingBag, Search, Filter, X, RotateCcw } from "lucide-react";
import { Offer } from "@/types";

export default function PropertyBoughtPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const { data: offers = [], isLoading } = useQuery<Offer[]>({
    queryKey: ["my-bought-offers", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/offers?buyerEmail=${user?.email}`);
      return res.data || [];
    },
  });

  const filteredOffers = React.useMemo(() => {
    return offers.filter((offer) => {
      const matchesStatus = statusFilter === "all" || offer.status === statusFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        offer.propertyTitle?.toLowerCase().includes(query) ||
        offer.propertyLocation?.toLowerCase().includes(query) ||
        offer.agentEmail?.toLowerCase().includes(query);
      return matchesStatus && matchesSearch;
    });
  }, [offers, statusFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Purchased & Offered Properties</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Track the status of your offers and proceed to secure checkout when accepted
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="px-3 py-1.5 rounded-xl bg-base-200 border border-base-content/10 text-xs font-semibold">
            Total Offers: <strong className="text-[#38B6FF]">{offers.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            Accepted: {offers.filter((o) => o.status === "accepted" || o.status === "bought").length}
          </span>
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
                <option value="all">All Offers ({offers.length})</option>
                <option value="accepted">Accepted ({offers.filter((o) => o.status === "accepted").length})</option>
                <option value="pending">Pending ({offers.filter((o) => o.status === "pending").length})</option>
                <option value="bought">Bought / Paid ({offers.filter((o) => o.status === "bought").length})</option>
                <option value="rejected">Rejected ({offers.filter((o) => o.status === "rejected").length})</option>
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
            <div key={n} className="h-44 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredOffers.length > 0 ? (
        <div className="space-y-4">
          {filteredOffers.map((offer) => (
            <div
              key={offer._id}
              className="p-5 sm:p-6 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-base-300 flex-shrink-0">
                  <Image
                    src={offer.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
                    alt={offer.propertyTitle}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-base-content">{offer.propertyTitle}</h3>
                  <p className="text-xs text-base-content/70 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#38B6FF]" />
                    {offer.propertyLocation}
                  </p>
                  <p className="text-xs font-semibold text-base-content/60">
                    Agent: {offer.agentEmail}
                  </p>
                  <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                    Offered: ${offer.offeredAmount?.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
                <div className="flex items-center gap-1.5">
                  {offer.status === "accepted" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Accepted
                    </span>
                  )}
                  {offer.status === "pending" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/15 text-amber-500 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" /> Pending Review
                    </span>
                  )}
                  {offer.status === "rejected" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-500/10 text-rose-500 border border-rose-500/30">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </span>
                  )}
                  {offer.status === "bought" && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Paid / Acquired
                    </span>
                  )}
                </div>

                {offer.status === "accepted" && (
                  <Link
                    href={`/dashboard/payment/${offer._id}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md shadow-[#38B6FF]/30 transition active:scale-95 w-full sm:w-auto"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay With Stripe
                  </Link>
                )}

                {offer.status === "bought" && offer.transactionId && (
                  <p className="text-[11px] font-mono text-base-content/50 bg-base-300/50 px-2.5 py-1 rounded-lg">
                    TX: {offer.transactionId}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <ShoppingBag className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching property offers found" : "No property offers submitted yet"}
            </p>
            <p className="text-xs text-base-content/60 max-w-sm mx-auto mt-1">
              {hasActiveFilters
                ? "No purchase proposals match your search query or status filter. Try clearing your filters."
                : "Once an agent accepts your purchase proposal, you can securely finalize the transaction here."}
            </p>
          </div>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-[#38B6FF] hover:bg-[#2fa3e6] text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          ) : (
            <Link
              href="/dashboard/wishlist"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] text-white mt-2"
            >
              Check Wishlist
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
