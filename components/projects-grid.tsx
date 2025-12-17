"use client";

import React from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: string;
  title: string;
  short: string;
  details: string;
  icon: string;
  stack?: string[];
  role?: string; // e.g., "Lead", "Frontend", "Backend"
  achievements?: string[];
  links?: { demo?: string; source?: string };
  status?: "ongoing" | "completed" | "archived";
  priority?: number; // lower number = higher priority
};

const PROJECTS: Project[] = [
  {
    id: "hrms",
    title: "HRMS Mobile App",
    short: "Flutter + NestJS platform streamlining attendance and leave management",
    details:
      "Leading the development of a comprehensive HRMS mobile application currently serving 60+ employees in my company. As the app project lead, I oversee end-to-end development from architecture to deployment, continuously rolling out new modules and features. The app includes attendance tracking, leave management, payroll integration, and employee self-service portals. I&apos;ve optimized performance, implemented robust security measures, and established CI/CD pipelines for seamless version releases.",
    icon: "/globe.svg",
    stack: ["Flutter", "NestJS", "PostgreSQL", "Firebase"],
    role: "App Project Lead",
    status: "ongoing",
    priority: 1,
    achievements: [
      "Leading app development for 60+ active employees",
      "Architected and deployed 8+ core HR modules",
      "Optimized app performance and reduced load times by 40%",
      "Established automated CI/CD pipeline for version releases",
      "Implemented real-time notifications and offline capabilities",
    ],
    links: { demo: "#" },
  },
  {
    id: "landing-fine-tuned",
    title: "Landing Website",
    short: "SEO‑optimized marketing page achieving high conversion rate",
    details:
      "Ultra‑fast marketing site achieving a 100 Lighthouse SEO score. Delivered responsive UI, semantic HTML and structured data for discoverability.",
    icon: "/window.svg",
    stack: ["Next.js", "Tailwind", "SEO", "Analytics"],
    role: "Lead",
    priority: 6,
    achievements: [
      "100/100 SEO and excellent CWV",
      "Delivered in under 15 days",
      "Conversion‑focused, responsive UI across devices",
    ],
    links: { demo: "#" },
  },
  {
    id: "ticketing",
    title: "Ticketing Tool",
    short: "Next.js + RBAC dashboard for internal support tracking",
    details:
      "End‑to‑end ticket lifecycle with SLA tracking and analytics. Built responsive UI and improved performance with lazy loading and dynamic imports.",
    icon: "/file.svg",
    stack: ["Next.js", "Tailwind", "RBAC"],
    role: "Frontend Engineer",
    priority: 4,
    achievements: [
      "Shipped pixel‑perfect responsive pages",
      "Reduced bundle by code‑splitting and lazy loading",
      "Implemented role‑aware screens and guards",
    ],
    links: { demo: "#" },
  },
  {
    id: "food-app",
    title: "Customer Food Delivery App",
    short: "Online ordering with OTP login, wallet payments, and live tracking",
    details:
      "SaaS ordering with OTP login, wallet payments and live order tracking. Hardened APIs with rate limiting and query optimizations.",
    icon: "/globe.svg",
    stack: ["Flutter", "Dart", "Node.js"],
    role: "Full‑Stack Engineer",
    priority: 7,
    achievements: [
      "Implemented OTP auth and wallet flows",
      "Improved security with rate limiting",
      "Real‑time order status updates",
    ],
    links: { demo: "#" },
  },
  {
    id: "recruitment",
    title: "Recruitment Platform",
    short: "Express.js + MongoDB ATS for candidate pipeline management",
    details:
      "Robust REST API enabling candidate‑employer workflows with efficient data flow and clean architecture.",
    icon: "/file.svg",
    stack: ["Node.js", "Express", "MongoDB"],
    role: "Backend Developer",
    priority: 5,
    achievements: [
      "Primary Node.js developer coordinating with client",
      "Delivered scalable API for pipeline and interviews",
    ],
    links: { demo: "#" },
  },
  {
    id: "esim",
    title: "eSim Platform",
    short: "Microservice platform for managing digital SIM provisioning",
    details:
      "Global eSIM purchasing with secure activation and multi‑tenant features. Optimized database performance to reduce response times.",
    icon: "/globe.svg",
    stack: ["NestJS", "Microservices", "Kafka"],
    role: "Backend Engineer",
    priority: 3,
    achievements: [
      "Cut API response times by ~30%",
      "Added package recommendations and tenant‑aware time formatting",
      "Implemented tenant‑specific transactional email",
    ],
    links: { demo: "#" },
  },
  {
    id: "crm",
    title: "CRM System",
    short: "GraphQL‑powered NestJS backend for customer data management",
    details:
      "Real‑time employee and opportunity management via GraphQL API. Dockerized and deployed with production‑grade workflows.",
    icon: "/window.svg",
    stack: ["NestJS", "GraphQL", "Docker"],
    role: "Backend Engineer",
    priority: 2,
    achievements: [
      "Designed and implemented RBAC across the application",
      "Owned Dockerization and server management",
    ],
    links: { demo: "#" },
  },
];

