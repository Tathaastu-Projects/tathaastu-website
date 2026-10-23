import { Inter, Playfair_Display_SC } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { DEFAULT_DESCRIPTION, SITE_URL, organizationJsonLd } from "@/lib/seo";
import "../index.css";
import "../styles/global.css";
import "../styles/motion.css";
import "../components/Home/astro-home.css";
import "../components/Home/astro-faq.css";
import "../components/Home/astro-blog.css";
import "../components/Home/astro-horoscope.css";
import "../components/Home/astro-experts.css";
import "../components/Home/astro-guidance.css";
import "../components/Home/astro-deck.css";
import "../components/Home/solar-hero/tathaastu-solar-hero.css";
import "../components/Home/solar-hero/tathaastu-solar-home7.css";
import "../home7-solar-screen/home7-overrides.css";
import "../home7-solar-screen/solar-system.css";
import "../components/Store/store.css";
import "../views/talk-astrologers.css";
import "../views/calculator.css";
import "../views/about.css";
import "lenis/dist/lenis.css";
import "swiper/css";
import "swiper/css/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tathaastu | Astrology, Healing and Expert Guidance",
    template: "%s · Tathaastu",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Tathaastu",
  verification: {
    other: {
      "facebook-domain-verification": "ni4n4orjoerruv6a6ild441dmqx2xk",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Tathaastu",
    images: [{ url: "/tathaastu-logo.png", alt: "Tathaastu" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
