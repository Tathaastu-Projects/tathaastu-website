import { SITE_URL } from "@/lib/seo";
import servicesData from "@/data/servicesData";
import blogsData from "@/data/blogsData";
import coursesData from "@/data/coursesData";
import { STORE_CATEGORIES, getAllProducts } from "@/data/storeData";

export default function sitemap() {
  const now = new Date();
  const paths = [
    "/",
    "/about",
    "/services",
    "/talk-to-astrologers",
    "/blog",
    "/courses",
    "/store",
    "/pricing",
    "/contact",
    "/privacy",
  ];

  const entries = paths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? 1 : 0.7,
  }));

  servicesData.forEach((item) => {
    entries.push({
      url: `${SITE_URL}/services/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  blogsData.forEach((item) => {
    entries.push({
      url: `${SITE_URL}/blog/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  coursesData.forEach((item) => {
    entries.push({
      url: `${SITE_URL}/courses/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  });

  STORE_CATEGORIES.forEach((item) => {
    entries.push({
      url: `${SITE_URL}/store/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    });
  });

  getAllProducts().forEach((item) => {
    entries.push({
      url: `${SITE_URL}/store/product/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    });
  });

  return entries;
}
