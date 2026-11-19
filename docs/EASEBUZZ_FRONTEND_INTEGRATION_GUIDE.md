# Easebuzz Payment Gateway — Frontend Integration Guide

**Audience:** Frontend engineers (React / Next.js / Vite) integrating Easebuzz Hosted Checkout.  
**Source of truth:** Patterns used in the Tathaastu frontend (`frontend/src/services/paymentApi.js`, `views/ConsultationBooking.jsx`, `app/payment/page.js`).  
**Companion doc:** `backend/docs/EASEBUZZ_BACKEND_INTEGRATION_GUIDE.md` (backend must be ready first).

This document is self-contained. Give it to another frontend team and they can wire Easebuzz without reading the Tathaastu repo.

---

## Table of contents

1. [What the frontend is responsible for](#1-what-the-frontend-is-responsible-for)
2. [Security rules (non-negotiable)](#2-security-rules-non-negotiable)
3. [Prerequisites](#3-prerequisites)
4. [Environment variables](#4-environment-variables)
5. [End-to-end UX flow](#5-end-to-end-ux-flow)
6. [API client (copy/adapt)](#6-api-client-copyadapt)
7. [Checkout page implementation](#7-checkout-page-implementation)
8. [Handling Easebuzz return (verify)](#8-handling-easebuzz-return-verify)
9. [Demo mode (no live keys)](#9-demo-mode-no-live-keys)
10. [Optional: EaseCheckout iframe mode](#10-optional-easecheckout-iframe-mode)
11. [UI / UX recommendations](#11-ui--ux-recommendations)
12. [Routing (Next.js App Router example)](#12-routing-nextjs-app-router-example)
13. [Testing checklist](#13-testing-checklist)
14. [Production checklist](#14-production-checklist)
15. [Common frontend bugs](#15-common-frontend-bugs)
16. [Minimal reference components](#16-minimal-reference-components)

---

## 1. What the frontend is responsible for

| Frontend does | Frontend does **not** |
|---------------|------------------------|
| Call your backend `POST /payment/initiate` | Call Easebuzz initiateLink with salt |
| Redirect browser to `paymentUrl` | Compute SHA512 payment hash |
| On return, POST callback fields to `/payment/verify` | Store `EASEBUZZ_SALT` in `NEXT_PUBLIC_*` |
| Show success / failure UI | Trust `?status=success` without verify |
| Support demo confirm when `isDemo: true` | Talk to Easebuzz dashboard APIs |

**Hosted Checkout (recommended):** after initiate, simply:

```js
window.location.href = payResult.paymentUrl;
```

Customer pays on Easebuzz-hosted page, then returns to your `surl` / `furl`.

---

## 2. Security rules (non-negotiable)

1. **Never** put `EASEBUZZ_KEY` or `EASEBUZZ_SALT` in frontend env (`NEXT_PUBLIC_*`, `VITE_*`, client bundles).
2. Only use **`paymentUrl`** / **`accessKey`** returned by **your** backend.
3. Always call **`POST /payment/verify`** (or `/payment/easebuzz/verify`) after return before unlocking paid features.
4. Send `Authorization: Bearer <jwt>` on initiate when your backend requires the order to belong to the logged-in user.
5. Prefer HTTPS in production for return URLs.

---

## 3. Prerequisites

### Backend must already expose

| Endpoint | Used by FE for |
|----------|----------------|
| `GET /api/payment/config` | Detect live vs demo, show gateway badge |
| `POST /api/payment/easebuzz/initiate` (or `/payment/initiate`) | Start payment |
| `POST /api/payment/easebuzz/verify` (or `/payment/verify`) | Confirm payment after return |
| (Optional) `POST /api/bookings/:id/confirm-demo-payment` | Local unlock when `isDemo` |
| Your create-order API | Create pending order **before** initiate |

### Local stack example (Tathaastu)

| Service | URL |
|---------|-----|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:3032/api` |
| Payment return page | `http://localhost:3000/payment?...` |

Your ports may differ — keep FE env and backend `FRONTEND_BASE_URL` aligned.

---

## 4. Environment variables

### Frontend `.env` (Next.js example)

```env
# Backend API root INCLUDING /api suffix (matches Tathaastu)
NEXT_PUBLIC_ADMIN_API_BASE_URL=http://localhost:3032/api

# Public site URL (optional, SEO / absolute links)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Vite example

```env
VITE_ADMIN_API_BASE_URL=http://localhost:3032/api
```

### Production

```env
NEXT_PUBLIC_ADMIN_API_BASE_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_SITE_URL=https://www.yourdomain.com
```

**Do not add** `EASEBUZZ_*` here.

Backend must have:

```env
FRONTEND_BASE_URL=https://www.yourdomain.com
EASEBUZZ_SUCCESS_URL / FAILURE optional
```

so surl/furl land on your FE payment return route.

---

## 5. End-to-end UX flow

```text
1. User selects product/plan + expert (optional)
2. User fills checkout form (name, phone, email, …)
3. Ensure user is logged in (if backend binds order to user)
4. FE: POST create booking/order  →  status = pending_payment
5. FE: POST /payment/easebuzz/initiate { bookingId, customer… }
6a. Live: redirect to data.paymentUrl
6b. Demo: POST confirm-demo-payment → show success screen
7. Easebuzz hosts payment UI
8. Browser returns to /payment?status=success|failure&txnid=…&bookingId=…
9. FE collects ALL query params → POST /payment/verify
10. FE loads order → show success / join / download / thank-you
```

Tathaastu maps this to page `/payment` (`ConsultationBooking` view).

---

## 6. API client (copy/adapt)

Create something like `src/services/paymentApi.js`:

```js
/**
 * Easebuzz Payment API — frontend client
 * Talks ONLY to your backend, never to Easebuzz with salt.
 */

import { getToken } from "./authApi"; // your auth helper

const API_BASE =
  process.env.NEXT_PUBLIC_ADMIN_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:3032/api"
    : "/api");

async function paymentRequest(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({}));

  if (!res.ok || json.success === false) {
    const error = new Error(json.message || `Payment request failed (${res.status})`);
    error.status = res.status;
    error.code = json.code;
    error.data = json.data;
    throw error;
  }

  // Tathaastu returns business payload under json.data
  return json.data;
}

/** GET /payment/config */
export async function fetchPaymentConfig() {
  try {
    return await paymentRequest("/payment/config");
  } catch {
    return {
      gateway: "easebuzz",
      isConfigured: false,
      isDemo: true,
      environment: "test",
    };
  }
}

/** POST /payment/easebuzz/initiate */
export async function initiateEasebuzzPayment(payload) {
  return paymentRequest("/payment/easebuzz/initiate", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** POST /payment/easebuzz/verify */
export async function verifyEasebuzzPayment(callbackPayload) {
  return paymentRequest("/payment/easebuzz/verify", {
    method: "POST",
    body: JSON.stringify(callbackPayload),
  });
}

/** Admin only — usually not called from public checkout UI */
export async function refundEasebuzzPayment(payload) {
  return paymentRequest("/payment/easebuzz/refund", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export const initiatePayment = initiateEasebuzzPayment;
export const verifyPayment = verifyEasebuzzPayment;
```

### Expected initiate payload (booking style)

```js
await initiateEasebuzzPayment({
  bookingId: booking.id,          // required in Tathaastu flow
  amount: 499,                    // optional if booking has amount
  customerName: form.name,
  customerPhone: form.phone,
  customerEmail: form.email,
});
```

### Expected initiate result (live)

```ts
type InitiateLive = {
  gateway: "easebuzz";
  isDemo: false;
  bookingId: string;
  txnid: string;
  amount: string;          // "499.00"
  accessKey: string;
  paymentUrl: string;      // redirect here
  actionUrl: string;       // same as paymentUrl
  env: "test" | "prod";
  iframe: boolean;
  key?: string;            // only needed for iframe SDK
  surl: string;
  furl: string;
};
```

---

## 7. Checkout page implementation

### 7.1 High-level submit handler (Tathaastu pattern)

```js
async function handleSubmitPayment(e) {
  e.preventDefault();

  // 1) Validate form
  if (!form.name.trim() || form.phone.length < 10) {
    alert("Name and valid phone are required");
    return;
  }

  // 2) Require login if backend needs it
  if (!token) {
    sessionStorage.setItem("checkout_draft", JSON.stringify(form));
    navigate(`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`);
    return;
  }

  setIsSubmitting(true);
  try {
    // 3) Create pending order/booking first
    const booking = await createBooking({
      planId,
      astrologerId,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
      // …domain fields
    });

    // 4) Initiate Easebuzz via YOUR backend
    const payResult = await initiateEasebuzzPayment({
      bookingId: booking.id,
      amount: finalPrice,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email,
    });

    // 5a) Live Hosted Checkout
    if (payResult && !payResult.isDemo && payResult.paymentUrl) {
      window.location.href = payResult.paymentUrl;
      return; // leave page; no finally spinner needed after unload
    }

    // 5b) Demo path
    if (payResult?.isDemo) {
      await confirmDemoPayment(booking.id); // your backend demo endpoint
      setSuccessOrder({ bookingId: booking.id, /* … */ });
      return;
    }

    throw new Error("Payment gateway did not return a payment URL");
  } catch (err) {
    console.error(err);
    alert(err.message || "Unable to initiate payment");
  } finally {
    setIsSubmitting(false);
  }
}
```

### 7.2 Why create booking/order before initiate?

Backend stores `txnid` on the booking and puts `bookingId` in `udf5`.  
On return, verify can find the booking even if the user lost client state.

### 7.3 Loading / double-submit

- Disable the Pay button while `isSubmitting`.
- Do not call initiate twice for the same click.
- If initiate returns `409` “already paid”, show success instead of retrying pay.

---

## 8. Handling Easebuzz return (verify)

Backend typically sets:

```text
surl = {FRONTEND}/payment?status=success&txnid=TXN&bookingId=ID
furl = {FRONTEND}/payment?status=failure&txnid=TXN&bookingId=ID
```

On the payment page mount (client component), detect return params and verify:

```js
useEffect(() => {
  const searchParams = new URLSearchParams(window.location.search);
  const urlStatus = searchParams.get("status");
  const urlBookingId = searchParams.get("bookingId") || searchParams.get("udf5");
  const urlTxnId = searchParams.get("txnid");

  if (!urlStatus || !(urlBookingId || urlTxnId)) return;

  const callbackPayload = {};
  searchParams.forEach((v, k) => {
    callbackPayload[k] = v;
  });
  if (urlBookingId && !callbackPayload.bookingId) {
    callbackPayload.bookingId = urlBookingId;
  }

  (async () => {
    try {
      if (urlStatus.toLowerCase() === "success") {
        // CRITICAL: ask backend to verify reverse hash / retrieve status
        await verifyEasebuzzPayment(callbackPayload).catch((e) => {
          console.warn("Verify notice:", e.message);
        });

        const order = await fetchBookingById(urlBookingId);
        if (order) setSuccessOrder(mapOrderToUi(order));
      } else {
        alert(`Payment status: ${urlStatus}. Please try again.`);
      }
    } catch (err) {
      console.warn("Return processing failed", err);
    }
  })();
}, []);
```

### Important notes

1. Forward **all** query keys Easebuzz/your surl added — especially `hash`, `status`, `txnid`, `amount`, `email`, `firstname`, `productinfo`, `udf*`, `easepayid` if present.
2. If Easebuzz POSTs a form to surl and your SPA cannot read POST bodies, rely on:
   - query params already embedded in surl by backend, and/or
   - backend **webhook** which marks paid without the browser.
3. After verify, **re-fetch** the order from your API; do not invent a success state only from the URL.
4. Clean the URL (optional) with `history.replaceState` after success so refresh does not re-trigger alerts.

---

## 9. Demo mode (no live keys)

When backend has no keys:

```json
{ "isDemo": true, "txnid": "...", "bookingId": "..." }
```

Frontend should:

1. **Not** redirect to Easebuzz.
2. Call demo confirm (Tathaastu):

```http
POST /api/bookings/:id/confirm-demo-payment
Authorization: Bearer <token>
```

3. Show the same success UI as a real payment.

Optionally show a small badge: “Demo payment (gateway not configured)”.

`fetchPaymentConfig()` can drive UI:

```js
const config = await fetchPaymentConfig();
// config.isDemo / config.environment / config.gateway
```

---

## 10. Optional: EaseCheckout iframe mode

If backend sets `EASEBUZZ_IFRAME=1`, initiate still returns `accessKey` + `key` + `iframe: true`.

Then instead of full-page redirect, load Easebuzz’s EaseCheckout JS SDK (see Easebuzz docs) with the `accessKey`.

Tathaastu default is **`EASEBUZZ_IFRAME=0`** (Hosted Checkout redirect). Prefer that until redirect flow is stable.

---

## 11. UI / UX recommendations

1. **Trust strip:** “Secured by Easebuzz” + lock icon near Pay CTA.
2. **Stepper:** Package → Expert → Payment (Tathaastu uses this on `/payment`).
3. **Disable Pay** until name + phone valid.
4. **Spinner** on submit; keep button disabled.
5. **Success screen** after verify: order id, amount, expert/plan, next CTA (Join call / View receipt).
6. **Failure screen:** clear retry button back to checkout with form restored from `sessionStorage`.
7. Avoid heavy animations on the payment page — users are anxious; keep it fast.

---

## 12. Routing (Next.js App Router example)

```text
app/payment/page.js  →  client checkout + return handler view
```

Example page:

```js
import View from "@/views/ConsultationBooking"; // or your Checkout.jsx

export const metadata = {
  title: "Secure Checkout",
  robots: { index: false },
};

export default function Page() {
  return <View />;
}
```

Ensure this route matches what backend puts in `FRONTEND_BASE_URL` + surl path (`/payment`).

For React Router / Vite:

```js
<Route path="/payment" element={<CheckoutPage />} />
```

---

## 13. Testing checklist

### Local demo (no Easebuzz keys)

- [ ] Create order → initiate returns `isDemo: true`
- [ ] FE calls confirm-demo → success UI
- [ ] Paid feature unlocks (join / download)

### Test keys (`EASEBUZZ_ENV=test`)

- [ ] `GET /payment/config` → `isConfigured: true`, `environment: "test"`
- [ ] Initiate → `paymentUrl` hosts `testpay.easebuzz.in`
- [ ] Redirect works; complete a test payment
- [ ] Return lands on `/payment?status=success&txnid=…&bookingId=…`
- [ ] Verify API succeeds; order status becomes paid/ready
- [ ] Failure path with cancel → `status=failure` handled gracefully
- [ ] Refresh success page does not create a second charge

### Auth

- [ ] Logged-out user is redirected to login and returns to checkout
- [ ] Another user’s `bookingId` cannot be paid (403 from backend)

---

## 14. Production checklist

- [ ] `NEXT_PUBLIC_ADMIN_API_BASE_URL` points to production API
- [ ] Backend `FRONTEND_BASE_URL` is production HTTPS
- [ ] No Easebuzz secrets in FE bundle (search build output for salt)
- [ ] Success/failure pages are not indexed (`robots: noindex` ok)
- [ ] Analytics events: `payment_initiated`, `payment_success`, `payment_failed`
- [ ] Error toasts show backend `message` without leaking stack traces
- [ ] Mobile browsers: redirect back restores session (cookie / token storage)

---

## 15. Common frontend bugs

| Bug | Cause | Fix |
|-----|-------|-----|
| Blank page after pay | Return route wrong | Align path with backend surl (`/payment`) |
| Success UI but feature locked | Skipped verify | Always `verifyEasebuzzPayment` then refetch order |
| `paymentUrl` undefined | Treated demo as live or error swallowed | Check `isDemo` and error handling |
| Infinite verify loop | Effect deps include unstable object | Run once on mount / gate with ref |
| CORS error on initiate | FE origin not allowed | Fix backend CORS |
| Lost form after login redirect | No draft save | `sessionStorage` before navigate to login |
| Double payment | User clicks Pay twice | Disable button; handle 409 already paid |
| Works on desktop, fails mobile | Pop-up blockers / `window.open` | Use full-page `location.href`, not popup |

---

## 16. Minimal reference components

### 16.1 Pay button

```jsx
<button
  type="submit"
  disabled={isSubmitting}
  onClick={handleSubmitPayment}
>
  {isSubmitting ? "Redirecting to Easebuzz…" : `Pay ₹${finalPrice}`}
</button>
```

### 16.2 Gateway badge

```jsx
<span className="easebuzz-logo-badge">Secured by Easebuzz</span>
```

### 16.3 Success gate

Only show “Join session” / “Download” after:

1. `verifyEasebuzzPayment` resolved (or webhook already marked paid), and  
2. `fetchBookingById` / `fetchOrderById` returns paid/ready status.

---

## Quick start (copy this into your ticket)

1. Set `NEXT_PUBLIC_ADMIN_API_BASE_URL` to your API `/api` root.  
2. Add `paymentApi.js` with `initiateEasebuzzPayment` + `verifyEasebuzzPayment`.  
3. On Pay: create order → initiate → `window.location.href = paymentUrl`.  
4. On `/payment` return: read query → verify → refetch order → success UI.  
5. Handle `isDemo` with confirm-demo endpoint for local UI.  
6. Never ship salt/key to the browser.

---

## Related backend endpoints (cheat sheet)

```http
GET  /api/payment/config
POST /api/payment/easebuzz/initiate
POST /api/payment/easebuzz/verify
POST /api/payment/easebuzz/webhook     # server-only, not called by FE
POST /api/payment/easebuzz/refund      # admin UI only
POST /api/bookings                     # create pending order (project-specific)
POST /api/bookings/:id/confirm-demo-payment
GET  /api/bookings/:id
```

Full backend details: **`backend/docs/EASEBUZZ_BACKEND_INTEGRATION_GUIDE.md`**.

---

**End of frontend guide.** Hand both docs together to the other project team.
