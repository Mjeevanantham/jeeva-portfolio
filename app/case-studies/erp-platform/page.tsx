import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, Code2, Layers, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
    title: "ERP SaaS Platform - Frontend Lead | Jeevanantham Mahalingam",
    description: "Multi-module Enterprise Resource Planning SaaS platform for US-based client. Next.js, TypeScript, GraphQL, and 10+ production screens.",
};

export default function ERPCaseStudy() {
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
                        <Badge className="mb-4 bg-purple-600">Frontend Lead</Badge>
                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                            ERP SaaS Platform
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-300">
                            Multi-module Enterprise Resource Planning SaaS platform built for a US-based client to manage internal business workflows at scale
                        </p>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-3xl text-purple-600">10+</CardTitle>
                                <CardDescription>Production Screens</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-3xl text-blue-600">100%</CardTitle>
                                <CardDescription>Type Safety</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-3xl text-green-600">GraphQL</CardTitle>
                                <CardDescription>API Integration</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-3xl text-orange-600">US</CardTitle>
                                <CardDescription>Based Client</CardDescription>
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
                            src="/erp-architecture.png"
                            alt="ERP Platform Architecture"
                            width={800}
                            height={600}
                            className="w-full h-auto rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Context & Problem */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Context & Problem Statement</h2>
                    <Card>
                        <CardContent className="pt-6">
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                The client required a scalable, maintainable, and performant ERP frontend capable of supporting
                                multiple business modules such as employee management, operations workflows, and role-based access control.
                            </p>
                            <div className="space-y-3 mt-6">
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Key Challenges:</h3>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Large, form-heavy enterprise screens</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Rapid feature additions across sprints</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Tight coupling risk between frontend and backend</span>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Need for predictable data fetching and UI state management</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* My Role */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">My Role</h2>
                    <Card className="border-l-4 border-l-purple-600">
                        <CardHeader>
                            <CardTitle className="text-2xl">Frontend Lead</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                I owned the frontend delivery end-to-end, from architecture to deployment.
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">UI architecture and folder structure</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Core screen implementation</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Reusable component system</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">GraphQL integration strategy</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Code quality enforcement</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Layers className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Sprint-level coordination</span>
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
                                <CardTitle>Frontend Technologies</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Next.js</Badge>
                                    <Badge variant="secondary">TypeScript</Badge>
                                    <Badge variant="secondary">GraphQL</Badge>
                                    <Badge variant="secondary">App Router</Badge>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Tooling & Quality</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="outline">Husky</Badge>
                                    <Badge variant="outline">ESLint</Badge>
                                    <Badge variant="outline">Prettier</Badge>
                                    <Badge variant="outline">Modern CSS</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Key Engineering Decisions */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Key Engineering Decisions</h2>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">1.</span>
                                    <span>GraphQL-first Data Access</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <Code2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Reduced over-fetching compared to REST</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Code2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Allowed frontend to evolve independently of backend changes</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Code2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Enabled precise control over query payloads</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">2.</span>
                                    <span>Reusable Component Architecture</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    Abstracted form elements, tables, modals, and layouts to ensure consistent UX and reduce duplicated logic.
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                                        <p className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Consistent UX</p>
                                        <p className="text-sm text-purple-700 dark:text-purple-300">Across all modules</p>
                                    </div>
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <p className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Less Duplication</p>
                                        <p className="text-sm text-blue-700 dark:text-blue-300">Reduced logic and UI bugs</p>
                                    </div>
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <p className="font-semibold text-green-900 dark:text-green-100 mb-2">Faster Development</p>
                                        <p className="text-sm text-green-700 dark:text-green-300">Reusable templates</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">3.</span>
                                    <span>Performance Optimization</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-start space-x-3">
                                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Lazy-loaded heavy modules</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Used dynamic imports for rarely used screens</span>
                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <Zap className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-slate-600 dark:text-slate-300">Applied memoization where data re-renders were costly</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2">
                                    <span className="text-2xl">4.</span>
                                    <span>Code Quality Enforcement</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300">
                                    Introduced Husky pre-commit hooks, enforced linting and formatting, improved team consistency and reduced regressions.
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
                                <CardTitle>Challenge: Complex Enterprise Forms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300">
                                    <strong>Solution:</strong> Broke forms into smaller, composable components. Centralized validation logic.
                                    Ensured predictable state updates.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader>
                                <CardTitle>Challenge: Fast Sprint Cycles</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 dark:text-slate-300">
                                    <strong>Solution:</strong> Standardized UI patterns. Created reusable templates for new modules.
                                    Reduced development time for new screens.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Impact & Results */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-6">Impact & Results</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold mb-1">Delivered 10+ production-grade ERP screens</p>
                                <p className="text-purple-100">Supporting critical business workflows</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold mb-1">Improved frontend maintainability</p>
                                <p className="text-purple-100">Clean architecture across sprints</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold mb-1">Reduced UI-related regressions</p>
                                <p className="text-purple-100">Through code quality enforcement</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle2 className="w-6 h-6 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-semibold mb-1">Enabled faster developer onboarding</p>
                                <p className="text-purple-100">Scalable frontend foundation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What This Demonstrates */}
            <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">What This Project Demonstrates</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Ownership-driven engineering</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Real-world frontend architecture at scale</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Collaboration across backend and product teams</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-start space-x-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                    <span className="text-slate-600 dark:text-slate-300">Production-focused mindset over demo code</span>
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
                        Need a frontend lead for your next project?
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
                        Let&apos;s discuss how I can help architect and build your frontend
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/#contact">
                            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
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
