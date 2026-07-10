"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Camera, BrainCircuit, Route, CheckCircle } from "lucide-react";

const STEPS = [
  {
    title: "Citizen Reports",
    description: "Submit a photo or video of the issue along with exact location data. No app download required.",
    icon: Camera,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI Classification",
    description: "Gemma 4 multimodal AI instantly analyzes the image to categorize the issue and determine its severity score.",
    icon: BrainCircuit,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Auto-Routed",
    description: "The system automatically dispatches the ticket to the correct municipal department with an SLA estimate.",
    icon: Route,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Issue Resolved",
    description: "Status is tracked publicly in real-time. The citizen receives an automatic update once the work is complete.",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-surface relative">
      <Container>
        <SectionHeading 
          eyebrow="Workflow" 
          title="How It Works" 
          description="A seamless pipeline from citizen report to municipal resolution, entirely automated."
        />
        
        <div className="mt-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2 z-0" aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center bg-surface p-6 rounded-2xl"
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-sm border border-white ${step.color}`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-heading text-text-primary mb-3">
                  <span className="text-primary mr-2">{index + 1}.</span>
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
