import { articles } from '@/lib/blog';

export default function sitemap() {
  const base = 'https://www.unfollowx.com';
  const pages = ['', '/features', '/setup', '/faq', '/privacy', '/blog'];
  return [
    ...pages.map((path, index) => ({
      url: base + (path || '/'),
      lastModified: new Date('2026-11-04'),
      changeFrequency: index === 0 || index === pages.length - 1 ? 'weekly' : 'monthly',
      priority: index === 0 ? 1 : path === '/privacy' ? 0.5 : 0.8
    })),
    ...articles.map((article) => ({
      url: base + '/blog/' + article.slug,
      lastModified: new Date(article.updatedAt + 'T00:00:00.000Z'),
      changeFrequency: 'yearly',
      priority: 0.7
    }))
  ];
}
