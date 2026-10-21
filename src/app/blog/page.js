import View from "@/views/Blog";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Blog",
  description: "Articles on Vedic astrology, Vastu for the home, and numerology.",
  path: "/blog",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
