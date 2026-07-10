"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { User2 } from "lucide-react";

export function TeamSection() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <Container>
        <SectionHeading 
          eyebrow="The Team" 
          title="Who We Are" 
        />
        
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <Card className="overflow-hidden flex flex-col h-full border-border">
              {/* Image Placeholder */}
              <div className="aspect-square bg-slate-100 flex items-center justify-center relative">
                <User2 className="w-24 h-24 text-slate-300" />
                <div className="absolute inset-x-0 bottom-2 text-center">
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider bg-white/80 px-2 py-1 rounded">
                    Add real photo before submission
                  </span>
                </div>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold font-heading text-text-primary">
                  [Founder Name]
                </h3>
                <p className="text-primary font-medium text-sm mb-4">
                  Founder & Lead Developer
                </p>
                <p className="text-text-secondary text-sm">
                  [Short bio placeholder. Replace with actual background, role in the project, and vision for CivicPulse AI.]
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
