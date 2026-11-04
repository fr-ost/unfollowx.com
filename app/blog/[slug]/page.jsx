import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getRelatedArticles } from '@/lib/blog';

export const dynamicParams = true;

function dateLabel(date) {
  return new Date(date + 'T12:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  });
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) return { title: 'Field note not found', robots: { index: false, follow: true } };

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: '/blog/' + article.slug },
    openGraph: {
      type: 'article',
      siteName: 'UnfollowX Pro',
      title: article.title,
      description: article.description,
      url: 'https://www.unfollowx.com/blog/' + article.slug,
      publishedTime: article.publishedAt + 'T00:00:00.000Z',
      modifiedTime: article.updatedAt + 'T00:00:00.000Z',
      authors: ['https://www.unfollowx.com/'],
      images: [{ url: '/assets/social-card.svg', width: 1200, height: 630, alt: 'UnfollowX Pro field notes' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: ['/assets/social-card.svg']
    }
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();
  const relatedArticles = getRelatedArticles(article);
  const canonical = 'https://www.unfollowx.com/blog/' + article.slug;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': canonical + '#article',
      headline: article.title,
      description: article.description,
      datePublished: article.publishedAt + 'T00:00:00.000Z',
      dateModified: article.updatedAt + 'T00:00:00.000Z',
      articleSection: article.category,
      inLanguage: 'en',
      author: { '@id': 'https://www.unfollowx.com/#organization' },
      publisher: { '@id': 'https://www.unfollowx.com/#organization' },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.unfollowx.com/' },
        { '@type': 'ListItem', position: 2, name: 'Field notes', item: 'https://www.unfollowx.com/blog' },
        { '@type': 'ListItem', position: 3, name: article.title, item: canonical }
      ]
    }
  ];

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <article className="article-wrap">
      <nav className="breadcrumbs article-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/blog">Field notes</Link><span aria-hidden="true">/</span><span aria-current="page">{article.title}</span>
      </nav>
      <p className="article-meta">{article.category} · {article.readingTime} · <time dateTime={article.updatedAt}>UPDATED {dateLabel(article.updatedAt).toUpperCase()}</time></p>
      <h1>{article.title}</h1>
      <p className="dek">{article.description}</p>
      <div className="prose">
        {article.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}
        <div className="callout">Want to try the workflow? <Link href="/setup">Follow the UnfollowX Pro setup guide</Link>, explore the <Link href="/features">feature guide</Link>, or review the <Link href="/privacy">privacy policy</Link>.</div>
      </div>
    </article>
    <section className="related-guides wrap">
      <div className="notes-heading"><div><div className="eyebrow">KEEP EXPLORING</div><h2>Related field notes.</h2></div><Link className="text-link" href="/blog">All guides <span>→</span></Link></div>
      <div className="blog-cards">
        {relatedArticles.map((item) => <Link className="blog-card" href={'/blog/' + item.slug} key={item.slug}>
          <div className="blog-art"><span>{item.icon}</span><i/><b/></div>
          <small>{item.category} <i>·</i> {item.readingTime}</small>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="read-link">Read the guide <b>↗</b></span>
        </Link>)}
      </div>
    </section>
  </>;
}
