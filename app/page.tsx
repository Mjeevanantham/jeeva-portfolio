import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactForm from "@/components/contact-form";
import ProjectsGrid from "@/components/projects-grid";
import GSAPAnimations from "@/components/gsap-animations";
import SectionWithBackground from "@/components/section-with-background";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <GSAPAnimations />
      
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="text-xl font-bold">Jeeva</span>
            </div>
            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">About</a>
              <a href="#experience" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Experience</a>
              <a href="#projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Skills</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Contact</a>
              <Button asChild variant="outline" size="sm">
                <Link href="/resume">Resume</Link>
              </Button>
            </div>
            {/* Mobile menu */}
            <details className="md:hidden relative">
              <summary className="list-none p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer" aria-label="Open menu">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </summary>
              <div className="absolute right-0 mt-2 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <nav className="flex flex-col gap-1">
                  <a href="#about" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">About</a>
                  <a href="#experience" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Experience</a>
                  <a href="#projects" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Projects</a>
                  <a href="#skills" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Skills</a>
                  <a href="#contact" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Contact</a>
                  <Link href="/resume" className="rounded-md px-3 py-2 text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">Resume</Link>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section data-animate="hero" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Avatar className="w-32 h-32 mx-auto mb-6">
            <AvatarImage src="" alt="Jeevanantham" />
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl">JM</AvatarFallback>
          </Avatar>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Jeevanantham</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">Creative Full-Stack Developer building fast, user-friendly web and mobile applications. Trusted problem-solver known for boosting performance and delivering reliable, growth-ready solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <a href="#projects">View My Work</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">Get In Touch</a>
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">APIs Built</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">6</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Modules Deployed</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Users Served</div>
            </div>
            <div data-animate="stat" className="p-4">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">2+</div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section with image background */}
      <SectionWithBackground
        src="/diagonal-gradient-bg.svg"
        alt="decorative gradient"
        overlayClassName="bg-black/10"
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-white/40" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-3xl md:text-5xl font-bold text-white drop-shadow-sm mb-4">
              DO what you <span className="italic">love</span>,
            </p>
            <p className="text-3xl md:text-5xl font-bold text-white drop-shadow-sm">
              LOVE what you <span className="italic">do</span>
            </p>
            <svg className="absolute bottom-0 right-0 transform translate-x-6 translate-y-8 h-16 w-16 text-white/40 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-white/95 drop-shadow mt-8">My philosophy in building exceptional digital experiences</p>
        </div>
      </SectionWithBackground>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>
          <div className="space-y-6">
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center">
              I craft performant, accessible web experiences with modern stacks like Next.js, Node.js, and Tailwind.
              I love solving real problems and shipping reliable, maintainable software.
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="scroll-mt-24 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Professional Experience</h2>
          <div className="space-y-8">
            <Card data-animate="about-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">Junior Software Engineer</CardTitle>
                    <CardDescription className="text-lg">Aaludra Technology Solutions • Aug 2024 - Present</CardDescription>
                  </div>
                  <Badge variant="default" className="bg-green-500">Current</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Built 50+ APIs powering CRM systems for 500+ users in production</li>
                  <li>• Deployed 6 modules successfully with 100% uptime</li>
                  <li>• Optimized database queries reducing response times by 30%</li>
                  <li>• Led Dockerization and deployment initiatives</li>
                </ul>
              </CardContent>
            </Card>

            <Card data-animate="about-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Software Engineer Intern</CardTitle>
                <CardDescription className="text-lg">Aaludra Technology Solutions • Oct 2023 - Aug 2024</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li>• Mastered full-stack development with Node.js, Next.js, and NestJS</li>
                  <li>• Designed and implemented Role-Based Access Control (RBAC) system</li>
                  <li>• Built robust REST APIs and GraphQL endpoints</li>
                  <li>• Gained expertise in Docker and cloud deployment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-animate="about-card">
              <CardHeader>
                <CardTitle>Backend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Node.js</Badge>
                  <Badge>NestJS</Badge>
                  <Badge>Express.js</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>JavaScript</Badge>
                </div>
              </CardContent>
            </Card>

            <Card data-animate="about-card">
              <CardHeader>
                <CardTitle>Frontend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Next.js</Badge>
                  <Badge>React.js</Badge>
                  <Badge>HTML5</Badge>
                  <Badge>CSS3</Badge>
                  <Badge>Tailwind CSS</Badge>
                </div>
              </CardContent>
            </Card>

            <Card data-animate="about-card">
              <CardHeader>
                <CardTitle>Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>MongoDB</Badge>
                  <Badge>PostgreSQL</Badge>
                  <Badge>Prisma ORM</Badge>
                </div>
              </CardContent>
            </Card>

            <Card data-animate="about-card">
              <CardHeader>
                <CardTitle>DevOps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Docker</Badge>
                  <Badge>Git</Badge>
                  <Badge>RESTful APIs</Badge>
                  <Badge>GraphQL</Badge>
                </div>
              </CardContent>
            </Card>

            <Card data-animate="about-card">
              <CardHeader>
                <CardTitle>Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Postman</Badge>
                  <Badge>VS Code</Badge>
                  <Badge>npm</Badge>
                  <Badge>Microservices</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
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
