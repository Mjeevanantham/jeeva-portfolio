"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import Link from "next/link";
import { H1 } from "@/components/v2/typography/heading";
import { BRAND_COLORS } from "@/lib/v2/design-system";
import { VideoModal } from "@/components/v2/modal/video-modal";
import RotatingSpecialtiesV2 from "./rotating-specialties-v2";
import { MagneticButton } from "./magnetic-button";
import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * Premium Hero Section for V2 Portfolio
 * 
 * Features:
 * - Full viewport height with animated gradient background
 * - Smooth scroll animations with parallax
 * - Rotating specialties display
 * - Premium CTA buttons with magnetic hover effect
 * - Video modal integration
 * - GSAP + Framer Motion animations
 * - Fully accessible and responsive
 */

interface HeroSectionProps {
  className?: string;
  videoId?: string;
  videoUrl?: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const gradientVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function HeroSection({
  className,
  videoId,
  videoUrl,
}: HeroSectionProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const backgroundRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // GSAP parallax for background gradient
  useEffect(() => {
    if (!backgroundRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const parallaxSpeed = 0.5;
      
      gsap.to(backgroundRef.current, {
        y: scrollY * parallaxSpeed,
        duration: 0.3,
        ease: "power1.out",
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP fade-in animation for content
  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll("[data-animate]");
    
    gsap.from(elements, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.3,
    });
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleOpenVideo = () => {
    setIsVideoModalOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <section
        ref={containerRef}
        id="hero"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className || ""}`}
        aria-label="Hero section"
      >
        {/* Animated Gradient Background with Parallax */}
        <motion.div
          ref={backgroundRef}
          className="absolute inset-0 -z-10"
          variants={gradientVariants}
          animate="animate"
          style={{
            background: `
              linear-gradient(
                -45deg,
                ${BRAND_COLORS.primary.DEFAULT}15,
                ${BRAND_COLORS.secondary.DEFAULT}15,
                ${BRAND_COLORS.accent.DEFAULT}15,
                ${BRAND_COLORS.primary.DEFAULT}15
              )
            `,
            backgroundSize: "400% 400%",
          }}
        />

        {/* Animated Grid Pattern */}
        <div
          className="absolute inset-0 -z-10 opacity-30 dark:opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />

        {/* Content Container */}
        <motion.div
          style={{ opacity, scale, y }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 md:space-y-8"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants} data-animate>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400"
              >
                Hey, I&apos;m Jeeva
              </motion.p>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} data-animate>
              <H1 
                responsive 
                gradient 
                className="mb-4 md:mb-6"
              >
                Full-Stack Engineer Building AI-Integrated Systems
              </H1>
            </motion.div>

            {/* Rotating Specialties */}
            <motion.div variants={itemVariants} data-animate>
              <RotatingSpecialtiesV2 className="h-10 md:h-12 mb-4 md:mb-6" />
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} data-animate>
              <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-slate-600 dark:text-slate-400 leading-relaxed px-4">
                I build scalable, performant applications with modern tech stacks.
                Specializing in AI integration, clean architecture, and delivering
                exceptional user experiences.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              data-animate
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6"
            >
              <MagneticButton
                magneticStrength={0.4}
                className="group relative overflow-hidden"
                asChild
              >
                <Button
                  size="lg"
                  asChild
                  className="bg-brand-gradient text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  aria-label="View my work and projects"
                >
                  <Link href="/v2#projects" className="flex items-center gap-2">
                    View My Work
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </MagneticButton>

              <MagneticButton
                magneticStrength={0.4}
                onClick={handleOpenVideo}
                className="group"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  aria-label="Watch introduction video"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Watch Introduction
                  </span>
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            onClick={handleScrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-full p-2"
            aria-label="Scroll to about section"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-xs font-medium">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </section>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={handleCloseVideo}
        videoId={videoId}
        videoUrl={videoUrl}
        title="Introduction Video"
      />
    </>
  );
}
