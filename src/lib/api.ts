import axios from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://abuild-homes-estate-server-2.onrender.com";

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
});

export const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to automatically attach authorization bearer token
axiosSecure.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access-token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to gracefully handle 401/403 responses
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("Unauthorized API access detected:", error.response.status);
    }
    return Promise.reject(error);
  }
);
