"use client";

/**
 * Success Animation Component
 * 
 * Animated checkmark with optional confetti effect.
 * Used for form submissions and action completions.
 */

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
// Dynamic import for canvas-confetti to avoid SSR issues
const loadConfetti = async () => {
  if (typeof window === "undefined") return null;
  const confetti = (await import("canvas-confetti")).default;
  return confetti;
};
import { cn } from "@/lib/utils";

export interface SuccessAnimationProps {
  /**
   * Whether to show the animation
   */
  show: boolean;
  /**
   * Callback when animation completes
   */
  onComplete?: () => void;
  /**
   * Whether to show confetti
   */
  showConfetti?: boolean;
  /**
   * Message to display
   */
  message?: string;
  /**
   * Subtitle message
   */
  subtitle?: string;
  /**
   * Container className
   */
  className?: string;
}

const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut" },
      opacity: { duration: 0.3 },
    },
  },
};

export function SuccessAnimation({
  show,
  onComplete,
  showConfetti = true,
  message = "Success!",
  subtitle,
  className,
}: SuccessAnimationProps) {
  const confettiTriggered = React.useRef(false);

  React.useEffect(() => {
    if (show && showConfetti && !confettiTriggered.current) {
      confettiTriggered.current = true;

      // Load and trigger confetti
      loadConfetti().then((confetti) => {
        if (!confetti) return;

        // Trigger confetti burst
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            clearInterval(interval);
            return;
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);

        // Cleanup
        setTimeout(() => {
          clearInterval(interval);
          confettiTriggered.current = false;
        }, duration);
      });
    }
  }, [show, showConfetti]);

  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onAnimationComplete={onComplete}
      className={cn(
        "flex flex-col items-center justify-center gap-4 p-8",
        "rounded-2xl bg-white/95 dark:bg-slate-900/95",
        "backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10",
        className
      )}
    >
      {/* Animated Checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="relative"
      >
        <CheckCircle2 className="h-16 w-16 text-brand-accent-600 dark:text-brand-accent-500" />
        <motion.svg
          className="absolute inset-0"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            className="text-brand-accent-600 dark:text-brand-accent-500"
            variants={checkmarkVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.svg>
      </motion.div>

      {/* Message */}
      <div className="text-center">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl font-semibold text-slate-900 dark:text-white"
        >
          {message}
        </motion.h3>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-2 text-sm text-slate-600 dark:text-slate-400"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
