# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd jeeva-portfolio

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
pnpm run dev
```

## Development Workflow

### Working on V1
V1 is the production version. **Do not modify** V1 files unless fixing critical bugs.

**V1 Files (Protected)**:
- `app/page.tsx`
- `app/layout.tsx` (root layout only)
- `components/` (non-v2 components)
- `app/blog/`, `app/resume/`

### Working on V2

1. **Checkout Feature Branch**:
   ```bash
   git checkout feature/v2-foundation
   ```

2. **All V2 Work Goes In**:
   - `app/v2/` - V2 pages
   - `components/v2/` - V2 components
   - `lib/v2/` - V2 utilities
   - `content/v2/` - V2 content

3. **Test Both Versions**:
   ```bash
   pnpm run dev
   # V1: http://localhost:3000
   # V2: http://localhost:3000/v2
   ```

## Code Standards

### TypeScript
- **Strict Mode**: Enabled
- **No `any` Types**: Use proper types or `unknown`
- **Type Definitions**: Export types from component files

### Component Structure
```tsx
// 1. Imports
import React from "react";
import { motion } from "framer-motion";

// 2. Types/Interfaces
interface ComponentProps {
  // ...
}

// 3. Component
export function Component({ ... }: ComponentProps) {
  // ...
}

// 4. Display Name (if needed)
Component.displayName = "Component";
```

### Styling
- **Tailwind CSS**: Primary styling method
- **CSS Modules**: For complex component-specific styles
- **CSS Variables**: For theme values
- **Responsive**: Mobile-first approach

### Naming Conventions
- **Components**: PascalCase (`HeroSection.tsx`)
- **Files**: kebab-case for utilities (`design-system.ts`)
- **Variables**: camelCase
- **Constants**: UPPER_SNAKE_CASE

## Testing

### Manual Testing Checklist
- [ ] V1 still works at `/`
- [ ] V2 works at `/v2`
- [ ] Mobile responsive (both versions)
- [ ] Dark mode works (both versions)
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] Build succeeds: `pnpm run build`

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Git Workflow

### Branch Strategy
- `main` - Production (V1)
- `feature/v2-*` - V2 feature branches

### Commit Messages
Follow conventional commits:
```
feat(v2): add horizontal projects section
fix(v2): resolve modal focus trap issue
docs: update architecture documentation
refactor(v2): optimize animation performance
```

### Before Committing
```bash
# Check linting
pnpm run lint

# Check types
pnpm run build

# Test both versions
# Visit http://localhost:3000 and http://localhost:3000/v2
```

## Performance Guidelines

### Images
- Use Next.js `Image` component
- Provide `width` and `height`
- Use `loading="lazy"` for below-fold images
- Optimize images before adding to `public/`

### Animations
- Use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change` sparingly
- Debounce scroll handlers

### Code Splitting
- Dynamic imports for heavy components
- Lazy load modals and non-critical features
- Split vendor bundles appropriately

## Accessibility Guidelines

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Use `<nav>`, `<main>`, `<section>`, `<article>`
- Use `<button>` for actions, `<a>` for navigation

### ARIA Labels
- Add `aria-label` to icon-only buttons
- Use `aria-live` for dynamic content
- Mark modals with `aria-modal="true"`

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Focus management in modals
- Skip links for long pages

### Color Contrast
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Test with browser dev tools

## Debugging

### Common Issues

**Build Fails**:
```bash
# Clear Next.js cache
rm -rf .next
pnpm run build
```

**TypeScript Errors**:
```bash
# Check specific file
pnpm run build 2>&1 | grep "error TS"
```

**Styling Issues**:
- Check Tailwind classes are correct
- Verify CSS variables are defined
- Check for conflicting styles

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
