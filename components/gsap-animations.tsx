"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Use layout effect on client to avoid flicker, fall back to effect on server
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function GSAPAnimations() {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero fade-in timeline
      const heroSection = document.querySelector<HTMLElement>("[data-hero]");
      if (heroSection) {
        const heroTl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.6 },
          scrollTrigger: {
            trigger: heroSection,
            start: "top 80%",
            once: true,
          },
        });

        const avatar = heroSection.querySelector("[data-avatar]");
        const title = heroSection.querySelector("[data-hero-title]");
        const subtitle = heroSection.querySelector("[data-hero-subtitle]");
        const ctas = heroSection.querySelector("[data-hero-ctas]");

        if (avatar) {
          gsap.set(avatar, { autoAlpha: 0, y: 20 });
          heroTl.to(avatar, { autoAlpha: 1, y: 0 });
        }
        if (title) {
          gsap.set(title, { autoAlpha: 0, y: 16 });
          heroTl.to(title, { autoAlpha: 1, y: 0 }, "-=0.25");
        }
        if (subtitle) {
          gsap.set(subtitle, { autoAlpha: 0, y: 16 });
          heroTl.to(subtitle, { autoAlpha: 1, y: 0 }, "-=0.25");
        }
        if (ctas) {
          gsap.set(ctas, { autoAlpha: 0, y: 12 });
          heroTl.to(ctas, { autoAlpha: 1, y: 0 }, "-=0.2");
        }
      }

      // About section cards: scale-up on enter
      const aboutCards = Array.from(
        document.querySelectorAll<HTMLElement>(
          "#about .grid.grid-cols-2 > *"
        )
      );
      if (aboutCards.length) {
        gsap.set(aboutCards, { autoAlpha: 0, y: 20, scale: 0.98 });
        ScrollTrigger.batch(aboutCards, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: { each: 0.08, from: "start" },
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 0,
              y: 20,
              scale: 0.98,
              duration: 0.4,
              ease: "power2.inOut",
              stagger: { each: 0.06, from: "end" },
            }),
        });
      }

      // Project cards: slide-in from below
      const projectCards = Array.from(
        document.querySelectorAll<HTMLElement>("[data-project-card]")
      );
      if (projectCards.length) {
        gsap.set(projectCards, { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch(projectCards, {
          start: "top 85%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: { each: 0.1 },
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 0,
              y: 24,
              duration: 0.45,
              ease: "power2.inOut",
              stagger: { each: 0.08 },
            }),
        });
      }
    });

    // Recalculate after setup for accurate positions
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return null;
}
export default function GSAPAnimations() {
  return null;
}
