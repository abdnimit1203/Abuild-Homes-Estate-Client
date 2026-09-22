"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import SocialLogin from "@/components/auth/SocialLogin";
import { axiosPublic } from "@/lib/api";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { ArrowLeft, UserPlus } from "lucide-react";
import toast from "react-hot-toast";
import ImageUpload from "@/components/common/ImageUpload";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, signupUser, updateUserProfile } = useAuth();
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      toast("Please log out of your current account first", {
        icon: "ℹ️",
        style: {
          borderRadius: "14px",
          background: "#0f172a",
          color: "#ffffff",
          border: "1px solid rgba(250, 204, 21, 0.4)",
          boxShadow: "0 14px 30px -5px rgba(0, 0, 0, 0.3)",
          fontWeight: "600",
          fontSize: "14px",
        },
      });
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!fullName) {
      toast.error("Please enter your name");
      return;
    }

    if (!email) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Password validation matching original constraints
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[@$!%*?&#^()]/.test(password);

    if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Creating new account...");

    try {
      const res = await signupUser(email, password);
      const finalPhoto = photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png";

      await updateUserProfile(fullName, finalPhoto);

      // Save user to backend MongoDB
      const userInfo = {
        name: fullName,
        email,
        role: "user",
        photoURL: finalPhoto,
        imgUrl: finalPhoto,
        uid: res.user.uid,
      };

      await axiosPublic.post("/api/v1/users", userInfo);

      toast.success("Account created successfully!", { id: toastId });
      router.push("/");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.message || "Failed to create account", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-base-100 text-neutral-800 dark:text-neutral-100 min-h-screen flex flex-col justify-center">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Right Side Showcase (Original Property Image) */}
        <aside className="relative block h-56 lg:order-last lg:col-span-5 xl:col-span-6 lg:h-full">
          <img
            alt="Abuild Homes Estate Showcase"
            src="/assets/property/property1.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent lg:hidden" />
        </aside>

        {/* Left Side Form Content */}
        <main className="flex items-center justify-center px-6 py-10 sm:px-12 lg:col-span-7 xl:col-span-6 lg:px-16 text-center">
          <div className="w-full max-w-xl space-y-6">
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
                Sign Up
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-base-content/60 leading-relaxed max-w-md mx-auto">
                Join our thriving community, where every neighbor is considered family.
                Stay connected with us for the latest updates, real estate trends, and valuable insights.
              </p>
            </div>

            {/* Form Boxes with Balanced Sizing and Spacing */}
            <form onSubmit={handleSignUp} className="mt-8 space-y-4 text-left">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="firstName"
                    className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. John"
                    className="w-full px-4 py-2.5 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="lastName"
                    className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Doe"
                    className="w-full px-4 py-2.5 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
                  />
                </div>
              </div>

              {/* Upload Image Option (Upgraded with ImgBB upload and preview) */}
              <div className="pt-1">
                <ImageUpload
                  value={photoURL}
                  onChange={setPhotoURL}
                  label="Profile Image (Upload to ImgBB or Direct URL)"
                  required={false}
                  variant="avatar"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-bold text-base-content/80 tracking-wide uppercase"
                >
                  Password *
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 chars, 1 uppercase, 1 lowercase, 1 number, 1 symbol"
                  className="w-full px-4 py-2.5 rounded-xl border border-base-content/15 bg-slate-100 dark:bg-neutral-800/80 text-sm text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition shadow-inner"
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
                  <UserPlus className="w-4 h-4" />
                  {loading ? "Creating account..." : "Sign Up"}
                </button>
              </div>

              {/* Back to Login Link */}
              <div className="text-center pt-1">
                <p className="text-xs text-base-content/70">
                  Already a user?{" "}
                  <Link
                    href="/login"
                    className="text-[#38B6FF] font-bold underline pl-1 hover:text-[#2fa3e6]"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>

            {/* Divider OR */}
            <div className="relative flex items-center justify-center py-2">
              <div className="border-t border-base-content/15 w-full" />
              <span className="bg-base-100 px-4 text-xs font-bold uppercase tracking-wider text-base-content/50 absolute">
                OR
              </span>
            </div>

            {/* Social Login */}
            <div className="flex justify-center pb-4">
              <SocialLogin />
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
