"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { useRole } from "@/hooks/useRole";
import { axiosPublic } from "@/lib/api";
import ImageUpload from "@/components/common/ImageUpload";
import { User, Mail, Shield, CheckCircle, Edit3, Save, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const [role] = useRole(user?.email);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
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
              src={(isEditing && photoURL) ? photoURL : (user?.photoURL || "https://i.ibb.co/5x6DN2n/blank-dp.png")}
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

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleUpdateProfile} className="p-6 rounded-3xl bg-base-100 dark:bg-neutral-800/90 border border-[#38B6FF]/30 shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-base-content/10 pb-3">
              <div>
                <h3 className="text-base font-bold text-base-content">Edit Account Profile</h3>
                <p className="text-xs text-base-content/60">Update your public display name and avatar photo</p>
              </div>
              <button
                type="button"
                onClick={handleCancel}
                className="p-1.5 rounded-xl hover:bg-base-200 text-base-content/60 hover:text-base-content transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-base-content/80 mb-1.5">
                  Full Display Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-base-200 border border-base-content/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF]"
                />
              </div>

              <div>
                <ImageUpload
                  value={photoURL}
                  onChange={(url) => setPhotoURL(url)}
                  label="Profile Photo (Upload to ImgBB or Direct URL)"
                  required={false}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-base-content/10">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-base-200 hover:bg-base-300 text-base-content transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-[#38B6FF] hover:bg-[#2fa3e6] text-white flex items-center gap-2 shadow-md shadow-[#38B6FF]/20 transition disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </>
                )}
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
