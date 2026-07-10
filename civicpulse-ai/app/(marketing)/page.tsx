import React from "react";
import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { Features } from "@/components/sections/Features";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Report civic issues effortlessly with CivicPulse AI.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Features />
      <PricingTiers />
      <FinalCTA />
    </>
  );
}
