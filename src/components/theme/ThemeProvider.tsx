"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="mytheme"
      value={{
        light: "mytheme",
        dark: "dark",
        mytheme: "mytheme",
      }}
      enableSystem={true}
      {...props}
    >
      <ThemeSync>{children}</ThemeSync>
    </NextThemesProvider>
  );
}

// Synchronizes the data-theme attribute and HTML 'dark' class for full Tailwind & DaisyUI compatibility
function ThemeSync({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();

  React.useEffect(() => {
    const isDark = theme === "dark" || resolvedTheme === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "mytheme");
    }
  }, [theme, resolvedTheme]);

  return <>{children}</>;
}
