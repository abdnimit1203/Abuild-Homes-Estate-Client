import axios from "axios";
import imageCompression, { Options } from "browser-image-compression";

export interface CompressionStats {
  originalSizeKB: number;
  compressedSizeKB: number;
  savedPercent: number;
}

export interface UploadOptions {
  compress?: boolean;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  initialQuality?: number;
  onCompressStart?: () => void;
  onCompressEnd?: (stats: CompressionStats) => void;
}

/**
 * Compresses an image file in the browser using HTML5 Canvas & Web Workers.
 * Maintains high visual fidelity while significantly reducing file size.
 */
export async function compressImage(
  file: File,
  options?: Partial<Options>
): Promise<{ file: File; stats: CompressionStats }> {
  const originalSizeKB = Math.round(file.size / 1024);

  // Skip compression for GIFs, SVGs, or files already very small (<150KB)
  if (
    file.type === "image/gif" ||
    file.type === "image/svg+xml" ||
    file.size <= 150 * 1024
  ) {
    return {
      file,
      stats: {
        originalSizeKB,
        compressedSizeKB: originalSizeKB,
        savedPercent: 0,
      },
    };
  }

  const compressionConfig: Options = {
    maxSizeMB: options?.maxSizeMB ?? 1, // Target under 1 MB
    maxWidthOrHeight: options?.maxWidthOrHeight ?? 1920, // Downscale ultra-high resolution
    useWebWorker: true,
    initialQuality: options?.initialQuality ?? 0.85, // 85% retains excellent crisp detail
    fileType: file.type === "image/png" ? "image/png" : "image/jpeg",
    ...options,
  };

  try {
    const compressedBlob = await imageCompression(file, compressionConfig);
    const compressedFile = new File([compressedBlob], file.name, {
      type: compressedBlob.type || file.type,
      lastModified: Date.now(),
    });

    const compressedSizeKB = Math.round(compressedFile.size / 1024);
    const savedPercent =
      originalSizeKB > compressedSizeKB
        ? Math.round(((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100)
        : 0;

    return {
      file: compressedFile,
      stats: {
        originalSizeKB,
        compressedSizeKB,
        savedPercent,
      },
    };
  } catch (error) {
    console.warn("Client-side image compression fallback to original:", error);
    return {
      file,
      stats: {
        originalSizeKB,
        compressedSizeKB: originalSizeKB,
        savedPercent: 0,
      },
    };
  }
}

/**
 * Uploads an image file to ImgBB and returns the hosted HTTPS URL.
 * Automatically minimizes image size before upload while preserving visual quality.
 */
export async function uploadImageToImgBB(
  file: File,
  onProgress?: (percent: number) => void,
  options?: UploadOptions
): Promise<{ url: string; stats?: CompressionStats }> {
  const apiKey =
    process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
    process.env.NEXT_PUBLIC_IMAGE_API_KEY ||
    (typeof window !== "undefined" && (window as any).IMGBB_KEY);

  if (!apiKey) {
    throw new Error(
      "ImgBB API key is missing. Please configure NEXT_PUBLIC_IMGBB_API_KEY in Abuild-Homes-Estate-Client/.env.local, or paste an image URL directly."
    );
  }

  let uploadFile = file;
  let stats: CompressionStats | undefined;

  // Compress image prior to uploading unless explicitly opted out
  if (options?.compress !== false) {
    if (options?.onCompressStart) options.onCompressStart();
    const result = await compressImage(file, {
      maxSizeMB: options?.maxSizeMB,
      maxWidthOrHeight: options?.maxWidthOrHeight,
      initialQuality: options?.initialQuality,
    });
    uploadFile = result.file;
    stats = result.stats;
    if (options?.onCompressEnd) options.onCompressEnd(result.stats);
  }

  const formData = new FormData();
  formData.append("image", uploadFile);

  const res = await axios.post(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    }
  );

  if (res.data && res.data.data) {
    const url = res.data.data.display_url || res.data.data.url;
    return { url, stats };
  }

  throw new Error(res.data?.error?.message || "Failed to upload image to ImgBB.");
}
