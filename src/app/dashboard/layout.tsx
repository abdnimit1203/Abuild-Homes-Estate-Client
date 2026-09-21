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
import { RiAdminFill } from "react-icons/ri";
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
      toast("User has been logged out", {
        icon: "👋",
        style: {
          background: "#ff92b4",
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

  // Left-aligned User navigation links
  const userNavlinks = (
    <div className="flex flex-col gap-2 text-left">
      <Link
        href="/dashboard/profile"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/profile"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <FaRegUserCircle className="inline text-xl mr-3 flex-shrink-0" /> My Profile
      </Link>
      <Link
        href="/dashboard/wishlist"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/wishlist"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <BsClipboardHeart className="inline text-xl mr-3 flex-shrink-0" /> WishList
      </Link>
      <Link
        href="/dashboard/property-bought"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/property-bought"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <FaBuildingUser className="inline text-xl mr-3 flex-shrink-0" /> Property Bought
      </Link>
      <Link
        href="/dashboard/my-reviews"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/my-reviews"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
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
        className={
          pathname === "/dashboard/profile"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <FaUserSecret className="inline text-xl mr-3 flex-shrink-0" /> Agent Profile
      </Link>
      <Link
        href="/dashboard/add-property"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/add-property"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <BsBuildingFillAdd className="inline text-xl mr-3 flex-shrink-0" /> Add Property
      </Link>
      <Link
        href="/dashboard/added-properties"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/added-properties"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <BsFillHousesFill className="inline text-xl mr-3 flex-shrink-0" /> My Added Properties
      </Link>
      <Link
        href="/dashboard/sold-properties"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/sold-properties"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <GrMoney className="inline text-xl mr-3 flex-shrink-0" /> My Sold Properties
      </Link>
      <Link
        href="/dashboard/requested-properties"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/requested-properties"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
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
        className={
          pathname === "/dashboard/profile"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> Admin Profile
      </Link>
      <Link
        href="/dashboard/manage-properties"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/manage-properties"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <BsBuildingFillGear className="inline text-xl mr-3 flex-shrink-0" /> Manage Properties
      </Link>
      <Link
        href="/dashboard/manage-users"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/manage-users"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <LiaUsersCogSolid className="inline text-xl mr-3 flex-shrink-0" /> Manage Users
      </Link>
      <Link
        href="/dashboard/manage-reviews"
        onClick={closeDrawer}
        className={
          pathname === "/dashboard/manage-reviews"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
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
        className={
          pathname === "/dashboard/profile"
            ? "active bg-base-100 px-3 py-2 text-neutral rounded-xl font-semibold flex items-center"
            : "hover:bg-base-100 px-3 py-2 hover:text-neutral transition duration-200 rounded-xl flex items-center text-black font-medium"
        }
      >
        <RiAdminFill className="inline text-xl mr-3 flex-shrink-0" /> Profile
      </Link>
      <div className="p-3 bg-red-600/20 rounded-xl text-red-900 text-xs font-bold space-y-1">
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
          <span className="loading loading-ring w-20 text-black"></span>
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

      <hr className="border-white/50 my-2" />

      {/* Return to Homepage */}
      <Link
        href="/"
        onClick={closeDrawer}
        className="hover:bg-white/80 font-bold px-3 py-2.5 rounded-2xl transition duration-200 flex items-center text-black"
      >
        <IoIosHome className="inline text-xl mr-3 flex-shrink-0" />
        HOMEPAGE
      </Link>

      {/* Log Out Button */}
      <button
        onClick={handleLogOut}
        className="btn btn-secondary border-white hover:border-white w-full text-white btn-sm rounded-xl font-bold"
      >
        <MdLogout className="inline text-lg mr-1" /> LOG OUT
      </button>
    </>
  );

  const gradientClass =
    role === "admin"
      ? "bg-gradient-to-tr from-[#38B6FF] to-blue-200 text-black"
      : role === "agent"
      ? "bg-gradient-to-tr from-blue-400 via-purple-400 to-purple-500 border-r-2 border-[#ffffff56] text-black"
      : "bg-gradient-to-tr from-[#FF5A3C] to-amber-300 text-black";

  return (
    <div className="relative min-h-[calc(100vh-10rem)] w-full max-w-full min-w-0">
      {/* Mobile Drawer Container (DaisyUI Drawer) */}
      <div className="drawer min-w-0 max-w-full">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Content Area */}
        <div className="drawer-content flex flex-col min-w-0 max-w-full overflow-x-hidden">
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

            {/* Dynamic Dashboard Page Outlet (Clean container without page-level scrollbars) */}
            <main className="flex-1 min-w-0 w-full max-w-full bg-base-100 dark:bg-base-200/40 rounded-3xl p-3.5 sm:p-5 lg:p-6 shadow-sm border border-base-content/10 overflow-hidden">
              {children}
            </main>
          </div>
        </div>

        {/* Mobile Slide-Out Drawer (controlled by top navbar hamburger via htmlFor="my-drawer-2", slides out under the z-50 top navbar) */}
        <div className="drawer-side z-40 md:hidden">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay !top-20"
          ></label>

          <div
            className={`mt-20 menu gap-6 p-5 w-72 sm:w-80 min-h-[calc(100vh-5rem)] shadow-2xl text-left ${gradientClass}`}
          >
            {sidebarBody}
          </div>
        </div>
      </div>
    </div>
  );
}
