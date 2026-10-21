import View from "@/views/BlogDetails";
import blogsData from "@/data/blogsData";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return blogsData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = blogsData.find((post) => post.slug === slug);
  return pageMeta({
    title: item?.title || "Article",
    description: item?.excerpt || "A Tathaastu article.",
    path: `/blog/${slug}`,
  });
}

export default function Page() {
  return <View />;
}
