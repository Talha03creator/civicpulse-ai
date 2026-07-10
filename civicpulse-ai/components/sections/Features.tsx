"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

export function Features() {
  return (
    <section className="py-24 relative z-10 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
          Architected for <span className="text-gradient">Scale</span>
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          We rebuilt the municipal dispatch workflow from the ground up using edge-deployed multimodal AI and hardware acceleration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
        
        {/* Bento 1 - Large */}
        <GlassCard className="md:col-span-2 group flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Gemma 4 Multimodal AI</h3>
            <p className="text-slate-400">Classifies issues directly from citizen-uploaded photos with near-human accuracy.</p>
          </div>
          <div className="mt-8 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-xs text-cyan-300 h-32 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>
            <pre className="relative z-0">
{`{
  "classification": "Infrastructure_Damage",
  "subtype": "Pothole_Deep",
  "confidence": 0.994,
  "action": "Dispatch_Heavy_Machinery",
  "estimated_volume": "0.4m³"
}`}
            </pre>
          </div>
        </GlassCard>

        {/* Bento 2 - Medium */}
        <GlassCard className="group flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Instant SLA Prediction</h3>
            <p className="text-slate-400">Calculates resolution time instantly.</p>
          </div>
          <div className="mt-6 flex items-end justify-center h-full pb-4">
            <div className="text-6xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-purple-600 to-purple-300">
              48<span className="text-2xl">hrs</span>
            </div>
          </div>
        </GlassCard>

        {/* Bento 3 - Medium */}
        <GlassCard className="group flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">AMD MI300X Powered</h3>
            <p className="text-slate-400">Lightning fast inference on enterprise AMD hardware.</p>
          </div>
          <div className="mt-6 flex flex-col items-center justify-center gap-2 h-full pb-4">
            <div className="w-full bg-white/5 rounded-full h-2 mb-2">
              <motion.div 
                className="bg-orange-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              ></motion.div>
            </div>
            <div className="text-orange-400 font-mono text-sm tracking-widest">SUB-SECOND INFERENCE</div>
          </div>
        </GlassCard>

        {/* Bento 4 - Large */}
        <GlassCard className="md:col-span-2 group flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Zero-Touch Auto-Routing</h3>
            <p className="text-slate-400">Bypasses the call center and connects citizens directly to the active municipal workforce.</p>
          </div>
          <div className="mt-6 h-full flex items-center justify-center">
            <div className="flex items-center gap-2 md:gap-6 w-full max-w-md mx-auto">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-xl">👤</div>
              <div className="flex-1 h-px bg-white/20 relative">
                <motion.div 
                  className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-cyan-400 -translate-y-1/2"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-2xl animate-pulse">⚙️</div>
              <div className="flex-1 h-px bg-white/20 relative">
                 <motion.div 
                  className="absolute top-1/2 left-0 w-2 h-2 rounded-full bg-purple-400 -translate-y-1/2"
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 2, delay: 1, repeat: Infinity, ease: "linear" }}
                ></motion.div>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center text-xl">🚜</div>
            </div>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}
