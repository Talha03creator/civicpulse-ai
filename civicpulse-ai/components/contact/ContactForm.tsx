"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-heading font-bold text-green-400 mb-2">Transmission Received</h3>
        <p className="text-slate-300">We&apos;ll be in touch shortly to discuss deployment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
        <input 
          required 
          type="text" 
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="Jane Doe"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Organization</label>
        <input 
          required 
          type="text" 
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="City of Metropolis"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
        <input 
          required 
          type="email" 
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="jane@metropolis.gov"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-400 mb-2">Message</label>
        <textarea 
          required 
          rows={4}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="How can we integrate CivicPulse AI?"
        />
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Encrypting..." : "Send Secure Message"}
      </Button>
    </form>
  );
}
