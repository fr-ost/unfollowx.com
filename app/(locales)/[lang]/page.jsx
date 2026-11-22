import Link from 'next/link';
import { notFound } from 'next/navigation';
import '@/app/styles/locale.css';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import { LANGUAGE_ALTERNATES, LOCALES, LOCALE_SLUGS, getLocale, headingCase } from '@/lib/i18n';
import { SOFTWARE_ID, WEBSITE_ID, buildMetadata } from '@/lib/seo';
import { CONTACT_EMAIL, SITE_NAME, TELEGRAM_HANDLE, TELEGRAM_URL, absoluteUrl } from '@/lib/site';

// Localized landing pages built from the developer's official Chrome Web
// Store translations. One page per language, linked with hreflang.
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_SLUGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const l = getLocale(lang);
  if (!l) return {};
  // The localized pages reuse the main social card (its fonts are Latin-only).
  return buildMetadata({
    title: l.title,
    absoluteTitle: true,
    description: l.summary,
    path: `/${l.slug}`,
    locale: l.ogLocale,
    languages: LANGUAGE_ALTERNATES,
    image: '/opengraph-image'
  });
}


export default async function LocalePage({ params }) {
  const { lang } = await params;
  const l = getLocale(lang);
  if (!l) notFound();
  const s = l.sections;
  const h = (key) => headingCase(s[key].heading, l.hreflang);
  const faqItems = s.faq.faq.map((item, index) => ({ id: `${l.slug}-${index}`, category: 'all', q: item.q, a: [item.a] }));
  const loc = (where) => `i18n_${l.slug}_${where}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(`/${l.slug}`)}#webpage`,
    url: absoluteUrl(`/${l.slug}`),
    name: l.title,
    description: l.summary,
    inLanguage: l.hreflang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': SOFTWARE_ID }
  };

  return (
    <div className="locale-page" lang={l.hreflang} dir={l.dir}>
      <JsonLd data={schema} />

      <section className="page-hero locale-hero">
        <div className="container">
          <nav className="locale-switch" aria-label={l.ui.languages}>
            <Link href="/" hrefLang="en" lang="en" data-nav="language" data-nav-item="English">English</Link>
            {LOCALES.map((x) => (
              <Link key={x.slug} href={`/${x.slug}`} hrefLang={x.hreflang} lang={x.hreflang} aria-current={x.slug === l.slug ? 'page' : undefined} data-nav="language" data-nav-item={x.name}>{x.name}</Link>
            ))}
          </nav>
          <span className="badge locale-badge"><span className="badge-dot"><Icon name="check" strokeWidth={3} /></span>{l.ui.trust[0]}</span>
          <h1>{l.title}</h1>
          <p className="lead">{l.intro[0]}</p>
          {l.intro[1] ? <p className="locale-note"><Icon name="refresh" />{l.intro[1]}</p> : null}
          <div className="cta-row">
            <InstallLink location={loc('hero')} size="lg">{l.ui.cta}</InstallLink>
          </div>
          <ul className="locale-trust" role="list">
            {l.ui.trust.map((t) => <li key={t}><Icon name="check" strokeWidth={2.4} />{t}</li>)}
          </ul>
        </div>
      </section>

      <section className="container locale-section" aria-labelledby={`${l.slug}-features`}>
        <h2 id={`${l.slug}-features`}>{h('features')}</h2>
        <ul className="locale-checks" role="list">
          {s.features.items.map((item) => <li key={item}><span className="icon-tile green"><Icon name="check" strokeWidth={2.4} /></span><span>{item}</span></li>)}
        </ul>
      </section>

      <section className="container locale-section locale-how" aria-labelledby={`${l.slug}-how`}>
        <div className="locale-how-text">
          <h2 id={`${l.slug}-how`}>{h('how')}</h2>
          <ol className="locale-steps" role="list">
            {s.how.steps.map((step, index) => <li key={index}><span className="step-n">{index + 1}</span><span>{step}</span></li>)}
          </ol>
          {s.how.paragraphs.map((p) => <p key={p} className="locale-p">{p}</p>)}
        </div>
        <Screenshot shot="popup" caption={l.ui.caption} sizes="(max-width: 900px) 340px, 380px" className="shot-narrow" />
      </section>

      <section className="container locale-section" aria-label={l.ui.shots}>
        <div className="locale-cards">
          {['unfollowers', 'choose', 'keep', 'safe'].map((key) => (
            <article className="card locale-card" key={key}>
              <h2>{h(key)}</h2>
              {s[key].paragraphs.map((p) => <p key={p}>{p}</p>)}
            </article>
          ))}
        </div>
      </section>

      <section className="container locale-section" aria-labelledby={`${l.slug}-shots`}>
        <h2 id={`${l.slug}-shots`}>{l.ui.shots}</h2>
        <Screenshot shot="following" caption={l.ui.caption} sizes="(max-width: 1240px) 100vw, 1150px" />
      </section>

      <section className="container locale-section locale-split" aria-label={h('also')}>
        <div className="card locale-card">
          <h2>{h('also')}</h2>
          <ul className="locale-bullets" role="list">{s.also.items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="card locale-card">
          <h2>{h('data')}</h2>
          {s.data.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p>{l.ui.featureNote}</p>
          <p><Link href="/privacy" hrefLang="en" className="text-link">{l.ui.privacy} <Icon name="arrowRight" className="arrow" size={15} /></Link></p>
        </div>
      </section>

      <section className="container locale-section" aria-labelledby={`${l.slug}-faq`}>
        <h2 id={`${l.slug}-faq`}>{h('faq')}</h2>
        <FaqAccordion items={faqItems} idPrefix={`${l.slug}-faq`} />
      </section>

      <section className="container locale-section" aria-labelledby={`${l.slug}-support`}>
        <div className="card locale-card locale-support">
          <h2 id={`${l.slug}-support`}>{h('support')}</h2>
          {s.support.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <div className="cta-row">
            <a className="btn btn-secondary btn-sm" href={TELEGRAM_URL} target="_blank" rel="noopener" dir="ltr"><Icon name="send" />Telegram {TELEGRAM_HANDLE}</a>
            <a className="btn btn-secondary btn-sm" href={`mailto:${CONTACT_EMAIL}`} dir="ltr"><Icon name="mail" />{CONTACT_EMAIL}</a>
          </div>
        </div>
      </section>

      <section className="container section-tight">
        <div className="cta-band">
          <h2>{l.ui.bandTitle}</h2>
          <p>{l.ui.bandText}</p>
          <div className="cta-row"><InstallLink location={loc('final')} size="lg">{l.ui.cta}</InstallLink></div>
          <small><Link href="/" hrefLang="en" lang="en">{l.ui.english}</Link></small>
        </div>
      </section>
    </div>
  );
}
