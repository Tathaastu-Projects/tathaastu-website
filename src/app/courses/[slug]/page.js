import View from "@/views/CourseDetails";
import coursesData from "@/data/coursesData";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return coursesData.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = coursesData.find((course) => course.slug === slug);
  return pageMeta({
    title: item?.title || "Course",
    description: item?.bannerSubtext || item?.bannerText || "A Tathaastu course.",
    path: `/courses/${slug}`,
  });
}

export default function Page() {
  return <View />;
}
