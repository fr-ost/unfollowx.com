import { getArticle, articleSlugs } from '@/lib/blog';
import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro blog article';
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return renderOg({
    eyebrow: `${article.categoryName} · ${article.readingTime} min read`,
    title: article.title,
    subtitle: null
  });
}
