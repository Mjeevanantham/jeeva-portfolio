"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ContainerMaxWidth } from "@/lib/v2/spacing";

/**
 * Container Component Props
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   * @default "xl" (1280px)
   */
  maxWidth?: ContainerMaxWidth;
  /**
   * Whether to apply responsive padding
   * @default true
   */
  padding?: boolean;
  /**
   * Custom padding classes
   */
  paddingClassName?: string;
  /**
   * As child component (for composition)
   */
  asChild?: boolean;
}

/**
 * Container Component
 * 
 * Provides consistent max-width, padding, and centering for content.
 * 
 * Default:
 * - Max width: 1280px (xl)
 * - Padding: px-4 sm:px-6 lg:px-8
 * - Centered: mx-auto
 * 
 * @example
 * ```tsx
 * <Container>
 *   <h1>Content</h1>
 * </Container>
 * 
 * <Container maxWidth="lg" padding={false}>
 *   <div>No padding</div>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  function Container(
    {
      maxWidth = "xl",
      padding = true,
      paddingClassName,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const maxWidthClass = React.useMemo(() => {
      switch (maxWidth) {
        case "sm":
          return "max-w-screen-sm"; // 640px
        case "md":
          return "max-w-screen-md"; // 768px
        case "lg":
          return "max-w-screen-lg"; // 1024px
        case "xl":
          return "max-w-7xl"; // 1280px (default)
        case "2xl":
          return "max-w-screen-2xl"; // 1536px
        default:
          return "max-w-7xl"; // 1280px
      }
    }, [maxWidth]);

    const paddingClasses = padding
      ? paddingClassName || "px-4 sm:px-6 lg:px-8"
      : "";

    const classes = cn(
      "w-full mx-auto",
      maxWidthClass,
      paddingClasses,
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(classes, (children.props as { className?: string }).className),
        ref,
        ...props,
      } as React.HTMLAttributes<HTMLElement>);
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
