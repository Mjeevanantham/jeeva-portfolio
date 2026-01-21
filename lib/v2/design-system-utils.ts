/**
 * Design System Utilities
 * 
 * Helper functions and utilities for working with the design system
 * 
 * @module lib/v2/design-system-utils
 */

import { DESIGN_SYSTEM, type BrandColorName, type BrandColorShade } from "./design-system";

/**
 * Get a brand color by name and shade
 * 
 * @example
 * ```ts
 * const primaryBlue = getBrandColor('primary', 600);
 * ```
 */
export function getBrandColor(
  name: BrandColorName,
  shade: BrandColorShade = "DEFAULT"
): string {
  const color = DESIGN_SYSTEM.brand[name];
  if (shade === "DEFAULT") {
    return color.DEFAULT;
  }
  return color[shade] || color.DEFAULT;
}

/**
 * Get a neutral color by shade
 * 
 * @example
 * ```ts
 * const neutral500 = getNeutralColor(500);
 * ```
 */
export function getNeutralColor(shade: keyof typeof DESIGN_SYSTEM.neutral): string {
  return DESIGN_SYSTEM.neutral[shade];
}

/**
 * Get a gradient by name
 * 
 * @example
 * ```ts
 * const brandGradient = getGradient('brand', 'DEFAULT');
 * ```
 */
export function getGradient(
  type: "brand" | "primary" | "secondary",
  variant: string = "DEFAULT"
): string {
  if (type === "brand") {
    return DESIGN_SYSTEM.gradients.brand[variant as keyof typeof DESIGN_SYSTEM.gradients.brand] || DESIGN_SYSTEM.gradients.brand.DEFAULT;
  }
  if (type === "primary") {
    return DESIGN_SYSTEM.gradients.primary[variant as keyof typeof DESIGN_SYSTEM.gradients.primary] || DESIGN_SYSTEM.gradients.primary.toSecondary;
  }
  return DESIGN_SYSTEM.gradients.secondary.toAccent;
}

/**
 * Check if a color combination meets WCAG contrast requirements
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns true if contrast meets requirements
 */
/**
 * Check if a color combination meets WCAG contrast requirements
 * 
 * Note: This is a placeholder function. In production, implement actual contrast calculation
 * using relative luminance formulas or a library like 'color-contrast'.
 * 
 * @param foreground - Foreground color (hex)
 * @param background - Background color (hex)
 * @param level - WCAG level ('AA' or 'AAA')
 * @returns true if contrast meets requirements
 */
export function meetsContrastRatio(
  foreground: string,
  background: string,
  level: "AA" | "AAA" = "AA"
): boolean {
  // TODO: Implement actual contrast ratio calculation
  // Minimum ratios: AA normal text = 4.5:1, AA large text = 3:1, AAA normal = 7:1
  // For now, return true as a placeholder
  // In production, use a library like 'color-contrast' or calculate using relative luminance
  // Reference: https://www.w3.org/WAI/GL/wiki/Relative_luminance
  void foreground;
  void background;
  void level;
  return true;
}

/**
 * Get semantic color for text
 * 
 * @param variant - Text variant
 * @param darkMode - Whether to use dark mode colors
 */
export function getTextColor(
  variant: "primary" | "secondary" | "tertiary" | "inverse" | "brand",
  darkMode: boolean = false
): string {
  const semantic = darkMode ? DESIGN_SYSTEM.darkSemantic : DESIGN_SYSTEM.semantic;
  return semantic.text[variant];
}

/**
 * Get semantic color for background
 * 
 * @param variant - Background variant
 * @param darkMode - Whether to use dark mode colors
 */
export function getBackgroundColor(
  variant: "primary" | "secondary" | "tertiary" | "inverse",
  darkMode: boolean = false
): string {
  const semantic = darkMode ? DESIGN_SYSTEM.darkSemantic : DESIGN_SYSTEM.semantic;
  return semantic.background[variant];
}

/**
 * Get CSS custom property name for a brand color
 * 
 * @example
 * ```ts
 * const cssVar = getBrandColorCSSVar('primary', 600);
 * // Returns: '--brand-primary-600'
 * ```
 */
export function getBrandColorCSSVar(
  name: BrandColorName,
  shade: BrandColorShade = "DEFAULT"
): string {
  if (shade === "DEFAULT") {
    return `--brand-${name}`;
  }
  return `--brand-${name}-${shade}`;
}

/**
 * Get Tailwind class name for a brand color
 * 
 * @example
 * ```ts
 * const className = getBrandColorClass('primary', 'text');
 * // Returns: 'text-brand-primary'
 * ```
 */
export function getBrandColorClass(
  name: BrandColorName,
  type: "text" | "bg" | "border" = "text"
): string {
  return `${type}-brand-${name}`;
}

/**
 * Design System Export
 * Re-export the design system for convenience
 */
export { DESIGN_SYSTEM, BRAND_COLORS, NEUTRAL_COLORS, GRADIENTS } from "./design-system";
export type { BrandColorName, BrandColorShade, NeutralShade, GradientName } from "./design-system";
