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
  title: 'Free Twitter Non-Followers Checker for X (Chrome Extension)',
  description: 'Check who doesn’t follow you back on X (Twitter) with a free, read-only Chrome extension. No password, no sign-up, no limits — review, filter and decide what to do.',
  path: '/twitter-non-followers-checker'
});

const faqs = [
  { id: 'accurate', q: 'How accurate is the non-follower check?', a: ['It uses X’s own “follows you” flag for each account in your following list, read through the same Following timeline X’s website uses. If X returns an incomplete list, rescan before acting. Results are a snapshot of the moment you scanned.'] },
  { id: 'read-only', q: 'Does checking unfollow anyone?', a: ['No. The scan is read-only. Nothing changes on your account until you select accounts and start an action yourself.'] },
  { id: 'size', q: 'Does it work with large following lists?', a: ['Yes. UnfollowX Pro sets no cap on list size. Very large lists simply take longer to read, and X’s own availability can affect how quickly it answers.'] },
  { id: 'free', q: 'Is the checker free?', a: ['Yes — like every UnfollowX Pro feature. No subscription, no premium tier, no per-check fee.'] },
  { id: 'mobile', q: 'Can I check non-followers on my phone?', a: ['Not with UnfollowX Pro; it’s a desktop Chrome extension. The results apply to your account everywhere, so you can review on a computer and keep using X on mobile.'] }
];

