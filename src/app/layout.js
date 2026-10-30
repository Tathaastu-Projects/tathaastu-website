import { Inter, Playfair_Display, Playfair_Display_SC } from "next/font/google";
import Providers from "@/components/providers/Providers";
import { DEFAULT_DESCRIPTION, SITE_URL, organizationJsonLd } from "@/lib/seo";
import "../index.css";
import "../styles/global.css";
import "../styles/motion.css";
// Lenis CSS loads with SmoothScroll (deferred). Page CSS loads in the views that need it.

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  // Display headings only need bold SC — skip unused 400/900 downloads.
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tathaastu | Astrology, Healing and Expert Guidance",
    template: "%s · Tathaastu",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: "Tathaastu",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
