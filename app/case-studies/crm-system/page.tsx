import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "CRM System - Backend & System Design | Jeevanantham Mahalingam",
  description: "Production-grade Customer Relationship Management system with GraphQL, NestJS, and PostgreSQL. 50+ APIs, RBAC, and 500+ active users.",
};

export default function CRMCaseStudy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-lg font-semibold">Back to Portfolio</span>
            </Link>
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
                <span className="text-xl font-bold">Jeeva</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Badge className="mb-4 bg-blue-600">Backend & System Design</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              CRM System
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Production-grade Customer Relationship Management system designed to manage employees, opportunities, and internal business workflows
            </p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-blue-600">50+</CardTitle>
                <CardDescription>Production APIs</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-purple-600">500+</CardTitle>
                <CardDescription>Active Users</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-green-600">30%</CardTitle>
                <CardDescription>Performance Gain</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-3xl text-orange-600">100%</CardTitle>
                <CardDescription>Production Ready</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">System Architecture</h2>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <Image
              src="/crm-architecture.png"
              alt="CRM System Architecture"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Problem & Context */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Business Context & Problem</h2>
          <Card>
            <CardContent className="pt-6">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                The organization required a centralized system to manage employees, track business opportunities,
                and enforce strict access control across roles with real-time structured data access.
              </p>
              <div className="space-y-3 mt-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Key Constraints:</h3>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Multiple user roles with different permissions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Rapid feature iteration without breaking existing workflows</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Clean separation between frontend and backend teams</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Production readiness from day one</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* My Role */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Role & Ownership</h2>
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader>
              <CardTitle className="text-2xl">Backend Developer – Core System Contributor</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                I owned core backend components used across modules, not a support role.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Designed and implemented GraphQL APIs</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Built Role-Based Access Control (RBAC) system</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Optimized database queries and relationships</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Dockerized backend services</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 dark:text-slate-300">Supported deployment and production stability</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backend Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">NestJS</Badge>
                  <Badge variant="secondary">GraphQL</Badge>
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">Prisma</Badge>
                  <Badge variant="secondary">Docker</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">RBAC</Badge>
                  <Badge variant="outline">API-First Design</Badge>
                  <Badge variant="outline">Type Safety</Badge>
                  <Badge variant="outline">Containerized</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Engineering Decisions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Core Engineering Decisions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">1.</span>
                  <span>GraphQL for API Design</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Chose GraphQL for precise data fetching, reduced over-fetching, strong typing, and easier API evolution.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Designed schemas and resolvers aligned with business entities such as employees, roles, and opportunities.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">2.</span>
                  <span>Role-Based Access Control (RBAC)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Implemented custom RBAC to define roles centrally, restrict access at resolver level, and support scalable permission expansion.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Controlled Access</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">Sensitive data access was controlled</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Consistent Rules</p>
                    <p className="text-sm text-purple-700 dark:text-purple-300">Business rules enforced consistently</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <p className="font-semibold text-green-900 dark:text-green-100 mb-2">Scalable</p>
                    <p className="text-sm text-green-700 dark:text-green-300">New roles added without refactors</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">3.</span>
                  <span>Database Design & Optimization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  Modeled relational data clearly, designed relationships for fast lookups, and optimized queries.
                </p>
                <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  <span className="font-semibold text-green-900 dark:text-green-100">
                    ~30% improvement in API response times on critical endpoints
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">4.</span>
                  <span>Dockerization & Deployment</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300">
                  Dockerized backend services with environment-based configuration, reducing environment inconsistencies and deployment failures.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Challenges & Solutions</h2>
          <div className="space-y-6">
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle>Challenge: Complex Permission Logic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  <strong>Problem:</strong> Different users required different access levels across multiple modules.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Solution:</strong> Centralized permission checks, enforced RBAC at GraphQL resolver level, avoided permission logic duplication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle>Challenge: Evolving Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 dark:text-slate-300 mb-3">
                  <strong>Problem:</strong> Frequent business changes risked breaking APIs.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Solution:</strong> Used GraphQL schema evolution patterns, maintained backward compatibility, modularized business logic.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Impact & Results</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Built 50+ production APIs</p>
                <p className="text-blue-100">Supporting CRM workflows across the organization</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Enabled secure, role-aware data access</p>
                <p className="text-blue-100">Custom RBAC system protecting sensitive data</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Improved API performance by ~30%</p>
                <p className="text-blue-100">Through database optimization and query tuning</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold mb-1">Supported 500+ active users</p>
                <p className="text-blue-100">Stable system used in real business scenarios</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Demonstrates */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What This Case Study Demonstrates</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Strong backend and system design fundamentals</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Practical security implementation (RBAC)</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">API design maturity using GraphQL</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600 dark:text-slate-300">Production-focused engineering mindset</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Interested in working together?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Let&apos;s discuss how I can help build your next production system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get In Touch
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
