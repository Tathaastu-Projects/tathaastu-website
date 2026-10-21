"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const CONSENT_KEY = "tathaastu_cookie_consent";
const GA_ID = "G-XZB7ZM6SFX";
const PIXEL_ID = "1716706576093606";

function track(pathname, search) {
  const pagePath = search ? `${pathname}?${search}` : pathname;
  window.gtag?.("event", "page_view", {
    page_path: pagePath,
    page_location: window.location.href,
    page_title: document.title,
  });
  window.fbq?.("track", "PageView");
}

export function RouteTracker() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const search = searchParams?.toString() || "";
  const lastKey = useRef("");

  useEffect(() => {
    const send = () => {
      if (!window.gtag && !window.fbq) return;
      const key = `${pathname}?${search}`;
      if (lastKey.current === key) return;
      lastKey.current = key;
      track(pathname, search);
    };

    send();
    window.addEventListener("tathaastu-analytics-ready", send);
    return () => window.removeEventListener("tathaastu-analytics-ready", send);
  }, [pathname, search]);

  return null;
}

export default function CookieConsent() {
  const [choice, setChoice] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      setChoice(localStorage.getItem(CONSENT_KEY));
    } catch {
      setChoice(null);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return undefined;
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      if ((window.gtag && window.fbq) || tries > 40) {
        window.clearInterval(id);
        window.dispatchEvent(new Event("tathaastu-analytics-ready"));
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [choice]);

  const save = (value) => {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
    setChoice(value);
  };

  const accepted = choice === "accepted";

  return (
    <>
      {accepted ? (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');`}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
          </Script>
        </>
      ) : null}

      {ready && !choice ? (
        <div className="cookie-banner" role="dialog" aria-label="Cookie consent">
          <p>
            Tathaastu uses cookies for analytics and ads measurement after you agree. Birth
            details and enquiries are personal data under India&apos;s DPDP Act.{" "}
            <a href="/privacy">Privacy</a>
          </p>
          <div className="cookie-banner__actions">
            <button type="button" className="cookie-banner__ghost" onClick={() => save("declined")}>
              Decline
            </button>
            <button type="button" className="cookie-banner__accept" onClick={() => save("accepted")}>
              Accept
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
