import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-surface border border-border shadow-sm",
        interactive && "transition-all duration-200 hover:scale-[1.02] hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}
