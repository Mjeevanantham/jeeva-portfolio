/**
 * Image Utilities
 *
 * Helper functions for working with optimized images and blur placeholders
 */

import { IMAGE_BLUR_CONFIG } from "./image-blur-config";

/**
 * Get blur data URL for an image path
 * @param imagePath - Path to image relative to /public (e.g., "/v2/avatar.jpg")
 * @returns Blur data URL or undefined if not found
 */
export function getBlurDataURL(imagePath: string): string | undefined {
  // Remove leading slash if present
  const normalizedPath = imagePath.startsWith("/") ? imagePath.slice(1) : imagePath;
  return IMAGE_BLUR_CONFIG[normalizedPath];
}

/**
 * Get optimized sizes attribute based on image context
 */
export function getImageSizes(context: "hero" | "project" | "avatar" | "thumbnail" | "full"): string {
  switch (context) {
    case "hero":
      return "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px";
    case "project":
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw";
    case "avatar":
      return "(max-width: 768px) 280px, 320px";
    case "thumbnail":
      return "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
    case "full":
    default:
      return "100vw";
  }
}
