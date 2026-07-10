import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";

export function ContactInfo() {
  return (
    <GlassCard className="h-full flex flex-col justify-between">
      <div>
        <h2 className="text-3xl font-heading font-bold text-white mb-6">
          Deploy CivicPulse AI
        </h2>
        <p className="text-slate-400 mb-8 leading-relaxed">
          Ready to bypass legacy systems? Let&apos;s talk infrastructure integration, edge compute requirements, and SLA optimization for your municipal networks.
        </p>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">Enterprise Sales</div>
              <div className="text-slate-400 text-sm">sales@civicpulse.ai</div>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-medium">Technical Support</div>
              <div className="text-slate-400 text-sm">support@civicpulse.ai</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-6 border-t border-white/10">
        <div className="text-xs text-slate-500 font-mono">
          SYSTEM STATUS: ALL CLUSTERS OPERATIONAL
        </div>
      </div>
    </GlassCard>
  );
}
