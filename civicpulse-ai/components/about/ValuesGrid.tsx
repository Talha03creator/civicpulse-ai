import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function ValuesGrid() {
  const values = [
    {
      title: "Agentic First",
      desc: "Software that executes, not just records. Our AI takes actions on your behalf.",
      icon: "⚡"
    },
    {
      title: "Multimodal Native",
      desc: "Vision is the ultimate truth. We process images as first-class citizens using Gemma 4.",
      icon: "👁️"
    },
    {
      title: "Edge Compute Speed",
      desc: "Powered by AMD Developer Cloud infrastructure for sub-second inference.",
      icon: "💻"
    }
  ];

  return (
    <section className="pb-24 px-4 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((v, i) => (
          <GlassCard key={i} className="text-center group">
            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{v.icon}</div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">{v.title}</h3>
            <p className="text-slate-400">{v.desc}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
