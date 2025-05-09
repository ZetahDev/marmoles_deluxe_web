import React from 'react';

interface SEOSchemaDataProps {
  pageTitle: string;
  pageDescription: string;
  pageUrl: string;
  pageImage: string;
  category?: string;
  stones?: Array<{
    name: string;
    image: string;
  }>;
  pageType?: 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'HomePage' | 'ServicePage';
  organization?: {
    name: string;
    logo?: string;
    sameAs?: string[];
    telephone?: string;
    address?: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  };
}

// Schema types
type SchemaData = Record<string, any>;

// Create base schema
const createBaseSchema = (props: SEOSchemaDataProps): SchemaData => ({
  "@context": "https://schema.org",
  "@type": props.pageType,
  "name": props.pageTitle,
  "description": props.pageDescription,
  "url": props.pageUrl,
  "image": props.pageImage
});

// Create collection page schema
const createCollectionSchema = (props: SEOSchemaDataProps): SchemaData => {
  const { pageTitle, pageDescription, pageUrl, pageImage, category, stones = [] } = props;
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": pageUrl,
    "image": pageImage,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": stones.map((stone, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": stone.name,
          "image": stone.image,
          "description": `${category} - ${stone.name}`,
          "category": category,
          "brand": {
            "@type": "Brand",
            "name": category
          },
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "COP",
            "price": "0",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            "url": `${pageUrl}?material=${stone.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
          }
        }
      }))
    }
  };
};

// Create organization schema parts
const createOrganizationData = (organization: NonNullable<SEOSchemaDataProps['organization']>): SchemaData => ({
  "@type": "Organization",
  "name": organization.name,
  ...(organization.logo && { "logo": organization.logo }),
  ...(organization.sameAs && { "sameAs": organization.sameAs }),
  ...(organization.telephone && { "telephone": organization.telephone }),
  ...(organization.address && {
    "address": {
      "@type": "PostalAddress",
      ...organization.address
    }
  })
});

/**
 * Component that renders JSON-LD structured data for SEO
 * Follows schema.org specifications for better search engine understanding
 */
export default function SEOSchemaData(props: SEOSchemaDataProps) {
  const { 
    pageTitle,
    pageDescription,
    pageUrl,
    pageImage,
    pageType = 'WebPage',
    category,
    stones = [], 
    organization
  } = props;
  
  // Get base schema
  let schemaData: SchemaData = createBaseSchema({
    pageTitle,
    pageDescription,
    pageUrl,
    pageImage,
    pageType
  });
  
  // Apply specific schema based on page type and available data
  if (category && stones.length > 0 && (pageType === 'CollectionPage' || pageType === 'WebPage')) {
    schemaData = createCollectionSchema({
      pageTitle,
      pageDescription,
      pageUrl,
      pageImage,
      category,
      stones
    });
  } else if (pageType === 'ContactPage' && organization) {
    schemaData = {
      ...schemaData,
      "@type": "ContactPage",
      "about": createOrganizationData(organization)
    };
  } else if (pageType === 'AboutPage' && organization) {
    schemaData = {
      ...schemaData,
      "@type": "AboutPage",
      "about": createOrganizationData(organization)
    };
  } else if (pageType === 'ServicePage') {
    schemaData = {
      ...schemaData,
      "@type": "WebPage",
      "specialty": category || "Servicios de mármoles y piedras"
    };
  } else if (pageType === 'HomePage' && organization) {
    schemaData = {
      ...schemaData,
      "@type": "WebPage",
      "publisher": createOrganizationData(organization)
    };
  }

  // JSON-LD format for search engines
  return (
    <script 
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
} 