/**
 * V2 Typography System
 * 
 * Professional typography configuration with Inter font family,
 * standardized font sizes, weights, and line heights.
 * 
 * @module lib/v2/typography
 */

/**
 * Font Size Scale (Tailwind)
 * Based on standard Tailwind typography scale
 */
export const FONT_SIZES = {
  xs: "0.75rem",    // 12px
  sm: "0.875rem",   // 14px
  base: "1rem",     // 16px
  lg: "1.125rem",   // 18px
  xl: "1.25rem",    // 20px
  "2xl": "1.5rem",  // 24px
  "3xl": "1.875rem", // 30px
  "4xl": "2.25rem", // 36px
  "5xl": "3rem",    // 48px
  "6xl": "3.75rem", // 60px
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Line Heights
 */
export const LINE_HEIGHTS = {
  tight: 1.25,
  normal: 1.5,
  relaxed: 1.75,
} as const;

/**
 * Letter Spacing for Headings
 * Negative letter spacing for tighter, more modern look
 */
export const LETTER_SPACING = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
  wider: "0.05em",
} as const;

/**
 * Typography Scale for Headings
 */
export const HEADING_STYLES = {
  h1: {
    fontSize: FONT_SIZES["5xl"],      // 48px
    fontWeight: FONT_WEIGHTS.bold,    // 700
    lineHeight: LINE_HEIGHTS.tight,   // 1.25
    letterSpacing: LETTER_SPACING.tight, // -0.025em
  },
  h2: {
    fontSize: FONT_SIZES["4xl"],      // 36px
    fontWeight: FONT_WEIGHTS.bold,    // 700
    lineHeight: LINE_HEIGHTS.tight,   // 1.25
    letterSpacing: LETTER_SPACING.tight, // -0.025em
  },
  h3: {
    fontSize: FONT_SIZES["3xl"],      // 30px
    fontWeight: FONT_WEIGHTS.semibold, // 600
    lineHeight: LINE_HEIGHTS.tight,   // 1.25
    letterSpacing: LETTER_SPACING.tight, // -0.025em
  },
  h4: {
    fontSize: FONT_SIZES["2xl"],      // 24px
    fontWeight: FONT_WEIGHTS.semibold, // 600
    lineHeight: LINE_HEIGHTS.normal,  // 1.5
    letterSpacing: LETTER_SPACING.normal, // 0em
  },
  h5: {
    fontSize: FONT_SIZES.xl,          // 20px
    fontWeight: FONT_WEIGHTS.semibold, // 600
    lineHeight: LINE_HEIGHTS.normal,  // 1.5
    letterSpacing: LETTER_SPACING.normal, // 0em
  },
  h6: {
    fontSize: FONT_SIZES.lg,          // 18px
    fontWeight: FONT_WEIGHTS.medium,  // 500
    lineHeight: LINE_HEIGHTS.normal,  // 1.5
    letterSpacing: LETTER_SPACING.normal, // 0em
  },
} as const;

/**
 * Responsive Typography Scale
 * Mobile-first approach with larger sizes on desktop
 */
export const RESPONSIVE_HEADING_STYLES = {
  h1: {
    base: FONT_SIZES["4xl"],    // 36px on mobile
    md: FONT_SIZES["5xl"],      // 48px on tablet+
    lg: FONT_SIZES["6xl"],      // 60px on desktop
  },
  h2: {
    base: FONT_SIZES["3xl"],    // 30px on mobile
    md: FONT_SIZES["4xl"],      // 36px on tablet+
    lg: FONT_SIZES["5xl"],      // 48px on desktop
  },
  h3: {
    base: FONT_SIZES["2xl"],   // 24px on mobile
    md: FONT_SIZES["3xl"],      // 30px on tablet+
  },
  h4: {
    base: FONT_SIZES.xl,        // 20px on mobile
    md: FONT_SIZES["2xl"],      // 24px on tablet+
  },
} as const;

/**
 * Body Text Styles
 */
export const BODY_STYLES = {
  base: {
    fontSize: FONT_SIZES.base,      // 16px
    fontWeight: FONT_WEIGHTS.normal, // 400
    lineHeight: LINE_HEIGHTS.relaxed, // 1.75
  },
  large: {
    fontSize: FONT_SIZES.lg,         // 18px
    fontWeight: FONT_WEIGHTS.normal, // 400
    lineHeight: LINE_HEIGHTS.relaxed, // 1.75
  },
  small: {
    fontSize: FONT_SIZES.sm,         // 14px
    fontWeight: FONT_WEIGHTS.normal, // 400
    lineHeight: LINE_HEIGHTS.normal, // 1.5
  },
} as const;

/**
 * Type definitions
 */
export type FontSize = keyof typeof FONT_SIZES;
export type FontWeight = keyof typeof FONT_WEIGHTS;
export type LineHeight = keyof typeof LINE_HEIGHTS;
export type LetterSpacing = keyof typeof LETTER_SPACING;
export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

/**
 * Typography System Export
 */
export const TYPOGRAPHY = {
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  letterSpacing: LETTER_SPACING,
  headings: HEADING_STYLES,
  responsiveHeadings: RESPONSIVE_HEADING_STYLES,
  body: BODY_STYLES,
} as const;

export default TYPOGRAPHY;
