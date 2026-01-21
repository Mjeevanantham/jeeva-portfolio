export type ProjectRole =
  | "Frontend Lead"
  | "Frontend Engineer"
  | "Full-Stack Engineer"
  | "Backend Engineer"
  | "Backend Developer"
  | "Backend & System Design"
  | "Lead";

export type Project = {
  id: string;
  title: string;
  short: string;
  details: string;
  icon: string;
  stack?: string[];
  role?: ProjectRole;
  achievements?: string[];
  links?: { demo?: string; source?: string };
  status?: "ongoing" | "completed" | "archived";
  priority?: number; // lower number = higher priority
  nda?: boolean;
  caseStudyHref?: string;
  /**
   * Optional screenshot/mockup path.
   * Keep images in `public/` (V1) or `public/v2/` (V2) for Next Image optimization.
   */
  mockupSrc?: string;
};

/**
 * V1 projects list — extracted from `components/projects-grid.tsx` without behavior changes.
 * Keep this array stable to avoid changing V1 ordering/content unexpectedly.
 */
export const V1_PROJECTS: Project[] = [
  {
    id: "landing-fine-tuned",
    title: "Landing Website",
    short: "SEO‑optimized marketing page achieving high conversion rate",
    details:
      "Ultra‑fast marketing site achieving a 100 Lighthouse SEO score. Delivered responsive UI, semantic HTML and structured data for discoverability.",
    icon: "/window.svg",
    stack: ["Next.js", "Tailwind", "SEO", "Analytics"],
    role: "Lead",
    priority: 6,
    achievements: [
      "100/100 SEO and excellent CWV",
      "Delivered in under 15 days",
      "Conversion‑focused, responsive UI across devices",
    ],
    links: { demo: "#" },
  },
  {
    id: "ticketing",
    title: "Ticketing Tool",
    short: "Next.js + RBAC dashboard for internal support tracking",
    details:
      "End‑to‑end ticket lifecycle with SLA tracking and analytics. Built responsive UI and improved performance with lazy loading and dynamic imports.",
    icon: "/file.svg",
    stack: ["Next.js", "Tailwind", "RBAC"],
    role: "Frontend Engineer",
    priority: 4,
    achievements: [
      "Shipped pixel‑perfect responsive pages",
      "Reduced bundle by code‑splitting and lazy loading",
      "Implemented role‑aware screens and guards",
    ],
    links: { demo: "#" },
  },
  {
    id: "food-app",
    title: "Customer Food Delivery App",
    short: "Online ordering with OTP login, wallet payments, and live tracking",
    details:
      "SaaS ordering with OTP login, wallet payments and live order tracking. Hardened APIs with rate limiting and query optimizations.",
    icon: "/globe.svg",
    stack: ["Flutter", "Dart", "Node.js"],
    role: "Full-Stack Engineer",
    priority: 7,
    achievements: [
      "Implemented OTP auth and wallet flows",
      "Improved security with rate limiting",
      "Real‑time order status updates",
    ],
    links: { demo: "#" },
  },
  {
    id: "recruitment",
    title: "Recruitment Platform",
    short: "Express.js + MongoDB ATS for candidate pipeline management",
    details:
      "Robust REST API enabling candidate‑employer workflows with efficient data flow and clean architecture.",
    icon: "/file.svg",
    stack: ["Node.js", "Express", "MongoDB"],
    role: "Backend Developer",
    priority: 5,
    achievements: ["Primary Node.js developer coordinating with client", "Delivered scalable API for pipeline and interviews"],
    links: { demo: "#" },
  },
  {
    id: "esim",
    title: "eSim Platform",
    short: "Microservice platform for managing digital SIM provisioning",
    details:
      "Global eSIM purchasing with secure activation and multi‑tenant features. Optimized database performance to reduce response times.",
    icon: "/globe.svg",
    stack: ["NestJS", "Microservices", "Kafka"],
    role: "Backend Engineer",
    priority: 3,
    achievements: [
      "Cut API response times by ~30%",
      "Added package recommendations and tenant‑aware time formatting",
      "Implemented tenant‑specific transactional email",
    ],
    links: { demo: "#" },
  },
] as const;

function byId(id: string) {
  return V1_PROJECTS.find((p) => p.id === id);
}

/**
 * V2 featured projects — requirement-driven selection (5 projects).
 * Reuses existing project objects where available, and adds ERP/CRM case studies.
 */
export const V2_FEATURED_PROJECTS: Project[] = [
  {
    id: "erp-saas-platform",
    title: "ERP SaaS Platform",
    short: "Multi‑module ERP frontend built for a US‑based client (NDA)",
    details:
      "As Frontend Lead, I built a scalable Next.js foundation with GraphQL-first data access, reusable UI patterns, and performance techniques like dynamic imports and lazy loading across 10+ production-grade screens.",
    icon: "/window.svg",
    stack: ["Next.js", "TypeScript", "GraphQL"],
    role: "Frontend Lead",
    nda: true,
    caseStudyHref: "/case-studies/erp-platform",
    mockupSrc: "/erp-architecture.png",
    priority: 1,
  },
  {
    id: "crm-system",
    title: "CRM System",
    short: "Production-grade CRM with RBAC, GraphQL, and 500+ active users",
    details:
      "I contributed to backend + system design for a CRM used in production, delivering 50+ APIs with RBAC and measurable performance improvements (≈30%).",
    icon: "/file.svg",
    stack: ["NestJS", "GraphQL", "PostgreSQL"],
    role: "Backend & System Design",
    caseStudyHref: "/case-studies/crm-system",
    mockupSrc: "/crm-architecture.png",
    priority: 2,
  },
  {
    ...(byId("food-app") as Project),
    priority: 3,
    mockupSrc: "/v2/mockups/mockup-placeholder.svg",
  },
  {
    ...(byId("esim") as Project),
    priority: 4,
    mockupSrc: "/v2/mockups/mockup-placeholder.svg",
  },
  {
    ...(byId("ticketing") as Project),
    priority: 5,
    mockupSrc: "/v2/mockups/mockup-placeholder.svg",
  },
];

