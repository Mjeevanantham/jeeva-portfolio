"use client";

/**
 * Shimmer Loading Effect
 * 
 * Animated shimmer effect for loading states.
 * Respects prefers-reduced-motion.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ShimmerProps {
  className?: string;
  variant?: "default" | "card" | "text" | "image";
}

export function Shimmer({ className, variant = "default" }: ShimmerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const baseClasses = cn(
    "relative overflow-hidden",
    variant === "card" && "rounded-2xl",
    variant === "text" && "rounded",
    variant === "image" && "rounded-lg",
    className
  );

  if (prefersReducedMotion) {
    return <div className={cn(baseClasses, "animate-pulse bg-slate-200 dark:bg-slate-800")} />;
  }

  return (
    <div className={baseClasses}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />
    </div>
  );
}
