"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/components/v2/loading/chart-skeleton";

// Dynamic import for Recharts - only loads when component is in view
const SkillsChart = dynamic(() => import("./skills-chart").then((mod) => ({ default: mod.SkillsChart })), {
  loading: () => <ChartSkeleton />,
  ssr: false,
});
import { 
  Code, 
  Server, 
  Smartphone, 
  Brain, 
  Cloud,
  Github,
  Database,
  Zap,
  Box,
  Layers,
  Cpu,
  Globe
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section, Container } from "@/components/v2/layout";
import { H2 } from "@/components/v2/typography/heading";
import { SkillPill, SkillPillGroup } from "./skill-pill";
import { cn } from "@/lib/utils";

// Skill categories data
const SKILL_DATA = [
  { category: "Frontend", value: 90, technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", value: 85, technologies: ["Node.js", "NestJS", "GraphQL", "PostgreSQL", "MongoDB"] },
  { category: "Mobile", value: 70, technologies: ["Flutter", "Dart", "React Native"] },
  { category: "AI/ML", value: 75, technologies: ["RAG", "LLM Integration", "AI Agents", "Vector DBs"] },
  { category: "DevOps", value: 70, technologies: ["Docker", "CI/CD", "Cloud Deploy", "Monitoring"] },
];

// Tech stack icons mapping
const TECH_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "React": Box,
  "Next.js": Layers,
  "TypeScript": Code,
  "Node.js": Server,
  "GraphQL": Zap,
  "Flutter": Smartphone,
  "Docker": Box,
  "PostgreSQL": Database,
  "MongoDB": Database,
  "GitHub": Github,
  "Tailwind CSS": Code,
  "Framer Motion": Zap,
  "NestJS": Server,
  "Dart": Code,
  "React Native": Smartphone,
  "RAG": Brain,
  "LLM Integration": Brain,
  "AI Agents": Brain,
  "Vector DBs": Database,
  "CI/CD": Cloud,
  "Cloud Deploy": Cloud,
  "Monitoring": Cloud,
};

// Category icons
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "Frontend": Code,
  "Backend": Server,
  "Mobile": Smartphone,
  "AI/ML": Brain,
  "DevOps": Cloud,
};

// Removed CustomTooltip - now handled in SkillsChart component

// Tech stack item component - memoized for performance
const TechStackItem = React.memo(function TechStackItem({ tech, category }: { tech: string; category: string }) {
  const Icon = TECH_ICONS[tech] || Code;
  const IconElement = React.useMemo(() => <Icon className="h-full w-full text-current" />, [Icon]);

  return (
    <SkillPill
      variant="default"
      size="sm"
      icon={IconElement}
      className="shadow-sm hover:shadow-lg hover:shadow-brand-primary/20"
    >
      {tech}
    </SkillPill>
  );
});

function SkillsVisualizationV2() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chartRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { margin: "-10% 0px -10% 0px", once: true });
  const chartInView = useInView(chartRef, { margin: "-20% 0px -20% 0px", once: true });

  // Animate data values from 0 to actual value - memoized initial state
  const initialData = React.useMemo(() => SKILL_DATA.map((item) => ({ ...item, value: 0 })), []);
  const [animatedData, setAnimatedData] = React.useState(initialData);

  // Memoize animation effect
  React.useEffect(() => {
    if (!chartInView) return;

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setAnimatedData(
        SKILL_DATA.map((item) => ({
          ...item,
          value: Math.round(item.value * easeOut),
        }))
      );

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedData(SKILL_DATA); // Ensure final values are exact
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [chartInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Section id="skills" ref={containerRef} variant="muted" className="scroll-mt-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <H2 responsive className="mb-4 text-slate-900 dark:text-white">
            Skills & Expertise
          </H2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical capabilities across different domains
          </p>
        </motion.div>

        {/* Radar Chart */}
        <motion.div
          ref={chartRef}
          variants={itemVariants}
          className="mb-12"
        >
          <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 md:p-8 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Skill Proficiency
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Hover over a category to see detailed technologies
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={chartInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-full"
              style={{ height: "400px" }}
            >
              {chartInView && <SkillsChart data={animatedData} />}
              {/* Gradient definition for Recharts */}
              <svg className="absolute -z-10">
                <defs>
                  <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#7c3aed" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#10b981" stopOpacity={0.9} />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 text-center">
              Technology Stack
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Technologies I work with, organized by category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILL_DATA.map((category, idx) => {
              const CategoryIcon = CATEGORY_ICONS[category.category] || Code;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="rounded-2xl border border-slate-200/50 bg-white/80 p-5 shadow-md backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/80"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 p-2">
                      <CategoryIcon className="h-5 w-5 text-brand-primary-600 dark:text-brand-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white">
                        {category.category}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {category.value}% proficiency
                      </p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-2 list-none" aria-label={`${category.category} technologies`}>
                    {category.technologies.map((tech) => (
                      <li key={tech}>
                        <TechStackItem tech={tech} category={category.category} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

// Memoize component to prevent unnecessary re-renders
export default React.memo(SkillsVisualizationV2);
