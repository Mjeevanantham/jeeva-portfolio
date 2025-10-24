"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  short: string;
  details: string;
};

const PROJECTS: Project[] = [
  {
    id: "hrms",
    title: "HRMS System",
    short: "HR management with employee tracking",
    details:
      "A full-featured HR management platform with attendance, leave workflows, and payroll integrations. Built APIs and optimized queries for scalability.",
  },
  {
    id: "static-site",
    title: "Static Website",
    short: "Marketing site with SEO optimization",
    details:
      "Marketing website optimized for Core Web Vitals with accessible components and structured metadata for search indexing.",
  },
  {
    id: "ticketing",
    title: "Ticketing Tool",
    short: "Support ticket management system",
    details:
      "End-to-end ticket lifecycle with SLA tracking, role-based permissions, and analytics dashboards for support teams.",
  },
  {
    id: "food-app",
    title: "Customer Food Delivery App",
    short: "Online ordering platform",
    details:
      "Multi-restaurant ordering app with real-time status updates, secure checkout, and responsive UI for mobile users.",
  },
  {
    id: "recruitment",
    title: "Recruitment Platform",
    short: "Applicant tracking system",
    details:
      "ATS with candidate pipeline, interview scheduling, and collaborative reviews to streamline hiring processes.",
  },
  {
    id: "esim",
    title: "eSim Platform",
    short: "Digital SIM card management",
    details:
      "Digital eSIM provisioning with secure activation flows, vendor integrations, and activity auditing.",
  },
  {
    id: "crm",
    title: "CRM System",
    short: "Customer relationship management",
    details:
      "CRM with contact management, pipeline tracking, and reporting to improve sales efficiency and insight.",
  },
];

export default function ProjectsGrid() {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const glowRef = React.useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = React.useState<Project | null>(null);

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

      {/* Mobile: horizontal scroll list */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-4">
          {PROJECTS.map((p) => (
            <Card
              key={p.id}
              data-animate="project-card"
              className="min-w-[260px] snap-start hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => setSelected(p)}
            >
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
                <CardDescription>{p.short}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Tablet/Desktop: grid */}
      <div className="hidden md:grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <Card
            key={p.id}
            data-animate="project-card"
            className="hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setSelected(p)}
          >
            <CardHeader>
              <CardTitle>{p.title}</CardTitle>
              <CardDescription>{p.short}</CardDescription>
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
              className="w-full md:max-w-md rounded-t-2xl md:rounded-2xl border border-white/20 bg-white/70 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* drag handle on mobile */}
              <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-slate-300/70 dark:bg-white/20 md:hidden" />
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{selected.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4">{selected.short}</p>
              <Card className="mb-4 bg-white/50 dark:bg-white/[0.06]">
                <CardContent className="py-4 text-sm text-slate-700 dark:text-slate-300">
                  {selected.details}
                </CardContent>
              </Card>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelected(null)}>Close</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
