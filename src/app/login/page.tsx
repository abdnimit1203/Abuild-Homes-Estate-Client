"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import SocialLogin from "@/components/auth/SocialLogin";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { ArrowLeft, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      toast("LOG OUT OF OTHER ACCOUNT FIRST!", {
        icon: "⚠️",
        style: {
          borderRadius: "10px",
          background: "#fadf1b",
          color: "#1a1a1a",
          fontWeight: "bold",
        },
      });
      return;
    }

    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Logging in...");

    try {
      await signIn(email, password);
      toast.success("User logged in successfully!", { id: toastId });
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Failed to log in. Please check your credentials.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-base-100 text-neutral-800 dark:text-neutral-100 min-h-screen flex flex-col justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Right Side Image Showcase (Original Luxury Aesthetic) */}
        <aside className="relative block h-56 lg:order-last lg:col-span-5 xl:col-span-6 lg:h-full">
          <img
            alt="Abuild Homes Luxury Architecture"
            src="https://images.unsplash.com/photo-1589021111330-953704d34989?q=80&w=1227&auto=format&fit=crop"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent lg:hidden" />
        </aside>

        {/* Left Side Main Form Content */}
        <main className="flex items-center justify-center px-6 py-10 sm:px-12 lg:col-span-7 xl:col-span-6 lg:px-16 text-center">
          <div className="w-full max-w-lg space-y-6">
            {/* Go Home Button */}
            <div className="text-left">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-base-content transition inline-flex items-center gap-1.5 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Go Home
              </Link>
            </div>

            {/* Header Titles */}
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-base-content tracking-tight">
                LOGIN
              </h1>
              <p className="mt-2 text-sm text-base-content/60 leading-relaxed max-w-sm mx-auto">
                Find Your Perfect Sanctuary <br />
                Where Luxury Meets Comfort.
              </p>
            </div>

            {/* Well Positioned & Sized Form Boxes */}
            <form onSubmit={handleLogin} className="mt-8 space-y-5 text-left">
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@abuildhomes.com"
                  className="w-full px-4 py-3 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
                />

                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer flex items-center gap-2 pt-1 text-xs text-base-content/70 hover:text-base-content w-fit select-none"
                >
                  {showPassword ? (
                    <MdOutlineCheckBox className="text-xl text-[#38B6FF]" />
                  ) : (
                    <MdCheckBoxOutlineBlank className="text-xl" />
                  )}
                  <span>Show Password</span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-base-content/70">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-[#38B6FF] font-bold underline pl-1 hover:text-[#2fa3e6]"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>

            {/* Divider OR */}
            <div className="relative flex items-center justify-center py-4">
              <div className="border-t border-base-content/15 w-full" />
              <span className="bg-base-100 px-4 text-xs font-bold uppercase tracking-wider text-base-content/50 absolute">
                OR
              </span>
            </div>

            {/* Social Login */}
            <div className="flex justify-center">
              <SocialLogin />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
