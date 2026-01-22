"use client";

/**
 * Gradient Button Component
 * 
 * Button with gradient shift effect on hover.
 * Respects prefers-reduced-motion.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface GradientButtonProps extends ButtonProps {
  gradientFrom?: string;
  gradientTo?: string;
  hoverGradientFrom?: string;
  hoverGradientTo?: string;
}

export function GradientButton({
  children,
  className,
  gradientFrom = "from-brand-primary-600",
  gradientTo = "to-brand-secondary-600",
  hoverGradientFrom = "from-brand-secondary-600",
  hoverGradientTo = "to-brand-accent-600",
  ...props
}: GradientButtonProps) {
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

  if (prefersReducedMotion) {
    return (
      <Button
        className={cn(`bg-gradient-to-r ${gradientFrom} ${gradientTo}`, className)}
        {...props}
      >
        {children}
      </Button>
    );
  }

  return (
    <motion.div
      whileHover={{
        background: `linear-gradient(to right, var(--${hoverGradientFrom.replace("from-", "")}), var(--${hoverGradientTo.replace("to-", "")}))`,
      }}
      transition={{ duration: 0.3 }}
    >
      <Button
        className={cn(
          `bg-gradient-to-r ${gradientFrom} ${gradientTo}`,
          "transition-all duration-300",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}
