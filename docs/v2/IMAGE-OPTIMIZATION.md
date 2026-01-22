# Image Optimization Guide

This document explains how images are optimized across the V2 portfolio.

## Overview

All images in V2 use the `OptimizedImage` component, which provides:
- Automatic blur placeholders for smooth loading
- Lazy loading by default (except priority images)
- Proper `sizes` attribute for responsive images
- Automatic WebP/AVIF format serving (via Next.js)
- Error fallback handling
- Loading skeleton states

## Components

### OptimizedImage Component

Located at `components/v2/image/optimized-image.tsx`, this component wraps Next.js `Image` with:

- **Blur Placeholders**: Automatically uses blur data URLs from config
- **Error Handling**: Falls back to placeholder image on error
- **Loading States**: Shows skeleton while loading
- **Responsive Sizes**: Context-aware `sizes` attribute

**Usage:**

```tsx
import { OptimizedImage } from "@/components/v2/image/optimized-image";
import { getBlurDataURL, getImageSizes } from "@/lib/v2/image-utils";

<OptimizedImage
  src="/v2/avatar.jpg"
  alt="Profile picture"
  width={320}
  height={320}
  priority={false}
  blurDataURL={getBlurDataURL("v2/avatar.jpg")}
  sizes={getImageSizes("avatar")}
/>
```

### Image Utilities

Located at `lib/v2/image-utils.ts`, provides helper functions:

- `getBlurDataURL(imagePath)`: Get blur placeholder from config
- `getImageSizes(context)`: Get optimized `sizes` attribute based on context

**Contexts:**
- `"hero"`: Full-width hero images
- `"project"`: Project mockups/screenshots
- `"avatar"`: Profile pictures
- `"thumbnail"`: Small preview images
- `"full"`: Full-width images

## Generating Blur Placeholders

Blur placeholders are generated using Sharp and stored in `lib/v2/image-blur-config.ts`.

### Generate for All Images

```bash
pnpm generate:blur
```

### Generate for Single Image

```bash
pnpm tsx scripts/generate-blur-placeholders.ts path/to/image.jpg
```

The script:
1. Finds all images in `public/` directory
2. Generates 10px WebP thumbnails
3. Converts to base64 data URLs
4. Saves to `lib/v2/image-blur-config.ts`

## Image Guidelines

### Priority Images

Set `priority={true}` for:
- Hero section images (above the fold)
- Critical above-the-fold content

### Lazy Loading

All other images use `loading="lazy"` by default.

### Sizes Attribute

Use context-aware sizes:
- Hero: `"(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1280px"`
- Project: `"(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 45vw"`
- Avatar: `"(max-width: 768px) 280px, 320px"`

### Image Formats

Next.js automatically serves:
- **AVIF** (best compression, modern browsers)
- **WebP** (fallback for older browsers)
- **Original format** (final fallback)

Configured in `next.config.ts`:
```ts
images: { formats: ['image/avif', 'image/webp'] }
```

## Best Practices

1. **Always use OptimizedImage** instead of raw `next/image`
2. **Provide blur placeholders** for better UX
3. **Set appropriate sizes** based on context
4. **Use priority sparingly** (only for above-the-fold images)
5. **Optimize source images** before adding to `public/`
6. **Use descriptive alt text** for accessibility

## Performance

Image optimization provides:
- **Faster initial load**: Blur placeholders show immediately
- **Reduced bandwidth**: WebP/AVIF formats are 25-50% smaller
- **Better UX**: Smooth loading transitions
- **SEO benefits**: Proper image attributes

## Troubleshooting

### Images not loading
- Check that image exists in `public/` directory
- Verify path is correct (relative to `public/`)
- Check browser console for errors

### Blur placeholder not showing
- Run `pnpm generate:blur` to regenerate
- Check that image path matches config key
- Verify blur data URL is valid

### Images loading slowly
- Ensure `priority={true}` for above-the-fold images
- Check image file sizes (should be < 500KB)
- Verify Next.js image optimization is enabled
