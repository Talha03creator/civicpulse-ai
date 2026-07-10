"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="py-20 md:py-28 bg-surface">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="p-8 md:p-12 border-primary/10 bg-gradient-to-br from-surface to-slate-50 relative overflow-hidden">
            <Quote className="absolute top-8 left-8 w-24 h-24 text-primary/5 -z-0" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <blockquote className="text-xl md:text-3xl font-medium text-text-primary leading-snug mb-8 font-heading">
                &quot;Implementing CivicPulse AI during our Riphah campus pilot changed how we handle maintenance entirely. Issues that used to sit in a shared inbox for days are now assigned to the right technician within seconds. It&apos;s exactly the kind of automation modern facilities need.&quot;
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  RF
                </div>
                <div>
                  <div className="font-bold text-text-primary">Facilities Coordinator</div>
                  <div className="text-sm text-text-secondary">Riphah Pilot Program</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
