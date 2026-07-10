import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";

const tiers = [
  {
    name: "Campus Pilot",
    price: "$2k",
    period: "/mo",
    desc: "For universities and private campuses.",
    features: [
      "1,000 AI Classifications/mo",
      "Standard Gemma 4 Vision",
      "Email Support",
      "Basic Analytics"
    ]
  },
  {
    name: "Municipal Pro",
    price: "$10k",
    period: "/mo",
    desc: "For mid-sized cities (Pop < 500k).",
    isPopular: true,
    features: [
      "Unlimited AI Classifications",
      "Dedicated AMD GPU Instance",
      "Sub-second Inference SLA",
      "24/7 Phone Support",
      "Custom Dispatch Routing"
    ]
  },
  {
    name: "Smart City Enterprise",
    price: "Custom",
    period: "",
    desc: "For large metropolitan areas.",
    features: [
      "Multi-region Redundancy",
      "On-Premise Deployment Option",
      "Dedicated Engineering Team",
      "Custom AI Fine-tuning"
    ]
  }
];

export function PricingTiers() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Transparent <span className="text-gradient">Pricing</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Scale your autonomous infrastructure dispatch with hardware-accelerated tiers.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 items-center">
        {tiers.map((tier, i) => (
          <GlassCard 
            key={i} 
            className={`flex flex-col h-full relative ${
              tier.isPopular ? "border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] md:-translate-y-4" : ""
            }`}
          >
            {tier.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-heading font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6 h-10">{tier.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-heading font-extrabold text-white">{tier.price}</span>
                <span className="text-slate-400 font-medium">{tier.period}</span>
              </div>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                {tier.features.map((feat, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <svg className={`w-5 h-5 shrink-0 ${tier.isPopular ? "text-cyan-400" : "text-purple-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button variant={tier.isPopular ? "primary" : "secondary"} className="w-full">
              Get Started
            </Button>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
