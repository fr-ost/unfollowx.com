import Link from 'next/link';
import './styles/pages.css';
import Icon from '@/components/Icon';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true }
};

export default function NotFound() {
  return (
    <section className="container not-found">
      <div>
        <div className="code" aria-hidden="true">404</div>
        <h1>This page unfollowed us.</h1>
        <p>The page you’re looking for doesn’t exist or has moved. Here are some good places to continue.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/" data-cta="Home" data-cta-location="404"><Icon name="arrowRight" />Back to home</Link>
          <Link className="btn btn-secondary" href="/guides" data-cta="Guides" data-cta-location="404">Browse how-to guides</Link>
        </div>
        <div className="links">
          <Link href="/features">Features</Link>
          <Link href="/setup">Setup guide</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
    </section>
  );
}
