# Micro-Interactions Documentation

This document outlines all premium micro-interactions implemented in V2.

## Overview

V2 includes subtle, performant micro-interactions that enhance user experience while respecting accessibility preferences. All animations respect `prefers-reduced-motion`.

## Components

### 1. Custom Cursor (`CustomCursor`)

**Location:** `components/v2/micro-interactions/custom-cursor.tsx`

**Features:**
- Custom cursor with glow effect
- Follows mouse movement with smooth spring animation
- Changes state on hover (links, buttons)
- Automatically disabled on mobile devices
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { CustomCursor } from "@/components/v2/micro-interactions";

// Add to layout
<CustomCursor />
```

### 2. Scroll Progress Indicator (`ScrollProgress`)

**Location:** `components/v2/micro-interactions/scroll-progress.tsx`

**Features:**
- Thin line at top showing scroll progress
- Brand gradient color (blue → purple → green)
- Smooth spring animation
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { ScrollProgress } from "@/components/v2/micro-interactions";

// Add to layout
<ScrollProgress />
```

### 3. Page Transition (`PageTransition`)

**Location:** `components/v2/micro-interactions/page-transition.tsx`

**Features:**
- Fade transitions between route changes
- Loading bar at top during navigation
- Smooth content reveal
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { PageTransition } from "@/components/v2/micro-interactions";

<PageTransition>
  {children}
</PageTransition>
```

### 4. Shimmer Loading Effect (`Shimmer`)

**Location:** `components/v2/micro-interactions/shimmer.tsx`

**Features:**
- Animated shimmer effect for loading states
- Multiple variants: `default`, `card`, `text`, `image`
- Respects `prefers-reduced-motion` (falls back to pulse)

**Usage:**
```tsx
import { Shimmer } from "@/components/v2/micro-interactions";

<Shimmer variant="card" className="h-64 w-full" />
```

### 5. Success Animation (`SuccessAnimation`)

**Location:** `components/v2/micro-interactions/success-animation.tsx`

**Features:**
- Animated checkmark with SVG path drawing
- Optional confetti burst effect
- Customizable message and subtitle
- Smooth spring animations

**Usage:**
```tsx
import { SuccessAnimation } from "@/components/v2/micro-interactions";

<SuccessAnimation
  show={isSuccess}
  showConfetti={true}
  message="Message sent!"
  subtitle="I typically reply within 24 hours"
  onComplete={() => setIsSuccess(false)}
/>
```

### 6. Hover Link (`HoverLink`)

**Location:** `components/v2/micro-interactions/hover-link.tsx`

**Features:**
- Animated underline slide-in on hover
- Customizable underline color
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { HoverLink } from "@/components/v2/micro-interactions";

<HoverLink href="/about" underlineColor="brand-primary">
  About Me
</HoverLink>
```

### 7. Hover Card (`HoverCard`)

**Location:** `components/v2/micro-interactions/hover-card.tsx`

**Features:**
- Card lift effect on hover
- Shadow intensity options: `sm`, `md`, `lg`
- Customizable lift amount
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { HoverCard } from "@/components/v2/micro-interactions";

<HoverCard liftAmount={4} shadowIntensity="md">
  <div>Card content</div>
</HoverCard>
```

### 8. Hover Image (`HoverImage`)

**Location:** `components/v2/micro-interactions/hover-image.tsx`

**Features:**
- Subtle zoom effect on hover
- Customizable zoom amount
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { HoverImage } from "@/components/v2/micro-interactions";

<HoverImage
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  zoomAmount={1.05}
/>
```

### 9. Gradient Button (`GradientButton`)

**Location:** `components/v2/micro-interactions/gradient-button.tsx`

**Features:**
- Gradient shift effect on hover
- Customizable gradient colors
- Respects `prefers-reduced-motion`

**Usage:**
```tsx
import { GradientButton } from "@/components/v2/micro-interactions";

<GradientButton
  gradientFrom="from-brand-primary-600"
  gradientTo="to-brand-secondary-600"
  hoverGradientFrom="from-brand-secondary-600"
  hoverGradientTo="to-brand-accent-600"
>
  Click Me
</GradientButton>
```

### 10. Magnetic Button (`MagneticButton`)

**Location:** `components/v2/hero/magnetic-button.tsx`

**Features:**
- CTA buttons follow cursor on hover (desktop only)
- Smooth lerp animation using Framer Motion springs
- Scale on click (0.92x)
- Enhanced with spring transitions

**Usage:**
```tsx
import { MagneticButton } from "@/components/v2/hero/magnetic-button";

<MagneticButton magneticStrength={0.4}>
  <Button>Click Me</Button>
</MagneticButton>
```

## Enhanced Hover Effects

### Cards
- **Lift Effect:** Cards lift 4px on hover with shadow increase
- **Implementation:** Using Framer Motion `whileHover` prop
- **Examples:** Stat cards, project cards, experience cards

### Links
- **Underline Animation:** Slide-in underline on hover
- **Implementation:** `HoverLink` component with motion span

### Images
- **Zoom Effect:** Subtle 1.05x zoom on hover
- **Implementation:** `HoverImage` component or motion wrapper

### Buttons
- **Gradient Shift:** Gradient colors shift on hover
- **Scale Effect:** Slight scale on click (0.92x)
- **Implementation:** `GradientButton` or `MagneticButton`

## Loading States

### Skeleton Screens
- **Shimmer Effect:** Animated shimmer while loading
- **Fallback:** Pulse animation for reduced motion
- **Usage:** Image loading, content loading

### Smooth Content Reveal
- **Fade In:** Content fades in on load
- **Stagger:** Children animate with stagger delay
- **Implementation:** Framer Motion `useInView` hook

## Success Animations

### Form Submission
- **Checkmark Draw:** SVG path animates from 0 to 1
- **Confetti Burst:** Optional confetti effect
- **Message Display:** Customizable success message

### Action Complete
- **Achievement Unlock Feel:** Spring animations
- **Visual Feedback:** Clear success state

## Performance Considerations

### Optimizations
1. **Reduced Motion:** All animations respect `prefers-reduced-motion`
2. **Mobile Detection:** Custom cursor disabled on mobile
3. **Spring Physics:** Using Framer Motion springs for smooth animations
4. **Lazy Loading:** Confetti loaded dynamically
5. **CSS Transitions:** Using CSS for simple hover effects where possible

### Best Practices
- Use `useMotionValue` and `useSpring` for smooth cursor tracking
- Implement `useInView` for scroll-triggered animations
- Use `AnimatePresence` for mount/unmount animations
- Debounce expensive animations

## Accessibility

### Reduced Motion Support
All components check for `prefers-reduced-motion` and:
- Disable animations when preference is set
- Fall back to static states
- Use CSS transitions instead of JavaScript animations where possible

### Global CSS
Added to `app/globals.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Integration

### Layout Integration
```tsx
// app/v2/layout.tsx
import { ScrollProgress, CustomCursor } from "@/components/v2/micro-interactions";

export default function V2Layout({ children }) {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      {children}
    </>
  );
}
```

### Component Usage
```tsx
// Example: Using hover effects
import { HoverCard, HoverLink } from "@/components/v2/micro-interactions";

<HoverCard>
  <HoverLink href="/about">About</HoverLink>
</HoverCard>
```

## Future Enhancements

- [ ] Add more cursor states (loading, error, success)
- [ ] Implement page transition with route detection
- [ ] Add more loading skeleton variants
- [ ] Create animation presets for common patterns
- [ ] Add animation performance monitoring
