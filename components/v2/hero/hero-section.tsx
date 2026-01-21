"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
import Link from "next/link";
import { H1 } from "@/components/v2/typography/heading";
import { BRAND_COLORS } from "@/lib/v2/design-system";

/**
 * Premium Hero Section for V2 Portfolio
 * 
 * Features:
 * - Full viewport height with animated gradient background
 * - Smooth scroll animations
 * - Typing effect for main heading
 * - Rotating specialties display
 * - Premium CTA buttons with hover effects
 * - Scroll indicator
 * - Fully accessible and responsive
 */

interface HeroSectionProps {
  className?: string;
}

const SPECIALTIES = [
  "Full-Stack Engineer",
  "AI Integration Specialist",
  "Next.js Expert",
  "TypeScript Developer",
  "System Architect",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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
      ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
    },
  },
};

const gradientVariants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function HeroSection({ className }: HeroSectionProps) {
  const [specialtyIndex, setSpecialtyIndex] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  // Rotate specialties
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSpecialtyIndex((prev) => (prev + 1) % SPECIALTIES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className || ""}`}
      aria-label="Hero section"
    >
      {/* Animated Gradient Background */}
      <motion.div
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
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl font-medium text-slate-600 dark:text-slate-400 mb-4"
            >
              Hey, I&apos;m
            </motion.p>
          </motion.div>

          {/* Main Heading with Gradient */}
          <motion.div variants={itemVariants}>
            <H1 
              responsive 
              gradient 
              className="mb-6"
            >
              <span className="block mb-2">Jeevanantham</span>
              <span className="block">Mahalingam</span>
            </H1>
          </motion.div>

          {/* Rotating Specialties */}
          <motion.div variants={itemVariants}>
            <div
              className="h-8 md:h-10 flex items-center justify-center mb-6"
              aria-live="polite"
            >
              <motion.p
                key={specialtyIndex}
                initial={{ opacity: 0, y: 20, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-800 dark:text-slate-200"
              >
                {SPECIALTIES[specialtyIndex]}
              </motion.p>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
              Building scalable applications with modern tech stacks.
              <br className="hidden sm:block" />
              <span className="block mt-2">
                Specializing in AI integration, clean architecture, and performance optimization.
              </span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/50 transition-all duration-300"
            >
              <Link href="/v2#projects">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="group border-2 border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-900 transition-all duration-300"
            >
              <Link href="/v2/resume">
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Resume
                </span>
              </Link>
            </Button>
          </motion.div>

          {/* Social Links / Quick Stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 pt-8 text-sm text-slate-500 dark:text-slate-400"
          >
            <a
              href="https://github.com/Mjeevanantham"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="GitHub profile"
            >
              GitHub
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="LinkedIn profile"
            >
              LinkedIn
            </a>
            <span className="w-1 h-1 rounded-full bg-slate-400" />
            <Link
              href="/v2#contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Get in Touch
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={handleScrollToAbout}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
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
  );
}
