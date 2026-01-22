# SEO Implementation Guide

This document outlines the comprehensive SEO implementation for V2 portfolio.

## Overview

The V2 portfolio implements industry-standard SEO practices including:
- Comprehensive metadata (title, description, OG tags, Twitter cards)
- JSON-LD structured data
- Dynamic Open Graph images
- robots.txt and sitemap.xml
- Per-page optimization

## Root Layout Metadata

**Location**: `app/v2/layout.tsx`

### Key Features

- **Dynamic Title Template**: `"%s | Jeevanantham M"`
- **Description**: Optimized 155-character descriptions
- **OpenGraph Tags**: Complete OG metadata for social sharing
- **Twitter Cards**: Large image cards for Twitter
- **Canonical URLs**: Prevents duplicate content issues
- **Viewport Meta**: Responsive viewport configuration
- **Theme Color**: Dynamic theme colors for mobile browsers
- **Robots**: Proper indexing directives

### Example

```tsx
export const metadata: Metadata = {
  title: {
    default: "Jeevanantham M | Full-Stack Engineer",
    template: "%s | Jeevanantham M",
  },
  description: "Full-stack engineer building production AI-integrated systems...",
  // ... more
};
```

## JSON-LD Structured Data

**Location**: `lib/v2/seo/structured-data.tsx`

### Available Schemas

#### 1. Person Schema
```tsx
<PersonSchema
  name="Jeevanantham Mahalingam"
  jobTitle="Full-Stack Engineer"
  sameAs={["https://github.com/...", "https://linkedin.com/..."]}
  worksFor={{ name: "Aaludra Technology Solutions" }}
/>
```

#### 2. Portfolio Schema
```tsx
<PortfolioSchema
  name="Jeevanantham Portfolio"
  description="Portfolio showcasing full-stack engineering projects"
/>
```

#### 3. BreadcrumbList Schema
```tsx
<BreadcrumbListSchema
  items={[
    { name: "Home", url: "/v2" },
    { name: "Resume", url: "/v2/resume" },
  ]}
/>
```

#### 4. WebSite Schema
```tsx
<WebSiteSchema
  searchAction={{
    target: "/v2?q={search_term_string}",
    queryInput: "required name=search_term_string",
  }}
/>
```

#### 5. Article Schema (for blog posts)
```tsx
<ArticleSchema
  headline="Article Title"
  description="Article description"
  datePublished="2024-01-01"
  author="Jeevanantham Mahalingam"
/>
```

## Per-Page Metadata

### Home Page (`app/v2/page.tsx`)

- **Title**: "Home"
- **Description**: Focus on name, role, and key technologies
- **OG Image**: Dynamic with title "Home" and subtitle "Full-Stack Engineer"
- **Structured Data**: Person, Portfolio, WebSite schemas

### Resume Page (`app/v2/resume/page.tsx`)

- **Title**: "Resume"
- **Description**: Mentions downloadable PDF
- **OG Image**: Dynamic with title "Resume"
- **Structured Data**: Person, BreadcrumbList schemas

### Blog Page (`app/v2/blog/page.tsx`)

- **Title**: "Blog"
- **Description**: Technical blog focus
- **OG Image**: Dynamic with title "Blog"
- **Structured Data**: Person, BreadcrumbList, WebSite schemas

## Dynamic OG Images

**Location**: `app/api/og/route.tsx`

### Features

- Generated on-the-fly using `@vercel/og`
- Customizable title and subtitle
- Brand colors and gradients
- 1200x630px (standard OG image size)
- Edge runtime for fast generation

### Usage

```tsx
// In metadata
images: [
  {
    url: `${SITE_URL}/api/og?title=Home&subtitle=Full-Stack Engineer`,
    width: 1200,
    height: 630,
  },
]
```

### Helper Function

```tsx
import { getOgImageUrl } from "@/lib/v2/seo/utils";

const ogImage = getOgImageUrl("Home", "Full-Stack Engineer");
```

## robots.txt

**Location**: `app/robots.ts`

### Configuration

- Allows all crawlers to index public pages
- Disallows `/api/`, `/_next/`, `/admin/`
- Special rules for Googlebot
- References sitemap location

### Generated Output

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://jeevanantham.site/sitemap.xml
```

## sitemap.xml

**Location**: `app/sitemap.ts`

### Included Routes

- `/v2` (priority: 1.0, weekly updates)
- `/v2/resume` (priority: 0.8, monthly updates)
- `/v2/blog` (priority: 0.7, weekly updates)

### Auto-Generated

Next.js automatically generates `sitemap.xml` from this file.

## SEO Best Practices

### 1. Title Tags

- **Format**: `Page Title | Jeevanantham M`
- **Length**: 50-60 characters
- **Include**: Primary keyword + brand name

### 2. Meta Descriptions

- **Length**: 150-155 characters
- **Include**: Call-to-action, key terms
- **Unique**: Each page has unique description

### 3. Open Graph Tags

- **Title**: Same as page title
- **Description**: Same as meta description
- **Image**: Dynamic OG image (1200x630px)
- **URL**: Canonical URL

### 4. Structured Data

- **Person Schema**: On all pages
- **BreadcrumbList**: On sub-pages
- **Portfolio Schema**: On home page
- **Article Schema**: On blog posts (when implemented)

### 5. Canonical URLs

- Every page has canonical URL
- Prevents duplicate content issues
- Points to primary version

## Testing SEO

### Tools

1. **Google Search Console**
   - Submit sitemap
   - Monitor indexing
   - Check for errors

2. **Google Rich Results Test**
   - Test structured data
   - Validate JSON-LD
   - Check for errors

3. **Facebook Sharing Debugger**
   - Test OG tags
   - Preview social sharing
   - Clear cache if needed

4. **Twitter Card Validator**
   - Test Twitter cards
   - Preview Twitter sharing

5. **Lighthouse SEO Audit**
   - Run in Chrome DevTools
   - Check SEO score
   - Fix issues

### Checklist

- [ ] All pages have unique titles
- [ ] All pages have meta descriptions (155 chars)
- [ ] OG images are generated correctly
- [ ] Structured data validates
- [ ] robots.txt is accessible
- [ ] sitemap.xml is accessible
- [ ] Canonical URLs are set
- [ ] Mobile-friendly (viewport meta)
- [ ] Fast loading (performance)

## Performance Impact

SEO implementation has minimal performance impact:
- **Structured Data**: Loaded asynchronously
- **OG Images**: Generated on-demand (cached)
- **Metadata**: Static at build time
- **No client-side overhead**

## Future Enhancements

- [ ] Add hreflang tags for internationalization
- [ ] Implement article schema for blog posts
- [ ] Add FAQ schema for common questions
- [ ] Create project-specific OG images
- [ ] Add video schema for video content
- [ ] Implement review/rating schema (if applicable)

## Resources

- [Next.js Metadata Documentation](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)
- [Google Search Central](https://developers.google.com/search)
