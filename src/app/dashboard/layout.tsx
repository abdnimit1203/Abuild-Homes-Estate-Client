"use client";

/**
 * DashboardLayout — thin structural shell.
 *
 * Owns only:
 *   - Auth guard (redirect unauthenticated users)
 *   - DaisyUI drawer structure (mobile + desktop)
 *   - Passing (role, pathname, onClose) to DashboardNav at the seam
 *
 * All role-specific nav, gradient, and logout logic lives in DashboardNav.
 */

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import { useTheme } from "next-themes";
import { RiMenu3Line } from "react-icons/ri";
import DashboardNav from "@/components/dashboard/DashboardNav";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const [role, isRoleLoading] = useRole(user?.email);
  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === "dark" || resolvedTheme === "dark";

  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2") as HTMLInputElement | null;
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img
          src="/assets/home/loading2.png"
          alt="loader"
          className="motion-safe:animate-spin w-44 mx-auto"
        />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold">Access Restricted</h2>
        <p className="text-sm text-base-content/70 max-w-md">
          Please sign in to access your personal dashboard.
        </p>
        <Link href="/login" className="btn btn-primary px-6 rounded-xl text-white font-bold">
          Sign In
        </Link>
      </div>
    );
  }

  const navProps = { role, isRoleLoading, pathname, onClose: closeDrawer };

  return (
    <div className="flex-1 relative w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 min-w-0">
      <div className="drawer min-w-0 max-w-full min-h-full flex flex-col">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Content area */}
        <div className="drawer-content flex flex-col flex-1 min-w-0 max-w-full">
          {/* Mobile top bar */}
          <div className="flex md:hidden items-center justify-between p-3 mb-4 rounded-2xl bg-base-100 dark:bg-base-200/90 border border-base-content/10 shadow-sm gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-sm btn-primary text-white rounded-xl flex items-center gap-1.5 font-bold drawer-button cursor-pointer flex-shrink-0"
                aria-label="Toggle dashboard menu"
              >
                <RiMenu3Line className="w-4 h-4 text-white" />
                <span className="text-xs">MENU</span>
              </label>
              <Link href="/" className="flex items-center group flex-shrink-0">
                <img
                  src={isDark ? "/assets/home/logoDark.png" : "/assets/home/logoMain.png"}
                  alt="ABuild Homes"
                  className="h-7 sm:h-8 w-auto max-w-[135px] object-contain transition-transform group-hover:scale-105"
                />
              </Link>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <ThemeToggle />
              <Link
                href="/dashboard/profile"
                className="avatar online w-9 h-9 rounded-full border-2 border-primary overflow-hidden p-[1px] hover:scale-105 transition"
                aria-label="User Profile"
                title="View Profile"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                  alt={user.displayName || "Profile"}
                  className="w-full h-full rounded-full object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="flex flex-col md:flex-row gap-4 lg:gap-5 min-w-0 w-full max-w-full flex-1 ">
            {/* Desktop docked sidebar */}
            <aside className="hidden md:block w-64 lg:w-72 flex-shrink-0 self-stretch sticky top-4 sm:top-6 z-20">
              <DashboardNav {...navProps} />
            </aside>

            {/* Page content */}
            <div className="flex-1 min-w-0 w-full max-w-full bg-base-100 dark:bg-base-200/40 rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm border border-base-content/10">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile slide-out drawer */}
        <div className="drawer-side z-50 md:hidden " >
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay" />
          <div className="w-72 sm:w-80  shadow-2xl h-full">
            <DashboardNav {...navProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
