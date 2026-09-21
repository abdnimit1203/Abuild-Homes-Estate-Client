import axios from "axios";

/**
 * Uploads an image file to ImgBB and returns the hosted HTTPS URL.
 * Checks NEXT_PUBLIC_IMGBB_API_KEY, NEXT_PUBLIC_IMAGE_API_KEY, or VITE_IMAGE_API_KEY.
 */
export async function uploadImageToImgBB(
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> {
  const apiKey =
    process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
    process.env.NEXT_PUBLIC_IMAGE_API_KEY ||
    (typeof window !== "undefined" && (window as any).IMGBB_KEY);

  if (!apiKey) {
    throw new Error(
      "ImgBB API key is missing. Please configure NEXT_PUBLIC_IMGBB_API_KEY in Abuild-Homes-Estate-Client/.env.local, or paste an image URL directly."
    );
  }

  const formData = new FormData();
  formData.append("image", file);

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
    return res.data.data.display_url || res.data.data.url;
  }

  throw new Error(res.data?.error?.message || "Failed to upload image to ImgBB.");
}
