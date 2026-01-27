import type { Metadata } from "next";
import "./globals.css";
import "./styles/twitter-card.css";
import "./styles/music-player.css";
import "./styles/photo-carousel.css";

export const metadata: Metadata = {
  title: "Arpit Ahluwalia's UX Design Portfolio",
  description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions. Here's all my creative work ranging from design strategy, UX/UI, graphic design, photography, music production, and more.",
  keywords: ["UX Design", "UI Design", "Strategic Design", "Product Design", "Portfolio", "Arpit Ahluwalia"],
  authors: [{ name: "Arpit Ahluwalia" }],
  openGraph: {
    type: "website",
    title: "Arpit Ahluwalia's UX Design Portfolio",
    description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions.",
    url: "https://www.arpitahluwalia.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arpit Ahluwalia's UX Design Portfolio",
    description: "Strategic Designer based in Brooklyn blending aesthetics, creativity, and usability in my solutions.",
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
        {children}
      </body>
    </html>
  );
}
