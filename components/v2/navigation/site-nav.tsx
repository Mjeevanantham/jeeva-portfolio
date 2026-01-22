"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function SiteNavV2() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/v2#about", label: "About" },
    { href: "/v2#experience", label: "Experience" },
    { href: "/v2#projects", label: "Projects" },
    { href: "/v2#skills", label: "Skills" },
    { href: "/v2#contact", label: "Contact" },
    { href: "/v2/blog", label: "Blog" },
  ];

  return (
    <nav className="border-b bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link href="/v2" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600"></div>
              <span className="text-xl font-bold tracking-tight">Jeeva</span>
              <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
                V2
              </span>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm">
              <Link href="/v2/resume">Resume</Link>
            </Button>
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm">
              <Link href="/">V1</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500 rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden border-t py-4 space-y-4" role="menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2 space-y-2">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/v2/resume">Resume</Link>
              </Button>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/">View V1</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
