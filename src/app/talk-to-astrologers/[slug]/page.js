import View from "@/views/AstrologerProfile";
import { API_BASE, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const fallback = pageMeta({
    title: "Expert profile",
    description: "Talk to a Tathaastu expert by chat, call, or video.",
    path: `/talk-to-astrologers/${slug}`,
  });
  try {
    const res = await fetch(`${API_BASE}/astrologers/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return fallback;
    const payload = await res.json();
    const expert = payload?.data;
    if (!expert?.name) return fallback;
    return pageMeta({
      title: expert.name,
      description: `${expert.name} — ${expert.expertise || "expert guidance"} on Tathaastu.`,
      path: `/talk-to-astrologers/${slug}`,
    });
  } catch {
    return fallback;
  }
}

export default function Page() {
  return <View />;
}
