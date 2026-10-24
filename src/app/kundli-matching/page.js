import View from "@/views/Matchmaking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kundli Matching & Gun Milan",
  description: "Free Vedic Horoscope Matching and 36-Guna Ashtakoot Gun Milan by Tathaastu.",
  path: "/kundli-matching",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
