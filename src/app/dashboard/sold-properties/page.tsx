"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { 
  CheckCircle2, 
  DollarSign, 
  ArrowRightLeft, 
  CreditCard, 
  Home, 
  Mail, 
  Copy, 
  Check,
  Search,
  Filter,
  ArrowUpDown,
  X,
  RotateCcw
} from "lucide-react";
import { PaymentRecord } from "@/types";
import toast from "react-hot-toast";

export default function SoldPropertiesPage() {
  const { user } = useAuth();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "price-desc" | "price-asc">("newest");

  const { data: payments = [], isLoading } = useQuery<PaymentRecord[]>({
    queryKey: ["agent-sold-payments", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/payments?agentEmail=${user?.email}`);
      return res.data || [];
    },
  });

  const totalRevenue = payments.reduce((acc, curr) => acc + (curr.soldPrice || 0), 0);

  const filteredPayments = React.useMemo(() => {
    let list = payments.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      if (!query) return true;
      return (
        item.propertyTitle?.toLowerCase().includes(query) ||
        item.buyerName?.toLowerCase().includes(query) ||
        item.buyerEmail?.toLowerCase().includes(query) ||
        item.transactionId?.toLowerCase().includes(query)
      );
    });

    if (sortOrder === "price-desc") {
      list = [...list].sort((a, b) => (b.soldPrice || 0) - (a.soldPrice || 0));
    } else if (sortOrder === "price-asc") {
      list = [...list].sort((a, b) => (a.soldPrice || 0) - (b.soldPrice || 0));
    } else {
      // newest
      list = [...list].sort((a, b) => (b.date || 0) - (a.date || 0));
    }
    return list;
  }, [payments, searchQuery, sortOrder]);

  const hasActiveFilters = searchQuery.trim() !== "" || sortOrder !== "newest";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSortOrder("newest");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    toast.success("Transaction ID copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">Sold Properties & Escrow</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Records of finalized purchases and completed Stripe transactions
          </p>
        </div>
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <DollarSign className="w-5 h-5 font-bold" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider">Total Sales Volume</p>
            <p className="text-lg sm:text-xl font-extrabold">${totalRevenue.toLocaleString()} USD</p>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-base-100 dark:bg-base-200/50 border border-base-content/15 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, buyer, or transaction ID..."
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

          {/* Sort Dropdown Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#38B6FF]" />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="w-full sm:w-auto pl-8 pr-8 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs font-bold text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] cursor-pointer appearance-none"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
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
            Showing <strong className="text-base-content">{filteredPayments.length}</strong> of {payments.length} sales
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
      ) : filteredPayments.length > 0 ? (
        <div className="space-y-2 w-full max-w-full min-w-0">
          {/* Mobile Horizontal Scroll Indicator */}
          <div className="sm:hidden flex items-center justify-between px-1 text-xs text-base-content/50">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#38B6FF]" />
              Swipe table horizontally to view payment and transaction details
            </span>
          </div>

          {/* Table with Dedicated Scroller */}
          <div className="w-full max-w-full table-scroller rounded-3xl border border-base-content/15 bg-base-100 dark:bg-base-200/50 shadow-sm">
            <table className="table w-full min-w-[620px] md:min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-base-200/90 dark:bg-base-300 text-xs font-black uppercase tracking-wider text-base-content border-b-2 border-base-content/20">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Property Title</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Buyer Details</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Final Sold Price</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Stripe Transaction ID</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/10">
                {filteredPayments.map((item, idx) => (
                  <tr key={item._id || idx} className="hover:bg-base-300/30 transition-colors">
                    {/* Property Title */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
                          <Home className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-base-content">{item.propertyTitle}</span>
                      </div>
                    </td>

                    {/* Buyer */}
                    <td className="py-3 px-3 sm:px-4 text-xs border-r border-base-content/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-base-300 text-base-content font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                          {(item.buyerName || "B").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-base-content">{item.buyerName}</p>
                          <p className="text-base-content/60 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-base-content/40" />
                            {item.buyerEmail}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Final Sold Price */}
                    <td className="py-3 px-3 sm:px-4 font-bold text-emerald-600 dark:text-emerald-400 border-r border-base-content/10">
                      <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs font-extrabold">
                        ${item.soldPrice?.toLocaleString()} USD
                      </span>
                    </td>

                    {/* Stripe Transaction ID */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <button
                        onClick={() => copyToClipboard(item.transactionId)}
                        className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-base-200 hover:bg-base-300 border border-base-content/10 text-xs font-mono text-base-content/80 transition"
                        title="Click to copy Transaction ID"
                      >
                        <CreditCard className="w-3 h-3 text-[#38B6FF]" />
                        <span>{item.transactionId}</span>
                        {copiedId === item.transactionId ? (
                          <Check className="w-3 h-3 text-emerald-500 ml-1" />
                        ) : (
                          <Copy className="w-3 h-3 text-base-content/40 group-hover:text-base-content/80 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </button>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-3 sm:px-4 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Settled
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching sold properties found" : "No sold properties recorded yet"}
            </p>
            <p className="text-xs text-base-content/60 mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "No completed sales match your search query or sort order. Try clearing your filters."
                : "When buyers complete checkout for accepted offers, sales will be logged here."}
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
