"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How is my data used?",
    answer: "The photos, videos, and location data you submit are used strictly to identify and locate the infrastructure issue. We do not sell your personal data. Contact information is only used to send you automated updates regarding the status of your report."
  },
  {
    question: "How does the AI decide severity?",
    answer: "Our system uses Gemma 4 multimodal AI to analyze the visual evidence you submit. It assesses factors like size, depth, location (e.g., a pothole on a major artery vs. a quiet residential street), and potential hazard level to assign a standardized severity score from 1 to 5."
  },
  {
    question: "Is this free for citizens?",
    answer: "Yes, reporting issues through CivicPulse AI will always be 100% free for citizens. Our platform is licensed by municipalities and institutions to improve their internal triage and dispatch workflows."
  },
  {
    question: "How can our municipality pilot this?",
    answer: "We offer a flexible 3-month pilot program for municipalities and large university campuses. Reach out to partnerships@civicpulse.ai to schedule a demo and discuss integration with your existing work order management systems."
  },
  {
    question: "What happens after I submit a report?",
    answer: "You will immediately receive a tracking link. The AI processes your submission in seconds, routes it to the correct department (e.g., Public Works), and the department's dashboard is updated. As they assign resources and complete the fix, you&apos;ll see those updates live on your tracking link."
  }
];

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-16 pt-16 border-t border-border">
      <h3 className="text-2xl font-bold font-heading text-text-primary mb-8 text-center">
        Frequently Asked Questions
      </h3>
      <div className="max-w-3xl mx-auto space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="border border-border rounded-lg bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus:bg-slate-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0",
                    isOpen && "transform rotate-180"
                  )} 
                />
              </button>
              <div 
                className={cn(
                  "px-5 overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 pb-5 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <p className="text-text-secondary leading-relaxed pt-2 border-t border-border/50">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
