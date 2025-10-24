"use client";

import React from "react";
import { motion } from "framer-motion";

type Skill = { name: string; level: number };

type Category = {
  title: string;
  skills: Skill[];
};

const CATEGORIES: Category[] = [
  {
    title: "Frontend",
    skills: [
      { name: "Next.js", level: 85 },
      { name: "React", level: 85 },
      { name: "TypeScript", level: 80 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "NestJS", level: 80 },
      { name: "GraphQL", level: 70 },
      { name: "REST APIs", level: 90 },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 80 },
      { name: "Prisma ORM", level: 70 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Git", level: 85 },
      { name: "CI/CD", level: 65 },
      { name: "Linux", level: 70 },
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
                  <span className="text-slate-500 dark:text-slate-400">{s.level}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200/70 dark:bg-slate-800">
                  <motion.div
                    className="h-2 rounded-full bg-brand-gradient"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
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
