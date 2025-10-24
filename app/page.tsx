import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ContactForm from "@/components/contact-form";
import GSAPAnimations from "@/components/gsap-animations";

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
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">About</a>
              <a href="#experience" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Experience</a>
              <a href="#projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Projects</a>
              <a href="#skills" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Skills</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Contact</a>
            </div>
            <Button variant="outline" size="sm">
              Resume
            </Button>
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
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">View My Work</Button>
            <Button size="lg" variant="outline">Get In Touch</Button>
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

      {/* Quote Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <svg className="absolute top-0 left-0 transform -translate-x-6 -translate-y-8 h-16 w-16 text-white/20" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-3xl md:text-5xl font-bold text-white mb-4">
              DO what you <span className="italic">love</span>,
            </p>
            <p className="text-3xl md:text-5xl font-bold text-white">
              LOVE what you <span className="italic">do</span>
            </p>
            <svg className="absolute bottom-0 right-0 transform translate-x-6 translate-y-8 h-16 w-16 text-white/20 rotate-180" fill="currentColor" viewBox="0 0 32 32">
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
          </div>
          <p className="text-white/90 text-lg mt-8">My philosophy in building exceptional digital experiences</p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
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
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
          <p className="text-center text-slate-600 dark:text-slate-300 mb-12">Company projects (NDA protected)</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>HRMS System</CardTitle>
                <CardDescription>HR management with employee tracking</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Static Website</CardTitle>
                <CardDescription>Marketing site with SEO optimization</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Ticketing Tool</CardTitle>
                <CardDescription>Support ticket management system</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Customer Food Delivery App</CardTitle>
                <CardDescription>Online ordering platform</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Recruitment Platform</CardTitle>
                <CardDescription>Applicant tracking system</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>eSim Platform</CardTitle>
                <CardDescription>Digital SIM card management</CardDescription>
              </CardHeader>
            </Card>

            <Card data-animate="project-card" className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>CRM System</CardTitle>
                <CardDescription>Customer relationship management</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
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
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
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
          <p className="text-slate-400">© 2024 Jeevanantham Mahalingam. Built with Next.js & ❤️</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://github.com/Mjeevanantham" className="hover:text-blue-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/jeevanantham-m" className="hover:text-blue-400 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
