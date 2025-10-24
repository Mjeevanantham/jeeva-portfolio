"use client";

import * as React from "react";

const ITEMS = [
  "Node.js",
  "NestJS",
  "GraphQL",
  "Next.js",
  "React",
  "TypeScript",
  "Flutter",
  "PostgreSQL",
];

export default function RotatingSpecialties() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <div aria-live="polite" className="mb-6 text-base md:text-lg text-slate-700 dark:text-slate-300">
      <span className="opacity-80">Specialties: </span>
      <span className="inline-block min-w-[8ch] align-middle">
        <span key={index} className="inline-block animate-fade-in">
          {ITEMS[index]}
        </span>
      </span>
      <style jsx>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 300ms ease; }
      `}</style>
    </div>
  );
}
