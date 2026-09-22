import axios from "axios";
import { auth } from "./firebase";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://abuild-homes-estate-server-2.onrender.com";

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-client-request": "abuild-homes-estate",
  },
});

export const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-client-request": "abuild-homes-estate",
  },
});

/**
 * Resolves the active authentication token.
 * 1. Reads from localStorage ('access-token')
 * 2. If missing/empty and user is logged into Firebase, requests a fresh JWT from /jwt
 * 3. Falls back to Firebase ID token
 */
export async function getValidToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  let token = localStorage.getItem("access-token");
  if (token) return token;

  if (auth.currentUser?.email) {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/jwt`,
        { email: auth.currentUser.email },
        { headers: { "x-client-request": "abuild-homes-estate" } }
      );
      if (res.data?.token) {
        token = res.data.token;
        localStorage.setItem("access-token", token as string);
        return token;
      }
    } catch (e) {
      try {
        const idToken = await auth.currentUser.getIdToken();
        if (idToken) return idToken;
      } catch (fbErr) {
        // Fallthrough
      }
    }
  }

  return null;
}

// Request interceptor: automatically attach Authorization Bearer token to all outgoing requests
const setupRequestInterceptor = (instance: typeof axiosPublic) => {
  instance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getValidToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        // Request continues even if token resolution fails
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Response interceptor: automatically retry on 401 by requesting a fresh token
const setupResponseInterceptor = (instance: typeof axiosPublic) => {
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        if (typeof window !== "undefined" && auth.currentUser?.email) {
          try {
            const res = await axios.post(
              `${API_BASE_URL}/jwt`,
              { email: auth.currentUser.email },
              { headers: { "x-client-request": "abuild-homes-estate" } }
            );
            if (res.data?.token) {
              const freshToken = res.data.token;
              localStorage.setItem("access-token", freshToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${freshToken}`;
              }
              return instance(originalRequest);
            }
          } catch (refreshErr) {
            console.warn("Silent token refresh failed:", refreshErr);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

setupRequestInterceptor(axiosSecure);
setupResponseInterceptor(axiosSecure);

setupRequestInterceptor(axiosPublic);
setupResponseInterceptor(axiosPublic);
