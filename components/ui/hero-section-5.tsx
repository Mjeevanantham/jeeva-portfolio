"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface Milestone {
  id: number;
  name: string;
  status: "complete" | "in-progress" | "pending";
  position: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

interface AnimatedRoadmapProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: Milestone[];
  mapImageSrc: string;
}

const statusClasses: Record<Milestone["status"], string> = {
  complete: "bg-green-500 border-green-700",
  "in-progress": "bg-blue-500 border-blue-700 animate-pulse",
  pending: "bg-muted border-border",
};

const MilestoneMarker = ({ milestone }: { milestone: Milestone }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: milestone.id * 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.8 }}
      className="absolute flex items-center gap-4"
      style={milestone.position}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div
          className={cn(
            "absolute h-3 w-3 rounded-full border-2",
            statusClasses[milestone.status],
          )}
        />
        <div className="absolute h-full w-full rounded-full bg-primary/10" />
      </div>
      <div className="rounded-full border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm">
        {milestone.name}
      </div>
    </motion.div>
  );
};

const AnimatedRoadmap = React.forwardRef<HTMLDivElement, AnimatedRoadmapProps>(
  ({ className, milestones, mapImageSrc, ...props }, ref) => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        targetRef.current = node;
        if (!ref) return;
        if (typeof ref === "function") {
          ref(node);
        } else {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [ref],
    );
    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);

    return (
      <div
        ref={setRefs}
        className={cn("relative mx-auto w-full max-w-4xl py-24", className)}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute inset-0 top-10"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mapImageSrc}
            alt="Product roadmap map"
            className="h-full w-full object-contain"
          />
        </motion.div>

        <div className="relative h-[400px]">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 800 400"
            preserveAspectRatio="none"
            className="absolute left-0 top-0"
          >
            <motion.path
              d="M 50 350 Q 200 50 400 200 T 750 100"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeDasharray="10 5"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          {milestones.map((milestone) => (
            <MilestoneMarker key={milestone.id} milestone={milestone} />
          ))}
        </div>
      </div>
    );
  },
);

AnimatedRoadmap.displayName = "AnimatedRoadmap";

export { AnimatedRoadmap };
