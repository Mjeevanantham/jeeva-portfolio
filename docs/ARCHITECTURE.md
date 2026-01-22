# Portfolio Architecture Documentation

## Overview

This portfolio is built with Next.js 15 App Router, featuring a dual-version architecture where V1 (production) and V2 (development) coexist independently.

## Architecture Principles

1. **Isolation**: V1 and V2 are completely isolated - no shared components or dependencies
2. **Backward Compatibility**: V1 remains fully functional and untouched
3. **Progressive Enhancement**: V2 builds on modern patterns and best practices
4. **Type Safety**: Full TypeScript coverage with strict mode
5. **Performance First**: Optimized for Core Web Vitals (Lighthouse 95+)

## Folder Structure

### App Router Structure

```
app/
├── layout.tsx              # Root layout (V1 + V2 shared)
├── page.tsx                # V1 Homepage (/)
├── v2/
│   ├── layout.tsx         # V2-specific layout
│   ├── page.tsx           # V2 Homepage (/v2)
│   ├── resume/
│   └── blog/
├── api/                    # API routes
├── blog/                   # V1 Blog
└── resume/                 # V1 Resume
```

### Component Architecture

```
components/
├── [v1 components]         # V1 components (untouched)
└── v2/                     # V2 components (new)
    ├── hero/
    ├── about/
    ├── projects/
    ├── layout/
    ├── modal/
    ├── navigation/
    └── typography/
```

### Library Structure

```
lib/
├── utils.ts                # Shared utilities
└── v2/                     # V2-specific utilities
    ├── design-system.ts
    ├── design-system-utils.ts
    ├── typography.ts
    └── spacing.ts
```

## Design System

### Color System
- **Brand Colors**: Primary (blue), Secondary (purple), Accent (green)
- **Neutral Scale**: Slate 50-900
- **Dark Mode**: Automatic color inversion with proper contrast

### Typography System
- **Font**: Inter (body), Sora (display)
- **Scale**: 12px - 60px (Tailwind scale)
- **Weights**: 400, 500, 600, 700
- **Line Heights**: 1.25 (tight), 1.5 (normal), 1.75 (relaxed)

### Layout System
- **Container**: Max-width 1280px, responsive padding
- **Section**: Responsive vertical padding (64px mobile, 96px desktop)
- **Grid**: Responsive columns (1/2/3/4)

## State Management

- **React State**: Local component state with `useState`
- **Theme**: `next-themes` for dark/light mode
- **Animations**: Framer Motion for UI animations, GSAP for scroll triggers

## Data Flow

### Static Content
- Blog posts: `content/blog-posts.ts`
- Projects: `content/projects.ts`
- V2 content: `content/v2/`

### API Routes
- `/api/contact` - Contact form submission (Nodemailer)

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with lazy loading
2. **Code Splitting**: Dynamic imports for heavy components
3. **Font Optimization**: `next/font/google` with `font-display: swap`
4. **Animation Performance**: GPU-accelerated transforms
5. **Bundle Size**: Tree-shaking, optimized imports

## Accessibility

- **WCAG 2.1 AA**: All color combinations meet contrast requirements
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus states, focus traps in modals

## SEO

- **Metadata**: Comprehensive meta tags per page
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated sitemap.xml
- **Robots**: robots.txt configuration

## Security

- **CSP**: Content Security Policy headers
- **Input Validation**: Zod schemas for form inputs
- **Email Security**: Nodemailer with secure credentials
- **XSS Protection**: React's built-in escaping

## Deployment

- **Platform**: Vercel (recommended)
- **Build**: `next build`
- **Environment**: Production environment variables required
- **Monitoring**: Vercel Analytics integrated

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Mobile**: iOS Safari, Chrome Mobile
- **Features**: CSS Grid, Flexbox, CSS Custom Properties

## Future Enhancements

- [ ] Three.js 3D elements
- [ ] Advanced animations
- [ ] Performance monitoring
- [ ] A/B testing framework
- [ ] Analytics dashboard
