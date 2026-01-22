"use client";

import * as React from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * OptimizedImage Component
 *
 * A production-ready wrapper around Next.js Image component with:
 * - Automatic blur placeholders
 * - Error fallback handling
 * - Loading skeleton
 * - Proper sizes attribute defaults
 * - Lazy loading by default (except priority images)
 *
 * @example
 * <OptimizedImage
 *   src="/v2/avatar.jpg"
 *   alt="Profile picture"
 *   width={320}
 *   height={320}
 *   priority={false}
 * />
 */

export interface OptimizedImageProps extends Omit<ImageProps, "src" | "alt"> {
  /**
   * Image source path (relative to /public)
   */
  src: string;
  /**
   * Alt text for accessibility (required)
   */
  alt: string;
  /**
   * Blur data URL for placeholder (auto-generated if not provided)
   */
  blurDataURL?: string;
  /**
   * Show loading skeleton while image loads
   */
  showSkeleton?: boolean;
  /**
   * Custom error fallback image path
   */
  fallbackSrc?: string;
  /**
   * Container className
   */
  containerClassName?: string;
}

// Default blur placeholder (1x1 transparent pixel as base64)
const DEFAULT_BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4=";

// Loading skeleton component
function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function OptimizedImage({
  src,
  alt,
  blurDataURL,
  showSkeleton = true,
  fallbackSrc = "/v2/mockups/mockup-placeholder.svg",
  containerClassName,
  className,
  priority = false,
  loading = priority ? undefined : "lazy",
  quality = 90,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const [imageSrc, setImageSrc] = React.useState(src);

  // Use provided blurDataURL or default
  const blurPlaceholder = blurDataURL || DEFAULT_BLUR_DATA_URL;

  // Handle image load
  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  // Handle image error
  const handleError = React.useCallback(() => {
    setIsLoading(false);
    if (imageSrc !== fallbackSrc) {
      setHasError(true);
      setImageSrc(fallbackSrc);
    }
  }, [fallbackSrc, imageSrc]);

  // Reset state when src changes
  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  // Determine default sizes based on common use cases
  // Only set default if sizes is not provided and fill is not used
  const defaultSizes = sizes || (!props.fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Loading skeleton */}
      {showSkeleton && isLoading && <LoadingSkeleton />}

      {/* Optimized Image */}
      <Image
        src={imageSrc}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          "dark:brightness-90 dark:contrast-105",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        placeholder={blurPlaceholder ? "blur" : "empty"}
        blurDataURL={blurPlaceholder}
        priority={priority}
        loading={loading}
        quality={quality}
        sizes={defaultSizes}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />

      {/* Error state indicator (optional, for debugging) */}
      {hasError && process.env.NODE_ENV === "development" && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-xs text-slate-500"
          aria-hidden="true"
        >
          Image failed to load
        </div>
      )}
    </div>
  );
}
