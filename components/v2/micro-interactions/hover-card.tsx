"use client";

/**
 * Hover Card Component
 * 
 * Card with lift and shadow effect on hover.
 * Respects prefers-reduced-motion.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  liftAmount?: number;
  shadowIntensity?: "sm" | "md" | "lg";
}

export function HoverCard({
  children,
  className,
  liftAmount = 4,
  shadowIntensity = "md",
}: HoverCardProps) {
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

  const shadowClasses = {
    sm: "hover:shadow-md",
    md: "hover:shadow-xl",
    lg: "hover:shadow-2xl",
  };

  if (prefersReducedMotion) {
    return (
      <div className={cn("transition-shadow duration-200", shadowClasses[shadowIntensity], className)}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("transition-shadow duration-200", shadowClasses[shadowIntensity], className)}
      whileHover={{ y: -liftAmount }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
