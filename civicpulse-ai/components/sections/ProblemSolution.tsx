"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export function ProblemSolution() {
  return (
    <section className="py-20 md:py-28 bg-bg-alt">
      <Container>
        <SectionHeading 
          eyebrow="The Challenge" 
          title="Bridging the Civic Gap" 
        />
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mt-12">
          {/* Problem */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full p-8 md:p-10 border-red-100 bg-gradient-to-b from-surface to-red-50/30">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
                The Problem
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                Manual complaint systems are slow, misrouted, and unaccountable — citizens report issues that vanish into email inboxes for weeks. Data is fragmented, making it impossible for city planners to prioritize urgent infrastructure decay effectively.
              </p>
            </Card>
          </motion.div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full p-8 md:p-10 border-primary/20 bg-gradient-to-b from-surface to-primary/5">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
                Our Solution
              </h3>
              <p className="text-text-secondary leading-relaxed text-lg">
                AI reads the photo, understands severity, and dispatches it to the right department instantly. By replacing manual triage with multimodal AI, we reduce processing time from days to seconds and keep citizens updated automatically.
              </p>
            </Card>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
