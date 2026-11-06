import Link from 'next/link';
import Icon from '@/components/Icon';

export function CoverArt({ article, className = '' }) {
  return (
    <div className={`cover-art cover-${article.cover} ${className}`.trim()} aria-hidden="true">
      <span className="cover-chip a">{article.coverChips?.[0]}</span>
      <span className="cover-icon"><Icon name={article.icon} /></span>
      <span className="cover-chip b">{article.coverChips?.[1]}</span>
    </div>
  );
}

export default function ArticleCard({ article, headingLevel = 3, location = 'article_card' }) {
  const Heading = `h${headingLevel}`;
  return (
    <Link className="card card-hover article-card" href={`/blog/${article.slug}`} data-spotlight="" data-cta="read_article" data-cta-location={location}>
      <CoverArt article={article} className="cover" />
      <div className="body">
        <div className="article-meta"><span className="cat">{article.categoryName}</span><i /> <span>{article.readingTime} min read</span></div>
        <Heading>{article.title}</Heading>
        <p>{article.description}</p>
        <span className="read">Read article <Icon name="arrowUpRight" /></span>
      </div>
    </Link>
  );
}
