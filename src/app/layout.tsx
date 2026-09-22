import type { Metadata, Viewport } from "next";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export const viewport: Viewport = {
  themeColor: "#38B6FF",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://abuild-homes-estate-abd.netlify.app"),
  title: {
    default: "ABuild Homes Estates | Premium Real Estate Platform",
    template: "%s | ABuild Homes Estates",
  },
  description:
    "Explore verified luxury homes, apartments, villas, and commercial properties. Secure online bidding and Stripe payment.",
  keywords: [
    "real estate",
    "luxury properties",
    "buy house",
    "verified homes",
    "Dhaka real estate",
    "ABuild Homes",
  ],
  authors: [{ name: "Abdullah Ibne Ali", url: "https://Abdullah1203.github.io/web-portfolio" }],
  creator: "Abdullah Ibne Ali (abd_nimit)",
  openGraph: {
    title: "ABuild Homes Estates | Modern Real Estate Platform",
    description:
      "Explore verified luxury homes and apartments with seamless offers and Stripe payments.",
    url: "https://abuild-homes-estate-abd.netlify.app",
    siteName: "ABuild Homes Estates",
    images: [
      {
        url: "/assets/home/banner.png",
        width: 1200,
        height: 630,
        alt: "ABuild Homes Estates",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/home/logo.png",
    apple: "/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col justify-between antialiased">
        <ClientProviders>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
