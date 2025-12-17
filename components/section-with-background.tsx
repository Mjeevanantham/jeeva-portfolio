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
};

export default function SectionWithBackground({
  src,
  alt = "",
  overlayClassName,
  className,
  priority,
  children,
}: SectionWithBackgroundProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      {/* Background image fills the section */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className="object-cover"
        />
        {overlayClassName ? (
          <div className={cn("absolute inset-0", overlayClassName)} />
        ) : null}
      </div>
      {children}
    </section>
  );
}
