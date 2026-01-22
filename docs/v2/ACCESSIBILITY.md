# Accessibility Implementation Guide

This document outlines the comprehensive accessibility (a11y) implementation for V2 portfolio, targeting WCAG 2.1 Level AA compliance and a 100/100 Lighthouse Accessibility score.

## Overview

The V2 portfolio implements industry-standard accessibility practices including:
- Semantic HTML structure
- Keyboard navigation support
- ARIA attributes and roles
- Color contrast compliance
- Focus management
- Screen reader optimization

## Semantic HTML

### Heading Hierarchy

Proper heading hierarchy is maintained throughout:

- **H1**: Main page title (Hero section)
- **H2**: Section headings (About, Projects, Experience, Skills, Contact)
- **H3**: Subsection headings (Project titles, Experience roles)

**Example:**
```tsx
<H1>Full-Stack Engineer Building AI-Integrated Systems</H1>
<H2>About Me</H2>
<H2>Projects</H2>
  <H3>ERP SaaS Platform</H3>
```

### Landmark Elements

- `<nav>`: Navigation bar
- `<main>`: Main content area (id="main-content")
- `<section>`: Content sections with proper IDs
- `<article>`: Used for blog posts (when implemented)

## Keyboard Navigation

### Focus Management

- **Visible Focus Indicators**: All interactive elements have `focus:ring-2 focus:ring-offset-2` styles
- **Tab Order**: Logical tab order throughout the page
- **Skip Links**: "Skip to main content" link for keyboard users
- **Focus Trap**: Modals trap focus and return focus on close

### Interactive Elements

All interactive elements are keyboard accessible:

- **Buttons**: Full keyboard support with Enter/Space
- **Links**: Standard link navigation
- **Modals**: Escape key to close, Tab to navigate
- **Carousels**: Arrow keys for navigation

**Example:**
```tsx
<button
  onClick={onToggle}
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2"
  aria-expanded={isExpanded}
>
```

## ARIA Attributes

### Labels

- **Icon Buttons**: `aria-label` for all icon-only buttons
- **Decorative Icons**: `aria-hidden="true"` for decorative icons
- **Images**: Meaningful `alt` text or `aria-label`

**Example:**
```tsx
<button aria-label="Close video modal">
  <X className="w-5 h-5" aria-hidden="true" />
</button>
```

### States

- **Expandable Sections**: `aria-expanded` for accordions
- **Modals**: `aria-modal="true"` and `role="dialog"`
- **Dynamic Content**: `aria-live="polite"` for announcements

**Example:**
```tsx
<button
  aria-expanded={isExpanded}
  aria-controls="experience-content-0"
  aria-label="Expand experience details"
>
```

### Roles

- **Navigation**: `role="navigation"` (implicit with `<nav>`)
- **Dialog**: `role="dialog"` for modals
- **Region**: `role="region"` for carousels
- **Tablist**: `role="tablist"` for tab navigation

## Color Contrast

### Requirements

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text** (18px+): Minimum 3:1 contrast ratio
- **Interactive Elements**: 3:1 contrast ratio

### Implementation

All text colors meet WCAG AA standards:

- **Primary Text**: `text-slate-900` on `bg-white` (21:1)
- **Secondary Text**: `text-slate-600` on `bg-white` (7:1)
- **Dark Mode**: Adjusted colors for dark backgrounds

### Testing

Use these tools to verify contrast:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools Accessibility panel
- axe DevTools extension

## Forms

### Labels

All form inputs have associated labels:

```tsx
<label htmlFor="email">
  Email
  <input id="email" type="email" required />
</label>
```

### Error Messages

- **ARIA Error Messages**: `aria-describedby` links to error messages
- **Live Regions**: `aria-live="polite"` for dynamic errors
- **Required Fields**: `aria-required="true"` and visual indicators

### Validation

- Real-time validation feedback
- Clear error messages
- Success states announced

## Images

### Alt Text

- **Meaningful Images**: Descriptive `alt` text
- **Decorative Images**: `alt=""` or `aria-hidden="true"`
- **Complex Images**: Detailed descriptions in surrounding text

