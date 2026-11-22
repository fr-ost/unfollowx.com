import RootDocument, { rootViewport } from '@/app/_root/RootDocument';
import NotFound from '@/app/(en)/not-found';

// 404 for URLs that match no route. With two root layouts ((en) and
// (locales)/[lang]) there is no single layout to compose it from, so Next.js
// renders this file directly (experimental.globalNotFound in next.config.mjs).
// It reuses the normal site shell and the English 404 content.
export const metadata = {
  title: 'Page not found | UnfollowX Pro',
  robots: { index: false, follow: true }
};
export const viewport = rootViewport;

export default function GlobalNotFound() {
  return (
    <RootDocument lang="en">
      <NotFound />
    </RootDocument>
  );
}
