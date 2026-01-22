"use client";

/**
 * Hover Link Component
 * 
 * Link with animated underline slide-in effect on hover.
 */

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  underlineColor?: string;
}

export function HoverLink({
  href,
  children,
  className,
  underlineColor = "brand-primary",
}: HoverLinkProps) {
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

  const underlineClass = cn(
    underlineColor === "brand-primary" && "bg-brand-primary-600",
    underlineColor === "brand-secondary" && "bg-brand-secondary-600",
    underlineColor === "brand-accent" && "bg-brand-accent-600"
  );

  return (
    <Link
      href={href}
      className={cn(
        "relative inline-block text-slate-700 dark:text-slate-300",
        "hover:text-slate-900 dark:hover:text-white",
        "transition-colors duration-200",
        className
      )}
    >
      {children}
      {!prefersReducedMotion && (
        <motion.span
          className={cn("absolute bottom-0 left-0 h-0.5", underlineClass)}
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
    </Link>
  );
}
