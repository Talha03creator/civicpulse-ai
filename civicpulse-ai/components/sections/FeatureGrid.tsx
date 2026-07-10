"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Camera, ShieldAlert, GitMerge, Clock, Map, Globe2 } from "lucide-react";

const FEATURES = [
  {
    title: "Photo & Video Reporting",
    description: "Citizens can upload high-resolution media directly from their browsers, capturing the exact context of the infrastructure issue.",
    icon: Camera,
  },
  {
    title: "AI Severity Scoring",
    description: "Multimodal AI evaluates the visual evidence to assign a priority score, ensuring critical hazards are addressed first.",
    icon: ShieldAlert,
  },
  {
    title: "Auto-Department Routing",
    description: "Intelligent classification bypasses human dispatchers, sending tickets directly to Water, Roads, or Electrical departments.",
    icon: GitMerge,
  },
  {
    title: "SLA Prediction",
    description: "Based on historical data and issue complexity, the system generates accurate Service Level Agreement resolution timelines.",
    icon: Clock,
  },
  {
    title: "Real-time Map Dashboard",
    description: "Municipal leaders and citizens get access to live heatmaps showing incident clusters and resolution statuses.",
    icon: Map,
  },
  {
    title: "Multilingual Support",
    description: "The interface automatically adapts to the user's language, removing communication barriers for diverse communities.",
    icon: Globe2,
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <SectionHeading 
          eyebrow="Capabilities" 
          title="Powered by Next-Gen AI" 
          description="Everything you need to modernize municipal infrastructure management."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card interactive className="h-full p-6 md:p-8 flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
