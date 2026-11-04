# UnfollowX Pro website

A Next.js App Router site powered by Node.js. Pages are server-rendered on request; interactive controls such as the theme switch, FAQ filters and product preview are React client components.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. To run the production server locally:

```bash
npm run build
npm run start
```

## Deploy to Vercel

Import this repository in Vercel. It detects Next.js from `package.json`; use the repository root as the project root and keep the default Next.js build settings. Add `www.unfollowx.com` under the Vercel project’s Domains settings and point the domain’s DNS records to Vercel.

The site includes server-generated page metadata, per-article metadata at `/blog/[slug]`, structured data, and the `/robots.txt` and `/sitemap.xml` routes.
