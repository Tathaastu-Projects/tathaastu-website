import View from "@/views/ServiceDetails";
import servicesData from "@/data/servicesData";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return servicesData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = servicesData.find((service) => service.slug === slug);
  return pageMeta({
    title: item?.title || "Service",
    description: item?.description || "Tathaastu service details.",
    path: `/services/${slug}`,
  });
}

export default function Page() {
  return <View />;
}
