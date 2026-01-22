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
  const [isOpen, setIsOpen] = React.useState(false);
  const current = theme === "system" ? systemTheme : theme;

  React.useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  if (!mounted) {
    return (
      <button 
        aria-label="Toggle theme" 
        className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <SunIcon />
      </button>
    );
  }

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2"
        aria-label="Theme menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {current === "dark" ? (
          <MoonIcon aria-hidden="true" className="text-slate-700 dark:text-slate-300" />
        ) : current === "light" ? (
          <SunIcon aria-hidden="true" className="text-slate-700 dark:text-slate-300" />
        ) : (
          <LaptopIcon aria-hidden="true" className="text-slate-700 dark:text-slate-300" />
        )}
        <span className="sr-only">
          {current === "dark" ? "Dark theme" : current === "light" ? "Light theme" : "System theme"}
        </span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-40 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 shadow-xl dark:shadow-2xl z-50"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleThemeChange("light")}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              theme === "light"
                ? "bg-brand-primary-50 dark:bg-brand-primary-950 text-brand-primary-700 dark:text-brand-primary-300"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <SunIcon aria-hidden="true" className="h-4 w-4" />
            Light
          </button>
          <button
            onClick={() => handleThemeChange("dark")}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              theme === "dark"
                ? "bg-brand-primary-50 dark:bg-brand-primary-950 text-brand-primary-700 dark:text-brand-primary-300"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <MoonIcon aria-hidden="true" className="h-4 w-4" />
            Dark
          </button>
          <button
            onClick={() => handleThemeChange("system")}
            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
              theme === "system"
                ? "bg-brand-primary-50 dark:bg-brand-primary-950 text-brand-primary-700 dark:text-brand-primary-300"
                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <LaptopIcon aria-hidden="true" className="h-4 w-4" />
            System
          </button>
        </div>
      )}
    </div>
  );
}
