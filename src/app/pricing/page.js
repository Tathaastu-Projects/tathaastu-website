import { Suspense } from "react";
import View from "@/views/Pricing";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Pricing",
  description: "Consultation plans for chat, call, and video sessions with Tathaastu experts.",
  path: "/pricing",
  index: true,
  absolute: false,
});

export default function Page() {
  return (
    <Suspense fallback={null}>
      <View />
    </Suspense>
  );
}
