"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import HeaderText from "@/components/common/HeaderText";
import toast from "react-hot-toast";

// Original react-icons imports
import { FaRegUserCircle, FaUserSecret } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { MdRateReview, MdReviews, MdLogout } from "react-icons/md";
import {
  BsBuildingExclamation,
  BsBuildingFillAdd,
  BsBuildingFillGear,
  BsClipboardHeart,
  BsFillHousesFill,
} from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { RiAdminFill, RiMenu3Line } from "react-icons/ri";
import { LiaUsersCogSolid } from "react-icons/lia";
import { IoIosHome } from "react-icons/io";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading: authLoading, logOut } = useAuth();
  const [role, isLoading] = useRole(user?.email);

  // Helper to auto-close drawer on mobile when clicking a navigation link
  const closeDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2") as HTMLInputElement | null;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  const handleLogOut = () => {
    closeDrawer();
    logOut().then(() => {
      toast("You have been signed out. See you soon!", {
        icon: "👋",
        duration: 3500,
        style: {
          borderRadius: "16px",
          background: "#0f172a",
          color: "#ffffff",
          border: "1px solid rgba(56, 182, 255, 0.35)",
          boxShadow: "0 14px 34px -4px rgba(0, 0, 0, 0.4)",
          fontWeight: "600",
          fontSize: "14px",
          padding: "12px 20px",
        },
      });
      router.push("/");
    });
  };

  let headerText = "";
  const headerText2 = "DASHBOARD";
  if (!isLoading && role && role !== "user") {
    headerText = role.toUpperCase();
  }

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
        <Link
          href="/login"
          className="btn btn-primary px-6 rounded-xl text-white font-bold"
        >
          Sign In
        </Link>
      </div>
    );
  }

  // Helper for clean, accessible navigation links in both light & dark mode
  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    if (isActive) {
      return "bg-white text-slate-900 shadow-md font-bold px-3.5 py-2.5 rounded-xl flex items-center dark:bg-white/20 dark:text-white dark:border dark:border-white/25 dark:shadow-inner transition-all duration-150";
    }
    return "text-slate-900/85 hover:bg-white/60 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white px-3.5 py-2.5 rounded-xl flex items-center font-medium transition-all duration-150";
  };

  // Left-aligned User navigation links
  const userNavlinks = (
    <div className="flex flex-col gap-2 text-left">
      <Link
        href="/dashboard/profile"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/profile")}
      >
        <FaRegUserCircle className="inline text-xl mr-3 flex-shrink-0" /> My Profile
      </Link>
      <Link
        href="/dashboard/wishlist"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/wishlist")}
      >
        <BsClipboardHeart className="inline text-xl mr-3 flex-shrink-0" /> WishList
      </Link>
      <Link
        href="/dashboard/property-bought"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/property-bought")}
      >
        <FaBuildingUser className="inline text-xl mr-3 flex-shrink-0" /> Property Bought
      </Link>
      <Link
        href="/dashboard/my-reviews"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/my-reviews")}
      >
        <MdReviews className="inline text-xl mr-3 flex-shrink-0" /> My Reviews
      </Link>
    </div>
  );

  // Left-aligned Agent navigation links
  const agentNavlinks = (
    <div className="flex flex-col gap-2 text-left">
      <Link
        href="/dashboard/profile"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/profile")}
      >
        <FaUserSecret className="inline text-xl mr-3 flex-shrink-0" /> Agent Profile
      </Link>
      <Link
        href="/dashboard/add-property"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/add-property")}
      >
        <BsBuildingFillAdd className="inline text-xl mr-3 flex-shrink-0" /> Add Property
      </Link>
      <Link
        href="/dashboard/added-properties"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/added-properties")}
      >
        <BsFillHousesFill className="inline text-xl mr-3 flex-shrink-0" /> My Added Properties
      </Link>
      <Link
        href="/dashboard/sold-properties"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/sold-properties")}
      >
        <GrMoney className="inline text-xl mr-3 flex-shrink-0" /> My Sold Properties
      </Link>
      <Link
        href="/dashboard/requested-properties"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/requested-properties")}
      >
        <BsBuildingExclamation className="inline text-xl mr-3 flex-shrink-0" /> Requested Properties
      </Link>
    </div>
  );

  // Left-aligned Admin navigation links
  const adminNavlinks = (
    <div className="flex flex-col gap-2 text-left">
      <Link
        href="/dashboard/profile"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/profile")}
      >
        <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> Admin Profile
      </Link>
      <Link
        href="/dashboard/manage-properties"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/manage-properties")}
      >
        <BsBuildingFillGear className="inline text-xl mr-3 flex-shrink-0" /> Manage Properties
      </Link>
      <Link
        href="/dashboard/manage-users"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/manage-users")}
      >
        <LiaUsersCogSolid className="inline text-xl mr-3 flex-shrink-0" /> Manage Users
      </Link>
      <Link
        href="/dashboard/manage-reviews"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/manage-reviews")}
      >
        <MdRateReview className="inline text-xl mr-3 flex-shrink-0" /> Manage reviews
      </Link>
    </div>
  );

  // Fraud notice
  const fraudNavlinks = (
    <div className="flex flex-col gap-2 text-left">
      <Link
        href="/dashboard/profile"
        onClick={closeDrawer}
        className={getNavLinkClass("/dashboard/profile")}
      >
        <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> Profile
      </Link>
      <div className="p-3 bg-red-600/20 text-red-800 dark:text-red-300 border border-red-500/30 rounded-xl text-xs font-bold space-y-1">
        <p>Sorry! You do not have access to any dashboard facility! (Because you were marked as fraud)</p>
        <p>Please contact admin!</p>
      </div>
    </div>
  );

  // Shared sidebar content (used both in desktop docked sidebar and mobile drawer)
  const sidebarBody = (
    <>
      {/* Header */}
      <HeaderText
        headerText={headerText}
        headerText2={headerText2}
        emailText={user?.email}
      />

      {/* Role Navigation Items */}
      {isLoading ? (
        <div className="flex justify-center py-6">
          <span className="loading loading-ring w-20 text-primary"></span>
        </div>
      ) : role === "admin" ? (
        adminNavlinks
      ) : role === "agent" ? (
        agentNavlinks
      ) : role === "fraud" ? (
        fraudNavlinks
      ) : (
        userNavlinks
      )}

      <hr className="border-slate-900/20 dark:border-white/20 my-2" />

      {/* Return to Homepage */}
      <Link
        href="/"
        onClick={closeDrawer}
        className="font-bold px-3.5 py-2.5 rounded-xl transition duration-200 flex items-center text-slate-900/90 hover:bg-white/60 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white"
      >
        <IoIosHome className="inline text-xl mr-3 flex-shrink-0" />
        HOMEPAGE
      </Link>

      {/* Log Out Button */}
      <button
        onClick={handleLogOut}
        className="btn bg-rose-600 hover:bg-rose-700 border-none text-white w-full btn-sm rounded-xl font-bold shadow-md transition"
      >
        <MdLogout className="inline text-lg mr-1" /> LOG OUT
      </button>
    </>
  );

  const gradientClass =
    role === "admin"
      ? "bg-gradient-to-tr from-[#38B6FF] to-blue-200 dark:from-slate-900 dark:via-slate-900/95 dark:to-sky-950/80 text-slate-900 dark:text-white dark:border dark:border-sky-500/30 shadow-xl"
      : role === "agent"
      ? "bg-gradient-to-tr from-blue-400 via-purple-400 to-purple-500 dark:from-slate-900 dark:via-slate-900/95 dark:to-purple-950/80 text-slate-900 dark:text-white dark:border dark:border-purple-500/30 shadow-xl"
      : "bg-gradient-to-tr from-[#FF5A3C] to-amber-300 dark:from-slate-900 dark:via-slate-900/95 dark:to-amber-950/70 text-slate-900 dark:text-white dark:border dark:border-amber-500/30 shadow-xl";

  return (
    <div className="relative min-h-[calc(100vh-10rem)] w-full max-w-full min-w-0">
      {/* Mobile Drawer Container (DaisyUI Drawer) */}
      <div className="drawer min-w-0 max-w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Content Area */}
        <div className="drawer-content flex flex-col min-w-0 max-w-full">
          {/* Mobile Dashboard Top Bar with toggle button */}
          <div className="flex md:hidden items-center justify-between p-3.5 mb-4 rounded-2xl bg-base-100 dark:bg-base-200/90 border border-base-content/10 shadow-sm">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-sm btn-primary text-white rounded-xl flex items-center gap-2 font-semibold drawer-button cursor-pointer"
              aria-label="Toggle dashboard menu"
            >
              <RiMenu3Line className="w-4 h-4 text-white" />
              <span>DASHBOARD MENU</span>
            </label>
            <span className="text-xs font-bold uppercase px-2.5 py-1 rounded-lg bg-primary/10 text-primary">
              {role || "Dashboard"}
            </span>
          </div>

          {/* Main Desktop Flex Layout */}
          <div className="flex flex-col md:flex-row gap-4 lg:gap-5 items-start min-w-0 w-full max-w-full">
            {/* Desktop Docked Sidebar (Always visible on md+, docked below top navbar at top-24, z-20 so it never overlaps top navbar) */}
            <aside className="hidden md:block w-60 lg:w-64 flex-shrink-0 sticky top-24 z-20">
              <div
                className={`menu gap-5 p-4 w-full rounded-3xl shadow-xl text-left ${gradientClass}`}
              >
                {sidebarBody}
              </div>
            </aside>

            {/* Dynamic Dashboard Page Outlet */}
            <div className="flex-1 min-w-0 w-full max-w-full bg-base-100 dark:bg-base-200/40 rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm border border-base-content/10">
              {children}
            </div>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer (controlled by mobile dashboard bar via htmlFor="my-drawer-2") */}
        <div className="drawer-side z-50 md:hidden">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div
            className={`menu gap-6 p-5 w-72 sm:w-80 min-h-full shadow-2xl text-left ${gradientClass}`}
          >
            {sidebarBody}
          </div>
        </div>
      </div>
    </div>
  );
}
