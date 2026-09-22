"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import { axiosPublic } from "@/lib/api";
import ImageUpload from "@/components/common/ImageUpload";
import {
  User,
  Mail,
  Shield,
  CheckCircle,
  Edit3,
  Save,
  X,
  Loader2,
  Camera,
  Calendar,
  Fingerprint,
  Lock,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole(user?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isEditing && !saving) {
        handleCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditing, saving]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your display name");
      return;
    }

    setSaving(true);
    const toastId = toast.loading("Updating profile & photo...");
    try {
      const finalPhoto = photoURL.trim() || user?.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png";

      // 1. Update Firebase profile
      await updateUserProfile(name.trim(), finalPhoto);

      // 2. Update MongoDB user record
      if (user?.email) {
        await axiosPublic.patch("/api/v1/users/profile", {
          email: user.email,
          name: name.trim(),
          imgUrl: finalPhoto,
          photoURL: finalPhoto,
        });
      }

      toast.success("Profile updated successfully!", { id: toastId });
      setIsEditing(false);
    } catch (err: any) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile", { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.displayName || "");
    setPhotoURL(user?.photoURL || "");
    setIsEditing(false);
  };

  const memberSince = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    : "Verified Member";

  return (
    <div className="space-y-6 sm:space-y-8 w-full max-w-5xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-base-content tracking-tight flex items-center gap-2">
            My Profile & Account
            <Sparkles className="w-5 h-5 text-[#38B6FF]" />
          </h1>
          <p className="text-xs sm:text-sm text-base-content/60 mt-1">
            Manage your personal real-estate identity, credentials, and verification status
          </p>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md shadow-[#38B6FF]/25 hover:shadow-lg hover:shadow-[#38B6FF]/35 transition-all duration-200 w-full sm:w-auto"
        >
          <Edit3 className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Main Profile Card */}
      <div className="rounded-3xl bg-base-100 dark:bg-base-200/50 border border-base-content/10 shadow-lg overflow-hidden">
        {/* Top Decorative Banner */}
        <div className="h-28 sm:h-36 w-full bg-gradient-to-r from-[#38B6FF]/25 via-primary/20 to-purple-500/20 border-b border-base-content/10 relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="inline-flex z-10 items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-md">
              <CheckCircle className="w-3.5 h-3.5 " />
              Verified
            </span>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="px-5 sm:px-8 pb-8 pt-0 relative">
          {/* Avatar and Primary Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-14 sm:-mt-16 mb-6">
            {/* Avatar with Camera Overlay Trigger */}
            <div className="relative group flex-shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden bg-base-300 border-4 border-base-100 dark:border-neutral-900 shadow-xl relative">
                <Image
                  src={user?.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png"}
                  alt={user?.displayName || "Profile photo"}
                  fill
                  sizes="128px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                title="Change profile photo"
                className="absolute -bottom-1.5 -right-1.5 p-2 rounded-2xl bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md border-2 border-base-100 dark:border-neutral-900 transition hover:scale-110"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            {/* Name, Role & Email */}
            <div className="text-center sm:text-left flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-base-content truncate">
                  {user?.displayName || "Home Seeker"}
                </h2>
                <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#38B6FF]/15 text-[#38B6FF] border border-[#38B6FF]/20">
                  <Shield className="w-3 h-3" />
                  {role || "User"}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-base-content/70 flex items-center justify-center sm:justify-start gap-1.5 truncate">
                <Mail className="w-4 h-4 text-[#38B6FF] flex-shrink-0" />
                <span className="truncate">{user?.email || "No email provided"}</span>
              </p>
            </div>

            {/* Mobile / Tablet Edit button */}
            <div className="w-full sm:w-auto pt-2 sm:pt-0">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content border border-base-content/10 transition"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#38B6FF]" />
                Update Profile
              </button>
            </div>
          </div>

          {/* Account Details Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 pt-6 border-t border-base-content/10">
            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-[#38B6FF]" />
                Full Display Name
              </div>
              <p className="text-sm font-bold text-base-content truncate">
                {user?.displayName || "Not specified"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5 text-[#38B6FF]" />
                Email Address
              </div>
              <p className="text-sm font-bold text-base-content truncate">
                {user?.email || "N/A"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-[#38B6FF]" />
                Assigned Role
              </div>
              <p className="text-sm font-bold text-base-content capitalize">
                {role || "user"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Account Status
              </div>
              <p className="text-sm font-bold text-emerald-500">
                Active & Authenticated
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5 text-[#38B6FF]" />
                Member Since
              </div>
              <p className="text-sm font-bold text-base-content">
                {memberSince}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10 space-y-1">
              <div className="flex items-center gap-2 text-base-content/60 text-xs font-bold uppercase tracking-wider">
                <Fingerprint className="w-3.5 h-3.5 text-[#38B6FF]" />
                User UID
              </div>
              <p className="text-xs font-mono font-bold text-base-content/80 truncate">
                {user?.uid ? `${user.uid.slice(0, 18)}...` : "Authenticated"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Account Profile Modal Dialog */}
      {isEditing && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-profile-modal-title"
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-150"
          onClick={(e) => {
            if (e.target === e.currentTarget && !saving) {
              handleCancel();
            }
          }}
        >
          <div className="bg-base-100 dark:bg-neutral-900 border border-base-content/15 rounded-3xl shadow-2xl w-full max-w-lg my-auto overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-base-content/10 flex-shrink-0 bg-base-200/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#38B6FF]/15 text-[#38B6FF] flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3
                    id="edit-profile-modal-title"
                    className="text-base sm:text-lg font-bold text-base-content"
                  >
                    Edit Account Profile
                  </h3>
                  <p className="text-[11px] sm:text-xs text-base-content/60">
                    Update your avatar photo and display name
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                aria-label="Close modal"
                className="p-1.5 rounded-xl hover:bg-base-200 text-base-content/60 hover:text-base-content transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleUpdateProfile} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
              {/* Profile Photo Uploader (Avatar Variant) */}
              <div className="p-4 rounded-2xl bg-base-200/40 border border-base-content/10">
                <ImageUpload
                  value={photoURL}
                  onChange={(url) => setPhotoURL(url)}
                  label="Profile Avatar Photo"
                  required={false}
                  variant="avatar"
                />
              </div>

              {/* Full Display Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-base-content/80">
                  Full Display Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-200 border border-base-content/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content font-medium transition"
                  />
                </div>
              </div>

              {/* Email (Read-Only) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-base-content/80">
                    Email Address
                  </label>
                  <span className="text-[11px] text-base-content/50 flex items-center gap-1">
                    <Lock className="w-3 h-3" /> Managed by Auth
                  </span>
                </div>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-300/50 border border-base-content/10 text-sm text-base-content/60 cursor-not-allowed font-medium"
                  />
                </div>
              </div>

              {/* Modal Footer / Action Buttons (Mobile First Responsive) */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 pt-4 border-t border-base-content/10">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content transition text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white flex items-center justify-center gap-2 shadow-md shadow-[#38B6FF]/20 transition disabled:opacity-50"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
