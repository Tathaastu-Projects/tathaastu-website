import View from "@/views/Home";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Tathaastu | Astrology, Healing and Expert Guidance",
  description: "Talk to verified experts for Kundli, horoscope, Vastu, tarot, numerology, and healing. Personal guidance by chat, call, or video.",
  path: "/",
  index: true,
  absolute: true,
});

export default function Page() {
  return <View />;
}
