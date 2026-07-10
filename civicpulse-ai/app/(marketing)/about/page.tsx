import React from "react";
import { MissionStory } from "@/components/about/MissionStory";
import { ValuesGrid } from "@/components/about/ValuesGrid";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our mission to improve civic infrastructure.",
};

export default function AboutPage() {
  return (
    <>
      <MissionStory />
      <ValuesGrid />
    </>
  );
}
