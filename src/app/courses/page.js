import View from "@/views/Courses";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Courses",
  description: "Learn Vastu, astrology, tarot, numerology, and healing with Tathaastu.",
  path: "/courses",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
