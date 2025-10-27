"use client";

import React from "react";
import { motion } from "framer-motion";

type Skill = { name: string; level?: number; note?: string };

type Category = {
  title: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", note: "Production ready" },
      { name: "React", note: "Advanced" },
      { name: "TypeScript", note: "Strong" },
      { name: "Tailwind CSS", note: "Expert" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", note: "Advanced" },
      { name: "NestJS", note: "Production use" },
      { name: "GraphQL", note: "Intermediate" },
      { name: "REST APIs", note: "Expert" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", note: "Practical" },
      { name: "MongoDB", note: "Advanced" },
      { name: "Prisma ORM", note: "Intermediate" },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", note: "Practical" },
      { name: "Git", note: "Advanced" },
      { name: "CI/CD", note: "Working" },
      { name: "Linux", note: "Intermediate" },
    ],
  },
];

export default function SkillsBars() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {CATEGORIES.map((cat) => (
        <div key={cat.title} className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <h3 className="mb-4 text-lg font-semibold">{cat.title}</h3>
          <ul className="space-y-4">
            {cat.skills.map((s) => (
              <li key={s.name} className="group">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-200">{s.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">{s.note}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-slate-800">
                  <motion.div
                    className="h-2 rounded-full bg-brand-gradient"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
