import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./styles/music-player.css";
import "./styles/case-study.css";
import "./styles/case-study-v4.css";
import "./styles/home-v4.css";
import "./styles/more-v4.css";
import "./styles/about-v4.css";
import "./styles/password-gate.css";
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
  title: "Arpit Ahluwalia's Portfolio",
  description: "Strategic Designer based in Washington, DC blending aesthetics, creativity, and usability in my solutions. Here's all my creative work ranging from design strategy, UX/UI, graphic design, photography, music production, and more.",
  keywords: ["UX Design", "UI Design", "Strategic Design", "Product Design", "Portfolio", "Arpit Ahluwalia"],
  authors: [{ name: "Arpit Ahluwalia" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/images/profilepic.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Arpit Ahluwalia",
  },
  openGraph: {
    type: "website",
    title: "Arpit Ahluwalia's Portfolio",
    description: "Strategic Designer based in Washington, DC blending aesthetics, creativity, and usability in my solutions.",
    url: "https://www.arpitahluwalia.com/",
    siteName: "Arpit Ahluwalia",
    images: [
      {
        url: "https://www.arpitahluwalia.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arpit Ahluwalia - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Ahluwalia's Portfolio",
    description: "Strategic Designer based in Washington, DC blending aesthetics, creativity, and usability in my solutions.",
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <GoogleAnalytics />
        <Analytics />
        <SpeedInsights />
        <CustomCursor />
        <Header />
        <PageTransition>
          {children}
        </PageTransition>
        <footer className="site-footer">
          <div className="site-footer__mono site-footer__credit">
            Developed with <span className="heart" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg></span>
          </div>
          <div className="site-footer__mono site-footer__links">
            <a className="site-footer__link" href="mailto:arpit.ahluwalia1@gmail.com" aria-label="Email Arpit Ahluwalia">Email</a>
            <a className="site-footer__link" href="https://www.linkedin.com/in/arpitahluwalia/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">LinkedIn</a>
            <a className="site-footer__link" href="https://github.com/Spartacau5" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">GitHub</a>
          </div>
        </footer>
      </body>
    </html>
  );
}

