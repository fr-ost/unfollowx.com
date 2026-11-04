import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/blog';

export const dynamicParams = true;
export async function generateMetadata({params}) {
  const {slug}=await params; const article=articles.find(item=>item.slug===slug);
  if(!article) return {title:'Field note not found'};
  return {title:article.title,description:article.description,alternates:{canonical:`/blog/${article.slug}`},openGraph:{type:'article',title:article.title,description:article.description,url:`https://www.unfollowx.com/blog/${article.slug}`}};
}
export default async function ArticlePage({params}) {
  const {slug}=await params; const article=articles.find(item=>item.slug===slug); if(!article) notFound();
  const schema={'@context':'https://schema.org','@type':'BlogPosting',headline:article.title,description:article.description,datePublished:'2026-11-04',dateModified:'2026-11-04',author:{'@type':'Organization',name:'UnfollowX Pro'},publisher:{'@type':'Organization',name:'UnfollowX Pro'},mainEntityOfPage:`https://www.unfollowx.com/blog/${article.slug}`};
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><article className="article-wrap"><Link className="back" href="/blog">← All field notes</Link><p className="article-meta">{article.category} · {article.readingTime} · NOVEMBER 4, 2026</p><h1>{article.title}</h1><p className="dek">{article.description}</p><div className="prose">{article.sections.map(([heading,body])=><section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<div className="callout">UnfollowX Pro is a Chrome extension. <a href="https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl" target="_blank" rel="noopener">View it on the Chrome Web Store ↗</a> You can also read the <Link href="/features">feature guide</Link> and <Link href="/privacy">privacy policy</Link>.</div></div></article></>;
}
