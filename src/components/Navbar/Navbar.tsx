"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import ThemeToggle from "../theme/ThemeToggle";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";

// Icons from react-icons and lucide
import { MdMail } from "react-icons/md";
import { RiShieldStarFill, RiAdminFill } from "react-icons/ri";
import { FaUser, FaUserSecret } from "react-icons/fa";
import { TiThMenuOutline } from "react-icons/ti";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logOut } = useAuth();
  const [role, isRoleLoading] = useRole(user?.email);
  const { theme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDark = theme === "dark" || resolvedTheme === "dark";
  const isDashboard = pathname.startsWith("/dashboard");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Top navigation bar links (Dashboard is NOT placed here per user specification)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "All Properties", href: "/all-properties" },
    { label: "Career", href: "/career" },
    { label: "About Us", href: "/about-us" },
  ];

  const handleLogOut = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logOut().then(() => {
      toast("User has been logged out", {
        icon: "👋",
        style: {
          background: "#ff92b4",
        },
      });
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-base-100/90 dark:bg-base-100/95 border-b border-base-content/10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile hamburger menu button for top navbar */}
          <div className="flex md:hidden">
            {isDashboard ? (
              <label
                htmlFor="my-drawer-2"
                className="btn btn-square btn-ghost text-base-content drawer-button cursor-pointer"
                aria-label="Toggle dashboard menu"
              >
                <TiThMenuOutline className="w-6 h-6 text-primary" />
              </label>
            ) : (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-square btn-ghost text-base-content"
                aria-label="Open navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            )}
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group py-1">
              <img
                src={isDark ? "/assets/home/logoDark.png" : "/assets/home/logoMain.png"}
                alt="ABuild Homes Estates Logo"
                className="h-9 sm:h-10 md:h-11 w-auto max-w-[150px] sm:max-w-[180px] md:max-w-[210px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Nav Links (No Dashboard in top nav links) */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 font-semibold">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3.5 py-2 rounded-xl text-sm transition duration-200 ${isActive
                      ? "active bg-primary text-base-100 font-bold shadow-sm"
                      : "hover:bg-primary px-3 py-2 hover:text-base-100 transition duration-200 rounded-xl"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions: Theme Controller & Role-based Profile Icon Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Profile Icon with primary border and online status indicator */}
                <div
                  tabIndex={0}
                  role="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="avatar online w-11 h-11 rounded-full border-2 border-primary cursor-pointer overflow-hidden p-[2px] transition hover:scale-105"
                  aria-label="User profile menu"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                    alt="user-photo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>

                {/* Role-Based Profile Dropdown View */}
                {dropdownOpen && (
                  <ul
                    tabIndex={0}
                    className="absolute right-0 mt-3 dropdown-content z-50 menu p-5 py-6 shadow-2xl bg-base-100 dark:bg-base-200 rounded-2xl min-w-[260px] border border-base-content/15 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150 text-base-content"
                  >
                    {/* Role Display */}
                    {isRoleLoading ? (
                      <p className="text-xs text-center text-base-content/60">Loading role...</p>
                    ) : (
                      role && role !== "user" && (
                        <>
                          <div className="text-center font-bold text-sm">
                            <RiShieldStarFill className="inline text-xl text-secondary mr-1" />
                            ROLE :{" "}
                            <span className="uppercase btn-secondary btn btn-xs text-white">
                              {role}
                            </span>
                          </div>
                          <hr className="border-base-content/20" />
                        </>
                      )
                    )}

                    {/* Display Name */}
                    {user?.displayName && (
                      <p className="font-semibold text-center text-sm text-base-content truncate px-1">
                        {user.displayName}
                      </p>
                    )}

                    {/* Email with Mail icon */}
                    <div className="text-xs text-center text-base-content/80 flex items-center justify-center gap-1.5 break-all px-1">
                      <MdMail className="inline text-lg text-secondary flex-shrink-0" />
                      <span>{user?.email}</span>
                    </div>

                    {/* The Single "Dashboard" Option */}
                    <Link
                      href="/dashboard/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="btn btn-primary btn-sm text-white w-full rounded-xl font-bold flex items-center justify-center gap-2 mt-2"
                    >
                      {role === "admin" && <RiAdminFill className="text-base" />}
                      {role === "agent" && <FaUserSecret className="text-base" />}
                      {role === "user" && <FaUser className="text-base" />}
                      Dashboard
                    </Link>

                    {/* Log Out Button */}
                    <button
                      onClick={handleLogOut}
                      className="btn btn-secondary border-white hover:border-white w-full text-white btn-sm rounded-xl font-bold"
                    >
                      LOG OUT
                    </button>
                  </ul>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="button button-1 px-5 py-2 rounded-xl text-xs font-bold hover:border-primary inline-flex items-center justify-center"
              >
                LOGIN
              </Link>
            )}

            {/* Theme Toggle Controller */}
            <div className="ml-1 sm:ml-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Top Navbar Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-base-content/10 bg-base-100 dark:bg-base-200 px-4 py-5 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-2 text-center">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-base transition ${isActive
                      ? "bg-primary text-white font-bold"
                      : "hover:bg-base-300 text-base-content"
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-base-content/10 flex justify-center">
            {user ? (
              <button
                onClick={handleLogOut}
                className="btn btn-secondary w-full text-white btn-sm rounded-xl font-bold"
              >
                LOG OUT
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="button button-1 w-full py-2.5 rounded-xl text-xs font-bold text-center inline-flex items-center justify-center"
              >
                LOGIN
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