export default function ProjectsGrid() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const glowRef = React.useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = React.useState<Project | null>(null);
  // Note: previous horizontal-scroll layout grouped items into pairs; no longer used

  // Smooth, light cursor-follow glow
  React.useEffect(() => {
    const el = containerRef.current;
    const glow = glowRef.current;
    if (!el || !glow) return;

    const element = el as HTMLDivElement;
    const glowEl = glow as HTMLDivElement;

    let raf = 0;
    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    function onMove(e: MouseEvent) {
      const rect = element.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
    }

    function animate() {
      // Lerp for smoothness
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      glowEl.style.transform = `translate3d(${pos.x - 150}px, ${pos.y - 150}px, 0)`;
      raf = requestAnimationFrame(animate);
    }

    element.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    return () => {
      element.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Sort projects by explicit market priority when present
  const projectsSorted = React.useMemo(() => {
    return PROJECTS.slice().sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Glow follows cursor, subtle and light */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full opacity-70 blur-2xl will-change-transform"
        style={{
          background:
            "radial-gradient(120px 120px at center, rgba(59,130,246,0.18), rgba(124,58,237,0.14), rgba(59,130,246,0.06) 70%)",
          mixBlendMode: "screen",
          transform: "translate3d(-9999px,-9999px,0)",
          transition: "opacity 300ms ease",
        }}
      />

      {/* Mobile/Tablet: stacked grid, no horizontal scroll */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectsSorted.slice(0, 6).map((p) => (
          <Card
            key={p.id}
            data-animate="project-card"
            className="hover:shadow-xl transition-shadow cursor-pointer h-48 overflow-hidden"
            onClick={() => setSelected(p)}
          >
            <CardHeader>
              <div className="mb-2">
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                  <Image src={p.icon} alt={`${p.title} icon`} width={24} height={24} className="h-6 w-6" />
                </div>
              </div>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.short}</CardDescription>
              {p.status === "ongoing" && (
                <div className="mt-2">
                  <Badge className="bg-emerald-600/90 text-white">
                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white/90" />
                    Currently building
                  </Badge>
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Tablet/Desktop: grid (2x3) */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projectsSorted.slice(0, 6).map((p) => (
          <Card
            key={p.id}
            data-animate="project-card"
            className="hover:shadow-xl transition-shadow cursor-pointer h-48 overflow-hidden"
            onClick={() => setSelected(p)}
          >
            <CardHeader>
              <div className="mb-2">
                <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                  <Image src={p.icon} alt={`${p.title} icon`} width={24} height={24} className="h-6 w-6" />
                </div>
              </div>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.short}</CardDescription>
              {p.status === "ongoing" && (
                <div className="mt-2">
                  <Badge className="bg-emerald-600/90 text-white">
                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white/90" />
                    Currently building
                  </Badge>
                </div>
              )}
              {p.stack && (
                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{s}</span>
                  ))}
                </div>
              )}
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-stretch md:justify-center bg-black/50 p-0 md:p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} details`}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="w-full max-w-[100vw] md:max-w-[640px] rounded-t-2xl md:rounded-2xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* drag handle on mobile */}
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300/70 dark:bg-white/20 md:hidden" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{selected.title}</h3>
              {selected.status === "ongoing" && (
                <div className="mb-3">
                  <Badge className="bg-emerald-600/90 text-white">
                    <span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-white/90" />
                    Currently building · 60+ employees
                  </Badge>
                </div>
              )}
              {selected.role && (
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    Role: {selected.role}
                  </Badge>
                </div>
              )}
              <p className="text-slate-600 dark:text-slate-300 mb-4">{selected.short}</p>
              <Card className="mb-4 bg-white/50 dark:bg-white/[0.06]">
                <CardContent className="py-4 text-sm text-slate-700 dark:text-slate-300">
                  {selected.details}
                </CardContent>
              </Card>
              {selected.achievements?.length ? (
                <div className="mb-5">
                  <h4 className="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">Key achievements</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {selected.achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex justify-between gap-3">
                <div className="flex gap-2">
                  {/* NDA: disable demo and hide source code */}
                  <div className="relative group">
                    <button
                      type="button"
                      disabled
                      aria-disabled
                      title="NDA protected: live demo not publicly accessible"
                      className="inline-flex cursor-not-allowed items-center rounded-md bg-brand-gradient/70 px-3 py-2 text-xs font-medium text-white opacity-70"
                    >
                      Live Demo (NDA)
                    </button>
                    <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                      NDA protected
                    </span>
                  </div>
                </div>
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
