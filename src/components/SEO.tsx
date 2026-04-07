import { useEffect, useMemo } from "react";
import {
  BRAND_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  absoluteUrl,
} from "@/lib/seo";

type StructuredData = Record<string, unknown>;

type SEOProps = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  schema?: StructuredData | StructuredData[];
};

const SCHEMA_SCRIPT_ID = "page-seo-schema";

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const upsertLink = (rel: string, href: string, attributes: Record<string, string> = {}) => {
  const selectorAttributes = Object.entries(attributes)
    .map(([name, value]) => `[${name}="${value}"]`)
    .join("");

  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${selectorAttributes}`);

  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);

    Object.entries(attributes).forEach(([name, value]) => {
      tag?.setAttribute(name, value);
    });

    document.head.appendChild(tag);
  }

  tag.setAttribute("href", href);
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  schema,
}: SEOProps) => {
  const pageTitle = title.includes(BRAND_NAME) ? title : `${title} | ${BRAND_NAME}`;
  const canonicalUrl = useMemo(() => absoluteUrl(path), [path]);
  const imageUrl = useMemo(() => absoluteUrl(image), [image]);
  const keywordsContent = useMemo(
    () => Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords])).join(", "),
    [keywords]
  );

  const schemaMarkup = useMemo(() => {
    if (!schema) {
      return "";
    }

    const payload = Array.isArray(schema) ? schema : [schema];

    if (payload.length === 0) {
      return "";
    }

    return JSON.stringify(payload.length === 1 ? payload[0] : payload);
  }, [schema]);

  useEffect(() => {
    document.title = pageTitle;

    const robotsContent = noindex
      ? "noindex, nofollow, noarchive"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywordsContent);
    upsertMeta("name", "author", BRAND_NAME);
    upsertMeta("name", "publisher", BRAND_NAME);
    upsertMeta("name", "robots", robotsContent);
    upsertMeta("name", "googlebot", robotsContent);
    upsertMeta("name", "theme-color", "#0a2342");

    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:site_name", BRAND_NAME);
    upsertMeta("property", "og:locale", "en_IN");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:site", TWITTER_HANDLE);
    upsertMeta("name", "twitter:creator", TWITTER_HANDLE);

    upsertLink("canonical", canonicalUrl);
    upsertLink("alternate", canonicalUrl, { hreflang: "en-IN" });
    upsertLink("alternate", canonicalUrl, { hreflang: "x-default" });

    const existingSchema = document.getElementById(SCHEMA_SCRIPT_ID);

    if (schemaMarkup) {
      const schemaTag =
        existingSchema instanceof HTMLScriptElement
          ? existingSchema
          : document.createElement("script");

      schemaTag.type = "application/ld+json";
      schemaTag.id = SCHEMA_SCRIPT_ID;
      schemaTag.textContent = schemaMarkup;

      if (!existingSchema) {
        document.head.appendChild(schemaTag);
      }
    } else if (existingSchema) {
      existingSchema.remove();
    }
  }, [canonicalUrl, description, imageUrl, keywordsContent, noindex, pageTitle, schemaMarkup, type]);

  return null;
};

export default SEO;
