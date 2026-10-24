import View from "@/views/ConsultationBooking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Secure PayU Checkout | Tathaastu Consultation",
  description:
    "Secure online booking and PayU payment gateway for Vedic astrology and tarot consultations.",
  path: "/payment",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
