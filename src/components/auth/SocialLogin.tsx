"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { axiosPublic } from "@/lib/api";
import toast from "react-hot-toast";

export default function SocialLogin() {
  const { googleSignIn } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const toastId = toast.loading("Connecting with Google...");
    try {
      const res = await googleSignIn();
      const user = res.user;

      const userInfo = {
        name: user.displayName || "User",
        email: user.email,
        role: "user",
        photoURL: user.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png",
        uid: user.uid,
      };

      await axiosPublic.post("/api/v1/users", userInfo);
      toast.success("Signed in successfully with Google!", { id: toastId });
      router.push("/");
    } catch (err: any) {
      toast.error(err.message || "Google sign in failed", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={loading}
      type="button"
      className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-base-content/15 bg-base-100 hover:bg-base-200 text-base-content font-bold text-sm shadow-sm transition active:scale-95"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
        />
        <path
          fill="#4285F4"
          d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
        />
        <path
          fill="#FBBC05"
          d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
        />
        <path
          fill="#34A853"
          d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.4C3.7 20.1 7.5 23 12 23z"
        />
      </svg>
      {loading ? "Authenticating..." : "Continue with Google"}
    </button>
  );
}
