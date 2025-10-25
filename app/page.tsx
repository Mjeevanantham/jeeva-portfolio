import { Button } from "@/components/ui/button";
import { Briefcase, Users, Sparkles } from "lucide-react";
 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactForm from "@/components/contact-form";
import ProjectsGrid from "@/components/projects-grid";
import GSAPAnimations from "@/components/gsap-animations";
import Script from "next/script";
import RotatingSpecialties from "@/components/rotating-specialties";
import ExperienceTimeline from "@/components/experience-timeline";
import SkillsBars from "@/components/skills-bars";
import GithubActivity from "@/components/github-activity";

export const revalidate = 86400; // Revalidate every 24 hours

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 overflow-x-hidden">
      <GSAPAnimations />
      <Script id="home-structured-data" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Jeevanantham Mahalingam",
            url: SITE_URL,
            jobTitle: "Full-Stack and Flutter Lead",
            sameAs: [
              "https://github.com/Mjeevanantham",
              "https://linkedin.com/in/jeevanantham-m"
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
            url: SITE_URL,
            name: "Jeevanantham Portfolio",
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What technologies does Jeeva use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Next.js, React, Node.js, TypeScript, Flutter, NestJS, PostgreSQL and MongoDB."
                }
              },
              {
                "@type": "Question",
                name: "Is Jeeva available for freelance or full-time roles?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Open to impactful opportunities. Use the contact form to reach out."
                }
              },
              {
                "@type": "Question",
                name: "How to contact Jeeva?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Use the contact section on the homepage or connect on LinkedIn."
                }
              }
            ]
          }
        ])}
      </Script>
      
      {/* Navigation moved to RootLayout via <SiteNav /> */}

      {/* Hero Section */}
      <section data-animate="hero" className="relative overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* 3D-like animated color orb */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
          <div className="relative mt-[-6rem] md:mt-[-8rem]">
            <div
              className="rounded-full opacity-40 blur-3xl animate-[spin_18s_linear_infinite]"
              style={{
                width: "56vw",
                maxWidth: "680px",
                height: "56vw",
                maxHeight: "680px",
                background:
                  "conic-gradient(from 0deg, rgba(59,130,246,0.9), rgba(217,70,239,0.9), rgba(124,58,237,0.9), rgba(59,130,246,0.9))",
                willChange: "transform",
              }}
            />
            {/* subtle radial highlight for 3D feel */}
            <div
              className="pointer-events-none absolute inset-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "36vw",
                maxWidth: "440px",
                height: "36vw",
                maxHeight: "440px",
                background:
                  "radial-gradient(closest-side, rgba(255,255,255,0.28), rgba(255,255,255,0.12) 45%, transparent 70%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Avatar className="w-32 h-32 mx-auto mb-6 ring-2 ring-white/40 shadow-xl">
            <AvatarImage src="/profile.png" alt="Jeevanantham" />
            <AvatarFallback className="bg-brand-gradient text-white text-3xl">JM</AvatarFallback>
          </Avatar>
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            Building scalable, user‑focused digital experiences
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 max-w-3xl mx-auto">
            I’m Jeevanantham Mahalingam — Full‑Stack and Flutter developer, leading the app track on my current project. Currently building an HRMS app used by 50+ employees, from API design to polished UIs.
          </p>
          <RotatingSpecialties />
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-brand-gradient">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold text-brand-gradient">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">APIs Built</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold text-brand-gradient">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Modules Deployed</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold text-brand-gradient">500+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Users Served</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold text-brand-gradient">2+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Years Experience</div>
            </div>
          </div>
          <a href="#about" aria-label="Scroll to About" className="mt-8 inline-flex flex-col items-center text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <svg className="h-6 w-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <span className="sr-only">Scroll to next section</span>
          </a>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-4 bg-brand-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-white/20" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-3xl md:text-5xl font-bold text-white">
              Do what you <span className="line-through decoration-white/60">love</span> what you do
            </p>
            <svg className="absolute bottom-0 right-0 transform translate-x-6 translate-y-8 h-16 w-16 text-white/20 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-white/90 text-lg mt-8">My philosophy in building exceptional digital experiences</p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid gap-8 md:grid-cols-2 items-start">
            {/* Intro */}
            <div className="space-y-5">
              <p className="text-lg text-slate-700 dark:text-slate-300">
                I’m a <span className="font-semibold">Full‑Stack and Flutter developer</span> and currently the
                <span className="font-semibold"> app track lead</span> for my project at Aaludra Technology Solutions. I design, build, and ship HRMS modules end‑to‑end — from clean APIs to fast, polished UIs.
              </p>
              <p className="text-lg text-slate-700 dark:text-slate-300">
                I work directly with our <span className="font-semibold">CEO</span>,
                <span className="font-semibold"> solution architect</span>, and
                <span className="font-semibold"> clients</span> to align on goals, de‑risk decisions, and deliver outcomes that matter.
              </p>
              {/* Tech chips */}
              <ul className="flex flex-wrap gap-2 mt-2">
                {["Next.js", "Node.js", "Flutter", "TypeScript", "NestJS", "PostgreSQL", "Clean Architecture"].map((item) => (
                  <li key={item} className="rounded-full border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-1 text-sm text-slate-700 dark:text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-gradient p-2 text-white">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">App Track Lead</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Architecture, delivery, and mentoring</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-gradient p-2 text-white">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">HRMS in Production</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Powering daily work for 50+ employees</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-brand-gradient p-2 text-white">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Partner to Leadership & Clients</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Working closely with the CEO, solution architect, and stakeholders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Professional Experience</h2>
          <ExperienceTimeline />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12">Company projects (NDA protected)</p>
          <ProjectsGrid />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Technical Skills</h2>
          <SkillsBars />
        </div>
      </section>

      {/* Now + Activity Section */}
      <section id="now" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-white/60 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold">Now</h3>
            <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              <li>• Exploring AI tooling and agents to speed up delivery</li>
              <li>• Learning advanced NestJS patterns and clean architecture</li>
              <li>• Building small utilities and polishing portfolio UX</li>
            </ul>
          </div>
          {/* Server component */}
          <GithubActivity />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Get In Touch</h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12">Have a project in mind? Let&apos;s build something amazing together!</p>
          <div data-animate="project-card">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400">© 2025 Jeevanantham Mahalingam.</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/Mjeevanantham" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/jeevanantham-m" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
