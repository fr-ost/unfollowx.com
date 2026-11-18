import { getArticles } from '@/lib/blog';
import { SITE_NAME, SITE_URL } from '@/lib/site';

// RSS 2.0 feed of the blog, generated at build time.
export const dynamic = 'force-static';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const articles = getArticles();
  const items = articles.map((a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE_URL}/blog/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${a.slug}</guid>
      <description>${esc(a.description)}</description>
      <category>${esc(a.categoryName)}</category>
      <pubDate>${new Date(`${a.publishedAt}T00:00:00.000Z`).toUTCString()}</pubDate>
    </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Guides to managing your X (Twitter) following list, followers and unfollows.</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${articles[0].updatedAt}T00:00:00.000Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