export default function NonFollowersCheckerPage() {
  const guides = ['how-to-see-who-doesnt-follow-you-back-on-x', 'how-to-whitelist-accounts-before-unfollowing-on-x', 'how-to-mass-unfollow-accounts-on-x'].map(getArticle);

  return (
    <>
      <JsonLd data={softwareSchema} />
      <TrackEvent name="feature_page_view" params={{ feature_name: 'non_followers_checker' }} withPath />

      <section className="container lp-hero">
        <div className="page-hero">
          <Breadcrumbs items={[{ name: 'Features', path: '/features' }, { name: 'Non-followers checker', path: '/twitter-non-followers-checker' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>Twitter / X non-followers checker</div>
          <h1>See who doesn’t follow you back on X. <span className="gradient-text">Free.</span></h1>
          <p className="lead">One read-only scan marks every account you follow as mutual or non-follower. Then search, filter, protect and decide — with no password, no sign-up and no limits set by us.</p>
          <div className="cta-row"><InstallLink location="checker_hero" size="lg" /></div>
          <ul className="lp-points" role="list">
            <li><Icon name="check" />Uses X’s own “follows you” flag for every account</li>
            <li><Icon name="check" />Scans in the background — about a minute for most lists</li>
            <li><Icon name="check" />Results stay in Chrome extension storage on your computer</li>
          </ul>
        </div>
        <Screenshot shot="popup" priority caption="The popup right after a scan (real interface, sample account)" sizes="(max-width: 960px) 90vw, 420px" className="lp-shot" />
      </section>

      <section className="container lp-section" aria-labelledby="how-checker">
        <div className="lp-split">
          <div data-reveal="">
            <div className="eyebrow">How the check works</div>
            <h2 id="how-checker">Three numbers, then a list you can work with.</h2>
            <div className="prose">
              <p>A non-follower checker compares two sides of every relationship: accounts you follow, and whether each of them follows you. UnfollowX Pro reads your following list page by page through X’s own Following timeline, which includes X’s per-account “follows you” flag, so there’s no guesswork and no second list to match.</p>
              <p>When the scan finishes, the popup shows <strong>Following</strong>, <strong>Don’t follow back</strong> and <strong>Mutuals</strong>. <strong>Review &amp; pick</strong> opens the full list in the dashboard.</p>
            </div>
          </div>
          <ol className="lp-steps" role="list" data-stagger="70">
            <li><div><b>Open x.com in Chrome</b><span>Signed in to the account you want to check. No password is shared.</span></div></li>
            <li><div><b>Press “Scan my following”</b><span>In the UnfollowX Pro popup. The scan only reads.</span></div></li>
            <li><div><b>Review “Don’t follow back”</b><span>Search, filter and sort; protect anyone with the shield.</span></div></li>
            <li><div><b>Decide</b><span>Keep, export to CSV, or unfollow selected accounts at your own pace.</span></div></li>
          </ol>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="refine">
        <div className="section-head" data-reveal="">
          <div className="eyebrow">Beyond a raw list</div>
          <h2 id="refine">Turn hundreds of non-followers into a short, sensible list.</h2>
          <p>Most people don’t want to unfollow every non-follower — news, experts and creators rarely follow back. These tools help you find the ones you actually mean.</p>
        </div>
        <div className="lp-cards" data-stagger="70">
          <div className="card"><span className="icon-tile"><Icon name="filter" /></span><h3>Filters that matter</h3><p>No profile photo, under 10 posts, under 50 followers, follows 10× more than followed, verified, private — plus followers range, follow ratio, join date, bio keywords and writing system.</p></div>
          <div className="card"><span className="icon-tile amber"><Icon name="moonZ" /></span><h3>Inactive and not blue</h3><p>Check when each non-follower last posted (30, 90, 180 days or a year) and see who doesn’t have a blue check. Unreadable accounts are listed separately, never guessed.</p></div>
          <div className="card"><span className="icon-tile green"><Icon name="shield" /></span><h3>Protection first</h3><p>Whitelisted accounts and Keep rules (verified, private, big accounts, keywords, recent follows) can’t be selected or unfollowed in any mode.</p></div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="methods">
        <div className="lp-split">
          <Screenshot shot="inactive" caption="Following page with tabs, filters and selection (dark mode, sample accounts)" sizes="(max-width: 960px) 100vw, 580px" />
          <div data-reveal="">
            <div className="eyebrow">Your options</div>
            <h2 id="methods">Checker vs checking by hand</h2>
            <div className="prose">
              <p>You can always check the <strong>Follows you</strong> label on each profile, or compare the following and follower files in <a href="https://help.x.com/en/managing-your-account/accessing-your-x-data" target="_blank" rel="noopener">X’s data archive</a>. Both are free and accurate; both get slow past a hundred or so accounts, and neither is easy to repeat.</p>
              <p>A checker does the same comparison in a minute and lets you act on the result. Our step-by-step guide covers all three methods: <Link href="/blog/how-to-see-who-doesnt-follow-you-back-on-x">how to see who doesn’t follow you back on X</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="after">
        <div className="callout warn" data-reveal="">
          <Icon name="alert" />
          <p id="after"><strong>If you decide to unfollow non-followers:</strong> UnfollowX Pro paces runs with random delays, breaks and a daily limit (400 by default), rests if X asks it to slow down and stops if X asks you to verify. X applies its own limits and rules to every account, so no tool can guarantee every action will be allowed. Read the <Link href="/blog/how-to-mass-unfollow-accounts-on-x">mass unfollow guide</Link> before a large run.</p>
        </div>
      </section>

      <section className="container lp-section" aria-labelledby="checker-faq">
        <div className="section-head" data-reveal=""><div className="eyebrow">Questions</div><h2 id="checker-faq">About the non-followers checker</h2></div>
        <FaqAccordion items={faqs} idPrefix="checker-faq" />
      </section>

      <section className="container lp-section" aria-labelledby="checker-guides">
        <div className="section-head" data-reveal=""><div className="eyebrow">Related guides</div><h2 id="checker-guides">Learn more</h2></div>
        <div className="article-grid">{guides.map((a) => <ArticleCard key={a.slug} article={a} location="checker_guides" />)}</div>
      </section>

      <CtaBand location="checker_cta" title="Find out who doesn’t follow you back." text="Free forever. Read-only scan. No password, no subscription, no premium unlocks." secondary={{ label: 'See all features', href: '/features' }} />
    </>
  );
}
