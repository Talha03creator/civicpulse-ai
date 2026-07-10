import React from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the CivicPulse AI team.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 px-4 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-4">
          Contact <span className="text-gradient">Sales</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Ready to scale autonomous infrastructure dispatch? Let's connect.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <ContactInfo />
        <div className="glass-card rounded-2xl p-6 md:p-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
