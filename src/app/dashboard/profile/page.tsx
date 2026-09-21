"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import { axiosPublic } from "@/lib/api";
import { User, Mail, Shield, CheckCircle, Edit3, Save } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole(user?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);

  const handleUpdateName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    const toastId = toast.loading("Updating profile...");
    try {
      await updateUserProfile(name, user?.photoURL || "");
      if (user?.email) {
        await axiosPublic.patch(`/api/v1/username?email=${user.email}&username=${name}`);
      }
      toast.success("Profile updated successfully!", { id: toastId });
      setIsEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-base-content">My Profile & Account</h1>
        <p className="text-xs sm:text-sm text-base-content/60">
          Manage your personal real-estate identity, credentials, and verification status
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-base-200/40 border border-base-content/10 shadow-sm space-y-8">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-base-300 border-4 border-[#38B6FF] shadow-lg flex-shrink-0">
            <Image
              src={user?.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
              alt={user?.displayName || "Profile photo"}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h2 className="text-2xl font-bold text-base-content">
                {user?.displayName || "Home Seeker"}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-base-100 dark:bg-base-200 border border-base-content/15 text-base-content hover:bg-base-300 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#38B6FF]" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <p className="text-sm text-base-content/70 flex items-center justify-center sm:justify-start gap-1.5">
              <Mail className="w-4 h-4 text-[#38B6FF]" />
              {user?.email}
            </p>

            <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#38B6FF]/15 text-[#38B6FF]">
                <Shield className="w-3.5 h-3.5" />
                Role: {role}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500">
                <CheckCircle className="w-3.5 h-3.5" />
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Edit Name Form */}
        {isEditing && (
          <form onSubmit={handleUpdateName} className="p-5 rounded-2xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/10 space-y-4">
            <h3 className="text-sm font-bold text-base-content">Update Display Name</h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new full name"
                className="flex-1 px-4 py-2 rounded-xl bg-base-200 border border-base-content/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
              />
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#38B6FF] text-white flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}

        {/* Account Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-base-content/10">
          <div className="p-4 rounded-2xl bg-base-100 dark:bg-base-200/60 border border-base-content/10">
            <p className="text-xs text-base-content/50 font-bold uppercase">Account Status</p>
            <p className="text-sm font-bold text-emerald-500 mt-1">Active & Authenticated</p>
          </div>
          <div className="p-4 rounded-2xl bg-base-100 dark:bg-base-200/60 border border-base-content/10">
            <p className="text-xs text-base-content/50 font-bold uppercase">Auth Provider</p>
            <p className="text-sm font-bold text-base-content mt-1">Firebase Authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}
