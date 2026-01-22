# Accessibility Checklist

This document provides a quick reference checklist for accessibility compliance in V2.

## ✅ Completed

### Semantic HTML
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] `<nav>` for navigation
- [x] `<main>` with id="main-content"
- [x] `<section>` for content sections
- [x] `<ul>` and `<li>` for lists
- [x] Proper landmark elements

### Keyboard Navigation
- [x] All interactive elements focusable
- [x] Focus visible styles (`focus:ring-2 focus:ring-offset-2`)
- [x] Skip to main content link
- [x] Logical tab order
- [x] Arrow key navigation for carousels
- [x] Escape key closes modals

### ARIA Attributes
- [x] `aria-label` for icon buttons
- [x] `aria-expanded` for expandable sections
- [x] `aria-live="polite"` for dynamic content
- [x] `role="dialog"` for modals
- [x] `aria-modal="true"` for modals
- [x] `aria-hidden="true"` for decorative icons
- [x] `aria-posinset` and `aria-setsize` for tab lists
- [x] `aria-atomic="true"` for live regions

### Color Contrast
- [x] Text: 4.5:1 minimum (WCAG AA)
- [x] Large text: 3:1 minimum
- [x] Interactive elements: 3:1 minimum
- [x] Verified in both light and dark modes

### Images
- [x] Meaningful alt text for all images
- [x] Decorative images use `aria-hidden="true"`
- [x] Complex images have detailed descriptions

### Focus Management
- [x] Focus trap in modals
- [x] Return focus on modal close
- [x] Skip navigation links
- [x] Initial focus on modal open

### Forms
- [ ] Forms will be fixed when ContactForm is upgraded (planned)

## Testing Checklist

### Automated Tools
- [ ] Run Lighthouse accessibility audit (target: 100/100)
- [ ] Run axe DevTools scan
- [ ] Run WAVE browser extension
- [ ] Check color contrast with WebAIM checker

### Manual Testing
- [ ] Navigate entire site with keyboard only
- [ ] Test with NVDA (Windows) or VoiceOver (Mac)
- [ ] Verify all headings are announced
- [ ] Check modal focus trap
- [ ] Verify skip links work
- [ ] Test form validation announcements

## Common Issues Fixed

1. ✅ Missing alt text → All images have proper alt text
2. ✅ Missing focus styles → Global focus-visible styles added
3. ✅ Missing ARIA labels → All icon buttons labeled
4. ✅ Missing list semantics → All lists use `<ul>`/`<li>`
5. ✅ Missing skip links → Skip to main content added
6. ✅ Decorative icons → All use `aria-hidden="true"`

## Quick Reference

### Focus Styles
```tsx
className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary-500"
```

### Icon Button
```tsx
<button aria-label="Close modal">
  <X className="w-5 h-5" aria-hidden="true" />
</button>
```

### Expandable Section
```tsx
<button
  aria-expanded={isExpanded}
  aria-controls="content-id"
  aria-label="Expand section"
>
```

### Live Region
```tsx
<div aria-live="polite" aria-atomic="true">
  {dynamicContent}
</div>
```

### List
```tsx
<ul aria-label="Technologies" className="list-none">
  {items.map(item => (
    <li key={item.id}>{item.name}</li>
  ))}
</ul>
```
