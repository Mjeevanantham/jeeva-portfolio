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
   * YouTube video ID or video URL
   */
  videoId?: string;
  /**
   * Video URL (alternative to videoId)
   */
  videoUrl?: string;
  /**
   * Modal title
   */
  title?: string;
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
  videoId,
  videoUrl,
  title = "Introduction Video",
}: VideoModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = React.useState(false);

  // Handle mount for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Focus trap and escape key handling
  React.useEffect(() => {
    if (!isOpen) return;

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

  // Get YouTube embed URL
  const getYouTubeEmbedUrl = (id: string) => {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  };

  // Get video source
  const videoSrc = React.useMemo(() => {
    if (videoId) {
      return getYouTubeEmbedUrl(videoId);
    }
    if (videoUrl) {
      return videoUrl;
    }
    return "";
  }, [videoId, videoUrl]);

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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
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
              {videoSrc ? (
                <iframe
                  src={videoSrc}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={title}
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <p>No video source provided</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
