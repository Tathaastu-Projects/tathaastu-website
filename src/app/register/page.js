import View from "@/views/Signup";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Register",
  description: "Create your free Tathaastu account.",
  path: "/register",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
