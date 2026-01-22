/**
 * Structured Data (JSON-LD) Components
 * 
 * Provides reusable JSON-LD structured data for SEO
 */

import Script from "next/script";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jeevanantham.site";

export interface PersonSchemaProps {
  name?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url?: string;
  };
  address?: {
    addressCountry: string;
  };
  contactPoint?: {
    contactType: string;
    email: string;
  };
}

/**
 * Person Schema (JSON-LD)
 */
export function PersonSchema({
  name = "Jeevanantham Mahalingam",
  jobTitle = "Full-Stack Engineer",
  url = `${SITE_URL}/v2`,
  sameAs = [
    "https://github.com/Mjeevanantham",
    "https://www.linkedin.com/in/jeevanantham-mahalingam",
  ],
  worksFor = {
    name: "Aaludra Technology Solutions",
  },
  address = {
    addressCountry: "IN",
  },
  contactPoint = {
    contactType: "business",
    email: "contact@jeevanantham.site",
  },
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
    jobTitle,
    sameAs,
    worksFor: {
      "@type": "Organization",
      name: worksFor.name,
      ...(worksFor.url && { url: worksFor.url }),
    },
    address: {
      "@type": "PostalAddress",
      ...address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint,
    },
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface PortfolioSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  author?: string;
}

/**
 * Portfolio/CreativeWork Schema (JSON-LD)
 */
export function PortfolioSchema({
  name = "Jeevanantham Portfolio",
  url = `${SITE_URL}/v2`,
  description = "Portfolio showcasing full-stack engineering projects and expertise",
  author = "Jeevanantham Mahalingam",
}: PortfolioSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#portfolio`,
    name,
    url,
    description,
    author: {
      "@type": "Person",
      name: author,
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  return (
    <Script
      id="portfolio-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbListProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

/**
 * BreadcrumbList Schema (JSON-LD)
 */
export function BreadcrumbListSchema({ items }: BreadcrumbListProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  searchAction?: {
    target: string;
    queryInput: string;
  };
}

/**
 * WebSite Schema (JSON-LD)
 */
export function WebSiteSchema({
  name = "Jeevanantham Portfolio",
  url = `${SITE_URL}/v2`,
  searchAction,
}: WebSiteSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    ...(searchAction && {
      potentialAction: {
        "@type": "SearchAction",
        target: searchAction.target,
        "query-input": searchAction.queryInput,
      },
    }),
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleSchemaProps {
  headline: string;
  description: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  url?: string;
}

/**
 * Article Schema (JSON-LD) for blog posts
 */
export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author = "Jeevanantham Mahalingam",
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Person",
      name: author,
    },
    ...(url && { url }),
  };

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
