"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic, axiosSecure } from "@/lib/api";
import {
  Users,
  Shield,
  ShieldAlert,
  Trash2,
  Building,
  User,
  ChevronDown,
  ArrowRightLeft,
  Mail,
  Search,
  Filter,
  X,
  RotateCcw,
} from "lucide-react";
import toast from "react-hot-toast";
import { UserProfile } from "@/types";
import { confirmDelete } from "@/lib/confirmDialog";

export default function ManageUsersPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [roleFilter, setRoleFilter] = React.useState<string>("all");

  const { data: users = [], isLoading, refetch } = useQuery<UserProfile[]>({
    queryKey: ["admin-manage-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/users");
      return res.data || [];
    },
  });

  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter;
      const query = searchQuery.trim().toLowerCase();
      const displayName = (u.name || (u as any).userName || "").toLowerCase();
      const email = (u.email || "").toLowerCase();
      const matchesSearch = !query || displayName.includes(query) || email.includes(query);
      return matchesRole && matchesSearch;
    });
  }, [users, roleFilter, searchQuery]);

  const hasActiveFilters = searchQuery.trim() !== "" || roleFilter !== "all";

  const handleClearFilters = () => {
    setSearchQuery("");
    setRoleFilter("all");
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    try {
      await axiosSecure.patch(`/api/v1/users?id=${id}&role=${newRole}`);
      toast.success(`User role updated to ${newRole}`);
      refetch();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  const handleMarkFraud = async (id: string, email: string) => {
    const isConfirmed = await confirmDelete({
      title: "Mark Agent as Fraud?",
      text: `Are you sure you want to mark ${email} as fraud? This will restrict all of their listings.`,
      confirmButtonText: "Yes, mark fraud",
    });
    if (!isConfirmed) return;

    try {
      await axiosSecure.patch(`/api/v1/users/fraud?id=${id}&email=${email}`);
      toast.success("Agent marked as Fraud and their listings restricted");
      refetch();
    } catch (err) {
      toast.error("Failed to mark agent as fraud");
    }
  };

  const handleDeleteUser = async (u: UserProfile) => {
    if (!u._id) return;
    const displayName = u.name || (u as any).userName || u.email;

    const isConfirmed = await confirmDelete({
      title: "Delete User Account?",
      text: `Are you sure you want to delete "${displayName}"? This will remove their record from the database and delete their authentication account from Firebase.`,
      confirmButtonText: "Yes, delete user & Firebase account",
    });
    if (!isConfirmed) return;

    const toastId = toast.loading(`Deleting "${displayName}" from Database & Firebase...`);
    try {
      // 1. Delete from backend (MongoDB + Firebase Admin)
      const res = await axiosSecure.delete(
        `/api/v1/users?id=${u._id}&email=${encodeURIComponent(u.email || "")}&uid=${encodeURIComponent(u.uid || "")}`
      );

      // 2. Also trigger Next.js internal Firebase Admin deletion if configured
      try {
        await fetch("/api/admin/delete-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uid: u.uid, email: u.email }),
        });
      } catch (localFbErr) {
        console.debug("Local Firebase admin deletion attempt:", localFbErr);
      }

      if (res.data?.firebaseDeleted) {
        toast.success(`User "${displayName}" deleted from Database & Firebase!`, { id: toastId });
      } else {
        toast.success(`User "${displayName}" deleted successfully`, { id: toastId });
      }
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete user", { id: toastId });
    }
  };

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-base-content">User & Role Management</h1>
          <p className="text-xs sm:text-sm text-base-content/60">
            Assign administrative permissions, designate verified agents, or restrict rogue accounts
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <span className="badge badge-lg bg-[#38B6FF]/15 text-[#38B6FF] border-0 font-bold self-start sm:self-auto">
            Total: {users.length}
          </span>
          <span className="badge badge-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0 font-bold self-start sm:self-auto">
            Agents: {users.filter((u) => u.role === "agent").length}
          </span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 sm:p-4 rounded-2xl bg-base-100 dark:bg-base-200/50 border border-base-content/15 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email address..."
              className="w-full pl-9 pr-9 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs sm:text-sm text-base-content placeholder:text-base-content/40 focus:outline-none focus:ring-2 focus:ring-[#38B6FF] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content p-0.5"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Role Dropdown Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:flex-initial">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#38B6FF]" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto pl-8 pr-8 py-2 rounded-xl bg-base-200/60 dark:bg-neutral-800 border border-base-content/10 text-xs font-bold text-base-content focus:outline-none focus:ring-2 focus:ring-[#38B6FF] cursor-pointer appearance-none"
              >
                <option value="all">All Roles ({users.length})</option>
                <option value="admin">Admins ({users.filter((u) => u.role === "admin").length})</option>
                <option value="agent">Agents ({users.filter((u) => u.role === "agent").length})</option>
                <option value="user">Users ({users.filter((u) => u.role === "user").length})</option>
                <option value="fraud">Fraud ({users.filter((u) => u.role === "fraud").length})</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0"
                title="Clear all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Results Summary */}
        <div className="flex items-center justify-between text-xs text-base-content/60 pt-1 border-t border-base-content/10">
          <span>
            Showing <strong className="text-base-content">{filteredUsers.length}</strong> of {users.length} users
          </span>
          {hasActiveFilters && (
            <span className="text-xs text-[#38B6FF] font-semibold">Filters active</span>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 rounded-2xl bg-base-200 animate-pulse" />
          ))}
        </div>
      ) : filteredUsers.length > 0 ? (
        <div className="space-y-2 w-full max-w-full min-w-0">
          {/* Mobile Horizontal Scroll Indicator */}
          <div className="sm:hidden flex items-center justify-between px-1 text-xs text-base-content/50">
            <span className="flex items-center gap-1.5 font-medium">
              <ArrowRightLeft className="w-3.5 h-3.5 text-[#38B6FF]" />
              Swipe table horizontally to view actions
            </span>
          </div>

          {/* Table with Dedicated Scroller */}
          <div className="w-full max-w-full table-scroller rounded-3xl border border-base-content/15 bg-base-100 dark:bg-base-200/50 shadow-sm">
            <table className="table w-full min-w-[580px] md:min-w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-base-200/90 dark:bg-base-300 text-xs font-black uppercase tracking-wider text-base-content border-b-2 border-base-content/20">
                <tr>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">User</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Email Address</th>
                  <th className="py-3.5 px-3 sm:px-4 border-r border-base-content/15">Current Role</th>
                  <th className="py-3.5 px-3 sm:px-4 text-right">Role Actions & Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-content/10">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-base-300/30 transition-colors">
                    {/* User Name */}
                    <td className="py-3 px-3 sm:px-4 font-bold text-base-content border-r border-base-content/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                          {(u.name || (u as any).userName || "U").charAt(0).toUpperCase()}
                        </div>
                        <span className="font-bold">{u.name || (u as any).userName || "User"}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-3 sm:px-4 text-xs font-mono text-base-content/80 border-r border-base-content/10">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-base-content/50" />
                        {u.email}
                      </span>
                    </td>

                    {/* Current Role Badge */}
                    <td className="py-3 px-3 sm:px-4 border-r border-base-content/10">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          u.role === "admin"
                            ? "bg-amber-500/15 text-amber-500 border border-amber-500/20"
                            : u.role === "agent"
                            ? "bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/20"
                            : u.role === "fraud"
                            ? "bg-rose-950/20 text-rose-500 border border-rose-800/30"
                            : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/20"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>

                    {/* Role Actions Dropdown + Separate Delete Button */}
                    <td className="py-3 px-3 sm:px-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        {/* Role Action Dropdown */}
                        <div className="dropdown dropdown-end">
                          <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-outline border-base-content/20 hover:border-[#38B6FF] hover:bg-[#38B6FF]/10 text-base-content rounded-xl font-bold flex items-center gap-1.5"
                          >
                            <span>Change Role</span>
                            <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content z-30 menu p-2 shadow-2xl bg-base-100 dark:bg-base-200 rounded-2xl w-52 border border-base-content/10 space-y-1 mt-1 text-xs font-semibold"
                          >
                            {u.role !== "admin" && (
                              <li>
                                <button
                                  onClick={() => u._id && handleRoleChange(u._id, "admin")}
                                  className="flex items-center gap-2 text-amber-500 hover:bg-amber-500/10 rounded-xl py-2"
                                >
                                  <Shield className="w-4 h-4" />
                                  Make Admin
                                </button>
                              </li>
                            )}
                            {u.role !== "agent" && (
                              <li>
                                <button
                                  onClick={() => u._id && handleRoleChange(u._id, "agent")}
                                  className="flex items-center gap-2 text-[#38B6FF] hover:bg-[#38B6FF]/10 rounded-xl py-2"
                                >
                                  <Building className="w-4 h-4" />
                                  Make Agent
                                </button>
                              </li>
                            )}
                            {u.role !== "user" && (
                              <li>
                                <button
                                  onClick={() => u._id && handleRoleChange(u._id, "user")}
                                  className="flex items-center gap-2 text-emerald-500 hover:bg-emerald-500/10 rounded-xl py-2"
                                >
                                  <User className="w-4 h-4" />
                                  Make Regular User
                                </button>
                              </li>
                            )}
                            {u.role === "agent" && (
                              <>
                                <hr className="border-base-content/10 my-1" />
                                <li>
                                  <button
                                    onClick={() => u._id && handleMarkFraud(u._id, u.email)}
                                    className="flex items-center gap-2 text-rose-500 hover:bg-rose-500/10 rounded-xl py-2 font-bold"
                                  >
                                    <ShieldAlert className="w-4 h-4" />
                                    Mark as Fraud
                                  </button>
                                </li>
                              </>
                            )}
                          </ul>
                        </div>

                        {/* Separate Delete User Button */}
                        <button
                          onClick={() => handleDeleteUser(u)}
                          className="btn btn-sm btn-square btn-ghost text-rose-500 hover:bg-rose-500/15 hover:text-rose-600 rounded-xl transition-all"
                          title="Delete User Account (Database & Firebase)"
                          aria-label="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-base-200/30 rounded-3xl border border-base-content/10 space-y-3">
          <Users className="w-12 h-12 text-base-content/20 mx-auto" />
          <div>
            <p className="text-lg font-bold text-base-content">
              {hasActiveFilters ? "No matching users found" : "No registered users found"}
            </p>
            <p className="text-xs text-base-content/60 mt-1 max-w-md mx-auto">
              {hasActiveFilters
                ? "No user accounts match your search query or role filter. Try clearing filters to see all users."
                : "New user registrations will appear here for role assignment and management."}
            </p>
          </div>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2 rounded-xl bg-[#38B6FF] hover:bg-[#2fa3e6] text-white text-xs font-bold transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
