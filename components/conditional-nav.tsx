"use client";

import { usePathname } from "next/navigation";
import SiteNav from "@/components/site-nav";

/**
 * Conditionally renders V1 navigation only on non-V2 routes
 * V2 routes have their own navigation in app/v2/layout.tsx
 */
export default function ConditionalNav() {
  const pathname = usePathname();
  
  // Don't render V1 nav on V2 routes
  if (pathname?.startsWith("/v2")) {
    return null;
  }
  
  return <SiteNav />;
}
