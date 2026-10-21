# Tathaastu frontend

Next.js App Router site for Tathaastu. This folder is its own project. It is listed in the parent repository `.gitignore` and should be pushed to a separate Git remote.

## Run

```bash
npm install
npm run dev
```

The dev server uses webpack on port 3000 so image and video imports stay URL strings, matching the current React app.

## Environment

Create `.env.local` if you need to override the defaults:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_API_BASE_URL=http://localhost:9001/api
```

`NEXT_PUBLIC_SITE_URL` is the canonical origin used for metadata, Open Graph, sitemap, and robots. Set it to the public domain before launch.

## What lives here

- The existing pages, navigation, store, courses, blog, and dashboards
- Per-page titles, descriptions, canonical URLs, and Open Graph tags
- `sitemap.xml`, `robots.txt`, and Organization JSON-LD
- Meta domain verification. Google Analytics and the Meta Pixel load only after cookie consent
- A lazy 3D sky (React Three Fiber) on the home page and the main marketing pages
- Smooth scrolling and below-the-fold motion. Birth-chart, booking, and dashboard screens stay lighter and are marked `noindex`
