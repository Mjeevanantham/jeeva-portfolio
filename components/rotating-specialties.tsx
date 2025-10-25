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
      <span className="relative inline-flex min-w-[10ch] items-baseline">
        <span className="relative h-[1.4em] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.span
              key={index}
              custom={direction}
              initial={{ y: direction * 20, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -direction * 20, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute left-0 top-0 inline-block font-semibold text-brand-gradient"
            >
              {ITEMS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
        <motion.span
          aria-hidden
          className="ml-2 inline-block h-[0.9em] w-[0.9em] rounded-full"
          animate={{
            background: [
              "linear-gradient(90deg, var(--brand-start), var(--brand-end))",
              "linear-gradient(90deg, var(--brand-end), var(--brand-start))",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
        />
      </span>
    </div>
  );
}
