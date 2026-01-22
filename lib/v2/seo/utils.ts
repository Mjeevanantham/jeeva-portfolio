/**
 * SEO Utility Functions
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

/**
 * Generate OG image URL
 */
export function getOgImageUrl(title: string, subtitle?: string): string {
  const params = new URLSearchParams({ title });
  if (subtitle) {
    params.set("subtitle", subtitle);
  }
  return `${SITE_URL}/api/og?${params.toString()}`;
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Truncate description to 155 characters (SEO best practice)
 */
export function truncateDescription(description: string, maxLength: number = 155): string {
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength - 3) + "...";
}

/**
 * Generate page title with template
 */
export function getPageTitle(pageTitle: string, template: string = "%s | Jeevanantham M"): string {
  return template.replace("%s", pageTitle);
}
