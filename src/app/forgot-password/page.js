import View from "@/views/ForgotPassword";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Forgot Password",
  description: "Recover your Tathaastu account password using email OTP verification.",
  path: "/forgot-password",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
