import React from "react";
import { Container } from "@/components/ui/Container";

export function TechStackBanner() {
  return (
    <section className="py-12 bg-surface border-y border-border overflow-hidden">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <p className="text-sm font-medium text-text-secondary uppercase tracking-wider text-center md:text-left">
            Powered by modern AI Infrastructure
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <span className="font-heading font-bold text-xl text-slate-800">AMD</span>
              <span className="text-sm text-slate-600 font-medium">Developer Cloud</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden md:block" />
            <div className="flex items-center gap-2 grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100">
              <span className="font-heading font-bold text-xl text-orange-600">Fireworks AI</span>
              <span className="text-sm text-slate-600 font-medium">(Gemma 4)</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
