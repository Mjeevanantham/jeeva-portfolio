"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

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

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* vertical rail */}
      <div aria-hidden className="absolute left-4 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />

      <ul className="space-y-10">
        {EXPERIENCES.map((item, index) => (
          <li key={item.role + index} className="relative pl-12">
            {/* node */}
            <span
              aria-hidden
              className="absolute left-[6px] top-1 grid h-4 w-4 place-items-center rounded-full bg-white shadow ring-2 ring-offset-2 ring-offset-transparent ring-[color:var(--brand-start)] dark:bg-slate-900"
            >
              <span className="h-2 w-2 rounded-full bg-brand-gradient" />
            </span>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold leading-tight">
                    {item.role}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    {item.company} • {item.period}
                  </p>
                </div>
                {item.current ? (
                  <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/30 dark:text-emerald-400">
                    Current
                  </span>
                ) : null}
              </div>

              <ul className="mt-4 space-y-2 text-slate-700 dark:text-slate-300">
                {item.achievements.map((a) => (
                  <li key={a} className="leading-relaxed">• {a}</li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.stack.map((s) => (
                  <Badge key={s} variant="secondary" className="bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
    </div>
  );
}
