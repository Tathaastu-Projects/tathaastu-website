import { pageMeta } from "@/lib/seo";
import TermsConditions from "@/views/TermsConditions";

export const metadata = pageMeta({
  title: "Terms & Conditions · Tathaastu",
  description:
    "Review the terms and conditions governing your access to and use of Tathasstu spiritual guidance, consultations, and services.",
  path: "/terms",
});

export default function Page() {
  return <TermsConditions />;
}
