import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SiteNav() {
  return (
    <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
            <span className="text-xl font-bold">Jeeva</span>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">About</Link>
            <Link href="#experience" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Experience</Link>
            <Link href="#projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Projects</Link>
            <Link href="#skills" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Skills</Link>
            <Link href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Contact</Link>
            <Link href="/blog" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Blog</Link>
            <Button asChild variant="outline" size="sm">
              <Link href="/resume">Resume</Link>
            </Button>
          </div>
          {/* Mobile menu */}
          <details className="md:hidden relative">
            <summary className="list-none p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="Open menu">
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </summary>
            <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <nav className="flex flex-col gap-1">
                <Link href="#about" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">About</Link>
                <Link href="#experience" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Experience</Link>
                <Link href="#projects" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Projects</Link>
                <Link href="#skills" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Skills</Link>
                <Link href="#contact" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Contact</Link>
                <Link href="/blog" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Blog</Link>
                <Link href="/resume" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Resume</Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}
