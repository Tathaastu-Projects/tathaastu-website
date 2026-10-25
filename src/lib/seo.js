export const SITE_NAME = "Tathaastu";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL || "http://localhost:3032/api";

export const DEFAULT_DESCRIPTION =
  "Tathaastu connects you with verified experts for Kundli, horoscope, Vastu, tarot, numerology, and healing. Chat, call, or video — guidance for every part of life.";

export function pageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  index = true,
  absolute = false,
}) {
  const url = `${SITE_URL}${path}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: index
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [{ url: "/tathaastu-logo.png", alt: "Tathaastu" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/tathaastu-logo.png"],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/tathaastu-logo.png`,
      description: DEFAULT_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: "en-IN",
    },
  ],
};
