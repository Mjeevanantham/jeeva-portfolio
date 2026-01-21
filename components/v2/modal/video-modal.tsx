"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

/**
 * Video Modal Props
 */
export interface VideoModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;
  /**
   * Callback to close the modal
   */
  onClose: () => void;
  /**
   * YouTube embed URL (e.g. https://www.youtube.com/embed/<id>)
   */
  videoUrl: string;
  /**
   * Modal title (used for accessibility)
   */
  title: string;
}

/**
 * Video Modal Component
 * 
 * Premium video modal with:
 * - Smooth fade + scale animation
 * - Backdrop blur + dark overlay
 * - Responsive video player (16:9 aspect ratio)
 * - Close button (X icon top-right)
 * - Click outside to close
 * - Focus trap
 * - Escape key to close
 * - YouTube embed support
 * 
 * @example
 * ```tsx
 * <VideoModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   videoId="dQw4w9WgXcQ"
 *   title="Introduction Video"
 * />
 * ```
 */
export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  title,
}: VideoModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);

  // Handle mount for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap and escape key handling
  React.useEffect(() => {
    if (!isOpen) return;

    // Capture current focus so we can restore it on close
    returnFocusRef.current = document.activeElement as HTMLElement | null;

    // Reset loading/error state each time we open
    setIsLoading(true);
    setHasError(false);

    // Focus close button on open
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleEscape);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";

      // Restore focus to the element that triggered the modal (if still in DOM)
      const el = returnFocusRef.current;
      if (el && document.contains(el)) {
        el.focus();
      }
      returnFocusRef.current = null;
    };
  }, [isOpen, onClose]);

  // Focus trap
  React.useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      // If nothing focusable, keep focus on close button
      if (!firstElement || !lastElement) {
        e.preventDefault();
        closeButtonRef.current?.focus();
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  // Validate / normalize embed URL
  const videoSrc = React.useMemo(() => {
    try {
      const url = new URL(videoUrl);
      // Basic allowlist: YouTube embed or nocookie embed
      const allowedHosts = new Set(["www.youtube.com", "youtube.com", "www.youtube-nocookie.com", "youtube-nocookie.com"]);
      if (!allowedHosts.has(url.hostname)) return "";
      if (!url.pathname.startsWith("/embed/")) return "";
      // Ensure autoplay and modest branding; preserve existing params
      url.searchParams.set("autoplay", "1");
      url.searchParams.set("rel", "0");
      url.searchParams.set("modestbranding", "1");
      return url.toString();
    } catch {
      return "";
    }
  }, [videoUrl]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          onClick={onClose}
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative z-10 w-full max-w-4xl rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2
                id="video-modal-title"
                className="text-lg font-semibold text-slate-900 dark:text-white"
              >
                {title}
              </h2>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Close video modal"
              >
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full aspect-video bg-black">
              {/* Loading overlay */}
              {isLoading && !hasError && videoSrc && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40">
                  <div className="flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden="true" />
                    <span>Loading video…</span>
                  </div>
                </div>
              )}

              {hasError && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div className="max-w-md text-slate-200">
                    <p className="text-base font-semibold text-white">Couldn&apos;t load the video.</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Please check the embed URL and try again.
                    </p>
                  </div>
                </div>
              )}

              {!videoSrc && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <div className="max-w-md text-slate-200">
                    <p className="text-base font-semibold text-white">Invalid video URL.</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Provide a YouTube <span className="font-mono">/embed/</span> URL (or nocookie embed URL).
                    </p>
                  </div>
                </div>
              )}

              {videoSrc && !hasError && (
                <iframe
                  src={videoSrc}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                  // Browsers may not fire onError reliably for iframes, but keep it for best effort.
                  onError={() => {
                    setHasError(true);
                    setIsLoading(false);
                  }}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
