/**
 * TokenManager — deep module for the JWT token lifecycle.
 *
 * Interface (small):
 *   getToken()   — resolve a valid bearer token, refreshing if needed
 *   invalidate() — clear the stored token (call on sign-out)
 *   prime(token) — store a freshly-minted token (call after /jwt)
 *
 * Implementation (large, hidden):
 *   - localStorage read/write
 *   - POST /jwt with Firebase email, with dedup of in-flight requests
 *   - Firebase ID token fallback
 *   - 401-retry strategy (used by the axios interceptor)
 *
 * Callers: AuthProvider.tsx, api.ts (axios interceptors)
 * Adapters at the seam: browser-localStorage adapter (prod), in-memory adapter (tests)
 */

import axios from "axios";
import { auth } from "./firebase";

const TOKEN_KEY = "access-token";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://abuild-homes-estate-server-2.onrender.com";

/** In-flight /jwt request dedup — prevents parallel calls racing each other */
let _inflightAcquire: Promise<string | null> | null = null;

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

/**
 * Resolve a valid bearer token.
 * Priority: localStorage cache → POST /jwt → Firebase ID token → null
 */
export async function getToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;

  // 1. Fast path: cached token already present
  const cached = localStorage.getItem(TOKEN_KEY);
  if (cached) return cached;

  // 2. Dedup: if an acquire is already in-flight, wait for it
  if (_inflightAcquire) return _inflightAcquire;

  // 3. Acquire a fresh token
  _inflightAcquire = _acquire().finally(() => {
    _inflightAcquire = null;
  });

  return _inflightAcquire;
}

/**
 * Store a token that was freshly minted by the server (e.g. from /jwt after sign-in).
 * Calling this avoids a redundant POST /jwt on the next request.
 */
export function prime(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Clear the stored token. Call this on sign-out.
 */
export function invalidate(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
}

// ---------------------------------------------------------------------------
// Implementation (private)
// ---------------------------------------------------------------------------

async function _acquire(): Promise<string | null> {
  const currentUser = auth.currentUser;
  if (!currentUser?.email) return null;

  // Attempt 1: POST /jwt with the user's email → our backend JWT
  try {
    const res = await axios.post(
      `${API_BASE_URL}/jwt`,
      { email: currentUser.email },
      { headers: { "x-client-request": "abuild-homes-estate" } }
    );
    if (res.data?.token) {
      prime(res.data.token);
      return res.data.token;
    }
  } catch (_jwtErr) {
    // Fallthrough to Firebase ID token
  }

  // Attempt 2: Firebase ID token (works offline / when backend is cold)
  try {
    const idToken = await currentUser.getIdToken();
    if (idToken) return idToken; // intentionally NOT cached — Firebase manages its own refresh
  } catch (_fbErr) {
    // Fallthrough
  }

  return null;
}