**Example:**
```tsx
<OptimizedImage
  src="/v2/avatar.jpg"
  alt="Professional headshot of Jeevanantham Mahalingam"
/>
```

### Decorative Images

```tsx
<div className="decorative-gradient" aria-hidden="true" />
```

## Focus Management

### Skip Links

"Skip to main content" link for keyboard users:

```tsx
<SkipLink />
<main id="main-content">
  {/* Content */}
</main>
```

### Modal Focus

- **Focus Trap**: Tab key cycles within modal
- **Initial Focus**: Close button receives focus on open
- **Return Focus**: Focus returns to trigger element on close

**Implementation:**
```tsx
// Focus trap in modals
useEffect(() => {
  const handleTab = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      // Trap focus logic
    }
  };
}, [isOpen]);
```

### Dynamic Content

- **aria-live**: Announcements for dynamic content
- **aria-atomic**: Complete announcements

**Example:**
```tsx
<p aria-live="polite" aria-atomic="true">
  Project {activeIndex + 1} of {projects.length}
</p>
```

## Screen Reader Testing

### Tools

1. **NVDA** (Windows)
   - Free, open-source screen reader
   - Test keyboard navigation
   - Verify ARIA announcements

2. **VoiceOver** (Mac)
   - Built-in screen reader
   - Cmd+F5 to enable
   - Test with Safari

3. **JAWS** (Windows)
   - Commercial screen reader
   - Industry standard

### Testing Checklist

- [ ] All headings are announced correctly
- [ ] Links and buttons have descriptive labels
- [ ] Form inputs are properly labeled
- [ ] Dynamic content is announced
- [ ] Modal dialogs are properly announced
- [ ] Navigation is keyboard accessible
- [ ] Images have meaningful alt text

## Automated Testing

### Tools

1. **axe DevTools** (Chrome Extension)
   - Run automated accessibility audits
   - Fix issues automatically
   - Export reports

2. **WAVE** (Browser Extension)
   - Visual accessibility feedback
   - Color contrast checking
   - ARIA attribute validation

3. **Lighthouse** (Chrome DevTools)
   - Accessibility score (target: 100/100)
   - Automated checks
   - Performance impact

### Running Tests

```bash
# Build and test
pnpm build
pnpm start

# Open Chrome DevTools
# Run Lighthouse audit
# Check Accessibility score
```

## Common Issues Fixed

### 1. Missing Alt Text
- ✅ All images have proper alt text
- ✅ Decorative images use `aria-hidden="true"`

### 2. Missing Focus Styles
- ✅ All interactive elements have visible focus indicators
- ✅ Global focus-visible styles in `globals.css`

### 3. Missing ARIA Labels
- ✅ Icon buttons have `aria-label`
- ✅ Expandable sections have `aria-expanded`
- ✅ Modals have `aria-modal` and `role="dialog"`

### 4. Color Contrast
- ✅ All text meets WCAG AA standards
- ✅ Interactive elements have sufficient contrast

### 5. Keyboard Navigation
- ✅ Skip links implemented
- ✅ Focus trap in modals
- ✅ Arrow key navigation for carousels

### 6. Semantic HTML
- ✅ Proper heading hierarchy
- ✅ Landmark elements (`nav`, `main`, `section`)
- ✅ Lists for grouped content

## Best Practices

1. **Always Test with Keyboard**
   - Navigate entire site using only keyboard
   - Verify all functionality is accessible

2. **Test with Screen Readers**
   - Use NVDA or VoiceOver
   - Verify content is announced correctly

3. **Check Color Contrast**
   - Use automated tools
   - Verify in both light and dark modes

4. **Validate ARIA Usage**
   - Don't overuse ARIA
   - Use semantic HTML when possible
   - Test with screen readers

5. **Focus Management**
   - Always return focus after closing modals
   - Provide skip links for long pages
   - Ensure logical tab order

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project](https://www.a11yproject.com/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

## Future Enhancements

- [ ] Add keyboard shortcuts documentation
- [ ] Implement high contrast mode
- [ ] Add reduced motion preferences
- [ ] Create accessibility statement page
- [ ] Add user preference storage
