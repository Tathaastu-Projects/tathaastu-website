import View from "@/views/DailyHoroscope";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Daily Vedic Horoscope & Transits",
  description: "Free Daily Vedic Horoscope, Planetary Transits, and Love/Career/Finance scores for all 12 Zodiac signs by Tathaastu.",
  path: "/daily-horoscope",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
