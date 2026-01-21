/**
 * V2-specific constants
 * Keep V2 configuration separate from V1
 */

export const V2_CONFIG = {
  siteName: "Jeevanantham Portfolio V2",
  basePath: "/v2",
  version: "2.0.0",
} as const;

export const COLORS = {
  primary: {
    blue: "#2563eb",
    purple: "#9333ea",
    emerald: "#10b981",
  },
  gradients: {
    hero: "from-blue-600 via-purple-600 to-emerald-600",
    accent: "from-purple-500 to-emerald-500",
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    smooth: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  },
} as const;
