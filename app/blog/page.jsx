import Link from 'next/link';
import { articles } from '@/lib/blog';

export const metadata = {
  title: 'X and Twitter guides for a thoughtful following list',
  description: 'Practical guides to finding X non-followers, tracking follower changes, exporting lists, using Keep rules and reviewing your following.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    title: 'X and Twitter guides for a thoughtful following list',
    description: 'Practical, product-accurate guides to reviewing your X following and understanding follower changes.',
    url: 'https://www.unfollowx.com/blog'
  }
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnfollowX Pro Field Notes',
    description: 'Practical guides for reviewing your X following list and understanding follower changes.',
    url: 'https://www.unfollowx.com/blog',
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: 'https://www.unfollowx.com/blog/' + article.slug,
        name: article.title
      }))
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.unfollowx.com/' },
      { '@type': 'ListItem', position: 2, name: 'Field notes', item: 'https://www.unfollowx.com/blog' }
    ]
  }
];

export default function BlogIndex() {
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
    <div className="blog-index">
      <section className="page-hero">
        <div className="eyebrow">THE UNFOLLOWX FIELD NOTES</div>
        <h1>Useful ideas for your <em>following list.</em></h1>
        <p>Clear, practical guides to reviewing your X and Twitter connections, keeping the accounts that matter and understanding changes over time.</p>
        <Link className="text-link blog-setup-link" href="/setup">New to UnfollowX Pro? Start with the setup guide <span>→</span></Link>
      </section>
      <nav className="breadcrumbs wrap blog-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Field notes</span>
      </nav>
      <div className="blog-cards">
        {articles.map((article) => <Link className="blog-card" href={'/blog/' + article.slug} key={article.slug}>
          <div className="blog-art"><span>{article.icon}</span><i/><b/></div>
          <small>{article.category} <i>·</i> {article.readingTime}</small>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <span className="read-link">Read the guide <b>↗</b></span>
        </Link>)}
      </div>
      <section className="blog-index-end">
        <h2>Want to get started?</h2>
        <p>Follow the setup steps, then explore the features and privacy details before you decide what to do with your list.</p>
        <div><Link className="button button-primary" href="/setup">Read the setup guide <span>→</span></Link><Link className="button button-outline" href="/features">Explore features <span>→</span></Link></div>
      </section>
    </div>
  </>;
}
