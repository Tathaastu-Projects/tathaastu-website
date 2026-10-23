import { pageMeta } from "@/lib/seo";
import RefundPolicy from "@/views/RefundPolicy";

export const metadata = pageMeta({
  title: "Cancellation, Rescheduling & Refund Policy · Tathaastu",
  description:
    "Information regarding cancellation windows, rescheduling procedures, and refund eligibility for consultations on Tathaastu.",
  path: "/refund-policy",
});

export default function Page() {
  return <RefundPolicy />;
}
