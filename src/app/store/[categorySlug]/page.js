import View from "@/views/StoreCategory";
import { STORE_CATEGORIES } from "@/data/storeData";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return STORE_CATEGORIES.map((item) => ({ categorySlug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  const item = STORE_CATEGORIES.find((category) => category.slug === categorySlug);
  return pageMeta({
    title: item ? `${item.name} store` : "Store",
    description: item
      ? `Shop ${item.name.toLowerCase()} and related remedies at Tathaastu.`
      : "Shop remedies at Tathaastu.",
    path: `/store/${categorySlug}`,
  });
}

export default function Page() {
  return <View />;
}
