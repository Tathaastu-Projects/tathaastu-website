import View from "@/views/ConsultationBooking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Secure Checkout | Tathaastu Consultation",
  description:
    "Secure online booking and Easebuzz payment gateway for Vedic astrology and spiritual consultations.",
  path: "/payment",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
