import React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black/50 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo />
              <span className="font-heading font-bold text-2xl text-white">
                CivicPulse <span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 max-w-sm mb-6">
              The autonomous engine for smart cities. Seamlessly routing municipal issues with multimodal AI.
            </p>
            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 inline-block">
              <p className="text-xs text-slate-300 font-medium">
                Powered by <span className="text-orange-500 font-bold">AMD Developer Cloud</span> & <span className="text-purple-400 font-bold">Fireworks AI</span> (Gemma 4)
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-heading font-bold text-white mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">About</Link></li>
              <li><Link href="/report" className="text-slate-400 hover:text-cyan-400 transition-colors">Launch App</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {currentYear} CivicPulse AI. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 mt-2 md:mt-0">
            Hackathon Submission
          </p>
        </div>
      </div>
    </footer>
  );
}
