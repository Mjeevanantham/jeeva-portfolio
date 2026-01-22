"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, Container } from "@/components/v2/layout";
import { H2, H3 } from "@/components/v2/typography/heading";
import { V2_FEATURED_PROJECTS, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "@/components/v2/image/optimized-image";
import { getBlurDataURL, getImageSizes } from "@/lib/v2/image-utils";
import dynamic from "next/dynamic";
import { ModalSkeleton } from "@/components/v2/loading/modal-skeleton";

// Dynamic import for CaseStudyModal - only loads when modal is opened
const CaseStudyModal = dynamic(() => import("@/components/v2/modal/case-study-modal").then((mod) => ({ default: mod.CaseStudyModal })), {
  loading: () => <ModalSkeleton />,
  ssr: false,
});

function useActiveIndex(containerRef: React.RefObject<HTMLElement | null>, itemSelector: string) {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(itemSelector));
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most visible entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible?.target) return;
        const idx = items.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setActive(idx);
      },
      {
        root,
        threshold: [0.4, 0.6, 0.75],
      }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [containerRef, itemSelector]);

  return [active, setActive] as const;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Memoized TiltImage component with useCallback optimizations
const TiltImage = React.memo(function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 250, damping: 24, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const onMove = React.useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  }, [mx, my]);

  const onLeave = React.useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="relative overflow-hidden rounded-2xl border-2 border-slate-200/50 bg-gradient-to-br from-white/90 to-slate-50/90 shadow-2xl backdrop-blur-xl dark:border-slate-700/50 dark:from-slate-800/90 dark:to-slate-900/90"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-brand-secondary/5 to-brand-accent/5 opacity-60 dark:opacity-40" aria-hidden="true" />
      <div className="relative aspect-video w-full">
        <OptimizedImage
          src={src}
          alt={alt}
          fill
          sizes={getImageSizes("project")}
          className="object-cover"
          priority={false}
          quality={90}
          blurDataURL={getBlurDataURL(src.startsWith("/") ? src.slice(1) : src)}
        />
      </div>
    </motion.div>
  );
});

