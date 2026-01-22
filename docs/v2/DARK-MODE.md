# Dark Mode Implementation Guide

This document outlines the comprehensive dark mode implementation for V2, ensuring a premium, polished experience.

## Overview

V2 implements a sophisticated dark mode that:
- Prevents flash of unstyled content (FOUC)
- Provides smooth theme transitions
- Persists user preference in localStorage
- Detects and respects system preference
- Maintains color contrast and accessibility
- Uses colored shadows instead of black
- Adjusts image brightness for better visibility
- Enhances glass-morphism effects

## Color Palette

### Dark Mode Colors

**Backgrounds:**
- Main background: `slate-950` (`#0f172a`)
- Card background: `slate-900` (`#1e293b`) with `slate-800` border
- Muted background: `slate-800` (`#1e293b`)

**Text:**
- Primary text: `slate-50` (`#f8fafc`)
- Secondary text: `slate-300` (`#cbd5e1`)
- Muted text: `slate-400` (`#94a3b8`)

**Borders:**
- Default border: `slate-800` (`#1e293b`)
- Hover border: `slate-700` (`#334155`)

**Brand Colors:**
- Maintained at full vibrancy
- Adjusted opacity for overlays when needed
- Gradients remain vibrant

## Implementation Details

### 1. Theme Provider

**Location:** `components/theme-provider.tsx`

**Features:**
- Uses `next-themes` for theme management
- Enables system preference detection
- Stores preference in localStorage (`v2-theme`)
- Smooth transitions enabled

```tsx
<NextThemesProvider
  enableSystem
  attribute="class"
  defaultTheme="system"
  storageKey="v2-theme"
  disableTransitionOnChange={false}
>
```

### 2. Theme Script

**Location:** `components/v2/theme/theme-script.tsx`

**Purpose:**
- Prevents FOUC by setting theme before React hydrates
- Must be placed in `<head>` before any content
- Reads from localStorage and applies theme immediately

**Usage:**
```tsx
import { ThemeScript } from "@/components/v2/theme/theme-script";

// In layout.tsx <head>
<ThemeScript />
```

### 3. Theme Toggle

**Location:** `components/theme-toggle.tsx`

**Features:**
- Three options: Light, Dark, System
- Visual indicator of current theme
- Smooth transitions
- Accessible with proper ARIA labels
- Click outside to close

### 4. CSS Custom Properties

**Location:** `app/globals.css`

**Dark Mode Variables:**
```css
.dark {
  --background: 2 6% 10%; /* slate-950 */
  --foreground: 210 40% 98%; /* slate-50 */
  --card: 222 47% 11%; /* slate-900 */
  --border: 217 33% 17%; /* slate-800 */
  --muted-foreground: 215 20% 65%; /* slate-300 */
}
```

### 5. Smooth Transitions

**Global Transition:**
```css
* {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
```

**Body Transition:**
```css
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

## Special Considerations

### 1. Images

**Brightness Reduction:**
- Images are slightly dimmed in dark mode for better visibility
- Applied via CSS filter: `brightness(0.9) contrast(1.05)`
- Can be disabled with `data-no-dark-filter` attribute

**Implementation:**
```css
.dark img:not([data-no-dark-filter]) {
  filter: brightness(0.9) contrast(1.05);
  transition: filter 0.3s ease;
}
```

**Component Usage:**
```tsx
<OptimizedImage
  src="/image.jpg"
  alt="Description"
  // Automatically applies dark mode filter
/>
```

### 2. Shadows

**Colored Shadows:**
Instead of black shadows, dark mode uses colored shadows with brand colors:

```css
.dark .shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.1), 
              0 4px 6px -2px rgba(124, 58, 237, 0.1);
}

.dark .shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(37, 99, 235, 0.15), 
              0 10px 10px -5px rgba(124, 58, 237, 0.1);
}
```

### 3. Glass-Morphism

**Enhanced Backdrop:**
Dark mode glass-morphism uses darker backgrounds with adjusted opacity:

```css
.dark .backdrop-blur-xl {
  background-color: rgba(15, 23, 42, 0.7); /* slate-900 with opacity */
}

