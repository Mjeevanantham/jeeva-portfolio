# V2 Typography System Documentation

## Overview

The V2 Typography System provides a professional, consistent typography foundation using Inter font family with standardized sizes, weights, line heights, and letter spacing.

## Font Configuration

### Inter Font
- **Source**: Google Fonts via `next/font/google`
- **Display**: `swap` (for optimal performance)
- **Fallback**: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`
- **Preload**: Enabled for faster initial load
- **Font Fallback Adjustment**: Enabled for better CLS scores

## Font Sizes (Tailwind Scale)

| Size | Pixels | Usage |
|------|--------|-------|
| `text-xs` | 12px | Small labels, captions |
| `text-sm` | 14px | Secondary text, metadata |
| `text-base` | 16px | Body text (default) |
| `text-lg` | 18px | Large body text |
| `text-xl` | 20px | H5 headings |
| `text-2xl` | 24px | H4 headings |
| `text-3xl` | 30px | H3 headings |
| `text-4xl` | 36px | H2 headings (mobile) |
| `text-5xl` | 48px | H1 headings (mobile), H2 (desktop) |
| `text-6xl` | 60px | H1 headings (desktop) |

## Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| `font-normal` | 400 | Body text, paragraphs |
| `font-medium` | 500 | H6 headings, emphasis |
| `font-semibold` | 600 | H3-H5 headings |
| `font-bold` | 700 | H1-H2 headings |

## Line Heights

| Height | Value | Usage |
|--------|-------|-------|
| `leading-tight` | 1.25 | Headings (H1-H3) |
| `leading-normal` | 1.5 | Body text, H4-H6 |
| `leading-relaxed` | 1.75 | Long-form content |

## Letter Spacing

| Spacing | Value | Usage |
|---------|-------|-------|
| `tracking-tighter` | -0.05em | Large display text |
| `tracking-tight` | -0.025em | Headings (H1-H3) |
| `tracking-normal` | 0em | Default, body text |
| `tracking-wide` | 0.025em | Uppercase text |
| `tracking-wider` | 0.05em | Small uppercase text |

## Heading Components

### Basic Usage

```tsx
import { H1, H2, H3, H4, H5, H6 } from '@/components/v2/typography/heading';

// Simple heading
<H1>Welcome to V2</H1>

// With gradient
<H1 gradient>Premium Experience</H1>

// Responsive sizing
<H2 responsive>About Me</H2>

// Custom styling
<H3 className="text-brand-primary">Custom Color</H3>
```

### Heading Component API

```tsx
<Heading
  level="h1"              // h1-h6
  size="5xl"              // Optional: override default size
  weight="bold"           // Optional: override default weight
  lineHeight="tight"      // Optional: override default line height
  letterSpacing="tight"   // Optional: override default letter spacing
  responsive={true}        // Enable responsive sizing
  gradient={false}         // Apply gradient text effect
  className="..."          // Additional classes
>
  Content
</Heading>
```

### Default Heading Styles

| Level | Size (Mobile) | Size (Desktop) | Weight | Line Height | Letter Spacing |
|-------|---------------|----------------|--------|-------------|---------------|
| H1 | 48px (3rem) | 60px (3.75rem) | 700 | 1.25 | -0.025em |
| H2 | 36px (2.25rem) | 48px (3rem) | 700 | 1.25 | -0.025em |
| H3 | 30px (1.875rem) | 36px (2.25rem) | 600 | 1.25 | -0.025em |
| H4 | 24px (1.5rem) | 24px (1.5rem) | 600 | 1.5 | 0em |
| H5 | 20px (1.25rem) | 20px (1.25rem) | 600 | 1.5 | 0em |
| H6 | 18px (1.125rem) | 18px (1.125rem) | 500 | 1.5 | 0em |

## Responsive Typography

The typography system uses a mobile-first approach:

```tsx
// H1 with responsive sizing
<H1 responsive>
  // Mobile: 36px (text-4xl)
  // Tablet: 48px (text-5xl)
  // Desktop: 60px (text-6xl)
  Responsive Heading
</H1>
```

## Gradient Text

Apply gradient text effect using the `gradient` prop:

```tsx
<H1 gradient>
  Gradient Heading
</H1>
```

This applies the brand gradient (blue → purple) as text color.

## TypeScript Usage

```tsx
import { TYPOGRAPHY, type FontSize, type FontWeight } from '@/lib/v2/typography';

// Access font sizes
const headingSize = TYPOGRAPHY.fontSizes['5xl']; // "3rem"

// Access font weights
const boldWeight = TYPOGRAPHY.fontWeights.bold; // 700

// Access line heights
const tightLineHeight = TYPOGRAPHY.lineHeights.tight; // 1.25
```

## CSS Utilities

### Font Sizes
```css
.text-xs    /* 12px */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.text-xl    /* 20px */
.text-2xl   /* 24px */
.text-3xl   /* 30px */
.text-4xl   /* 36px */
.text-5xl   /* 48px */
.text-6xl   /* 60px */
```

### Font Weights
```css
.font-normal   /* 400 */
.font-medium   /* 500 */
.font-semibold /* 600 */
.font-bold     /* 700 */
```

### Line Heights
```css
.leading-tight    /* 1.25 */
.leading-normal   /* 1.5 */
.leading-relaxed   /* 1.75 */
```

### Letter Spacing
```css
.tracking-tighter  /* -0.05em */
.tracking-tight    /* -0.025em */
.tracking-normal   /* 0em */
.tracking-wide     /* 0.025em */
.tracking-wider    /* 0.05em */
```

## Best Practices

1. **Use Heading Components**: Always use `<H1>`, `<H2>`, etc. for consistent styling
2. **Responsive by Default**: Use `responsive` prop for main headings
3. **Gradient Sparingly**: Use gradient text only for hero sections and key highlights
4. **Maintain Hierarchy**: Follow proper heading hierarchy (H1 → H2 → H3, etc.)
5. **Readability First**: Ensure sufficient contrast and line height for body text

## Accessibility

- All headings are semantic HTML elements (`<h1>`-`<h6>`)
- Proper heading hierarchy is maintained
- Font sizes meet WCAG 2.1 AA requirements
- Line heights ensure readability (minimum 1.5 for body text)
- Letter spacing improves readability for headings

## Performance

- Font preloading enabled for faster initial render
- `font-display: swap` prevents invisible text during font load
- Font fallback adjustment reduces layout shift (CLS)
- Optimized font subset (latin only)

## Examples

### Hero Section
```tsx
<H1 responsive gradient className="mb-6">
  Jeevanantham Mahalingam
</H1>
```

### Section Heading
```tsx
<H2 responsive className="mb-4">
  About Me
</H2>
```

### Subsection Heading
```tsx
<H3 className="text-brand-primary mb-2">
  Experience
</H3>
```

### Card Title
```tsx
<H4 className="font-semibold">
  Project Title
</H4>
```

## Resources

- [Inter Font](https://rsms.me/inter/)
- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [WCAG Typography Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/visual-presentation.html)
