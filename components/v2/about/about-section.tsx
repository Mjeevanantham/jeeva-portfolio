"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Section, Grid } from "@/components/v2/layout";
import { H2 } from "@/components/v2/typography/heading";
import { useCountUp } from "./use-count-up";
import { OptimizedImage } from "@/components/v2/image/optimized-image";
import { getBlurDataURL, getImageSizes } from "@/lib/v2/image-utils";

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

// Memoized StatCard component
const StatCard = React.memo(function StatCard({ stat, inView }: { stat: Stat; inView: boolean }) {
  const value = useCountUp({ from: 0, to: stat.value, enabled: inView, durationMs: 1200 });

  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-md backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/50 hover:shadow-lg transition-shadow"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 opacity-60 dark:opacity-40" />
      <div className="relative">
        <div className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 bg-clip-text text-transparent dark:from-brand-primary-400 dark:to-brand-secondary-400">
          {value}
          {stat.suffix}
        </div>
        <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">{stat.description}</div>
      </div>
    </motion.div>
  );
});

// Memoized TechBadge component
const TechBadge = React.memo(function TechBadge({ tech }: { tech: Tech }) {
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
});

function AboutSection() {
  const ref = React.useRef<HTMLElement | null>(null);
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px", once: true, amount: 0.1 });
  
  // Ensure stats animate even if section is initially in view
  const [hasAnimated, setHasAnimated] = React.useState(false);
  React.useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);
  
  const shouldAnimate = inView || hasAnimated;

  // Memoize STATS and TECH arrays
  const stats = React.useMemo(() => STATS, []);
  const tech = React.useMemo(() => TECH, []);

  return (
    <Section id="about" ref={ref} variant="muted" className="scroll-mt-24 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
      <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
        <motion.div variants={itemVariants} className="text-center mb-12">
          <H2 responsive className="mb-4 text-slate-900 dark:text-white">
            About Me
          </H2>
        </motion.div>

        <div className="mt-10 grid items-start gap-12 md:grid-cols-2">
          {/* Left: headshot */}
          <motion.div variants={itemVariants} className="flex justify-center md:justify-start">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-brand-accent/20 opacity-60 blur-3xl dark:opacity-40" aria-hidden="true" />
              <div className="relative h-[280px] w-[280px] md:h-[320px] md:w-[320px] overflow-hidden rounded-full border-2 border-white/30 bg-gradient-to-br from-white/80 to-white/60 shadow-2xl backdrop-blur-xl dark:border-white/20 dark:from-slate-800/80 dark:to-slate-900/60">
                <OptimizedImage
                  src="/v2/avatar-placeholder.svg"
                  alt="Professional headshot of Jeeva"
                  width={320}
                  height={320}
                  className="h-full w-full object-cover"
                  priority={false}
                  blurDataURL={getBlurDataURL("v2/avatar-placeholder.svg")}
                  sizes={getImageSizes("avatar")}
                />
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div variants={containerVariants} className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6 text-base md:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
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
                {stats.map((s) => (
                  <StatCard key={s.description} stat={s} inView={shouldAnimate} />
                ))}
              </Grid>
            </motion.div>

            {/* Tech stack */}
            <motion.div variants={containerVariants} className="pt-2">
              <motion.p variants={itemVariants} className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Tech I ship with
              </motion.p>
              <motion.div variants={containerVariants} className="mt-3 flex flex-wrap gap-2">
                {tech.map((t) => (
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

// Memoize component to prevent unnecessary re-renders
export default React.memo(AboutSection);
