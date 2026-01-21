"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section, Container } from "@/components/v2/layout";
import { H2, H3 } from "@/components/v2/typography/heading";
import { V2_FEATURED_PROJECTS, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

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

function TiltImage({ src, alt }: { src: string; alt: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 250, damping: 24, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 250, damping: 24, mass: 0.6 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    mx.set(px);
    my.set(py);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/60 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="pointer-events-none absolute inset-0 bg-brand-gradient opacity-[0.12]" aria-hidden="true" />
      <div className="relative aspect-video w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  );
}

function ProjectPanel({ project, index }: { project: Project; index: number }) {
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
        "py-10 lg:py-16"
      )}
      aria-label={`${index + 1}. ${project.title}`}
    >
      <Container className="h-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-8 lg:grid-cols-2"
        >
          {/* Left: mockup */}
          <div className="lg:pr-4">
            <TiltImage src={mockup} alt={`${project.title} mockup`} />
          </div>

          {/* Right: details */}
          <div className="lg:pl-4">
            <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="flex flex-wrap items-center gap-2">
                {project.role && <Badge className="bg-brand-gradient text-white">{project.role}</Badge>}
                {project.nda && (
                  <Badge variant="outline" className="border-white/25 bg-black/5 text-slate-700 dark:bg-white/5 dark:text-slate-200">
                    <Lock className="mr-1" />
                    NDA
                  </Badge>
                )}
              </div>

              <H3 className="mt-4 text-slate-900 dark:text-white">{project.title}</H3>

              <p className="mt-3 text-base md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                {project.details}
              </p>

              {project.stack?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tech stack">
                  {project.stack.map((t) => (
                    <li key={t}>
                      <Badge variant="outline" className="rounded-full bg-white/60 dark:bg-white/5">
                        {t}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : null}

              {project.nda ? (
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                  Some implementation details are private due to NDA.
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                {caseStudyHref ? (
                  <Button asChild className="bg-brand-gradient text-white">
                    <Link href={caseStudyHref}>
                      View Case Study <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button variant="outline" disabled aria-disabled="true">
                    Case Study Coming Soon
                  </Button>
                )}
              </div>
            </div>
          </div>
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
                          <Lock className="mr-1" />
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
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between">
          <div className="pointer-events-auto pl-4">
            <button
              type="button"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous project"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/70 shadow-sm backdrop-blur-xl transition disabled:opacity-40 dark:border-white/10 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeft />
            </button>
          </div>
          <div className="pointer-events-auto pr-4">
            <button
              type="button"
              onClick={goNext}
              disabled={activeIndex === projects.length - 1}
              aria-label="Next project"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/70 shadow-sm backdrop-blur-xl transition disabled:opacity-40 dark:border-white/10 dark:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
          aria-label="Projects horizontal carousel"
        >
          {/* hide scrollbar (webkit) */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {projects.map((p, idx) => (
            <ProjectPanel key={p.id} project={p} index={idx} />
          ))}
        </div>

        {/* Progress indicator */}
        <Container className="mt-6">
          <div className="flex items-center justify-center gap-2" aria-label="Project progress">
            {projects.map((p, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={cn(
                    "h-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-blue-500",
                    isActive ? "w-10 bg-brand-gradient" : "w-2.5 bg-slate-300/80 dark:bg-white/20"
                  )}
                  aria-label={`Go to ${p.title}`}
                  aria-current={isActive ? "true" : undefined}
                />
              );
            })}
          </div>
          <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
            {activeIndex + 1} / {projects.length}
          </p>
        </Container>
      </div>
    </Section>
  );
}

