"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SkillPillProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The text content of the pill
   */
  children: React.ReactNode;
  /**
   * Visual variant of the pill
   * @default "default"
   */
  variant?: "default" | "primary" | "outline";
  /**
   * Size of the pill
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional icon to display before the text
   */
  icon?: React.ReactNode;
  /**
   * Whether to enable hover animations
   * @default true
   */
  animated?: boolean;
  /**
   * Animation delay for stagger effects (in seconds)
   * @default 0
   */
  animationDelay?: number;
}

const variantStyles = {
  default: "bg-white/80 border-slate-200/70 text-slate-700 dark:bg-slate-800/80 dark:border-slate-700/50 dark:text-slate-200",
  primary: "bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600 border-transparent text-white shadow-md",
  outline: "bg-transparent border-slate-300/70 text-slate-700 dark:border-slate-600/50 dark:text-slate-300",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-2",
  lg: "px-4 py-2 text-base gap-2.5",
};

const iconSizeStyles = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

/**
 * SkillPill Component
 *
 * A reusable, animated skill tag/pill component with variants, sizes, and hover effects.
 *
 * @example
 * ```tsx
 * <SkillPill variant="primary">Next.js</SkillPill>
 * <SkillPill icon={<NodeIcon />} variant="outline">Node.js</SkillPill>
 * <SkillPill size="lg" variant="primary">TypeScript</SkillPill>
 * ```
 */
export function SkillPill({
  children,
  variant = "default",
  size = "md",
  icon,
  animated = true,
  animationDelay = 0,
  className,
  ...props
}: SkillPillProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={animated ? { opacity: 0, scale: 0.8 } : false}
      animate={animated ? { opacity: 1, scale: 1 } : false}
      transition={{
        duration: 0.3,
        delay: animationDelay,
        ease: "easeOut",
      }}
      whileHover={animated ? { scale: 1.05, y: -2 } : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center justify-center rounded-full border font-medium",
        "backdrop-blur-sm transition-all duration-300",
        "focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {icon && (
        <motion.div
          animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          className={cn("flex-shrink-0", iconSizeStyles[size])}
        >
          {icon}
        </motion.div>
      )}
      <span className="whitespace-nowrap">{children}</span>
    </motion.div>
  );
}

/**
 * SkillPillGroup Component
 *
 * A container for rendering multiple SkillPills with stagger animation.
 *
 * @example
 * ```tsx
 * <SkillPillGroup>
 *   <SkillPill>React</SkillPill>
 *   <SkillPill>Next.js</SkillPill>
 *   <SkillPill>TypeScript</SkillPill>
 * </SkillPillGroup>
 * ```
 */
export interface SkillPillGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Delay between each pill animation (in seconds)
   * @default 0.05
   */
  staggerDelay?: number;
  /**
   * Whether to enable stagger animations
   * @default true
   */
  animated?: boolean;
}

export function SkillPillGroup({
  children,
  staggerDelay = 0.05,
  animated = true,
  className,
  ...props
}: SkillPillGroupProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={cn("flex flex-wrap gap-2", className)} {...props}>
      {React.Children.map(childrenArray, (child, index) => {
        if (React.isValidElement(child) && child.type === SkillPill) {
          return React.cloneElement(child as React.ReactElement<SkillPillProps>, {
            animationDelay: animated ? index * staggerDelay : 0,
            animated,
          });
        }
        return child;
      })}
    </div>
  );
}
