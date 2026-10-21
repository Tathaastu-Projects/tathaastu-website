import View from "@/views/About";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description: "Tathaastu is a home for astrology, Vastu, tarot, numerology, and healing experts.",
  path: "/about",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
