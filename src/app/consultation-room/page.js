import View from "@/views/ConsultationRoom";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Live Vedic Audio & Video Consultation Room | Tathaastu",
  description:
    "Join encrypted in-app audio and video consultations with verified Vedic astrologers and gurus.",
  path: "/consultation-room",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
