import View from "@/views/Contact";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact",
  description: "Ask Tathaastu about a consultation, a course, or a remedy.",
  path: "/contact",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
