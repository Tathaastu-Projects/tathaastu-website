import View from "@/views/Login";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Login",
  description: "Sign in to your Tathaastu account.",
  path: "/login",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
