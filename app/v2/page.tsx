import Script from "next/script";
import HeroSection from "@/components/v2/hero/hero-section";

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
      <HeroSection />

      {/* Placeholder sections for future development */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">About</h2>
          <p className="text-slate-600 dark:text-slate-300">Section coming soon...</p>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Projects</h2>
          <p className="text-slate-600 dark:text-slate-300">Section coming soon...</p>
        </div>
      </section>

      <section id="experience" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Experience</h2>
          <p className="text-slate-600 dark:text-slate-300">Section coming soon...</p>
        </div>
      </section>

      <section id="skills" className="py-20 px-4 bg-slate-100 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Skills</h2>
          <p className="text-slate-600 dark:text-slate-300">Section coming soon...</p>
        </div>
      </section>

      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-slate-600 dark:text-slate-300">Section coming soon...</p>
        </div>
      </section>
    </div>
  );
}
