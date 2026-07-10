import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "accent" | "priority" | "success" | "neutral";
}

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-indigo-100 text-indigo-800": variant === "primary",
          "bg-teal-100 text-teal-800": variant === "accent",
          "bg-orange-100 text-orange-800": variant === "priority",
          "bg-green-100 text-green-800": variant === "success",
          "bg-slate-100 text-slate-800": variant === "neutral",
        },
        className
      )}
      {...props}
    />
  );
}
