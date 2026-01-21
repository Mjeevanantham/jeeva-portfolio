"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ComponentGap } from "@/lib/v2/spacing";

/**
 * Grid Component Props
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns on mobile
   * @default 1
   */
  colsMobile?: number;
  /**
   * Number of columns on tablet (sm breakpoint)
   * @default 2
   */
  colsTablet?: number;
  /**
   * Number of columns on desktop (lg breakpoint)
   * @default 3
   */
  colsDesktop?: number;
  /**
   * Number of columns on large desktop (xl breakpoint)
   * @default 4
   */
  colsDesktopLg?: number;
  /**
   * Gap size between grid items
   * @default "medium" (gap-6)
   */
  gap?: ComponentGap | "none" | "small" | "medium" | "large";
  /**
   * Custom gap value (e.g., "gap-4", "gap-8")
   */
  gapClassName?: string;
  /**
   * As child component (for composition)
   */
  asChild?: boolean;
}

/**
 * Grid Component
 * 
 * Responsive CSS Grid layout with configurable columns and gaps.
 * 
 * Default:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * - Large Desktop: 4 columns
 * - Gap: medium (gap-6)
 * 
 * @example
 * ```tsx
 * <Grid>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * <Grid colsMobile={2} colsDesktop={4} gap="large">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  function Grid(
    {
      colsMobile = 1,
      colsTablet = 2,
      colsDesktop = 3,
      colsDesktopLg = 4,
      gap = "medium",
      gapClassName,
      asChild = false,
      className,
      children,
      ...props
    },
    ref
  ) {
    const gridColsClasses = React.useMemo(() => {
      const classes: string[] = ["grid"];
      
      // Mobile columns
      if (colsMobile === 1) {
        classes.push("grid-cols-1");
      } else if (colsMobile === 2) {
        classes.push("grid-cols-2");
      } else if (colsMobile === 3) {
        classes.push("grid-cols-3");
      } else if (colsMobile === 4) {
        classes.push("grid-cols-4");
      } else {
        classes.push(`grid-cols-[repeat(${colsMobile},minmax(0,1fr))]`);
      }
      
      // Tablet columns
      if (colsTablet !== colsMobile) {
        if (colsTablet === 2) {
          classes.push("sm:grid-cols-2");
        } else if (colsTablet === 3) {
          classes.push("sm:grid-cols-3");
        } else if (colsTablet === 4) {
          classes.push("sm:grid-cols-4");
        } else {
          classes.push(`sm:grid-cols-[repeat(${colsTablet},minmax(0,1fr))]`);
        }
      }
      
      // Desktop columns
      if (colsDesktop !== colsTablet) {
        if (colsDesktop === 2) {
          classes.push("lg:grid-cols-2");
        } else if (colsDesktop === 3) {
          classes.push("lg:grid-cols-3");
        } else if (colsDesktop === 4) {
          classes.push("lg:grid-cols-4");
        } else {
          classes.push(`lg:grid-cols-[repeat(${colsDesktop},minmax(0,1fr))]`);
        }
      }
      
      // Large desktop columns
      if (colsDesktopLg !== colsDesktop) {
        if (colsDesktopLg === 2) {
          classes.push("xl:grid-cols-2");
        } else if (colsDesktopLg === 3) {
          classes.push("xl:grid-cols-3");
        } else if (colsDesktopLg === 4) {
          classes.push("xl:grid-cols-4");
        } else {
          classes.push(`xl:grid-cols-[repeat(${colsDesktopLg},minmax(0,1fr))]`);
        }
      }
      
      return classes;
    }, [colsMobile, colsTablet, colsDesktop, colsDesktopLg]);

    const gapClasses = React.useMemo(() => {
      if (gapClassName) {
        return gapClassName;
      }
      
      switch (gap) {
        case "none":
          return "gap-0";
        case "small":
          return "gap-4";
        case "medium":
          return "gap-6";
        case "large":
          return "gap-8";
        default:
          return "gap-6";
      }
    }, [gap, gapClassName]);

    const classes = cn(gridColsClasses, gapClasses, className);

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

Grid.displayName = "Grid";
