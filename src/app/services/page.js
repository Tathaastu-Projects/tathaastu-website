import View from "@/views/Services";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Services",
  description: "Kundli, Vedic astrology, Vastu, tarot, numerology, pooja, and healing services.",
  path: "/services",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
