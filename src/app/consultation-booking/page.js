import View from "@/views/ConsultationBooking";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Book a consultation",
  description: "Booking form for a Tathaastu consultation.",
  path: "/consultation-booking",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
