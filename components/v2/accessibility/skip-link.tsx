/**
 * Skip Link Component
 * 
 * Provides keyboard navigation to skip to main content
 * WCAG 2.1 Level A requirement
 */

"use client";

import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary-600 focus:text-white focus:rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500 focus:outline-none"
    >
      Skip to main content
    </Link>
  );
}
