import View from "@/views/Signup";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Sign Up",
  description: "Create your free Tathaastu account to consult Vedic astrologers and access horoscopes.",
  path: "/signup",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
