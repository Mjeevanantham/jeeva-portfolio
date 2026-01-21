"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const SPECIALTIES = [
  "Full-Stack Engineer",
  "AI Integration Specialist",
  "Next.js Expert",
  "TypeScript Developer",
  "System Architect",
  "Clean Architecture",
  "API Design",
  "Performance Optimization",
];

interface RotatingSpecialtiesV2Props {
  className?: string;
  interval?: number;
}

/**
 * Rotating Specialties Component for V2
 * 
 * Displays rotating specialties with smooth animations.
 */
export default function RotatingSpecialtiesV2({
  className,
  interval = 3000,
}: RotatingSpecialtiesV2Props) {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  React.useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SPECIALTIES.length);
    }, interval);
    return () => clearInterval(id);
  }, [interval]);

  return (
    <div
      aria-live="polite"
      className={`flex items-center justify-center ${className || ""}`}
    >
      <span className="inline-flex min-w-[20ch] items-center justify-center text-center">
        <span className="inline-block h-[1.4em]">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.span
              key={index}
              custom={direction}
              initial={{ y: direction * 20, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -direction * 20, opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200"
            >
              {SPECIALTIES[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </div>
  );
}
