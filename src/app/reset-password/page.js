import View from "@/views/ResetPassword";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Reset Password",
  description: "Set a new secure password for your Tathaastu account.",
  path: "/reset-password",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
