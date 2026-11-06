import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import { TrackEvent } from '@/components/Analytics';
import { featureGroups, features } from '@/lib/features';
import { getArticle } from '@/lib/blog';
import { pageMetadata, softwareSchema } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Features — Non-Follower Finder & Unfollower Tracker',
  description: 'Every UnfollowX Pro feature, all free: find non-followers, track lost followers, filter inactive accounts, whitelist, Keep rules, CSV, history and paced runs.',
  path: '/features'
});

const groupShots = {
  find: <div className="feature-shot pair"><Screenshot shot="popup" caption="Popup after a scan" sizes="(max-width: 860px) 340px, 360px" /><Screenshot shot="followers" caption="Followers page: who unfollowed you and who’s new" sizes="(max-width: 860px) 100vw, 740px" /></div>,
  review: <div className="feature-shot"><Screenshot shot="following" caption="Following page: tabs, quick filters, selection, Save group, Keep, Export" sizes="(max-width: 1240px) 100vw, 1150px" /></div>,
  protect: <div className="feature-shot"><Screenshot shot="settingsKeep" caption="Settings → Keep rules" sizes="(max-width: 1240px) 100vw, 1150px" /></div>,
  control: <div className="feature-shot pair"><Screenshot shot="run" caption="A paced run: progress, next account, Pause and Stop" sizes="(max-width: 860px) 340px, 360px" /><Screenshot shot="settingsSpeed" caption="Settings → Speed presets, breaks and daily limit" sizes="(max-width: 860px) 100vw, 740px" /></div>,
  comfort: <div className="feature-shot"><Screenshot shot="inactive" caption="Dark mode: Following → Inactive with last-active filters" sizes="(max-width: 1240px) 100vw, 1150px" /></div>
};

export default function FeaturesPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UnfollowX Pro features',
    itemListElement: features.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f.title, url: absoluteUrl(`/features#${f.id}`) }))
  };

  return (
    <>
      <JsonLd data={[softwareSchema, itemList]} />
      <TrackEvent name="feature_page_view" params={{ feature_name: 'features_overview' }} withPath />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'Features', path: '/features' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Features · all free</div>
          <h1>Every feature. <span className="gradient-text">No premium tier.</span></h1>
          <p className="lead">UnfollowX Pro helps you see your X following list clearly, protect the accounts that matter and act at your own pace. Here is everything it does today — each feature linked to a guide that explains it in depth.</p>
          <div className="cta-row">
            <InstallLink location="features_hero" size="lg" />
            <Link className="btn btn-secondary btn-lg" href="/setup" data-cta="Setup guide" data-cta-location="features_hero">Setup guide <Icon name="arrowRight" className="btn-arrow" /></Link>
          </div>
          <p className="hero-note"><span><Icon name="check" />17 features</span><span><Icon name="check" />No subscription</span><span><Icon name="check" />No usage quotas from UnfollowX Pro</span></p>
        </div>
      </section>

      <nav className="feature-nav" aria-label="Feature groups">
        <div className="container">
          {featureGroups.map((g) => <a key={g.id} href={`#group-${g.id}`}>{g.title}</a>)}
        </div>
      </nav>

      <div className="container">
        {featureGroups.map((group) => {
          const items = features.filter((f) => f.group === group.id);
          return (
            <section className="feature-group" id={`group-${group.id}`} key={group.id} aria-labelledby={`group-${group.id}-title`}>
              <div className="feature-group-head" data-reveal="">
                <h2 id={`group-${group.id}-title`}>{group.title}</h2>
                <p>{group.text}</p>
              </div>
              <div className="feature-list" data-stagger="70">
                {items.map((f) => {
                  const guide = f.guide ? getArticle(f.guide) : null;
                  return (
                    <article className="card feature-item" id={f.id} key={f.id} data-spotlight="">
                      <span className={`icon-tile ${f.tone === 'blue' || f.tone === 'violet' ? '' : f.tone}`}><Icon name={f.icon} /></span>
                      <h3>{f.title}</h3>
                      <p className="short">{f.short}</p>
                      <p className="long">{f.body}</p>
                      {guide ? <Link className="text-link" href={`/blog/${guide.slug}`} data-cta="feature_guide" data-cta-location="features_page">Guide: {guide.title} <Icon name="arrowRight" className="arrow" size={15} /></Link> : null}
                    </article>
                  );
                })}
              </div>
              {groupShots[group.id] || null}
            </section>
          );
        })}

        <section className="feature-group" aria-labelledby="limits-title">
          <div className="callout warn" data-reveal="">
            <Icon name="alert" />
            <p id="limits-title"><strong>About X’s limits.</strong> UnfollowX Pro sets no usage quotas, but X applies its own limits and rules to every account — including a <a href="https://help.x.com/en/using-x/x-follow-limit" target="_blank" rel="noopener">technical limit of 400 follows per day</a> and rules against aggressive or automated follow behaviour. Pacing controls help you stay measured, but no tool can guarantee X will permit every action. UnfollowX Pro is independent and not affiliated with or endorsed by X Corp.</p>
          </div>
        </section>
      </div>

      <section className="container lp-section" aria-labelledby="tools-title">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Focused tools</div>
          <h2 id="tools-title">Looking for one specific job?</h2>
        </div>
        <div className="lp-cards" data-stagger="70">
          <Link className="card card-hover" href="/twitter-non-followers-checker" data-spotlight="" data-cta="Non-followers checker" data-cta-location="features_tools"><span className="icon-tile red"><Icon name="userMinus" /></span><h3>Twitter non-followers checker</h3><p>See every account you follow that doesn’t follow you back, then review and decide.</p></Link>
          <Link className="card card-hover" href="/x-follower-tracker" data-spotlight="" data-cta="Follower tracker" data-cta-location="features_tools"><span className="icon-tile"><Icon name="arrowsSwap" /></span><h3>X follower tracker</h3><p>Compare follower snapshots to see who unfollowed you and who’s new.</p></Link>
          <Link className="card card-hover" href="/guides" data-spotlight="" data-cta="How-to guides" data-cta-location="features_tools"><span className="icon-tile green"><Icon name="book" /></span><h3>How-to guides</h3><p>Step-by-step answers for every common following-list task.</p></Link>
        </div>
      </section>

      <CtaBand location="features_cta" title="All of this. Free. Forever." text="No trial, no premium unlocks, no subscription. Install UnfollowX Pro and start with a read-only scan." />
    </>
  );
}
