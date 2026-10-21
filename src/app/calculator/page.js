import View from "@/views/Calculator";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Kundli Calculator",
  description: "A private birth-chart calculator. This tool is not indexed.",
  path: "/calculator",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
