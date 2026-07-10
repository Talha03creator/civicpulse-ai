import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description, className, ...props }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)} {...props}>
      {eyebrow && (
        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
