import View from "@/views/dashboards/AdminDashboard";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Admin dashboard",
  description: "Private admin dashboard.",
  path: "/admin/dashboard",
  index: false,
  absolute: false,
});

export default function Page() {
  return <View />;
}
