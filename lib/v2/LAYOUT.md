# V2 Layout System Documentation

## Overview

The V2 Layout System provides consistent spacing, containers, sections, and grid layouts for building responsive, professional interfaces.

## Components

### Container

Provides consistent max-width, padding, and centering for content.

**Default:**
- Max width: 1280px (`max-w-7xl`)
- Padding: `px-4 sm:px-6 lg:px-8` (responsive)
- Centered: `mx-auto`

```tsx
import { Container } from '@/components/v2/layout';

<Container>
  <h1>Content</h1>
</Container>

<Container maxWidth="lg" padding={false}>
  <div>No padding</div>
</Container>
```

**Props:**
- `maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl"` - Container max width (default: "xl" = 1280px)
- `padding?: boolean` - Whether to apply responsive padding (default: true)
- `paddingClassName?: string` - Custom padding classes
- `asChild?: boolean` - Render as child component

**Max Widths:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px (default)
- `2xl`: 1536px

### Section

Provides consistent section spacing and layout with optional Container wrapper.

**Default:**
- Padding: `py-16 lg:py-24` (responsive)
- Includes Container wrapper
- Max width: 1280px

```tsx
import { Section } from '@/components/v2/layout';

<Section id="about">
  <h2>About Me</h2>
  <p>Content here</p>
</Section>

<Section padding="large" variant="muted" container={false}>
  <h2>Full-width section</h2>
</Section>
```

**Props:**
- `id?: string` - Section ID for anchor navigation
- `padding?: "none" | "small" | "medium" | "large" | "responsive"` - Vertical padding (default: "responsive")
- `variant?: "default" | "muted" | "accent"` - Background variant
- `container?: boolean` - Include Container wrapper (default: true)
- `containerMaxWidth?: ContainerMaxWidth` - Container max width (if container is true)

**Padding Options:**
- `none`: No padding
- `small`: `py-8` (32px)
- `medium`: `py-12` (48px)
- `large`: `py-20` (80px)
- `responsive`: `py-16 lg:py-24` (64px mobile, 96px desktop) - **default**

**Variants:**
- `default`: No background
- `muted`: `bg-neutral-50 dark:bg-neutral-900`
- `accent`: `bg-brand-primary/5 dark:bg-brand-primary/10`

### Grid

Responsive CSS Grid layout with configurable columns and gaps.

**Default:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large Desktop: 4 columns
- Gap: `gap-6` (24px)

```tsx
import { Grid } from '@/components/v2/layout';

<Grid>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

<Grid colsMobile={2} colsDesktop={4} gap="large">
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

**Props:**
- `colsMobile?: number` - Columns on mobile (default: 1)
- `colsTablet?: number` - Columns on tablet/sm (default: 2)
- `colsDesktop?: number` - Columns on desktop/lg (default: 3)
- `colsDesktopLg?: number` - Columns on large desktop/xl (default: 4)
- `gap?: "none" | "small" | "medium" | "large"` - Gap size (default: "medium")
- `gapClassName?: string` - Custom gap class (e.g., "gap-4", "gap-8")

**Gap Sizes:**
- `none`: `gap-0` (0px)
- `small`: `gap-4` (16px)
- `medium`: `gap-6` (24px) - **default**
- `large`: `gap-8` (32px)

## Spacing Scale

Following Tailwind's default spacing scale:

| Value | Pixels | Usage |
|-------|--------|-------|
| 0.5 | 2px | Minimal spacing |
| 1 | 4px | Tight spacing |
| 2 | 8px | Small spacing |
| 3 | 12px | Medium-small spacing |
| 4 | 16px | Base spacing |
| 6 | 24px | Medium spacing |
| 8 | 32px | Large spacing |
| 12 | 48px | Extra large spacing |
| 16 | 64px | Section padding (mobile) |
| 24 | 96px | Section padding (desktop) |
| 32 | 128px | Very large spacing |

## Usage Examples

### Basic Layout

```tsx
import { Section, Container, Grid } from '@/components/v2/layout';

<Section id="projects">
  <Container>
    <h2>My Projects</h2>
    <Grid colsMobile={1} colsDesktop={3} gap="large">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </Grid>
  </Container>
</Section>
```

### Full-Width Section

```tsx
<Section id="hero" container={false} padding="none">
  <HeroContent />
</Section>
```

### Muted Background Section

```tsx
<Section id="about" variant="muted">
  <h2>About Me</h2>
  <p>Content with muted background</p>
</Section>
```

### Custom Grid Layout

```tsx
<Grid 
  colsMobile={1} 
  colsTablet={2} 
  colsDesktop={3} 
  colsDesktopLg={4}
  gap="large"
>
  {items.map(item => (
    <ItemCard key={item.id} {...item} />
  ))}
</Grid>
```

### Nested Layouts

```tsx
<Section id="features">
  <Container>
    <h2>Features</h2>
    <Grid colsDesktop={2} gap="large">
      <div>
        <h3>Feature 1</h3>
        <p>Description</p>
      </div>
      <div>
        <h3>Feature 2</h3>
        <p>Description</p>
      </div>
    </Grid>
  </Container>
</Section>
```

## Component Spacing Guidelines

### Small Components
- Use `gap-4` (16px) for tight component groups
- Example: Button groups, form fields

### Medium Components
- Use `gap-6` (24px) for standard component spacing
- Example: Card grids, feature lists

### Large Sections
- Use `gap-8` (32px) for major section spacing
- Example: Project showcases, portfolio grids

## Responsive Breakpoints

The layout system uses Tailwind's default breakpoints:

- **Mobile**: Default (< 640px)
- **Tablet**: `sm:` (≥ 640px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)

## Best Practices

1. **Use Container for Content**: Always wrap content in `<Container>` for consistent max-width
2. **Use Section for Sections**: Use `<Section>` for page sections with proper spacing
3. **Grid for Lists**: Use `<Grid>` for card grids, project lists, etc.
4. **Consistent Spacing**: Stick to the spacing scale (4, 6, 8, 12, 16, 24)
5. **Mobile First**: Design for mobile, then enhance for larger screens

## TypeScript Types

```tsx
import type { 
  ContainerProps, 
  SectionProps, 
  GridProps 
} from '@/components/v2/layout';

import type { 
  ContainerMaxWidth, 
  ComponentGap 
} from '@/lib/v2/spacing';
```

## Resources

- [Tailwind CSS Spacing](https://tailwindcss.com/docs/customizing-spacing)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Responsive Design Best Practices](https://web.dev/responsive-web-design-basics/)