function ProjectPanel({
  project,
  index,
  onViewCaseStudy,
}: {
  project: Project;
  index: number;
  onViewCaseStudy: () => void;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

  const mockup = project.mockupSrc || "/v2/mockups/mockup-placeholder.svg";
  const caseStudyHref = project.caseStudyHref;

  return (
    <div
      ref={ref}
      data-project-panel
      className={cn(
        // full-viewport snap panels
        "snap-center shrink-0 w-screen",
        // height: keep comfortable within viewport; allow internal scroll if needed
        "min-h-[85vh] flex items-center py-10 lg:py-16"
      )}
      aria-label={`${index + 1}. ${project.title}`}
    >
      <Container className="h-full w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          {/* Left 50%: mockup with 3D tilt */}
          <motion.div
            className="lg:pr-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <TiltImage src={mockup} alt={`${project.title} mockup`} />
          </motion.div>

          {/* Right 50%: project details */}
          <motion.div
            className="lg:pl-6"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 md:p-8 shadow-lg backdrop-blur-xl dark:border-slate-700/50 dark:bg-slate-800/50 transition-shadow duration-200 hover:shadow-xl"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Role badge and NDA */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {project.role && (
                  <Badge className="bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 text-white border-0 shadow-sm">
                    {project.role}
                  </Badge>
                )}
                {project.nda && (
                  <Badge variant="outline" className="border-slate-300/50 bg-slate-50/80 text-slate-700 dark:border-slate-600/50 dark:bg-slate-900/50 dark:text-slate-200">
                    <Lock className="mr-1.5 h-3 w-3" aria-hidden="true" />
                    NDA
                  </Badge>
                )}
              </div>

              {/* Project title */}
              <H3 className="mb-4 text-slate-900 dark:text-white">{project.title}</H3>

              {/* Description */}
              <p className="mb-6 text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {project.details}
              </p>

              {/* Tech stack tags */}
              {project.stack?.length ? (
                <ul className="mb-6 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map((t) => (
                    <li key={t}>
                      <Badge
                        variant="outline"
                        className="rounded-full border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur dark:border-slate-600/50 dark:bg-slate-900/50 dark:text-slate-200"
                      >
                        {t}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* NDA notice */}
              {project.nda ? (
                <p className="mb-6 text-sm italic text-slate-600 dark:text-slate-400">
                  Some implementation details are private due to NDA.
                </p>
              ) : null}

              {/* CTA button */}
              <div className="flex flex-wrap gap-3">
                {caseStudyHref ? (
                  <Button
                    size="lg"
                    onClick={onViewCaseStudy}
                    className="bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    View Case Study <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="lg"
                    disabled
                    aria-disabled="true"
                    className="border-slate-300 dark:border-slate-600"
                  >
                    Case Study Coming Soon
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}

export default function HorizontalProjects() {
  const projects = React.useMemo(() => {
    return V2_FEATURED_PROJECTS.slice().sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
  }, []);

  const scrollerRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useActiveIndex(scrollerRef, "[data-project-panel]");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { amount: 0.2 });

  const scrollToIndex = React.useCallback(
    (idx: number) => {
      const root = scrollerRef.current;
      if (!root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-project-panel]"));
      const next = items[idx];
      if (!next) return;
      next.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      setActiveIndex(idx);
    },
    [setActiveIndex]
  );

  const goPrev = React.useCallback(
    () => scrollToIndex(clamp(activeIndex - 1, 0, projects.length - 1)),
    [activeIndex, projects.length, scrollToIndex]
  );
  const goNext = React.useCallback(
    () => scrollToIndex(clamp(activeIndex + 1, 0, projects.length - 1)),
    [activeIndex, projects.length, scrollToIndex]
  );

  // Keyboard navigation (desktop only)
  React.useEffect(() => {
    if (!sectionInView) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Avoid hijacking when typing in inputs
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || (e.target as HTMLElement | null)?.isContentEditable) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [sectionInView, goPrev, goNext]);

  return (
    <Section id="projects" ref={sectionRef} className="scroll-mt-24" variant="default" container={false}>
      <Container className="text-center">
        <H2 responsive className="mb-3">
          Projects
        </H2>
        <p className="mx-auto max-w-2xl text-base md:text-lg text-slate-600 dark:text-slate-400">
          Case studies and production work—built with performance, maintainability, and real users in mind.
        </p>
      </Container>

      {/* Skip link for accessibility */}
      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#experience"
          className="inline-flex rounded-md bg-brand-gradient px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip projects section
        </a>
      </div>

      {/* Mobile / Tablet: vertical stack */}
      <div className="mt-10 lg:hidden">
        <Container>
          <div className="space-y-6">
            {projects.map((p) => (
              <div key={p.id} className="rounded-2xl border border-white/20 bg-white/70 p-5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <TiltImage src={p.mockupSrc || "/v2/mockups/mockup-placeholder.svg"} alt={`${p.title} mockup`} />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {p.role && <Badge className="bg-brand-gradient text-white">{p.role}</Badge>}
                      {p.nda && (
                        <Badge variant="outline" className="border-white/25 bg-black/5 text-slate-700 dark:bg-white/5 dark:text-slate-200">
                          <Lock className="mr-1" aria-hidden="true" />
                          NDA
                        </Badge>
                      )}
                    </div>
                    <H3 className="mt-3 text-slate-900 dark:text-white">{p.title}</H3>
                    <p className="mt-2 text-sm md:text-base text-slate-700 dark:text-slate-300">{p.short}</p>
                    {p.stack?.length ? (
                      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Tech stack">
                        {p.stack.map((t) => (
                          <li key={t}>
                            <Badge variant="outline" className="rounded-full bg-white/60 dark:bg-white/5">
                              {t}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <div className="mt-4">
                      {p.caseStudyHref ? (
                        <Button asChild className="bg-brand-gradient text-white">
                          <Link href={p.caseStudyHref}>View Case Study</Link>
                        </Button>
                      ) : (
                        <Button variant="outline" disabled aria-disabled="true">
                          Case Study Coming Soon
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Desktop: horizontal scroll with snap */}
      <div className="relative mt-10 hidden lg:block">
        {/* Nav arrows */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-4">
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: activeIndex > 0 ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200/50 bg-white/90 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 dark:border-slate-700/50 dark:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ChevronLeft className="h-5 w-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
            </button>
          </motion.div>
          <motion.div
            className="pointer-events-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: activeIndex < projects.length - 1 ? 1 : 0.3, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next project"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-200/50 bg-white/90 shadow-lg backdrop-blur-xl transition-all hover:scale-110 hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 dark:border-slate-700/50 dark:bg-slate-800/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ChevronRight className="h-5 w-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] overscroll-x-contain"
          aria-label="Projects horizontal carousel"
          role="region"
          aria-live="polite"
          tabIndex={0}
        >
          {/* hide scrollbar (webkit) */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {projects.map((p, idx) => (
            <ProjectPanel
              key={p.id}
              project={p}
              index={idx}
              onViewCaseStudy={() => setSelectedProject(p)}
            />
          ))}
        </div>

        {/* Progress indicator */}
        <Container className="mt-8">
          <div className="flex items-center justify-center gap-2.5" aria-label="Project progress" role="tablist">
            {projects.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                    isActive
                      ? "w-12 bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 shadow-md"
                      : "w-3 bg-slate-300/70 hover:bg-slate-400/70 dark:bg-slate-600/50 dark:hover:bg-slate-500/70"
                  )}
                  aria-label={`Go to ${p.title}, project ${idx + 1} of ${projects.length}`}
                  aria-current={isActive ? "true" : undefined}
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-posinset={idx + 1}
                  aria-setsize={projects.length}
                />
              );
            })}
          </div>
          <p className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-400" aria-live="polite" aria-atomic="true">
            Project {activeIndex + 1} of {projects.length}
          </p>
        </Container>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </Section>
  );
}

