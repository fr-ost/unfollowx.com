import { articles } from '@/lib/blog';
export default function sitemap() {
  const base = 'https://www.unfollowx.com';
  const pages = ['', '/features', '/faq', '/privacy', '/blog'];
  return [
    ...pages.map((path, i) => ({ url: `${base}${path || '/'}`, lastModified: new Date('2026-11-04'), changeFrequency: i === 0 || i === 4 ? 'weekly' : 'monthly', priority: i === 0 ? 1 : i === 3 ? .5 : .8 })),
    ...articles.map(article => ({ url: `${base}/blog/${article.slug}`, lastModified: new Date('2026-11-04'), changeFrequency: 'yearly', priority: .7 }))
  ];
}
