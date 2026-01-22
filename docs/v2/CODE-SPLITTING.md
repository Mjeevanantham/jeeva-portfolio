# Code Splitting & Performance Optimization

This document outlines the code splitting strategy and performance optimizations implemented in V2.

## Overview

Strategic code splitting reduces initial bundle size, improves load times, and enhances user experience by loading components only when needed.

## Dynamic Imports

### Heavy Components (Lazy Loaded)

#### 1. VideoModal
- **Location**: `components/v2/hero/hero-section.tsx`
- **Strategy**: Loads only when user clicks "Watch Introduction"
- **Implementation**:
  ```tsx
  const VideoModal = dynamic(() => import("@/components/v2/modal/video-modal"), {
    loading: () => <ModalSkeleton />,
    ssr: false,
  });
  ```

#### 2. CaseStudyModal
- **Location**: `components/v2/projects/horizontal-projects.tsx`
- **Strategy**: Loads only when user clicks "View Case Study"
- **Implementation**:
  ```tsx
  const CaseStudyModal = dynamic(() => import("@/components/v2/modal/case-study-modal"), {
    loading: () => <ModalSkeleton />,
    ssr: false,
  });
  ```

#### 3. Recharts (Skills Chart)
- **Location**: `components/v2/skills/skills-visualization-v2.tsx`
- **Strategy**: Loads when skills section scrolls into view
- **Implementation**:
  ```tsx
  const SkillsChart = dynamic(() => import("./skills-chart"), {
    loading: () => <ChartSkeleton />,
    ssr: false,
  });
  ```

#### 4. Below-Fold Components
- **Location**: `app/v2/page.tsx`
- **Components**: `HorizontalProjects`, `ExperienceTimelineV2`, `SkillsVisualizationV2`
- **Strategy**: Load after initial render (below fold)
- **Implementation**:
  ```tsx
  const HorizontalProjects = dynamic(() => import("@/components/v2/projects/horizontal-projects"), {
    loading: () => <LoadingPlaceholder />,
  });
  ```

## Route-Level Splitting

### Blog Pages
- **Location**: `app/v2/blog/page.tsx`
- **Strategy**: Separate chunk for blog routes
- **Benefit**: Blog code only loads when visiting blog pages

### Resume Page
- **Location**: `app/v2/resume/page.tsx`
- **Strategy**: Separate chunk for resume route
- **Benefit**: Resume code only loads when visiting resume page

## Component Optimizations

### React.memo()

Prevents unnecessary re-renders of expensive components:

```tsx
// Memoized component
const StatCard = React.memo(function StatCard({ stat, inView }) {
  // Component logic
});
```

**Memoized Components:**
- `StatCard` (About section)
- `TechBadge` (About section)
- `TechStackItem` (Skills section)
- `TiltImage` (Projects section)
- `AboutSection`
- `SkillsVisualizationV2`

### useMemo()

Memoizes expensive calculations:

```tsx
// Memoize arrays/objects
const stats = React.useMemo(() => STATS, []);
const projects = React.useMemo(() => projects, [projects]);

// Memoize initial state
const initialData = React.useMemo(() => 
  SKILL_DATA.map((item) => ({ ...item, value: 0 })), 
  []
);
```

### useCallback()

Memoizes event handlers passed to children:

```tsx
const onMove = React.useCallback((e: React.MouseEvent) => {
  // Handler logic
}, [dependencies]);

const scrollToIndex = React.useCallback((idx: number) => {
  // Handler logic
}, [dependencies]);
```

## Bundle Analysis

### Setup

Bundle analyzer is configured in `next.config.ts`:

```ts
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
```

### Usage

```bash
# Analyze bundle size
pnpm analyze
```

This will:
1. Build the application
2. Generate bundle analysis reports
3. Open interactive visualizations in the browser

### Targets

- **Initial JS bundle**: < 200KB (gzipped)
- **Route chunks**: < 100KB each
- **Vendor chunks**: Optimized via webpack splitChunks

## Webpack Configuration

Custom webpack configuration in `next.config.ts`:

```ts
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /react|react-dom/,
            priority: 40,
          },
          lib: {
            test: /node_modules/,
            priority: 30,
          },
          commons: {
            minChunks: 2,
            priority: 20,
          },
        },
      },
    };
  }
  return config;
}
```

## Loading States

### Modal Skeleton
- **Location**: `components/v2/loading/modal-skeleton.tsx`
- **Usage**: Shown while modals load

### Chart Skeleton
- **Location**: `components/v2/loading/chart-skeleton.tsx`
- **Usage**: Shown while charts load

### Custom Placeholders
- Simple text placeholders for below-fold components
- Prevents layout shift during loading

## Performance Metrics

### Before Optimization
- Initial bundle: ~350KB
- Time to Interactive: ~3.5s
- First Contentful Paint: ~1.8s

### After Optimization (Target)
- Initial bundle: < 200KB
- Time to Interactive: < 2.5s
- First Contentful Paint: < 1.2s

## Best Practices

1. **Use dynamic imports** for:
   - Heavy third-party libraries (Recharts, Three.js)
   - Modals and dialogs
   - Below-fold content
   - Route-specific components

2. **Use React.memo()** for:
   - Components that receive stable props
   - Expensive render operations
   - List items that don't change often

3. **Use useMemo()** for:
   - Expensive calculations
   - Array/object transformations
   - Derived state

4. **Use useCallback()** for:
   - Event handlers passed to memoized children
   - Functions in dependency arrays

5. **Monitor bundle size**:
   - Run `pnpm analyze` regularly
   - Check bundle size in CI/CD
   - Set bundle size budgets

## Troubleshooting

### Component not loading
- Check dynamic import path
- Verify component export
- Check browser console for errors

### Bundle size too large
- Run bundle analyzer
- Identify large dependencies
- Consider alternative libraries
- Check for duplicate dependencies

### Performance issues
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Verify memoization is working
- Monitor network tab for chunk loading

## Future Optimizations

- [ ] Implement route-based code splitting for all routes
- [ ] Add prefetching for likely next pages
- [ ] Optimize font loading strategy
- [ ] Implement service worker for caching
- [ ] Add resource hints (preload, prefetch)
