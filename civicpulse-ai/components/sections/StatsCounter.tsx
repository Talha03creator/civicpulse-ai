"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";

const STATS = [
  {
    endValue: 40,
    suffix: "%",
    label: "Faster Resolution",
    subtext: "Compared to manual triage",
  },
  {
    endValue: 3,
    suffix: "",
    label: "Departments Coordinated",
    subtext: "Water, Roads, Electrical",
  },
  {
    endValue: 24,
    suffix: "/7",
    label: "AI Operations",
    subtext: "Zero downtime intake",
  },
];

function AnimatedCounter({ endValue, suffix }: { endValue: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (easeOutQuart)
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeProgress * endValue));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, endValue]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsCounter() {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,100 L100,0 L100,100 Z" fill="currentColor" />
        </svg>
      </div>
      
      <Container className="relative z-10">
        <div className="text-center mb-12">
          <p className="text-indigo-200 font-medium tracking-widest uppercase text-sm mb-2">Pilot program, Riphah International University</p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">Proven Campus Results</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-indigo-400/30">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center pt-8 md:pt-0"
            >
              <div className="text-5xl md:text-6xl font-heading font-bold text-white mb-2">
                <AnimatedCounter endValue={stat.endValue} suffix={stat.suffix} />
              </div>
              <div className="text-lg font-medium text-indigo-50 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-indigo-200">
                {stat.subtext}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
