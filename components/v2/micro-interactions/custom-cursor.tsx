"use client";

/**
 * Custom Cursor Component
 * 
 * Premium cursor with glow effect that follows mouse movement.
 * Changes state on hover (links, buttons).
 * Disabled on mobile devices.
 */

import * as React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorXSpring = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const cursorYSpring = useSpring(cursorY, { stiffness: 500, damping: 28 });

  const [isHovering, setIsHovering] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  // Check for reduced motion preference
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Check if device is mobile
  React.useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                    "ontouchstart" in window ||
                    navigator.maxTouchPoints > 0;
    
    if (isMobile || prefersReducedMotion) {
      return; // Don't show custom cursor on mobile or if reduced motion
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target) return;
      
      // Check if target is an HTMLElement
      if (!(target instanceof HTMLElement)) return;
      
      // Check for interactive elements
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
    };
  }, [cursorX, cursorY, prefersReducedMotion]);

  if (!isVisible || prefersReducedMotion) return null;

  return (
    <>
      {/* Cursor dot */}
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference",
          "h-4 w-4 rounded-full bg-white",
          "transform -translate-x-1/2 -translate-y-1/2"
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Cursor glow */}
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9998]",
          "h-8 w-8 rounded-full",
          "bg-gradient-to-r from-brand-primary-500/20 via-brand-secondary-500/20 to-brand-accent-500/20",
          "blur-xl",
          "transform -translate-x-1/2 -translate-y-1/2"
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
    </>
  );
}
