import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function MissionStory() {
  return (
    <section className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
          The <span className="text-gradient">Manifesto</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Cities run on data, but they choke on process.
        </p>
      </div>

      <GlassCard className="prose prose-invert prose-lg max-w-none border-l-4 border-l-cyan-500 rounded-l-none bg-white/[0.02]">
        <h2 className="text-white font-heading">The Riphah International University Pilot</h2>
        <p className="text-slate-300">
          Our pilot at Riphah International University proved a fundamental truth: human triage is the bottleneck of modern infrastructure. When a student reports a broken streetlight, it shouldn't take 48 hours and three human operators to decide which department handles it.
        </p>
        <blockquote className="border-l-4 border-purple-500 pl-6 italic text-white/80 my-8">
          &quot;We replaced the dispatch desk with Gemma 4 running on AMD hardware. The result wasn&apos;t just a 40% faster resolution time—it was zero-touch operations from complaint to contractor.&quot;
        </blockquote>
        <p className="text-slate-300">
          CivicPulse AI isn&apos;t just software. It is an autonomous agentic system. By extracting structured data from unstructured multimodal input (photos, text, context), we bypass legacy call centers entirely.
        </p>
      </GlassCard>
    </section>
  );
}
