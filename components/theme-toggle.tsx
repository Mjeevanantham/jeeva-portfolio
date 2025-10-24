"use client";

import * as React from "react";
import { useTheme } from "next-themes";

const ICON_SIZE = "h-5 w-5";

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ICON_SIZE} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ICON_SIZE} {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function LaptopIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={ICON_SIZE} {...props}>
      <rect x="3" y="4" width="18" height="12" rx="2" ry="2" />
      <path d="M2 20h20" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const current = theme === "system" ? systemTheme : theme;

  React.useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <button aria-label="Toggle theme" className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800">
        <SunIcon />
      </button>
    );
  }

  return (
    <details className="group relative">
      <summary className="list-none rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-2" aria-label="Theme menu">
        {current === "dark" ? <MoonIcon /> : current === "light" ? <SunIcon /> : <LaptopIcon />}
        <span className="text-sm text-slate-600 dark:text-slate-300 hidden sm:inline">{current === "dark" ? "Dark" : current === "light" ? "Light" : "System"}</span>
      </summary>
      <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-200 bg-white p-1 shadow-lg dark:border-slate-700 dark:bg-slate-900 z-50">
        <button onClick={() => setTheme("light")} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          <SunIcon /> Light
        </button>
        <button onClick={() => setTheme("dark")} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          <MoonIcon /> Dark
        </button>
        <button onClick={() => setTheme("system")} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
          <LaptopIcon /> System
        </button>
      </div>
    </details>
  );
}
