import { pageMeta } from "@/lib/seo";
import PrivacyPolicy from "@/views/PrivacyPolicy";

export const metadata = pageMeta({
  title: "Privacy Policy · Tathaastu",
  description:
    "At Tathasstu, we value your trust and respect your privacy. Learn how we collect, store, and protect your personal and consultation information.",
  path: "/privacy-policy",
});

export default function Page() {
  return <PrivacyPolicy />;
}
