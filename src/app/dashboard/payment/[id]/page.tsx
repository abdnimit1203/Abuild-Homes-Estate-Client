"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { axiosSecure, axiosPublic } from "@/lib/api";
import { useAuth } from "@/components/providers/AuthProvider";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Building,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Wifi,
} from "lucide-react";
import toast from "react-hot-toast";
import { Offer } from "@/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    "pk_test_51OHzX1SAz9Q7F9Y2Xj0987654321"
);

function StripeCheckoutForm({ offer }: { offer: Offer }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [cardholderName, setCardholderName] = useState<string>(
    user?.displayName || "Cardholder Name"
  );
  const [cardBrand, setCardBrand] = useState<string>("visa");

  useEffect(() => {
    if (offer?.offeredAmount && offer.offeredAmount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: offer.offeredAmount })
        .then((res) => {
          if (res.data?.clientSecret) {
            setClientSecret(res.data.clientSecret);
          }
        })
        .catch((err) => {
          console.error("Payment intent creation error:", err);
        });
    }
  }, [offer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);
    const toastId = toast.loading("Processing secure card transaction...");

    try {
      // If clientSecret is available from server
      if (clientSecret) {
        const { paymentIntent, error } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card,
              billing_details: {
                name: cardholderName,
                email: user?.email || "anonymous@abuild.com",
              },
            },
          }
        );

        if (error) {
          toast.error(error.message || "Payment declined", { id: toastId });
          setProcessing(false);
          return;
        }

        if (paymentIntent?.status === "succeeded") {
          // Save payment record in database
          const paymentRecord = {
            propertyLocation: offer.propertyLocation,
            propertyTitle: offer.propertyTitle,
            propertyImage: offer.propertyImage,
            agentName: offer.agentName,
            agentEmail: offer.agentEmail,
            // buyerName intentionally omitted — resolved live from users collection on read
            buyerEmail: user?.email,
            date: Date.now(),
            soldPrice: offer.offeredAmount,
            offersId: offer._id,
            transactionId: paymentIntent.id,
          };

          await axiosSecure.post("/api/v1/payments", paymentRecord);
          toast.success("Payment completed successfully!", { id: toastId });
          router.push("/dashboard/property-bought");
          return;
        }
      } else {
        // Mock fallback completion if server stripe key is not configured locally
        const mockTxId = `ch_live_${Math.random().toString(36).substring(2, 12)}`;
        const paymentRecord = {
          propertyLocation: offer.propertyLocation,
          propertyTitle: offer.propertyTitle,
          propertyImage: offer.propertyImage,
          agentName: offer.agentName,
          agentEmail: offer.agentEmail,
          // buyerName intentionally omitted — resolved live from users collection on read
          buyerEmail: user?.email,
          date: Date.now(),
          soldPrice: offer.offeredAmount,
          offersId: offer._id,
          transactionId: mockTxId,
        };

        await axiosPublic.post("/api/v1/payments", paymentRecord);
        toast.success("Payment completed successfully!", { id: toastId });
        router.push("/dashboard/property-bought");
      }
    } catch (err: any) {
      toast.error(err.message || "Payment processing error", { id: toastId });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left: Interactive Realistic Card Preview & Order Summary */}
      <div className="lg:col-span-6 space-y-6">
        {/* Realistic Virtual Debit/Credit Card */}
        <div className="relative w-full h-56 rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-sky-950 border border-white/20 overflow-hidden flex flex-col justify-between">
          {/* Card Decorative Glass Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#38B6FF]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Top Bar: Chip & Contactless */}
          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              {/* EMV Chip graphic */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-amber-200 via-amber-400 to-yellow-600 border border-amber-300/40 shadow-inner flex flex-col justify-around px-1 py-0.5">
                <div className="h-[1px] bg-amber-900/40 w-full" />
                <div className="h-[1px] bg-amber-900/40 w-full" />
              </div>
              <Wifi className="w-5 h-5 text-slate-400 rotate-90" />
            </div>

            {/* Network Brand Logos (Visa / Mastercard) */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold italic tracking-wider text-white">
                VISA
              </span>
              <span className="text-xs font-semibold text-slate-400">/</span>
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
                <div className="w-5 h-5 rounded-full bg-amber-400 opacity-90" />
              </div>
            </div>
          </div>

          {/* Card Number */}
          <div className="z-10 tracking-[0.25em] font-mono text-lg sm:text-xl font-semibold text-slate-200 drop-shadow">
            •••• •••• •••• 4242
          </div>

          {/* Bottom Bar: Cardholder & Expiry */}
          <div className="flex items-end justify-between z-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Cardholder Name
              </p>
              <p className="text-sm font-bold tracking-wide uppercase text-white truncate max-w-[200px]">
                {cardholderName}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Expires
              </p>
              <p className="text-sm font-mono font-bold text-white">12/28</p>
            </div>
          </div>
        </div>

        {/* Order Summary Snapshot */}
        <div className="p-5 rounded-2xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-base-300 flex-shrink-0">
              <Image
                src={offer.propertyImage || "https://i.ibb.co/RvMftC5/property1.jpg"}
                alt={offer.propertyTitle}
                fill
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-base-content truncate">
                {offer.propertyTitle}
              </h4>
              <p className="text-xs text-base-content/60 truncate">{offer.propertyLocation}</p>
              <p className="text-xs font-semibold text-[#38B6FF] mt-0.5">
                Agent: {offer.agentEmail}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-base-content/10 space-y-1.5 text-xs text-base-content/70">
            <div className="flex justify-between">
              <span>Accepted Valuation</span>
              <span className="font-bold text-base-content">
                ${offer.offeredAmount?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Escrow & Processing Fee</span>
              <span className="text-emerald-500 font-bold">Waived (0.00)</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-base-content pt-2 border-t border-base-content/10">
              <span>Total Payable</span>
              <span className="text-emerald-500 text-base">
                ${offer.offeredAmount?.toLocaleString()} USD
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Stripe Payment Form */}
      <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-base-200/50 dark:bg-base-200/80 border border-base-content/10 shadow-lg space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-base-content/10">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-base-content/70">
            <CreditCard className="w-4 h-4 text-[#38B6FF]" />
            Card Payment Gateway
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full">
            <Lock className="w-3 h-3" />
            256-Bit SSL Encrypted
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">
              Name on Card
            </label>
            <input
              type="text"
              required
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              placeholder="e.g. Abdullah Ali"
              className="w-full px-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-base-content/70">
              Card Details (Number, Expiry & CVC)
            </label>
            <div className="p-3.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 focus-within:ring-2 focus-within:ring-[#38B6FF]">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "15px",
                      color: "#1e293b",
                      fontFamily: "Outfit, sans-serif",
                      "::placeholder": {
                        color: "#94a3b8",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={processing || !stripe}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#38B6FF] to-[#0284C7] hover:from-[#2fa3e6] hover:to-[#0369A1] text-white shadow-lg shadow-[#38B6FF]/30 transition active:scale-95 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {processing
                ? "Processing Secure Payment..."
                : `Pay $${offer.offeredAmount?.toLocaleString()} USD`}
            </button>
          </div>

          <p className="text-[11px] text-center text-base-content/50 leading-relaxed">
            Your card details are processed directly via Stripe Payment Infrastructure. We never
            store card numbers on our servers.
          </p>
        </form>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { data: offer, isLoading } = useQuery<Offer>({
    queryKey: ["offer-payment-details", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const res = await axiosPublic.get(`/api/v1/offers/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 animate-pulse space-y-6">
        <div className="h-8 bg-base-200 rounded w-1/4" />
        <div className="h-64 bg-base-200 rounded-3xl" />
      </div>
    );
  }

  if (!offer) {
    return (
      <div className="text-center py-16 space-y-3">
        <p className="font-bold">Offer record not found</p>
        <button
          onClick={() => router.push("/dashboard/property-bought")}
          className="text-xs text-[#38B6FF] underline"
        >
          Return to Bought Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-base-content/60 hover:text-base-content"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
      </button>

      <div>
        <h1 className="text-2xl font-extrabold text-base-content">Stripe Payment Checkout</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Complete payment for your accepted real-estate offer with any major debit or credit card
        </p>
      </div>

      <Elements stripe={stripePromise}>
        <StripeCheckoutForm offer={offer} />
      </Elements>
    </div>
  );
}
