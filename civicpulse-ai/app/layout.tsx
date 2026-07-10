import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    template: "%s | CivicPulse AI",
    default: "CivicPulse AI",
  },
  description: "AI-powered municipal infrastructure complaint & auto-dispatch platform.",
  openGraph: {
    title: "CivicPulse AI",
    description: "AI-powered municipal infrastructure complaint & auto-dispatch platform.",
    url: "/",
    siteName: "CivicPulse AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CivicPulse AI",
    description: "AI-powered municipal infrastructure complaint & auto-dispatch platform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakartaSans.variable}`}>
      <body className="antialiased min-h-screen flex flex-col font-body bg-background text-slate-400">
        <div className="aurora-blob-1"></div>
        <div className="aurora-blob-2"></div>
        {children}
      </body>
    </html>
  );
}
