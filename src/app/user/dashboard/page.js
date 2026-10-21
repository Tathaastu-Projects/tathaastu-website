import View from "@/views/dashboards/UserDashboard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Your dashboard",
  description: "Private client dashboard.",
  path: "/user/dashboard",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
