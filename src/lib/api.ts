/**
 * api.ts — axios instances + interceptors.
 *
 * Token lifecycle is fully owned by TokenManager (@/lib/tokenManager).
 * This file only wires the interceptors to that seam.
 *
 * axiosPublic  — requests that don't require authentication (can still carry a token if present)
 * axiosSecure  — requests that require authentication (same behaviour; name preserved for callers)
 *
 * Both instances share the same interceptor setup because the TokenManager attaches the token
 * opportunistically: if none exists, the request goes through unauthenticated.
 */

import axios from "axios";
import { getToken, prime, invalidate, API_BASE_URL } from "./tokenManager";

export { API_BASE_URL } from "./tokenManager";

const SHARED_HEADERS = {
  "x-client-request": "abuild-homes-estate",
};

export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: SHARED_HEADERS,
});

export const axiosSecure = axios.create({
  baseURL: API_BASE_URL,
  headers: SHARED_HEADERS,
});

// ---------------------------------------------------------------------------
// Interceptors — delegate token work to TokenManager
// ---------------------------------------------------------------------------

function attachInterceptors(instance: typeof axiosPublic) {
  // Request: attach Authorization header when a token is available
  instance.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch {
        // Request continues unauthenticated if token resolution fails
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response: on 401, drop the cached token and retry once with a fresh one
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        // Drop the stale cached token so TokenManager acquires a fresh one
        invalidate();
        try {
          const freshToken = await getToken();
          if (freshToken) {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${freshToken}`;
            }
            return instance(originalRequest);
          }
        } catch {
          // Fallthrough to rejection
        }
      }
      return Promise.reject(error);
    }
  );
}

attachInterceptors(axiosPublic);
attachInterceptors(axiosSecure);

// ---------------------------------------------------------------------------
// Re-export token utilities for the rare caller that needs them directly
// (e.g. AuthProvider uses prime() and invalidate())
// ---------------------------------------------------------------------------
export { getToken, prime, invalidate };
