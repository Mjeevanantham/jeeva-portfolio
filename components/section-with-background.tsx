"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

type SectionWithBackgroundProps = {
  src: string; // public path like /diagonal-gradient-bg.svg
  alt?: string;
  overlayClassName?: string; // e.g. "bg-black/30" or gradient utilities
  className?: string; // padding/margins for the section itself
  children?: React.ReactNode;
  priority?: boolean;
  // If true, keep image fixed to viewport for parallax feel
  fixed?: boolean;
};

export default function SectionWithBackground({
  src,
  alt = "",
  overlayClassName,
  className,
  priority,
  children,
  fixed = false,
}: SectionWithBackgroundProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background image fills the section */}
      <div className={cn("pointer-events-none absolute inset-0 -z-10", fixed && "[background-attachment:fixed]")}
        aria-hidden>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={cn("object-cover", fixed && "!static")}
        />
        {overlayClassName ? (
          <div className={cn("absolute inset-0", overlayClassName)} />
        ) : null}
      </div>
      {children}
    </section>
  );
}
