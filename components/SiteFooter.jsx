import Link from 'next/link';
export default function SiteFooter() {
  return <footer className="footer"><div className="wrap footer-main"><Link className="brand" href="/"><img src="/assets/logo.svg" alt=""/><span>UnfollowX <small>PRO</small></span></Link><p>A little clarity for your X following list.</p><div className="footer-links"><Link href="/features">Features</Link><Link href="/setup">Setup guide</Link><Link href="/faq">FAQ</Link><Link href="/blog">Field notes</Link><Link href="/privacy">Privacy</Link><a href="mailto:shahriar.bmb@gmail.com">Contact</a></div></div><div className="wrap footer-bottom"><span>© 2026 UnfollowX Pro · A product of Unique Labs</span><span>Independent product · Not affiliated with X Corp. or Twitter</span></div></footer>;
}
