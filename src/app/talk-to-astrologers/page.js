import View from "@/views/TalkToAstrologers";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Talk to an Expert",
  description: "Browse verified experts for love, career, marriage, health, and wealth guidance.",
  path: "/talk-to-astrologers",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
