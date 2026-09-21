"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { axiosPublic } from "@/lib/api";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signupUser: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  googleSignIn: () => Promise<any>;
  updateUserProfile: (username: string, url: string) => Promise<any>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();

  const signupUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUserProfile = (username: string, url: string) => {
    if (!auth.currentUser) return Promise.reject(new Error("No user logged in"));
    return updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: url,
    });
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      if (typeof window !== "undefined") {
        localStorage.removeItem("access-token");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        try {
          const res = await axiosPublic.post("/jwt", { email: currentUser.email });
          if (res.data?.token && typeof window !== "undefined") {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (error) {
          console.error("Failed to generate JWT token:", error);
        } finally {
          setLoading(false);
        }
      } else {
        if (typeof window !== "undefined") {
          localStorage.removeItem("access-token");
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo: AuthContextType = {
    user,
    loading,
    signupUser,
    signIn,
    googleSignIn,
    updateUserProfile,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
}
