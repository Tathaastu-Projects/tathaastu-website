import SiteNavbar from "@/layout/SiteNavbar";
import Footer from "@/layout/Footer";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy",
  description:
    "How Tathaastu uses cookies, analytics, and personal details such as birth information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FFF6] text-[#073349]">
      <SiteNavbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#D44459]">Privacy</p>
        <h1 className="mt-3 font-playfair text-4xl text-[#064233]">How we handle your data</h1>
        <div className="mt-8 space-y-4 text-base leading-7 text-[#073349]/90">
          <p>
            Tathaastu collects the details you type into enquiry, booking, and birth-chart forms:
            name, phone, email, and birth information when a reading needs it. That information is
            used to respond to you and to prepare the guidance you asked for.
          </p>
          <p>
            Analytics and advertising tags (Google Analytics and the Meta Pixel) stay off until you
            accept cookies. If you decline, those tags are not loaded. You can clear the choice by
            removing this site&apos;s saved cookie preference in your browser.
          </p>
          <p>
            Birth details and contact data are personal data. India&apos;s Digital Personal Data
            Protection Act applies. We do not sell those details. Session login is stored in this
            browser so you can stay signed in.
          </p>
          <p>
            Questions about a record you sent us can go through the contact page. Dashboards,
            checkout, and personal reports are not meant for search indexing.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
