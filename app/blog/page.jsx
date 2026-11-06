import Link from 'next/link';
import '../styles/pages.css';
import ArticleCard, { CoverArt } from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { categories, getArticles } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Blog — X Following, Followers & Unfollow Guides',
  description: 'Practical, product-accurate guides to X: find non-followers, see who unfollowed you, mass unfollow safely, find inactive accounts and export your following list.',
  path: '/blog'
});

export default function BlogIndex() {
  const articles = getArticles();
  const [featured] = articles;
  const grouped = categories.map((cat) => ({ ...cat, items: articles.filter((a) => a.category === cat.id) })).filter((c) => c.items.length);

  const collection = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnfollowX Pro Blog',
    url: absoluteUrl('/blog'),
    description: 'Guides to managing your X (Twitter) following list, followers and unfollows.',
    inLanguage: 'en',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: absoluteUrl(`/blog/${a.slug}`), name: a.title }))
    }
  };

  return (
    <>
      <JsonLd data={collection} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>The UnfollowX Pro blog</div>
          <h1>Smarter ways to manage <span className="gradient-text">your X network.</span></h1>
          <p className="lead">Clear, honest guides to following, followers and unfollowing on X — useful whether or not you ever install our extension.</p>
          <nav className="chip-row blog-cats" aria-label="Blog categories">
            {grouped.map((cat) => <a key={cat.id} className="chip" href={`#${cat.id}`}>{cat.name}<span className="count">{cat.items.length}</span></a>)}
          </nav>
        </div>
      </section>

      <section className="container">
        <Link className="card card-hover featured-post" href={`/blog/${featured.slug}`} data-spotlight="" data-cta="read_article" data-cta-location="blog_featured">
          <CoverArt article={featured} className="featured-cover" />
          <div className="featured-body">
            <div className="article-meta"><span className="cat">{featured.categoryName}</span><i /><span>{featured.readingTime} min read</span></div>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <span className="read">Read article <Icon name="arrowUpRight" /></span>
          </div>
        </Link>
      </section>

      {grouped.map((cat) => (
        <section className="container blog-group" id={cat.id} key={cat.id} aria-labelledby={`${cat.id}-title`}>
          <div className="blog-group-head" data-reveal="">
            <h2 id={`${cat.id}-title`}>{cat.name}</h2>
            <p>{cat.description}</p>
          </div>
          <div className="article-grid" data-stagger="60">
            {cat.items.map((a) => <ArticleCard key={a.slug} article={a} location="blog_index" />)}
          </div>
        </section>
      ))}

      <p className="container blog-count">{articles.length} articles · Last updated {new Date(articles[0].updatedAt + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</p>

      <CtaBand location="blog_index_cta" title="Put the guides into practice." text="UnfollowX Pro does the scanning, comparing and pacing for you — free forever, with no premium plan." />
    </>
  );
}
