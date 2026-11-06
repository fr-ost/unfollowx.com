import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { faqCategories, faqs, plainAnswer } from '@/lib/faq';
import { pageMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, TELEGRAM_URL } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'FAQ — Free Forever, X Limits, Privacy & Features',
  description: 'Is UnfollowX Pro really free forever? Does it need your X password? Can X rate-limit actions? Where is your data stored? Honest answers to common questions.',
  path: '/faq'
});

export default function FaqPage() {
  // Every question here is visible on the page (all <details> are in the HTML).
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: plainAnswer(item.a) } }))
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'FAQ', path: '/faq' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Frequently asked questions</div>
          <h1>Questions, <span className="gradient-text">answered honestly.</span></h1>
          <p className="lead">What “free forever” and “unlimited” mean, what X controls, how your data is handled, and how the features work.</p>
        </div>
      </section>

      <section className="container">
        <div className="faq-page">
          <FaqAccordion items={faqs} categories={faqCategories} idPrefix="faq" />
          <aside className="faq-side" aria-label="Help">
            <div className="card">
              <h2>Still have a question?</h2>
              <p>For support or bug reports, include your extension version, Chrome version and what you were doing.</p>
              <div className="contact-links">
                <a className="btn btn-secondary btn-sm" href={TELEGRAM_URL} target="_blank" rel="noopener"><Icon name="send" />Telegram support</a>
                <a className="btn btn-secondary btn-sm" href={`mailto:${CONTACT_EMAIL}`}><Icon name="mail" />Email support</a>
              </div>
            </div>
            <div className="card">
              <h2>New here?</h2>
              <p>The setup guide walks through installation and your first scan in about five minutes.</p>
              <Link className="text-link" href="/setup" data-cta="Setup guide" data-cta-location="faq_aside" style={{ marginTop: 12 }}>Read the setup guide <Icon name="arrowRight" className="arrow" size={15} /></Link>
            </div>
          </aside>
        </div>
      </section>

      <CtaBand location="faq_cta" />
    </>
  );
}
