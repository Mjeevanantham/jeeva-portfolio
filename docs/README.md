# Jeevanantham Mahalingam – Portfolio

A modern Next.js portfolio showcasing full-stack engineering work, AI-integrated systems, and production-grade applications.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
# Add your Gmail credentials for contact form
```

### Development

```bash
# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Start production server
pnpm run start

# Lint code
pnpm run lint
```

### Environment Variables

Create `.env.local` with:

```bash
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your_app_password"
NEXT_PUBLIC_SITE_URL="https://jeevanantham.site"
```

## 📁 Project Structure

```
jeeva-portfolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # V1 Homepage
│   ├── v2/                # V2 Routes (isolated)
│   │   ├── page.tsx       # V2 Homepage
│   │   ├── layout.tsx     # V2 Layout
│   │   ├── resume/        # V2 Resume
│   │   └── blog/          # V2 Blog
│   ├── api/               # API Routes
│   ├── blog/              # V1 Blog
│   ├── resume/            # V1 Resume
│   └── case-studies/      # Case study pages
│
├── components/            # React Components
│   ├── v1/                # V1 Components (legacy)
│   └── v2/                # V2 Components (new)
│       ├── hero/          # Hero section
│       ├── about/         # About section
│       ├── projects/      # Projects section
│       ├── layout/        # Layout components
│       ├── modal/         # Modal components
│       ├── navigation/    # Navigation
│       └── typography/    # Typography components
│
├── lib/                   # Utilities & Helpers
│   ├── utils.ts           # Shared utilities
│   └── v2/                # V2-specific utilities
│       ├── design-system.ts
│       ├── typography.ts
│       └── spacing.ts
│
├── content/               # Content Data
│   ├── blog-posts.ts      # Blog posts
│   ├── projects.ts        # Projects data
│   └── v2/                # V2 content
│
├── public/                # Static Assets
│   ├── v2/                # V2 assets
│   └── ...                # Other assets
│
└── docs/                  # Documentation
    ├── README.md          # This file
    ├── v2/                # V2 Documentation
    ├── case-studies/      # Case Studies
    ├── development/       # Development Guides
    └── ai-capabilities.md  # AI/LLM Capabilities
```

## 🎯 Features

### V1 (Current Production)
- ✅ Smooth in-page navigation
- ✅ Project details modal
- ✅ Contact form with email delivery
- ✅ Resume page
- ✅ Blog with markdown support
- ✅ Dark/light theme toggle
- ✅ Responsive design

### V2 (In Development)
- ✅ Premium hero section with video modal
- ✅ Animated About section with stats
- ✅ Horizontal scrolling projects showcase
- ✅ Comprehensive design system
- ✅ Professional typography system
- ✅ Consistent layout system
- 🚧 Experience timeline (coming soon)
- 🚧 Skills visualization (coming soon)
- 🚧 Contact form (coming soon)

## 🛠 Tech Stack

### Core
- **Framework**: Next.js 15 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4

### Animations
- **Framer Motion**: 11.0.0 (animations)
- **GSAP**: 3.13.0 (scroll triggers)

### UI Components
- **Radix UI**: Accessible primitives
- **Lucide React**: Icons
- **next-themes**: Theme management

### Backend
- **Nodemailer**: Email delivery
- **Zod**: Input validation

## 📚 Documentation

- **[V2 Setup Guide](./v2/setup.md)** - Getting started with V2 development
- **[V2 Design System](./v2/design-system.md)** - Colors, gradients, utilities
- **[V2 Typography](./v2/typography.md)** - Font system and heading components
- **[V2 Layout System](./v2/layout.md)** - Container, Section, Grid components
- **[Case Studies](./case-studies/)** - Detailed project case studies
- **[AI Capabilities](./ai-capabilities.md)** - AI/LLM integration experience

## 🔗 Routes

### V1 (Production)
- `/` - Homepage
- `/resume` - Resume page
- `/blog` - Blog index
- `/blog/[slug]` - Blog post
- `/case-studies/erp-platform` - ERP case study
- `/case-studies/crm-system` - CRM case study

### V2 (Development)
- `/v2` - V2 Homepage
- `/v2/resume` - V2 Resume
- `/v2/blog` - V2 Blog

## 🎨 Design System

### Brand Colors
- **Primary**: #2563eb (Blue) - Trust & Professionalism
- **Secondary**: #7c3aed (Purple) - Innovation & AI
- **Accent**: #10b981 (Green) - Success & Growth

### Typography
- **Font**: Inter (Google Fonts)
- **Display**: Sora (for headings)
- **Mono**: Geist Mono

See [V2 Design System](./v2/design-system.md) for complete details.

## 🧪 Development Workflow

### Working on V2

```bash
# Ensure you're on the feature branch
git checkout feature/v2-foundation

# Start dev server
pnpm run dev

# Test both versions
# V1: http://localhost:3000
# V2: http://localhost:3000/v2
```

### Code Quality

```bash
# Lint
pnpm run lint

# Type check
pnpm run build
```

## 📝 Contributing

This is a personal portfolio project. For questions or collaboration, reach out via:
- Email: contact@jeevanantham.site
- GitHub: [@Mjeevanantham](https://github.com/Mjeevanantham)
- LinkedIn: [jeevanantham-mahalingam](https://www.linkedin.com/in/jeevanantham-mahalingam)

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- All open-source contributors whose work makes this possible

---

**Built with ❤️ by Jeevanantham Mahalingam**
