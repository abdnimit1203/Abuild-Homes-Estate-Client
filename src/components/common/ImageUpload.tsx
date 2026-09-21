"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Link as LinkIcon, CheckCircle, AlertCircle, X, Loader2, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { uploadImageToImgBB } from "@/lib/imgbb";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Property Image",
  required = false,
}: ImageUploadProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file (PNG, JPG, WEBP)");
        return;
      }
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image file first");
      return;
    }

    setUploading(true);
    setProgress(10);
    const toastId = toast.loading("Uploading image to ImgBB...");

    try {
      const hostedUrl = await uploadImageToImgBB(selectedFile, (pct) => {
        setProgress(pct);
      });
      onChange(hostedUrl);
      toast.success("Image uploaded successfully to ImgBB!", { id: toastId });
      setSelectedFile(null);
      setFilePreview(null);
    } catch (err: any) {
      console.error("ImgBB upload error:", err);
      toast.error(err.message || "Failed to upload image to ImgBB", { id: toastId });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    onChange("");
    setSelectedFile(null);
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const currentPreview = value || filePreview;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-base-content/80">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        <div className="flex items-center gap-1 p-0.5 rounded-lg bg-base-300/40 text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "upload"
                ? "bg-[#38B6FF] text-white font-bold shadow-sm"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`px-2.5 py-1 rounded-md transition ${
              activeTab === "url"
                ? "bg-[#38B6FF] text-white font-bold shadow-sm"
                : "text-base-content/70 hover:text-base-content"
            }`}
          >
            Direct URL
          </button>
        </div>
      </div>

      {/* Preview Box */}
      {currentPreview ? (
        <div className="relative group w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-base-content/15 bg-base-300">
          <Image
            src={currentPreview}
            alt="Preview"
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition"
            >
              <X className="w-3.5 h-3.5" /> Remove Image
            </button>
          </div>
          {value && (
            <div className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-[11px] font-medium text-emerald-400 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Image ready for listing
            </div>
          )}
        </div>
      ) : null}

      {/* Upload Mode */}
      {activeTab === "upload" && !value && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-base-content/20 hover:border-[#38B6FF] rounded-2xl p-6 text-center cursor-pointer transition bg-base-100/50 hover:bg-[#38B6FF]/5 flex flex-col items-center justify-center gap-2"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="w-12 h-12 rounded-full bg-[#38B6FF]/10 text-[#38B6FF] flex items-center justify-center">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-base-content">
                {selectedFile ? selectedFile.name : "Click or drag to select an image"}
              </p>
              <p className="text-[11px] text-base-content/50 mt-0.5">
                Supports PNG, JPG, JPEG, WEBP (Max 10MB)
              </p>
            </div>
          </div>

          {selectedFile && !value && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs bg-[#38B6FF] hover:bg-[#2fa3e6] text-white shadow-md shadow-[#38B6FF]/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading to ImgBB ({progress}%)...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" />
                    Upload Image to ImgBB
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setFilePreview(null);
                }}
                className="p-2.5 rounded-xl border border-base-content/15 text-base-content/60 hover:text-rose-500 hover:border-rose-500/30 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {uploading && (
            <div className="w-full bg-base-300 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-[#38B6FF] h-1.5 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Direct URL Mode */}
      {activeTab === "url" && (
        <div className="space-y-1.5">
          <div className="relative">
            <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40" />
            <input
              type="url"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste direct HTTPS image URL (e.g. https://images.unsplash.com/... or https://i.ibb.co/...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-base-100 dark:bg-neutral-800/80 border border-base-content/15 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#38B6FF] text-base-content"
            />
          </div>
          <p className="text-[11px] text-base-content/50">
            Paste any existing public image URL or switch to &quot;Upload File&quot; to upload to ImgBB.
          </p>
        </div>
      )}

      {/* Active URL display if image is set via upload */}
      {value && activeTab === "upload" && (
        <div className="p-3 rounded-xl bg-base-100 dark:bg-neutral-800/60 border border-base-content/10 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 truncate text-base-content/70">
            <ImageIcon className="w-4 h-4 text-[#38B6FF] flex-shrink-0" />
            <span className="truncate font-mono text-[11px]">{value}</span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="text-[11px] font-bold text-rose-500 hover:underline flex-shrink-0"
          >
            Change
          </button>
        </div>
      )}
    </div>
  );
}
