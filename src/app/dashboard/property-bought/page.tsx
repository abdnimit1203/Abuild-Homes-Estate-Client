"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/components/providers/AuthProvider";
import { axiosPublic } from "@/lib/api";
import { MapPin, DollarSign, CreditCard, CheckCircle2, Clock, XCircle, ShoppingBag } from "lucide-react";
import { Offer } from "@/types";

export default function PropertyBoughtPage() {
  const { user } = useAuth();

  const { data: offers = [], isLoading } = useQuery<Offer[]>({
    queryKey: ["my-bought-offers", user?.email],
    enabled: Boolean(user?.email),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/offers?buyerEmail=${user?.email}`);
      return res.data || [];
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-base-content">Purchased & Offered Properties</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Track the status of your offers and proceed to secure checkout when accepted
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-44 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : offers.length > 0 ? (
        <div className="space-y-4">
          {offers.map((offer) => (
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
          <p className="text-lg font-bold text-base-content">No property offers submitted yet</p>
          <p className="text-xs text-base-content/60 max-w-sm mx-auto">
            Once an agent accepts your purchase proposal, you can securely finalize the transaction
            here.
          </p>
          <Link
            href="/dashboard/wishlist"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] text-white mt-2"
          >
            Check Wishlist
          </Link>
        </div>
      )}
    </div>
  );
}
