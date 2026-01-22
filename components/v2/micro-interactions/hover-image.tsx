"use client";

/**
 * Hover Image Component
 * 
 * Image with subtle zoom effect on hover.
 * Respects prefers-reduced-motion.
 */

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface HoverImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  zoomAmount?: number;
  priority?: boolean;
}

export function HoverImage({
  src,
  alt,
  width,
  height,
  className,
  zoomAmount = 1.05,
  priority = false,
}: HoverImageProps) {
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
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("transition-opacity duration-200", className)}
        priority={priority}
      />
    );
  }

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      whileHover={{ scale: zoomAmount }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="transition-transform duration-300"
        priority={priority}
      />
    </motion.div>
  );
}
