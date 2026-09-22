"use client";

/**
 * DashboardNav — deep module for role-based dashboard navigation.
 *
 * Interface (small):
 *   <DashboardNav role={role} pathname={pathname} onClose={closeDrawer} />
 *
 * Implementation (large, hidden):
 *   - navConfig table: maps UserRole → nav items (icon, label, href)
 *   - Active-link class computation
 *   - Gradient class computation per role
 *   - Mobile drawer close on nav click
 *   - Fraud notice rendering
 *   - Homepage link and logout button
 *
 * Adding a new role or a new nav link requires editing only navConfig, not DashboardLayout.
 */

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import { useTheme } from "next-themes";
import { UserRole } from "@/types";
import ThemeToggle from "@/components/theme/ThemeToggle";
import toast from "react-hot-toast";

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
import { RiAdminFill } from "react-icons/ri";
import { LiaUsersCogSolid } from "react-icons/lia";
import { IoIosHome } from "react-icons/io";

// ---------------------------------------------------------------------------
// navConfig — the only place to edit when adding roles or nav items
// ---------------------------------------------------------------------------
type NavItem = { href: string; label: string; icon: React.ReactNode };

const navConfig: Record<Exclude<UserRole, "fraud">, NavItem[]> = {
  user: [
    { href: "/dashboard/profile", label: "My Profile", icon: <FaRegUserCircle className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/wishlist", label: "WishList", icon: <BsClipboardHeart className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/property-bought", label: "Property Bought", icon: <FaBuildingUser className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/my-reviews", label: "My Reviews", icon: <MdReviews className="inline text-xl mr-3 flex-shrink-0" /> },
  ],
  agent: [
    { href: "/dashboard/profile", label: "Agent Profile", icon: <FaUserSecret className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/add-property", label: "Add Property", icon: <BsBuildingFillAdd className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/added-properties", label: "My Added Properties", icon: <BsFillHousesFill className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/sold-properties", label: "My Sold Properties", icon: <GrMoney className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/requested-properties", label: "Requested Properties", icon: <BsBuildingExclamation className="inline text-xl mr-3 flex-shrink-0" /> },
  ],
  admin: [
    { href: "/dashboard/profile", label: "Admin Profile", icon: <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/manage-properties", label: "Manage Properties", icon: <BsBuildingFillGear className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/manage-users", label: "Manage Users", icon: <LiaUsersCogSolid className="inline text-xl mr-3 flex-shrink-0" /> },
    { href: "/dashboard/manage-reviews", label: "Manage reviews", icon: <MdRateReview className="inline text-xl mr-3 flex-shrink-0" /> },
  ],
};

const gradientConfig: Record<UserRole, string> = {
  admin: "bg-gradient-to-tr from-[#38B6FF] to-blue-200 dark:from-slate-900 dark:via-slate-900/95 dark:to-sky-950/80 text-slate-900 dark:text-white dark:border dark:border-sky-500/30 shadow-xl",
  agent: "bg-gradient-to-tr from-blue-400 via-purple-400 to-purple-500 dark:from-slate-900 dark:via-slate-900/95 dark:to-purple-950/80 text-slate-900 dark:text-white dark:border dark:border-purple-500/30 shadow-xl",
  user: "bg-gradient-to-tr from-[#FF5A3C] to-amber-300 dark:from-slate-900 dark:via-slate-900/95 dark:to-amber-950/70 text-slate-900 dark:text-white dark:border dark:border-amber-500/30 shadow-xl",
  fraud: "bg-gradient-to-tr from-[#FF5A3C] to-amber-300 dark:from-slate-900 dark:via-slate-900/95 dark:to-amber-950/70 text-slate-900 dark:text-white dark:border dark:border-amber-500/30 shadow-xl",
};

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------
interface DashboardNavProps {
  role: UserRole;
  isRoleLoading: boolean;
  pathname: string;
  onClose: () => void;
}

export default function DashboardNav({
  role,
  isRoleLoading,
  pathname,
  onClose,
}: DashboardNavProps) {
  const router = useRouter();
  const { user, logOut } = useAuth();
  const { theme, resolvedTheme } = useTheme();

  const isDark = theme === "dark" || resolvedTheme === "dark";
  const gradientClass = gradientConfig[role] ?? gradientConfig.user;

  const getNavLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "bg-white text-slate-900 shadow-md font-bold px-3.5 py-2.5 rounded-xl flex items-center dark:bg-white/20 dark:text-white dark:border dark:border-white/25 dark:shadow-inner transition-all duration-150"
      : "text-slate-900/85 hover:bg-white/60 hover:text-slate-950 dark:text-slate-200 dark:hover:bg-white/10 dark:hover:text-white px-3.5 py-2.5 rounded-xl flex items-center font-medium transition-all duration-150";
  };

  const handleLogOut = () => {
    onClose();
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

  return (
    <div className={`menu gap-4 p-4 md:w-fit  h-full rounded-3xl text-left ${gradientClass}`}>
      {/* Brand Logo & Theme Changer Header */}
      <div className="flex items-center justify-between gap-2 px-1 pt-1 pb-1">
        <Link href="/" onClick={onClose} className="flex items-center group">
          <img
            src={isDark ? "/assets/home/logoDark.png" : "/assets/home/logoMain.png"}
            alt="ABuild Homes Estates Logo"
            className="h-10 sm:h-11 w-auto max-w-[155px] object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
        <ThemeToggle />
      </div>

      {/* User Profile Button / Card */}
      <Link
        href="/dashboard/profile"
        onClick={onClose}
        className={`group p-3 rounded-2xl flex items-center gap-3 transition-all duration-200 border ${pathname === "/dashboard/profile"
          ? "bg-white text-slate-900 shadow-md border-white/60 dark:bg-white/20 dark:text-white dark:border-white/30"
          : "bg-white/45 hover:bg-white/70 text-slate-900 border-white/35 dark:bg-black/30 dark:hover:bg-white/10 dark:text-white dark:border-white/10 shadow-sm"
          }`}
        title="View & Edit Profile"
      >
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
            <img
              src={user?.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
              alt={user?.displayName || "Profile avatar"}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
        </div>
        <div className="min-w-0 flex-1  text-left">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-bold truncate">
              {user?.displayName || "Home Seeker"}
            </p>
            <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md bg-primary text-white flex-shrink-0">
              {role || "user"}
            </span>
          </div>
          <p className="text-[11px] opacity-75 truncate">
            {user?.email || "No email"}
          </p>
        </div>
      </Link>

      {/* Section Divider */}
      <div className="flex items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">
          {role ? `${role} Workspace` : "Dashboard Workspace"}
        </span>
      </div>

      {/* Nav items */}
      {isRoleLoading ? (
        <div className="flex justify-center py-6">
          <span className="loading loading-ring w-20 text-primary"></span>
        </div>
      ) : role === "fraud" ? (
        <div className="flex flex-col gap-2 text-left">
          <Link href="/dashboard/profile" onClick={onClose} className={getNavLinkClass("/dashboard/profile")}>
            <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> Profile
          </Link>
          <div className="p-3 bg-red-600/20 text-red-800 dark:text-red-300 border border-red-500/30 rounded-xl text-xs font-bold space-y-1">
            <p>Sorry! You do not have access to any dashboard facility! (Because you were marked as fraud)</p>
            <p>Please contact admin!</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 text-left">
          {(navConfig[role as Exclude<UserRole, "fraud">] ?? navConfig.user).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={getNavLinkClass(item.href)}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </div>
      )}

      <hr className="border-slate-900/20 dark:border-white/20 my-1" />

      {/* Homepage Back Link */}
      <Link
        href="/"
        onClick={onClose}
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
    </div>
  );
}
