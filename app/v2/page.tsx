import Script from "next/script";
import HeroSection from "@/components/v2/hero/hero-section";
import { Section } from "@/components/v2/layout";
import AboutSection from "@/components/v2/about/about-section";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export const revalidate = 86400; // Revalidate every 24 hours

export default function V2Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      <Script id="v2-home-structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jeevanantham Mahalingam",
            url: `${SITE_URL}/v2`,
            jobTitle: "Full-Stack and Flutter Lead",
            sameAs: [
              "https://github.com/Mjeevanantham",
              "https://www.linkedin.com/in/"
            ],
            worksFor: { "@type": "Organization", name: "Aaludra Technology Solutions" },
            address: { "@type": "PostalAddress", addressCountry: "IN" },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "business",
              email: "contact@jeevanantham.site"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            url: `${SITE_URL}/v2`,
            name: "Jeevanantham Portfolio V2",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/v2?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
        ])}
      </Script>

      {/* Premium Hero Section */}
      <HeroSection 
        // Replace with your YouTube embed URL
        // Example: https://www.youtube.com/embed/dQw4w9WgXcQ
        videoUrl="https://www.youtube.com/embed/YOUR_VIDEO_ID"
      />

      {/* Placeholder sections for future development - Using new layout system */}
      <AboutSection />

      <Section id="projects" variant="muted">
        <h2 className="text-3xl font-bold mb-4 text-center">Projects</h2>
        <p className="text-slate-600 dark:text-slate-300 text-center">Section coming soon...</p>
      </Section>

      <Section id="experience">
        <h2 className="text-3xl font-bold mb-4 text-center">Experience</h2>
        <p className="text-slate-600 dark:text-slate-300 text-center">Section coming soon...</p>
      </Section>

      <Section id="skills" variant="muted">
        <h2 className="text-3xl font-bold mb-4 text-center">Skills</h2>
        <p className="text-slate-600 dark:text-slate-300 text-center">Section coming soon...</p>
      </Section>

      <Section id="contact">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact</h2>
        <p className="text-slate-600 dark:text-slate-300 text-center">Section coming soon...</p>
      </Section>
    </div>
  );
}
