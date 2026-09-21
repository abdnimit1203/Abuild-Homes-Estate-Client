import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

/**
 * Initializes the Firebase Admin SDK on Next.js server runtime.
 */
export function getFirebaseAdminAuth() {
  const apps = getApps();
  if (apps.length > 0) {
    return getAuth(apps[0]);
  }

  try {
    // 1. Check for complete Service Account JSON string or file path
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      let credentials;
      const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY.trim();
      if (raw.startsWith("{")) {
        credentials = JSON.parse(raw);
      } else {
        credentials = require(raw);
      }
      const app = initializeApp({
        credential: cert(credentials),
      });
      return getAuth(app);
    }

    // 2. Check for separate environment variables
    if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
      const projectId =
        process.env.FIREBASE_PROJECT_ID ||
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
        "abuild-homesabd";

      const app = initializeApp({
        credential: cert({
          projectId,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey,
        }),
      });
      return getAuth(app);
    }

    console.warn("⚠️ Firebase Admin credentials not found in Next.js environment.");
  } catch (err: any) {
    console.error("❌ Failed to initialize Firebase Admin in Next.js:", err.message);
  }

  return null;
}

/**
 * Delete a user from Firebase Authentication by UID or Email.
 */
export async function deleteFirebaseUser({ uid, email }: { uid?: string; email?: string }) {
  const auth = getFirebaseAdminAuth();
  if (!auth) {
    return {
      deleted: false,
      message: "Firebase Admin credentials not configured.",
    };
  }

  try {
    let targetUid = uid;

    if (!targetUid && email) {
      try {
        const userRecord = await auth.getUserByEmail(email);
        targetUid = userRecord.uid;
      } catch (lookupErr: any) {
        if (lookupErr.code === "auth/user-not-found") {
          return {
            deleted: true,
            message: "User was already absent from Firebase Authentication.",
          };
        }
        throw lookupErr;
      }
    }

    if (!targetUid) {
      return {
        deleted: false,
        message: "No UID or Email provided.",
      };
    }

    await auth.deleteUser(targetUid);
    return {
      deleted: true,
      uid: targetUid,
      message: "User permanently deleted from Firebase Authentication.",
    };
  } catch (err: any) {
    if (err.code === "auth/user-not-found") {
      return {
        deleted: true,
        message: "User was already deleted or not found in Firebase Authentication.",
      };
    }
    return {
      deleted: false,
      error: err.message,
      code: err.code,
    };
  }
}
