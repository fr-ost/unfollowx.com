import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import FaqAccordion from '@/components/FaqAccordion';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';
import JsonLd from '@/components/JsonLd';
import Screenshot from '@/components/Screenshot';
import ArticleCard from '@/components/ArticleCard';
import { TrackEvent } from '@/components/Analytics';
import { getArticle } from '@/lib/blog';
import { pageMetadata, softwareSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Free X Follower Tracker — See Who Unfollowed You on Twitter',
  description: 'Track new and lost followers on X (Twitter) with a free Chrome extension. Snapshot comparison, no partial-read false alarms, follow back in bulk — data stays on your device.',
  path: '/x-follower-tracker'
});

const faqs = [
  { id: 'past', q: 'Can the tracker show unfollows from before I installed it?', a: ['No tracker can. X doesn’t keep an unfollow history, so tracking starts with your first complete followers snapshot and shows changes from then on.'] },
  { id: 'big', q: 'Does it work for large accounts?', a: ['Yes. For accounts with more than 20,000 followers, the followers check runs when you press Check now on the Followers page instead of after every scan, because reading a very large list takes a while.'] },
  { id: 'notify', q: 'Can it notify me when someone unfollows me?', a: ['Yes, optionally. Desktop notifications are off by default; turn them on in Settings and Chrome asks for permission. Notifications are shown on your computer — nothing is sent anywhere.'] },
  { id: 'why', q: 'Why does someone appear as “unfollowed you” when they didn’t?', a: ['Suspended, deactivated and deleted accounts drop out of follower lists, and so does anyone who blocks you. The tracker reports that an account is no longer in your followers; open the profile if you need to know why.'] },
  { id: 'free', q: 'Is follower tracking free?', a: ['Yes. Every UnfollowX Pro feature is free forever, with no subscription or premium tier.'] }
];

export default function FollowerTrackerPage() {
  const guides = ['how-to-find-out-who-unfollowed-you-on-x', 'what-an-x-follower-tracker-can-and-cannot-tell-you', 'x-following-vs-followers-explained'].map(getArticle);

  return (
    <>
      <JsonLd data={softwareSchema} />
      <TrackEvent name="feature_page_view" params={{ feature_name: 'follower_tracker' }} withPath />

      <section className="container lp-hero">
        <div className="page-hero">
          <Breadcrumbs items={[{ name: 'Features', path: '/features' }, { name: 'Follower tracker', path: '/x-follower-tracker' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>X / Twitter follower tracker</div>
          <h1>See who unfollowed you on X — <span className="gradient-text">and who’s new.</span></h1>
          <p className="lead">X doesn’t tell you when someone leaves. UnfollowX Pro compares your followers with your last complete check and lists every change, free and on your own device.</p>
          <div className="cta-row"><InstallLink location="tracker_hero" size="lg" /></div>
          <ul className="lp-points" role="list">
            <li><Icon name="check" />Unfollowed you, New followers and You don’t follow back</li>
            <li><Icon name="check" />Partial reads are never compared — no false alarms</li>
            <li><Icon name="check" />Snapshots stay in Chrome extension storage</li>
          </ul>
        </div>
        <Screenshot shot="storeTracker" priority caption="Chrome Web Store screenshot of the Followers page (sample accounts)" sizes="(max-width: 960px) 100vw, 580px" />
      </section>

      <section className="container lp-section" aria-labelledby="how-tracker">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">How tracking works</div>
            <h2 id="how-tracker">Snapshots in, changes out.</h2>
            <div className="prose">
              <p>After each scan, UnfollowX Pro reads your followers — read-only, paced, and able to resume if it’s interrupted — and saves a snapshot. On the next check it compares the new complete list with the previous one.</p>
              <p>Accounts that were there before and aren’t now appear under <strong>Unfollowed you</strong>, with the dates between the two checks. Accounts that are new appear under <strong>New followers</strong>. A third tab shows followers <strong>you don’t follow back</strong>.</p>
              <p>The first check is your baseline, so it never lists unfollowers. For a deeper explanation, read <Link href="/blog/what-an-x-follower-tracker-can-and-cannot-tell-you">how to track new and lost followers on X</Link>.</p>
            </div>
          </div>
          <ol className="lp-steps" role="list" data-stagger="70">
            <li><div><b>Scan once to save a baseline</b><span>Press “Scan my following” on x.com. Your followers are read right after.</span></div></li>
            <li><div><b>Check again later</b><span>Rescan, or press Check now on the dashboard’s Followers page.</span></div></li>
            <li><div><b>See every change</b><span>Unfollowed you, New followers and You don’t follow back — with search and CSV export.</span></div></li>
            <li><div><b>Act if you want to</b><span>Unfollow people who left, or follow back new followers, at your own pace.</span></div></li>
          </ol>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="tracker-why">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Built to be trustworthy</div>
          <h2 id="tracker-why">A tracker that doesn’t cry wolf.</h2>
        </div>
        <div className="lp-cards" data-stagger="70">
          <div className="card"><span className="icon-tile green"><Icon name="checkCircle" /></span><h3>Complete reads only</h3><p>If X returns an incomplete followers list, nothing is compared — so nobody shows up as “unfollowed you” by mistake.</p></div>
          <div className="card"><span className="icon-tile"><Icon name="chart" /></span><h3>Growth over time</h3><p>The Overview charts following and followers over 30 days, 90 days or all time, built from your scans, with a table view for screen readers.</p></div>
          <div className="card"><span className="icon-tile"><Icon name="lock" /></span><h3>Private by design</h3><p>Snapshots and change records stay in Chrome extension storage. Your follower lists aren’t uploaded to the developer.</p></div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="tracker-shot">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">Follow back &amp; clean up</div>
            <h2 id="tracker-shot">From changes to decisions.</h2>
            <div className="prose">
              <p>Select new followers and follow them back, or select people who left that you still follow and unfollow them. Follows and unfollows share the same pacing, breaks and daily limit, and X’s own <a href="https://help.x.com/en/using-x/x-follow-limit" target="_blank" rel="noopener">follow limits</a> still apply.</p>
              <p>Want an alert instead of checking? Turn on optional desktop notifications for new unfollowers.</p>
            </div>
          </div>
          <Screenshot shot="followers" caption="Followers page, light mode (real interface, sample accounts)" sizes="(max-width: 960px) 100vw, 580px" />
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="tracker-faq">
        <div className="section-head" data-reveal=""><div className="eyebrow">Questions</div><h2 id="tracker-faq">About the follower tracker</h2></div>
        <FaqAccordion items={faqs} idPrefix="tracker-faq" />
      </section>

      <section className="container lp-section" aria-labelledby="tracker-guides">
        <div className="section-head" data-reveal=""><div className="eyebrow">Related guides</div><h2 id="tracker-guides">Learn more</h2></div>
        <div className="article-grid">{guides.map((a) => <ArticleCard key={a.slug} article={a} location="tracker_guides" />)}</div>
      </section>

      <CtaBand location="tracker_cta" title="Start tracking your followers today." text="Every change from your first snapshot onward. Free forever, no subscription, no premium plan." secondary={{ label: 'See all features', href: '/features' }} />
    </>
  );
}
