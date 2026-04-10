export const SITE_URL = "https://endessusshipping.com";
export const BRAND_NAME = "En Dessus Global Forwarding";
export const BRAND_LEGAL_NAME = "En Dessus Global Forwarding Pvt. Ltd.";
export const TWITTER_HANDLE = "@EndessusShipping";

export const DEFAULT_DESCRIPTION =
  "En Dessus Global Forwarding helps importers and exporters with sea freight, air freight, customs clearance, break bulk, and project cargo logistics.";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logo/En-Dessus-Logo.png`;

export const DEFAULT_KEYWORDS = [
  "import export logistics",
  "freight forwarding company",
  "sea freight services",
  "air freight services",
  "customs clearance",
  "project cargo logistics",
  "break bulk shipping",
  "container shipping",
  "Ahmedabad logistics company",
];

export const BUSINESS_CONTACT = {
  phone: "+91 9427289636",
  internationalPhone: "+919427289636",
  landline: "0265-4605517",
  internationalLandline: "+912654605517",
  email: "info@endessusshipping.com",
  alternateEmail: "tushar@endessusshipping.com",
};

export const BUSINESS_ADDRESS = {
  streetAddress: "A-1035/1036, Sun west bank, Ashram Rd, opp. City Gold cinema",
  addressLocality: "Ahmedabad",
  addressRegion: "Gujarat",
  postalCode: "380009",
  addressCountry: "IN",
};

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/endessus/",
  "https://www.instagram.com/en_dessus",
  "https://www.linkedin.com/company/en-dessus-global-forwarding-pvt-ltd/?originalSubdomain=in",
];

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export const absoluteUrl = (path: string): string => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const trimmedPath = path.trim();

  if (!trimmedPath || trimmedPath === "/") {
    return `${SITE_URL}/`;
  }

  const normalizedPath = `/${trimmedPath.replace(/^\/+/, "").replace(/\/+$/, "")}`;
  return `${SITE_URL}${normalizedPath}`;
};

export const createBreadcrumbSchema = (items: BreadcrumbItem[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND_LEGAL_NAME,
  url: SITE_URL,
  logo: DEFAULT_OG_IMAGE,
  description: DEFAULT_DESCRIPTION,
  email: BUSINESS_CONTACT.email,
  telephone: BUSINESS_CONTACT.internationalPhone,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    ...BUSINESS_ADDRESS,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: BUSINESS_CONTACT.internationalPhone,
      email: BUSINESS_CONTACT.email,
      availableLanguage: ["en"],
      areaServed: "Worldwide",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: BUSINESS_CONTACT.internationalLandline,
      email: BUSINESS_CONTACT.alternateEmail,
      availableLanguage: ["en"],
      areaServed: "Worldwide",
    },
  ],
  sameAs: SOCIAL_PROFILES,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND_NAME,
  url: SITE_URL,
  inLanguage: "en-IN",
  publisher: {
    "@type": "Organization",
    name: BRAND_LEGAL_NAME,
    url: SITE_URL,
  },
};