.dark .backdrop-blur-sm {
  background-color: rgba(15, 23, 42, 0.5);
}
```

**Usage:**
```tsx
<div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/70">
  {/* Content */}
</div>
```

### 4. Gradients

**Maintained Vibrancy:**
- Brand gradients remain vibrant in dark mode
- Colors are inverted for better contrast
- Opacity adjusted for overlays

**Example:**
```tsx
<div className="bg-gradient-to-r from-brand-primary-600 to-brand-secondary-600">
  {/* Gradient remains vibrant */}
</div>
```

### 5. Scrollbar

**Custom Scrollbar:**
Dark mode includes a custom scrollbar:

```css
.dark ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.dark ::-webkit-scrollbar-track {
  background: rgb(15, 23, 42); /* slate-900 */
}

.dark ::-webkit-scrollbar-thumb {
  background: rgb(30, 41, 59); /* slate-800 */
  border-radius: 5px;
}
```

## Component Patterns

### Cards

```tsx
<div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg dark:shadow-xl">
  {/* Card content */}
</div>
```

### Text

```tsx
<h2 className="text-slate-900 dark:text-slate-50">
  Heading
</h2>
<p className="text-slate-600 dark:text-slate-300">
  Body text
</p>
```

### Buttons

```tsx
<button className="bg-brand-primary-600 hover:bg-brand-primary-700 text-white dark:text-white">
  Button
</button>
```

### Glass-Morphism Cards

```tsx
<div className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800/50">
  {/* Glass card */}
</div>
```

## Testing Checklist

### Visual Testing
- [ ] No flash of unstyled content on page load
- [ ] Smooth transitions between themes
- [ ] All components render properly in dark mode
- [ ] Images are appropriately dimmed
- [ ] Shadows use colored tints, not black
- [ ] Glass-morphism effects are visible
- [ ] Gradients remain vibrant

### Functional Testing
- [ ] Theme preference persists after page reload
- [ ] System preference is detected correctly
- [ ] Theme toggle works in header
- [ ] All three theme options work (Light, Dark, System)
- [ ] Theme changes apply immediately

### Accessibility Testing
- [ ] Color contrast meets WCAG AA standards
- [ ] Text is readable in dark mode
- [ ] Focus indicators are visible
- [ ] Interactive elements have sufficient contrast

### Performance Testing
- [ ] Theme transitions are smooth (60fps)
- [ ] No layout shift during theme change
- [ ] localStorage operations don't block rendering

## Common Issues & Solutions

### Issue: Flash of Unstyled Content (FOUC)

**Solution:**
- Use `ThemeScript` in `<head>` before React hydrates
- Set `suppressHydrationWarning` on `<html>` tag
- Initialize theme from localStorage immediately

### Issue: Images Too Bright in Dark Mode

**Solution:**
- Apply `brightness(0.9)` filter in dark mode
- Use `data-no-dark-filter` to exclude specific images
- Adjust contrast for better visibility

### Issue: Shadows Not Visible

**Solution:**
- Use colored shadows instead of black
- Increase opacity for dark backgrounds
- Use brand colors for shadow tints

### Issue: Glass-Morphism Not Visible

**Solution:**
- Increase background opacity in dark mode
- Use darker base colors
- Adjust backdrop-blur intensity

## Best Practices

1. **Always Test Both Themes**
   - Test all components in light and dark mode
   - Verify contrast ratios in both themes

2. **Use Semantic Colors**
   - Prefer `bg-white dark:bg-slate-900` over hardcoded colors
   - Use CSS custom properties when possible

3. **Smooth Transitions**
   - Enable transitions for theme changes
   - Use consistent transition durations

4. **Accessibility First**
   - Ensure contrast ratios meet WCAG AA
   - Test with screen readers in both themes

5. **Performance**
   - Minimize re-renders during theme changes
   - Use CSS transitions over JavaScript animations

## Future Enhancements

- [ ] Add theme transition animations
- [ ] Support for custom theme colors
- [ ] Theme-aware image optimization
- [ ] Reduced motion support for theme changes
- [ ] Theme preview before applying
