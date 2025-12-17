"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  "Full‑Stack",
  "Flutter",
  "Clean Architecture",
  "API Design",
  "Next.js",
  "Node.js",
  "TypeScript",
  "NestJS",
  "PostgreSQL",
  "GraphQL",
];

export default function RotatingSpecialties() {
  const [index, setIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<1 | -1>(1);

  React.useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % ITEMS.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div aria-live="polite" className="mb-6 text-base md:text-lg text-slate-700 dark:text-slate-300">
      <span className="opacity-80">Focus areas: </span>
      <span className="inline-flex min-w-[18ch] items-baseline align-baseline">
        <span className="inline-block h-[1.4em] align-baseline">
          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.span
              key={index}
              custom={direction}
              initial={{ y: direction * 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -direction * 6, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="inline-block font-semibold text-brand-gradient"
            >
              {ITEMS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </div>
  );
}
