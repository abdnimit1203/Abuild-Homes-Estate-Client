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
                borderRadius: "12px",
                background: "hsl(var(--b1, 0 0% 100%))",
                color: "hsl(var(--bc, 0 0% 20%))",
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                border: "1px solid rgba(0,0,0,0.06)",
              },
              success: {
                style: {
                  background: "#18b47b",
                  color: "#ffffff",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#18b47b",
                },
              },
              error: {
                style: {
                  background: "#E11D48",
                  color: "#ffffff",
                },
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#E11D48",
                },
              },
            }}
          />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
