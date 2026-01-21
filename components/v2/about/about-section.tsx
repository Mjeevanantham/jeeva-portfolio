"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Section, Grid } from "@/components/v2/layout";
import { H2 } from "@/components/v2/typography/heading";
import { useCountUp } from "./use-count-up";

type Stat = {
  label: string;
  value: number;
  suffix?: string;
  description: string;
};

type Tech = {
  name: string;
  accentClassName: string;
};

const STATS: Stat[] = [
  { label: "Years", value: 2, suffix: "+", description: "Production Experience" },
  { label: "Active Users", value: 500, suffix: "+", description: "Served" },
  { label: "APIs", value: 50, suffix: "+", description: "Delivered" },
  { label: "Modules", value: 6, suffix: "+", description: "In Production" },
];

const TECH: Tech[] = [
  { name: "Next.js", accentClassName: "from-brand-primary/30 to-brand-secondary/30" },
  { name: "React", accentClassName: "from-brand-primary/25 to-brand-primary/10" },
  { name: "Node.js", accentClassName: "from-brand-accent/25 to-brand-accent/10" },
  { name: "TypeScript", accentClassName: "from-brand-primary/25 to-brand-secondary/10" },
  { name: "PostgreSQL", accentClassName: "from-brand-primary/15 to-neutral-200/10" },
  { name: "MongoDB", accentClassName: "from-brand-accent/20 to-neutral-200/10" },
  { name: "Flutter", accentClassName: "from-brand-secondary/25 to-brand-primary/10" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const value = useCountUp({ from: 0, to: stat.value, enabled: inView, durationMs: 900 });

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-brand-secondary/10 to-brand-accent/10 opacity-70" />
      <div className="relative">
        <div className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {value}
          {stat.suffix}
        </div>
        <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.description}</div>
      </div>
    </motion.div>
  );
}

function TechBadge({ tech }: { tech: Tech }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group"
    >
      <Badge
        variant="outline"
        className="relative overflow-hidden rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-sm text-slate-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
      >
        <span className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${tech.accentClassName} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
        <span className="relative">{tech.name}</span>
      </Badge>
    </motion.div>
  );
}

export default function AboutSection() {
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px", once: true });

  return (
    <Section id="about" ref={ref} variant="muted" className="scroll-mt-24">
      <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
        <motion.div variants={itemVariants} className="text-center">
          <H2 responsive className="mb-4">
            About Me
          </H2>
        </motion.div>

        <div className="mt-10 grid items-start gap-10 md:grid-cols-2">
          {/* Left: headshot */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-brand-gradient opacity-40 blur-2xl" aria-hidden="true" />
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border border-white/20 bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <Image
                  src="/v2/avatar-placeholder.svg"
                  alt="Professional headshot of Jeeva"
                  width={300}
                  height={300}
                  className="h-full w-full object-cover"
                  priority={false}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-5 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                I’m a full‑stack engineer focused on building <span className="font-semibold">AI‑integrated, production‑grade systems</span>—the kind
                that ship, scale, and stay maintainable under real business pressure.
              </p>
              <p>
                At <span className="font-semibold">Aaludra Technology Solutions</span>, I lead the HRMS mobile track and deliver end‑to‑end modules—from
                structured backend APIs (NestJS/GraphQL) to smooth, performant Flutter interfaces.
              </p>
              <p>
                I also design AI capabilities with a practical mindset: RAG, agent architecture, context management, and knowledge ingestion—always optimized
                for latency, cost, and real user outcomes.
              </p>
              <p>
                My default approach is clean architecture, clear ownership, and measurable impact—shipping features with strong UX, accessibility, and Core Web
                Vitals in mind.
              </p>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={containerVariants}>
              <Grid colsMobile={2} colsTablet={2} colsDesktop={2} colsDesktopLg={2} gap="medium" className="mt-2">
                {STATS.map((s) => (
                  <StatCard key={s.description} stat={s} inView={inView} />
                ))}
              </Grid>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={containerVariants} className="pt-2">
              <motion.p variants={itemVariants} className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Tech I ship with
              </motion.p>
              <motion.div variants={containerVariants} className="mt-3 flex flex-wrap gap-2">
                {TECH.map((t) => (
                  <TechBadge key={t.name} tech={t} />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}

