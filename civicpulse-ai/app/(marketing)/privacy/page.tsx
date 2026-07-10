import React from "react";
import { Container } from "@/components/ui/Container";
import { PolicyContent } from "@/components/privacy/PolicyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read our privacy policy to understand how we protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="py-20 md:py-28 bg-surface">
      <Container className="max-w-3xl mx-auto">
        <PolicyContent />
      </Container>
    </div>
  );
}
