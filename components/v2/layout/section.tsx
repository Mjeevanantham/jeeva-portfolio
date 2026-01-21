"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Container, type ContainerProps } from "./container";

/**
 * Section Component Props
 */
export interface SectionProps extends Omit<ContainerProps, "maxWidth" | "padding" | "paddingClassName"> {
  /**
   * Section ID for anchor navigation
   */
  id?: string;
  /**
   * Vertical padding size
   * @default "responsive" (py-16 mobile, py-24 desktop)
   */
  padding?: "none" | "small" | "medium" | "large" | "responsive";
  /**
   * Background color variant
   */
  variant?: "default" | "muted" | "accent";
  /**
   * Whether to include Container wrapper
   * @default true
   */
  container?: boolean;
  /**
   * Container max width (only used if container is true)
   */
  containerMaxWidth?: ContainerProps["maxWidth"];
}

/**
 * Section Component
 * 
 * Provides consistent section spacing and layout.
 * 
 * Default:
 * - Padding: py-16 (mobile), py-24 (desktop)
 * - Includes Container wrapper
 * - Max width: 1280px
 * 
 * @example
 * ```tsx
 * <Section id="about">
 *   <h2>About Me</h2>
 *   <p>Content here</p>
 * </Section>
 * 
 * <Section padding="large" variant="muted">
 *   <h2>Featured Section</h2>
 * </Section>
 * ```
 */
export const Section = React.forwardRef<HTMLElement, SectionProps>(
  function Section(
    {
      id,
      padding = "responsive",
      variant = "default",
      container = true,
      containerMaxWidth = "xl",
      className,
      children,
      ...props
    },
    ref
  ) {
    const paddingClasses = React.useMemo(() => {
      switch (padding) {
        case "none":
          return "";
        case "small":
          return "py-8";
        case "medium":
          return "py-12";
        case "large":
          return "py-20";
        case "responsive":
        default:
          return "py-16 lg:py-24";
      }
    }, [padding]);

    const variantClasses = React.useMemo(() => {
      switch (variant) {
        case "muted":
          return "bg-neutral-50 dark:bg-neutral-900";
        case "accent":
          return "bg-brand-primary/5 dark:bg-brand-primary/10";
        case "default":
        default:
          return "";
      }
    }, [variant]);

    const classes = cn(paddingClasses, variantClasses, className);

    const content = container ? (
      <Container maxWidth={containerMaxWidth} {...props}>
        {children}
      </Container>
    ) : (
      children
    );

    return (
      <section
        ref={ref}
        id={id}
        className={classes}
        {...(container ? {} : props)}
      >
        {content}
      </section>
    );
  }
);

Section.displayName = "Section";
