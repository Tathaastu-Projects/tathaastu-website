import View from "@/views/dashboards/ExpertDashboard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Expert dashboard",
  description: "Private expert dashboard.",
  path: "/expert/dashboard",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
