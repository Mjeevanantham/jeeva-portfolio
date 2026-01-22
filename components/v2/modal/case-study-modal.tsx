"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, Lock, Github, FileText, Globe, CheckCircle2, Zap, Users, Clock } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { H3 } from "@/components/v2/typography/heading";
import { type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/**
 * Case Study Modal Props
 */
export interface CaseStudyModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback to close the modal
   */
  onClose: () => void;
  /**
   * Project data to display
   */
  project: Project | null;
}

/**
 * Case Study Data Structure
 */
interface CaseStudyData {
  problem?: {
    background?: string;
    challenge?: string;
  };
  solution?: {
    approach?: string;
    technicalDecisions?: string[];
    architecture?: string;
  };
  achievements?: string[];
  impact?: {
    users?: string;
    performance?: string;
    timeline?: string;
  };
  links?: {
    demo?: string;
    github?: string;
    pdf?: string;
  };
}

// Mock case study data - in production, this would come from a CMS or API
const CASE_STUDY_DATA: Record<string, CaseStudyData> = {
  "erp-saas-platform": {
    problem: {
      background:
        "The client required a scalable, maintainable, and performant ERP frontend capable of supporting multiple business modules such as employee management, operations workflows, and role-based access control.",
      challenge:
        "Key challenges included large, form-heavy enterprise screens, rapid feature additions across sprints, tight coupling risk between frontend and backend, and the need for predictable data fetching and UI state management.",
    },
    solution: {
      approach:
        "Built a scalable Next.js foundation with GraphQL-first data access, reusable UI patterns, and performance techniques like dynamic imports and lazy loading.",
      technicalDecisions: [
        "Next.js App Router for optimal performance and SEO",
        "GraphQL for type-safe, efficient data fetching",
        "Component-driven architecture for reusability",
        "Dynamic imports for code splitting",
        "Lazy loading for improved initial load times",
      ],
      architecture: "Modular component system with centralized query patterns and predictable state management.",
    },
    achievements: [
      "Delivered 10+ production-grade screens",
      "100% TypeScript coverage for type safety",
      "Optimized bundle size with code splitting",
      "Maintained consistent UI patterns across modules",
      "Improved developer experience with reusable components",
    ],
    impact: {
      users: "60+ employees",
      performance: "Optimized bundle size and improved load times",
      timeline: "Delivered across multiple sprints",
    },
    links: {
      demo: undefined, // NDA protected
    },
  },
  "crm-system": {
    problem: {
      background:
        "The organization required a centralized system to manage employees, track business opportunities, and enforce strict access control across roles.",
      challenge:
        "Multiple user roles with different permissions, rapid feature iteration without breaking existing workflows, clean separation between frontend and backend teams, and production readiness from day one.",
    },
    solution: {
      approach:
        "Designed and implemented GraphQL APIs with a Role-Based Access Control (RBAC) system, optimized database queries, and Dockerized backend services.",
      technicalDecisions: [
        "NestJS for scalable backend architecture",
        "GraphQL for flexible data querying",
        "PostgreSQL for reliable data storage",
        "Prisma ORM for type-safe database access",
        "Custom RBAC layer for security",
      ],
      architecture: "API-first architecture with role-aware endpoints and optimized data relationships.",
    },
    achievements: [
      "Delivered 50+ GraphQL APIs",
      "Implemented comprehensive RBAC system",
      "Achieved ~30% performance improvements",
      "Dockerized backend services for easy deployment",
      "Supported 500+ active users",
    ],
    impact: {
      users: "500+ active users",
      performance: "~30% improvement in response times",
      timeline: "Production-ready from day one",
    },
    links: {
      demo: undefined, // NDA protected
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

/**
 * Case Study Modal Component
 *
 * Premium case study modal with:
 * - Full-screen on mobile, large centered on desktop
 * - Smooth slide-up (mobile) / fade-scale (desktop) animations
 * - Scrollable content area
 * - Close button + backdrop click + ESC key
 * - Glass-morphism styling
 * - Staggered content animations
 * - Full accessibility support
 */
export function CaseStudyModal({ isOpen, onClose, project }: CaseStudyModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // Handle mount for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap, escape key, and body scroll handling
  React.useEffect(() => {
    if (!isOpen) {
      // Return focus to trigger element when modal closes
      const el = returnFocusRef.current;
      if (el && document.contains(el)) {
        el.focus();
      }
      returnFocusRef.current = null;
      return;
    }

    // Store trigger element on open
    returnFocusRef.current = document.activeElement as HTMLElement | null;

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  if (!mounted || !project) return null;

  const caseStudyData = CASE_STUDY_DATA[project.id] || {};

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={cn(
              "relative z-10 w-full max-w-5xl",
              "max-h-[95vh] md:max-h-[90vh]",
              "rounded-t-3xl md:rounded-2xl",
              "bg-white/95 dark:bg-slate-900/95",
              "backdrop-blur-xl shadow-2xl",
              "border border-white/20 dark:border-white/10",
              "overflow-hidden flex flex-col"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            <div className="mx-auto mt-3 mb-2 h-1.5 w-12 rounded-full bg-slate-300/70 dark:bg-white/20 md:hidden" />

            {/* Header */}
            <div className="flex items-start justify-between p-4 md:p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5">
              <div className="flex-1 pr-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {project.role && (
                    <Badge className="bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 text-white border-0">
                      {project.role}
                    </Badge>
                  )}
                  {project.status === "ongoing" && (
                    <Badge className="bg-emerald-600/90 text-white border-0">
                      <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white/90" />
                      Currently building
                    </Badge>
                  )}
                  {project.nda && (
                    <Badge variant="outline" className="border-slate-300/50 bg-slate-50/80 text-slate-700 dark:border-slate-600/50 dark:bg-slate-900/50 dark:text-slate-200">
                              <Lock className="mr-1.5 h-3 w-3" aria-hidden="true" />
                      NDA
                    </Badge>
                  )}
                </div>
                <H3 id="case-study-title" className="text-2xl md:text-3xl text-slate-900 dark:text-white">
                  {project.title}
                </H3>
                {project.stack && project.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="rounded-full border-slate-200/70 bg-white/70 px-2.5 py-0.5 text-xs font-medium text-slate-700 dark:border-slate-600/50 dark:bg-slate-900/50 dark:text-slate-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex-shrink-0"
                aria-label="Close case study modal"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" aria-hidden="true" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div
              ref={contentRef}
              className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-6 py-6"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Problem Statement */}
                {caseStudyData.problem && (
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl border border-slate-200/50 bg-gradient-to-br from-slate-50/80 to-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:from-slate-800/80 dark:to-slate-900/80">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-brand-primary-600" aria-hidden="true" />
                        Problem Statement
                      </h4>
                      {caseStudyData.problem.background && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Background</p>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {caseStudyData.problem.background}
                          </p>
                        </div>
                      )}
                      {caseStudyData.problem.challenge && (
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Business Challenge</p>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                            {caseStudyData.problem.challenge}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Solution */}
                {caseStudyData.solution && (
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl border border-slate-200/50 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:from-blue-950/30 dark:to-purple-950/30">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-accent-600" aria-hidden="true" />
                        Solution
                      </h4>
                      {caseStudyData.solution.approach && (
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
                          {caseStudyData.solution.approach}
                        </p>
                      )}
                      {caseStudyData.solution.technicalDecisions && caseStudyData.solution.technicalDecisions.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Technical Decisions</p>
                          <ul className="space-y-2">
                            {caseStudyData.solution.technicalDecisions.map((decision, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-primary-600 flex-shrink-0" />
                                <span className="text-sm leading-relaxed">{decision}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {caseStudyData.solution.architecture && (
                        <div>
                          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Architecture Highlights</p>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                            {caseStudyData.solution.architecture}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Key Achievements */}
                {caseStudyData.achievements && caseStudyData.achievements.length > 0 && (
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl border border-slate-200/50 bg-gradient-to-br from-emerald-50/50 to-green-50/50 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:from-emerald-950/30 dark:to-green-950/30">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-brand-accent-600" aria-hidden="true" />
                        Key Achievements
                      </h4>
                      <ul className="space-y-2.5">
                        {caseStudyData.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                            <CheckCircle2 className="h-5 w-5 text-brand-accent-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="text-sm leading-relaxed">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Impact Metrics */}
                {caseStudyData.impact && (
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl border border-slate-200/50 bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:from-purple-950/30 dark:to-pink-950/30">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap className="h-5 w-5 text-brand-secondary-600" aria-hidden="true" />
                        Impact
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {caseStudyData.impact.users && (
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-brand-primary/10 p-2">
                              <Users className="h-5 w-5 text-brand-primary-600" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Users</p>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{caseStudyData.impact.users}</p>
                            </div>
                          </div>
                        )}
                        {caseStudyData.impact.performance && (
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-brand-accent/10 p-2">
                              <Zap className="h-5 w-5 text-brand-accent-600" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Performance</p>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{caseStudyData.impact.performance}</p>
                            </div>
                          </div>
                        )}
                        {caseStudyData.impact.timeline && (
                          <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-brand-secondary/10 p-2">
                              <Clock className="h-5 w-5 text-brand-secondary-600" aria-hidden="true" />
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-600 dark:text-slate-400">Timeline</p>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white">{caseStudyData.impact.timeline}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Links */}
                {(caseStudyData.links?.demo || caseStudyData.links?.github || caseStudyData.links?.pdf) && (
                  <motion.div variants={itemVariants}>
                    <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-800/80">
                      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Links</h4>
                      <div className="flex flex-wrap gap-3">
                        {caseStudyData.links.demo ? (
                          <Button asChild size="lg" className="bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 text-white">
                            <a href={caseStudyData.links.demo} target="_blank" rel="noopener noreferrer">
                              <Globe className="mr-2 h-4 w-4" />
                              Live Demo
                              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                          </Button>
                        ) : project.nda ? (
                          <Button size="lg" variant="outline" disabled className="relative group">
                            <Globe className="mr-2 h-4 w-4" />
                            Live Demo
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                              Protected by NDA
                            </span>
                          </Button>
                        ) : null}
                        {caseStudyData.links.github && (
                          <Button asChild size="lg" variant="outline">
                            <a href={caseStudyData.links.github} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              GitHub
                              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                          </Button>
                        )}
                        {caseStudyData.links.pdf && (
                          <Button asChild size="lg" variant="outline">
                            <a href={caseStudyData.links.pdf} target="_blank" rel="noopener noreferrer">
                              <FileText className="mr-2 h-4 w-4" />
                              Case Study PDF
                              <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
