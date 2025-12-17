import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
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
              <a href="#projects" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Projects</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">Contact</a>
            </div>
            <Button variant="outline" size="sm">
              Resume
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Avatar className="w-32 h-32">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Jeevanantham Mahalingam" />
                <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  JM
                </AvatarFallback>
              </Avatar>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Jeevanantham
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
              Full-Stack Developer & AI Enthusiast crafting digital experiences that matter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                View My Work
              </Button>
              <Button variant="outline" size="lg">
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Passionate developer with expertise in modern web technologies and AI integration
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">
                My Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                I&apos;m a dedicated full-stack developer with a passion for creating innovative solutions
                that bridge the gap between technology and user experience. With expertise in modern
                web frameworks and AI technologies, I love building applications that make a difference.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">AI/ML</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-blue-600">50+</CardTitle>
                  <CardDescription>Projects Completed</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-purple-600">3+</CardTitle>
                  <CardDescription>Years Experience</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-green-600">100%</CardTitle>
                  <CardDescription>Client Satisfaction</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-2xl text-orange-600">24/7</CardTitle>
                  <CardDescription>Support Available</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A showcase of my recent work and side projects
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">CRM</div>
                    <div className="text-sm opacity-90">Backend System</div>
                  </div>
                </div>
                <CardTitle>CRM System - Backend & System Design</CardTitle>
                <CardDescription>
                  Production-grade CRM with GraphQL, NestJS, PostgreSQL. 50+ APIs, RBAC, 500+ users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">NestJS</Badge>
                  <Badge variant="outline">GraphQL</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Docker</Badge>
                </div>
                <Link href="/case-studies/crm-system">
                  <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    View Case Study
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">ERP</div>
                    <div className="text-sm opacity-90">Frontend Platform</div>
                  </div>
                </div>
                <CardTitle>ERP SaaS Platform - Frontend Lead</CardTitle>
                <CardDescription>
                  Multi-module ERP for US client. Next.js, TypeScript, GraphQL. 10+ production screens
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">GraphQL</Badge>
                </div>
                <Link href="/case-studies/erp-platform">
                  <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    View Case Study
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-full h-48 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl font-bold mb-2">AI</div>
                    <div className="text-sm opacity-90">LLM Integration</div>
                  </div>
                </div>
                <CardTitle>AI & LLM Integration</CardTitle>
                <CardDescription>
                  RAG systems, AI agents, knowledge base ingestion, and production AI workflows
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">OpenAI</Badge>
                  <Badge variant="outline">RAG</Badge>
                  <Badge variant="outline">Vector DB</Badge>
                </div>
                <a href="/llms.txt" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    View AI Capabilities
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <span className="text-lg font-semibold">Jeevanantham Mahalingam</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-slate-500 dark:text-slate-400">
            <p>&copy; 2024 Jeevanantham Mahalingam. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
