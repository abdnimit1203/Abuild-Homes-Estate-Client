"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./AuthProvider";
import { ThemeProvider } from "../theme/ThemeProvider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3500,
              style: {
                borderRadius: "14px",
                background: "#0f172a",
                color: "#ffffff",
                fontSize: "14px",
                fontWeight: "600",
                padding: "12px 18px",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
              },
              loading: {
                style: {
                  background: "#0f172a",
                  color: "#ffffff",
                  border: "1px solid rgba(56, 182, 255, 0.4)",
                  boxShadow: "0 14px 30px -5px rgba(56, 182, 255, 0.25)",
                },
                iconTheme: {
                  primary: "#38B6FF",
                  secondary: "#1e293b",
                },
              },
              success: {
                duration: 3500,
                style: {
                  background: "#064e3b",
                  color: "#ecfdf5",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  boxShadow: "0 14px 30px -5px rgba(16, 185, 129, 0.25)",
                },
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#ffffff",
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: "#4c0519",
                  color: "#fff1f2",
                  border: "1px solid rgba(244, 63, 94, 0.35)",
                  boxShadow: "0 14px 30px -5px rgba(225, 29, 72, 0.25)",
                },
                iconTheme: {
                  primary: "#f43f5e",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
