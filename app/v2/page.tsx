import type { Metadata } from "next";
import dynamic from "next/dynamic";
import HeroSection from "@/components/v2/hero/hero-section";
import { Section } from "@/components/v2/layout";
import AboutSection from "@/components/v2/about/about-section";
import { PersonSchema, PortfolioSchema, WebSiteSchema } from "@/lib/v2/seo/structured-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Full-stack engineer building production AI-integrated systems. View my projects, experience, and technical expertise in Next.js, NestJS, Flutter, and modern web technologies.",
  openGraph: {
    title: "Jeevanantham M | Full-Stack Engineer",
    description:
      "Full-stack engineer building production AI-integrated systems. View my projects, experience, and technical expertise.",
    url: `${SITE_URL}/v2`,
    images: [
      {
        url: `${SITE_URL}/api/og?title=Home&subtitle=Full-Stack Engineer`,
        width: 1200,
        height: 630,
        alt: "Jeevanantham Mahalingam - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeevanantham M | Full-Stack Engineer",
    description:
      "Full-stack engineer building production AI-integrated systems. View my projects, experience, and technical expertise.",
    images: [`${SITE_URL}/api/og?title=Home&subtitle=Full-Stack Engineer`],
  },
  alternates: {
    canonical: `${SITE_URL}/v2`,
  },
};

// Dynamic imports for below-fold components
const HorizontalProjects = dynamic(() => import("@/components/v2/projects/horizontal-projects"), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="text-slate-600 dark:text-slate-400">Loading projects...</div></div>,
});

const ExperienceTimelineV2 = dynamic(() => import("@/components/v2/experience/experience-timeline-v2"), {
  loading: () => <div className="py-24"><div className="text-center text-slate-600 dark:text-slate-400">Loading experience...</div></div>,
});

const SkillsVisualizationV2 = dynamic(() => import("@/components/v2/skills/skills-visualization-v2"), {
  loading: () => <div className="py-24"><div className="text-center text-slate-600 dark:text-slate-400">Loading skills...</div></div>,
});

export const revalidate = 86400; // Revalidate every 24 hours

import { SkipLink } from "@/components/v2/accessibility/skip-link";

export default function V2Home() {
  return (
    <>
      <SkipLink />
      <main id="main-content" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-x-hidden">
        {/* Structured Data */}
        <PersonSchema
          jobTitle="Full-Stack Engineer"
          sameAs={[
            "https://github.com/Mjeevanantham",
            "https://www.linkedin.com/in/jeevanantham-mahalingam",
          ]}
        />
        <PortfolioSchema
          name="Jeevanantham Portfolio"
          description="Portfolio showcasing full-stack engineering projects, AI-integrated systems, and technical expertise"
        />
        <WebSiteSchema
          searchAction={{
            target: `${SITE_URL}/v2?q={search_term_string}`,
            queryInput: "required name=search_term_string",
          }}
        />

        {/* Premium Hero Section */}
        <HeroSection
          // Replace with your YouTube embed URL
          // Example: https://www.youtube.com/embed/dQw4w9WgXcQ
          videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
        />

        {/* Placeholder sections for future development - Using new layout system */}
        <AboutSection />

        <HorizontalProjects />

        <Section id="experience" variant="muted" className="scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
              Professional Experience
            </h2>
            <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Building production-grade systems and delivering impactful solutions
            </p>
          </div>
          <ExperienceTimelineV2 />
        </Section>

        <SkillsVisualizationV2 />

        <Section id="contact">
          <h2 className="text-3xl font-bold mb-4 text-center">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300 text-center">Section coming soon...</p>
        </Section>
      </main>
    </>
  );
}
