"use client";

import * as React from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Briefcase, Code, Rocket, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  achievements: string[];
  stack: string[];
};

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Junior Software Engineer",
    company: "Aaludra Technology Solutions",
    period: "Aug 2024 – Present",
    current: true,
    achievements: [
      "Currently developing a high-level ERP system for a US-based enterprise client (NDA)",
      "Engineered and optimized 50+ APIs supporting CRM operations for 500+ users",
      "Delivered 6 production modules with high availability",
      "Improved API response times by ~30% through query and index optimization",
      "Spearheaded Docker‑based CI/CD workflows to streamline deployments",
    ],
    stack: ["Next.js", "NestJS", "Node.js", "PostgreSQL", "MongoDB", "Docker"],
  },
  {
    role: "Software Engineer Intern",
    company: "Aaludra Technology Solutions",
    period: "Oct 2023 – Aug 2024",
    achievements: [
      "Implemented robust REST and GraphQL endpoints",
      "Designed role‑based access control (RBAC) across services",
      "Developed full‑stack features with Next.js and Node.js",
      "Assisted in cloud deployment and release processes",
    ],
    stack: ["Next.js", "Node.js", "Express.js", "GraphQL", "Docker"],
  },
];

interface ExperienceCardProps {
  experience: ExperienceItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  inView: boolean;
}

function ExperienceCard({ experience, index, isExpanded, onToggle, inView }: ExperienceCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group relative ml-12 md:ml-16 rounded-2xl border border-slate-200/50 bg-white/80 p-5 md:p-6 shadow-md backdrop-blur-xl transition-all duration-300",
        "dark:border-slate-700/50 dark:bg-slate-800/80",
        "hover:shadow-xl hover:border-brand-primary/30 dark:hover:border-brand-primary/30",
        isExpanded && "shadow-xl border-brand-primary/50 dark:border-brand-primary/50"
      )}
    >
      {/* Header - Clickable */}
      <button
        onClick={onToggle}
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2 rounded-lg"
        aria-expanded={isExpanded}
        aria-controls={`experience-content-${index}`}
        aria-label={`${isExpanded ? "Collapse" : "Expand"} experience details for ${experience.role} at ${experience.company}`}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-400 transition-colors">
              {experience.role}
            </h3>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-2">
              {experience.company} • {experience.period}
            </p>
            {experience.current && (
              <Badge className="mt-2 bg-emerald-600/90 text-white border-0">
                <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white/90" />
                Current
              </Badge>
            )}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 mt-1"
          >
            <ChevronDown className="h-5 w-5 text-slate-400 group-hover:text-brand-primary-600 dark:group-hover:text-brand-primary-400 transition-colors" aria-hidden="true" />
          </motion.div>
        </div>

        {/* Tech Stack Tags - Always visible */}
        <ul className="mt-4 flex flex-wrap gap-2 list-none" aria-label="Technologies used">
          {experience.stack.map((tech) => (
            <li key={tech}>
              <Badge
                variant="outline"
                className="rounded-full border-slate-200/70 bg-white/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-600/50 dark:bg-slate-900/50 dark:text-slate-200"
              >
                {tech}
              </Badge>
            </li>
          ))}
        </ul>
      </button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`experience-content-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-6 mt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wide">
                Key Achievements
              </h4>
              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, staggerChildren: 0.1 }}
                className="space-y-3"
              >
                {experience.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.05 }}
                    className="flex items-start gap-3 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-5 w-5 text-brand-accent-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm md:text-base leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TimelineNode({ index, inView, isActive }: { index: number; inView: boolean; isActive: boolean }) {
  const icons = [Briefcase, Code, Rocket];
  const Icon = icons[index % icons.length] || Briefcase;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2, type: "spring", stiffness: 200 }}
      className={cn(
        "absolute left-0 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white shadow-lg transition-all duration-300",
        "dark:border-slate-900",
        isActive
          ? "bg-gradient-to-br from-brand-primary-600 to-brand-secondary-600 scale-110 shadow-xl shadow-brand-primary/50"
          : "bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800"
      )}
    >
      <Icon
        className={cn(
          "h-5 w-5 transition-colors",
          isActive ? "text-white" : "text-slate-600 dark:text-slate-300"
        )}
      />
    </motion.div>
  );
}

export default function ExperienceTimelineV2() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);
  const inView = useInView(containerRef, { margin: "-20% 0px -20% 0px", once: false });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  // Animate timeline line progress
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div ref={containerRef} className="relative py-8">
      {/* Animated Vertical Timeline Line */}
      <div className="absolute left-5 top-0 bottom-0 w-0.5 overflow-hidden md:left-6">
        {/* Background line */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />
        
        {/* Animated progress line with gradient */}
        <motion.div
          className="absolute top-0 left-0 right-0 origin-top"
          style={{
            height: useTransform(lineProgress, (v) => `${Math.max(0, Math.min(100, v))}%`),
          }}
        >
          <div className="h-full w-full bg-gradient-to-b from-brand-primary-600 via-brand-secondary-600 to-brand-accent-600 shadow-lg shadow-brand-primary/30" />
        </motion.div>
      </div>

      {/* Experience Cards */}
      <ul className="space-y-8 md:space-y-12">
        {EXPERIENCES.map((experience, index) => (
          <li key={`${experience.role}-${index}`} className="relative">
            {/* Timeline Node */}
            <TimelineNode
              index={index}
              inView={inView}
              isActive={expandedIndex === index}
            />

            {/* Experience Card */}
            <ExperienceCard
              experience={experience}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => handleToggle(index)}
              inView={inView}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
