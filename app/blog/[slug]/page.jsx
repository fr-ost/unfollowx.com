import Link from 'next/link';
import { notFound } from 'next/navigation';
import '../../styles/pages.css';
import ArticleCard from '@/components/ArticleCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import { TrackEvent } from '@/components/Analytics';
import { articleSlugs, getArticle, getRelated } from '@/lib/blog';
import { renderBlocks } from '@/lib/markdown';
import { AUTHOR_ID, ORGANIZATION_ID, pageMetadata } from '@/lib/seo';
import { DEVELOPER, absoluteUrl } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

const longDate = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: 'article',
    extra: {
      authors: [{ name: DEVELOPER.name, url: DEVELOPER.url }],
      openGraph: {
        publishedTime: `${article.publishedAt}T00:00:00.000Z`,
        modifiedTime: `${article.updatedAt}T00:00:00.000Z`,
        authors: [DEVELOPER.url],
        section: article.categoryName
      }
    }
  });
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelated(article);
  const url = absoluteUrl(`/blog/${article.slug}`);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    image: `${url}/opengraph-image`,
    datePublished: `${article.publishedAt}T00:00:00.000Z`,
    dateModified: `${article.updatedAt}T00:00:00.000Z`,
    articleSection: article.categoryName,
    wordCount: article.words,
    inLanguage: 'en',
    author: { '@type': 'Person', '@id': AUTHOR_ID, name: DEVELOPER.name, url: DEVELOPER.url },
    publisher: { '@id': ORGANIZATION_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@type': 'Blog', name: 'UnfollowX Pro Blog', url: absoluteUrl('/blog') }
  };

  return (
    <>
      <JsonLd data={schema} />
      <TrackEvent name="blog_article_view" params={{ article_title: article.title, article_category: article.categoryName, article_slug: article.slug }} />
      <article className="article">
        <header className="article-hero">
          <div className="container-narrow">
            <Breadcrumbs items={[{ name: 'Blog', path: '/blog' }, { name: article.title, path: `/blog/${article.slug}` }]} />
            <div className="article-meta article-meta-top">
              <Link className="cat" href={`/blog#${article.category}`}>{article.categoryName}</Link><i />
              <span>{article.readingTime} min read</span><i />
              <span>Updated <time dateTime={article.updatedAt}>{longDate(article.updatedAt)}</time></span>
            </div>
            <h1>{article.title}</h1>
            <p className="dek">{article.description}</p>
            <div className="byline">
              <img src="/assets/logo.svg" alt="" width="40" height="40" />
              <div>
                <span>By <a href={DEVELOPER.url} target="_blank" rel="noopener author">{DEVELOPER.name}</a>, developer of UnfollowX Pro</span>
                <small>Published <time dateTime={article.publishedAt}>{longDate(article.publishedAt)}</time>{article.updatedAt !== article.publishedAt ? <> · Updated <time dateTime={article.updatedAt}>{longDate(article.updatedAt)}</time></> : null}</small>
              </div>
            </div>
          </div>
        </header>

        <div className="container article-layout">
          <aside className="article-aside" aria-label="On this page">
            <div className="toc">
              <b>On this page</b>
              <ol>
                {article.headings.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}
              </ol>
            </div>
            <div className="aside-cta">
              <b>UnfollowX Pro</b>
              <span>Free forever. No subscription, no premium plan.</span>
              <InstallLink location="blog_sidebar" size="sm">Add to Chrome — Free</InstallLink>
            </div>
          </aside>

          <div className="prose article-body">
            {renderBlocks(article.blocks, { ctaLocation: 'blog_inline' })}
            <div className="article-end">
              <p className="disclaimer"><Icon name="info" /> UnfollowX Pro is an independent product and is not affiliated with or endorsed by X Corp. X’s features, rules and limits can change; check <a href="https://help.x.com" target="_blank" rel="noopener">X’s help center</a> for the latest.</p>
              <div className="next-steps">
                <Link href="/setup" data-cta="Setup guide" data-cta-location="blog_end"><Icon name="book" /><span><b>Setup guide</b><small>Install and run your first scan</small></span></Link>
                <Link href="/features" data-cta="Features" data-cta-location="blog_end"><Icon name="sparkle" /><span><b>All features</b><small>Everything included, free</small></span></Link>
                <Link href="/faq" data-cta="FAQ" data-cta-location="blog_end"><Icon name="info" /><span><b>FAQ</b><small>Pricing, limits and privacy</small></span></Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      <section className="container related" aria-labelledby="related-title">
        <div className="section-head-row">
          <div className="section-head"><div className="eyebrow">Keep reading</div><h2 id="related-title">Related articles</h2></div>
          <Link className="btn btn-secondary btn-sm" href="/blog">All articles <Icon name="arrowRight" className="btn-arrow" /></Link>
        </div>
        <div className="article-grid">
          {related.map((r) => <ArticleCard key={r.slug} article={r} location="blog_related" />)}
        </div>
      </section>

      <section className="container section-tight">
        <div className="article-cta" data-reveal="scale">
          <div>
            <div className="eyebrow">Free forever</div>
            <h2>Do this in minutes with UnfollowX Pro.</h2>
            <p>Find non-followers, track unfollowers and clean up your following list at your own pace. No subscription, no premium unlocks.</p>
          </div>
          <InstallLink location="blog_footer_cta" size="lg" />
        </div>
      </section>
    </>
  );
}
