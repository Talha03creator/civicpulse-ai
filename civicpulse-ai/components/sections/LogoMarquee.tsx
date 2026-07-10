import React from "react";

const baseLogos = [
  "Powered By AMD MI300X",
  "Fireworks AI",
  "Gemma 4 Vision",
  "FastAPI",
  "React 19",
];

export function LogoMarquee() {
  return (
    <div className="w-full border-y border-white/5 bg-white/[0.01] py-8 overflow-x-hidden relative flex">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10"></div>
      
      <div className="flex animate-marquee whitespace-nowrap min-w-full w-max will-change-transform transform-gpu [backface-visibility:hidden]">
        {[...baseLogos, ...baseLogos, ...baseLogos].map((logo, i) => (
          <span 
            key={i} 
            className="inline-block mx-12 text-slate-500 font-heading font-bold uppercase tracking-[0.2em] text-sm md:text-base hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-default"
          >
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}
