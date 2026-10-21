import View from "@/views/StoreProduct";
import { getAllProducts, getProductBySlug } from "@/data/storeData";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((item) => ({ productSlug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { productSlug } = await params;
  const item = getProductBySlug(productSlug);
  return pageMeta({
    title: item?.name || "Product",
    description: item?.shortDesc || "A Tathaastu store product.",
    path: `/store/product/${productSlug}`,
  });
}

export default function Page() {
  return <View />;
}
