'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPAnimations() {
  useEffect(() => {
    // Hero section fade-in animation
    gsap.from('[data-animate="hero"]', {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2,
    });

    // About section cards scale-up
    gsap.from('[data-animate="about-card"]', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: '[data-animate="about-card"]',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Project cards slide-in
    gsap.from('[data-animate="project-card"]', {
      opacity: 0,
      x: -100,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-animate="project-card"]',
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    // Stats counter animation
    gsap.from('[data-animate="stat"]', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '[data-animate="stat"]',
        start: 'top 90%',
      },
    });

    // Parallax effect for background elements
    gsap.to('[data-parallax]', {
      y: (i, el) => (1 - parseFloat(el.getAttribute('data-speed') || '0.5')) * ScrollTrigger.maxScroll(window),
      ease: 'none',
      scrollTrigger: {
        start: 0,
        end: 'max',
        invalidateOnRefresh: true,
        scrub: 0,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
