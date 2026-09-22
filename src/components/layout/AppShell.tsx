"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  if (isDashboard) {
    // DashboardLayout already provides its own full-width structural wrapper.
    // Do NOT add an extra container here — it breaks the sidebar layout.
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6 sm:pb-8 min-w-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
