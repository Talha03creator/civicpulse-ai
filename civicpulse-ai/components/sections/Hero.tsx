"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl mx-auto z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">Gemma 4 powered auto-dispatch is now live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-8 leading-tight">
          Every Pothole. Every Issue.<br />
          <span className="text-gradient">Auto-Resolved.</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 font-medium">
          The autonomous engine for smart cities. Powered by multimodal AI to classify, score, and route municipal infrastructure issues with zero human touch.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/report" tabIndex={-1}>
            <Button size="lg" className="w-full sm:w-auto text-lg px-10">
              Launch App →
            </Button>
          </Link>
          <Link href="/about" tabIndex={-1}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-lg px-10">
              Read the Manifesto
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Floating 3D Widget */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-20 z-10 w-full max-w-3xl mx-auto animate-float"
      >
        <div className="glass-card rounded-2xl p-6 relative flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          {/* Scanning Line overlay */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_15px_#06b6d4] animate-scan z-20"></div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="font-heading font-bold text-white text-lg">Pothole Detected</div>
              <div className="text-slate-400 text-sm">Main St. & 4th Ave</div>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 items-center justify-center relative z-10">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-background/80 text-xs text-cyan-400 font-mono">PROCESSING</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 relative z-10 w-full md:w-auto">
            <div className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-3 py-1 rounded-full text-xs font-bold text-center">
              SEVERITY 98%
            </div>
            <div className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold text-center">
              ROUTED: PUBLIC WORKS
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
