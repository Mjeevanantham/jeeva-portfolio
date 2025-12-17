export type BlogPost = {
  slug: string;
  title: string;
  date: string; // ISO string
  description: string;
  tags: string[];
  readingTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-aws-ec2",
    title: "Getting Started with AWS EC2: A Practical Guide",
    date: "2025-01-10",
    description:
      "What EC2 is, when to use it, how to launch, secure, and deploy a simple app.",
    tags: ["AWS", "EC2", "Cloud", "DevOps"],
    readingTime: "6 min",
    content: `EC2 is Amazon's elastic compute in the cloud. Think of it as a virtual machine you can start in minutes and pay for only while it's running.

When to use EC2: when you want full control over the OS, networking, and runtime. It's great for APIs, workers, and long-running services. If you need zero-maintenance containers, consider ECS or EKS.

Setup summary I use:
- Choose Amazon Linux 2023 or Ubuntu LTS.
- Instance type: t3.micro or t3.small for side projects.
- Storage: 16–32 GB gp3 is enough.
- Security group: open only 22 (SSH) to your IP and 80/443 for web.
- Key pair: create and keep it safe.

Hygiene:
- Create a non-root user; disable password SSH; use ufw or iptables.
- Keep the system updated.
- Use a process manager (pm2/systemd) so apps restart on crash.

Deployment approach:
- For Node/Next, build locally or CI, then deploy artifacts via SSH, or use Docker.
- For TLS, use a reverse proxy (nginx or Caddy). I prefer Caddy for its automatic HTTPS.

Cost tips:
- Stop dev instances when not in use.
- Use savings plans or spot for batch workloads.

EC2 gives you flexibility without locking you in. Start small, automate later, and keep security tight from day one.`,
  },
  {
    slug: "jenkins-ci-basics-with-pipelines",
    title: "Jenkins CI Basics with Declarative Pipelines",
    date: "2025-01-20",
    description:
      "Set up Jenkins, write a simple pipeline, and ship on every push.",
    tags: ["Jenkins", "CI/CD", "Pipelines"],
    readingTime: "5 min",
    content: `Jenkins is a battle-tested CI server. It's self-hosted, plugin-rich, and excels when you need custom control.

Quick setup:
- Run Jenkins in Docker; map port 8080 and a persistent volume.
- Install suggested plugins, then add Pipeline and Git.
- Create a credential (SSH or token) for your repo.

A simple declarative pipeline has stages like Checkout → Build → Test → Deploy. You can cache dependencies, run in parallel, and post notifications.

When to pick Jenkins:
- You need freedom to run anything on your own hardware.
- You want custom agents with preinstalled tools.

Tips:
- Keep the Jenkinsfile near your code.
- Treat your Jenkins config as code (Job DSL/Configuration as Code).
- Lock down admin access and agent permissions.

With the basics in place, Jenkins can take you from "works on my machine" to a repeatable, trustworthy delivery flow.`,
  },
  {
    slug: "building-automations-with-n8n",
    title: "Building Practical Automations with n8n",
    date: "2025-02-01",
    description:
      "Create low-code workflows to connect APIs, webhooks, and background jobs.",
    tags: ["n8n", "Automation", "Workflows"],
    readingTime: "5 min",
    content: `n8n is a flexible, open-source automation tool. It connects services—HTTP, databases, queues—without heavy code.

How I use it:
- Webhook trigger → transform payload → call external API → store in DB.
- Cron trigger → fetch analytics → send Slack summary.

Why it's nice:
- Visual, yet scriptable with Code nodes.
- Self-hosted, so data stays with you.
- Marketplace nodes cover common services.

Best practices:
- Keep credentials in vaults, not in nodes.
- Add retry and error branches.
- Use sub-workflows for reuse.

If you have repetitive tasks (syncing, alerts, enrichment), n8n lets you ship value fast with guardrails.`,
  },
  {
    slug: "building-with-cursor-agents",
    title: "Building with Cursor Agents: My Workflow",
    date: "2025-02-15",
    description:
      "How I use AI agents in Cursor to scaffold features and refactor safely.",
    tags: ["AI", "Cursor", "Agents", "DX"],
    readingTime: "4 min",
    content: `Cursor agents shine when you guide them well. I treat them like strong pair programmers: clear goals, small steps, fast feedback.

What works for me:
- Write a short brief with constraints (tech, style, tests).
- Let the agent propose diffs; review, then iterate.
- Keep edits small; run lints and tests after each chunk.

Good use-cases:
- Bootstrapping CRUD modules and UI scaffolds.
- Safe refactors where the agent updates imports and types consistently.
- Repetitive wiring (routes, configs, providers).

Avoid:
- Letting agents change unrelated files.
- Skipping code review—humans catch nuance.

Used well, agents raise the floor and free your time for design and tricky edge cases.`,
  },
  {
    slug: "experimenting-with-comet",
    title: "Experimenting with Comet for ML Experiment Tracking",
    date: "2025-02-20",
    description:
      "Track metrics, compare runs, and keep ML experiments organized.",
    tags: ["Comet", "MLOps", "Experiment Tracking"],
    readingTime: "4 min",
    content: `Comet makes it easy to log metrics, hyperparameters, and artifacts from ML runs.

Why it helps:
- You get history and comparisons for free.
- Charts reveal regressions early.
- Collaboration is built-in.

Getting started:
- Install the SDK and set the API key.
- Log metrics inside your training loop.
- Attach artifacts (models, plots) for later analysis.

If your ML work has outgrown spreadsheets and ad-hoc notes, Comet adds just enough structure without getting in your way.`,
  },
].sort((a, b) => (a.date < b.date ? 1 : -1));

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string) {
  const index = blogPosts.findIndex((p) => p.slug === slug);
  const prev = index > 0 ? blogPosts[index - 1] : undefined;
  const next = index >= 0 && index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined;
  return { prev, next };
}
