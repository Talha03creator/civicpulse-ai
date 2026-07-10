"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden flex justify-center px-4">
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl w-full glass-card rounded-[3rem] p-12 md:p-20 text-center border-t border-white/20 shadow-[0_-20px_50px_rgba(6,182,212,0.1)]">
        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6">
          Ready to Upgrade Your <span className="text-gradient">City?</span>
        </h2>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
          Deploy the AMD Developer Cloud powered infrastructure and transform municipal complaints into autonomous action.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/report" tabIndex={-1}>
            <Button size="lg" className="w-full sm:w-auto px-12 py-5 text-lg rounded-full">
              Launch App →
            </Button>
          </Link>
          <Link href="/contact" tabIndex={-1}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-12 py-5 text-lg rounded-full">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
