import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/twitter-card.css";
import "./styles/music-player.css";
import "./styles/photo-carousel.css";
import "./styles/case-study.css";
import { CustomCursor } from "./components/CustomCursor";
import { PageTransition } from "./components/PageTransition";
import { Header } from "./components/Header";
import { GoogleAnalytics } from "./components/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: "Arpit Ahluwalia's UX Design Portfolio",
  description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions. Here's all my creative work ranging from design strategy, UX/UI, graphic design, photography, music production, and more.",
  keywords: ["UX Design", "UI Design", "Strategic Design", "Product Design", "Portfolio", "Arpit Ahluwalia"],
  authors: [{ name: "Arpit Ahluwalia" }],
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/profilepic.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/images/profilepic.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Arpit Ahluwalia",
  },
  openGraph: {
    type: "website",
    title: "Arpit Ahluwalia's UX Design Portfolio",
    description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions.",
    url: "https://www.arpitahluwalia.com/",
    siteName: "Arpit Ahluwalia",
    images: [
      {
        url: "https://www.arpitahluwalia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arpit Ahluwalia - UX Design Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Ahluwalia's UX Design Portfolio",
    description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions.",
    images: ["https://www.arpitahluwalia.com/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        <CustomCursor />
        <Header />
        <PageTransition>
          {children}
        </PageTransition>
        <footer className="text-center pt-8 pb-24 md:pb-8 px-4 text-gray-400 text-sm">
          Vibe-coded from scratch using{' '}
          <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-gray-600 transition-colors">Cursor</a>
          {' & '}
          <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 underline hover:text-gray-600 transition-colors">Claude</a>
        </footer>
      </body>
    </html>
  );
}

