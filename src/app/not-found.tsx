import React from "react";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-7xl font-extrabold text-[#38B6FF]">404</h1>
        <h2 className="text-2xl font-bold text-base-content">Page Not Found</h2>
        <p className="text-sm text-base-content/60 max-w-sm mx-auto">
          The property, listing, or page you were looking for doesn&apos;t exist or has been relocated.
        </p>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-lg shadow-[#38B6FF]/30 transition"
      >
        <Home className="w-4 h-4" /> Return to Homepage
      </Link>
    </div>
  );
}
