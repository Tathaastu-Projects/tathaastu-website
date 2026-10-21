import View from "@/views/Store";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Store",
  description: "Puja essentials, crystals, rudraksha, yantras, and Vastu remedies.",
  path: "/store",
  index: true,
  absolute: false,
});

export default function Page() {
  return <View />;
}
