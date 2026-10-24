import View from "@/views/Numerology";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Vedic Numerology & Life Path Calculator",
  description: "Free Vedic Numerology, Life Path, and Destiny Number Calculator by Tathaastu.",
  path: "/numerology",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
