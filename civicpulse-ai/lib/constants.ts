import { NavLink } from "@/types";

export const SITE_CONFIG = {
  name: "CivicPulse AI",
  description: "AI-powered municipal infrastructure complaint & auto-dispatch platform.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const SOCIAL_LINKS = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];
