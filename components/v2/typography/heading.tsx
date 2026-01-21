"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { HeadingLevel } from "@/lib/v2/typography";

/**
 * Heading Component Props
 */
export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /**
   * Heading level (h1-h6)
   */
  level?: HeadingLevel;
  /**
   * Custom font size override
   */
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  /**
   * Font weight override
   */
  weight?: "normal" | "medium" | "semibold" | "bold";
  /**
   * Line height override
   */
  lineHeight?: "tight" | "normal" | "relaxed";
  /**
   * Letter spacing override
   */
  letterSpacing?: "tighter" | "tight" | "normal" | "wide" | "wider";
  /**
   * Whether to use responsive sizing
   */
  responsive?: boolean;
  /**
   * Gradient text effect
   */
  gradient?: boolean;
  /**
   * As child component (for composition)
   */
  asChild?: boolean;
}

/**
 * Professional Heading Component
 * 
 * Provides consistent typography for headings with proper sizing,
 * weights, line heights, and letter spacing.
 * 
 * @example
 * ```tsx
 * <Heading level="h1" gradient>
 *   Welcome to V2
 * </Heading>
 * 
 * <Heading level="h2" responsive>
 *   About Me
 * </Heading>
 * ```
 */
export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  function Heading({
    level = "h1",
    size,
    weight,
    lineHeight,
    letterSpacing,
    responsive = false,
    gradient = false,
    asChild = false,
    className,
    children,
    ...props
  }, ref) {
  const Component = level;

  // Base classes for the heading level
  const baseClasses = React.useMemo(() => {
    const classes: string[] = [];

    // Font size
    if (size) {
      classes.push(`text-${size}`);
    } else if (responsive) {
      // Responsive sizing based on level
      switch (level) {
        case "h1":
          classes.push("text-4xl md:text-5xl lg:text-6xl");
          break;
        case "h2":
          classes.push("text-3xl md:text-4xl lg:text-5xl");
          break;
        case "h3":
          classes.push("text-2xl md:text-3xl");
          break;
        case "h4":
          classes.push("text-xl md:text-2xl");
          break;
        default:
          classes.push(`text-${level === "h5" ? "xl" : "lg"}`);
      }
    } else {
      // Default sizing based on level
      switch (level) {
        case "h1":
          classes.push("text-5xl");
          break;
        case "h2":
          classes.push("text-4xl");
          break;
        case "h3":
          classes.push("text-3xl");
          break;
        case "h4":
          classes.push("text-2xl");
          break;
        case "h5":
          classes.push("text-xl");
          break;
        case "h6":
          classes.push("text-lg");
          break;
      }
    }

    // Font weight
    if (weight) {
      classes.push(`font-${weight}`);
    } else {
      // Default weights based on level
      if (level === "h1" || level === "h2") {
        classes.push("font-bold");
      } else if (level === "h3" || level === "h4") {
        classes.push("font-semibold");
      } else if (level === "h5") {
        classes.push("font-semibold");
      } else {
        classes.push("font-medium");
      }
    }

    // Line height
    if (lineHeight) {
      classes.push(`leading-${lineHeight}`);
    } else {
      // Default line heights: tight for h1-h3, normal for h4-h6
      if (level === "h1" || level === "h2" || level === "h3") {
        classes.push("leading-tight");
      } else {
        classes.push("leading-normal");
      }
    }

    // Letter spacing
    if (letterSpacing) {
      classes.push(`tracking-${letterSpacing}`);
    } else {
      // Default letter spacing: tight for h1-h3
      if (level === "h1" || level === "h2" || level === "h3") {
        classes.push("tracking-tight");
      }
    }

    // Gradient text
    if (gradient) {
      classes.push("text-brand-gradient");
    }

    return classes;
  }, [level, size, weight, lineHeight, letterSpacing, responsive, gradient]);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(baseClasses, className),
        ref,
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <Component
        ref={ref}
        className={cn(baseClasses, className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

/**
 * Convenience components for each heading level
 */
export const H1 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h1" {...props} ref={ref} />
);
H1.displayName = "H1";

export const H2 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h2" {...props} ref={ref} />
);
H2.displayName = "H2";

export const H3 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h3" {...props} ref={ref} />
);
H3.displayName = "H3";

export const H4 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h4" {...props} ref={ref} />
);
H4.displayName = "H4";

export const H5 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h5" {...props} ref={ref} />
);
H5.displayName = "H5";

export const H6 = React.forwardRef<HTMLHeadingElement, Omit<HeadingProps, "level">>(
  (props, ref) => <Heading level="h6" {...props} ref={ref} />
);
H6.displayName = "H6";
