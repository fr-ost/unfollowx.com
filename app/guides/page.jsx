import Link from 'next/link';
import '../styles/pages.css';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Icon from '@/components/Icon';
import JsonLd from '@/components/JsonLd';
import { getArticle } from '@/lib/blog';
import { pageMetadata } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'How-to Guides for Managing Your X (Twitter) Following',
  description: 'Short answers and step-by-step guides for every common X following task: find non-followers, see who unfollowed you, mass unfollow, protect accounts and export lists.',
  path: '/guides'
});

// Task-oriented hub: one short, direct answer per task, then the guides
// that cover it. The blog lists the same guides chronologically by category.
const tasks = [
  {
    icon: 'userMinus', tone: 'red', title: 'See who doesn’t follow you back',
    answer: 'X has no built-in list. Check the “Follows you” label on each profile, compare lists from X’s data archive, or run a read-only scan with a non-follower checker that compares both lists for you.',
    guides: ['how-to-see-who-doesnt-follow-you-back-on-x', 'x-following-vs-followers-explained'],
    tool: { label: 'Non-followers checker', href: '/twitter-non-followers-checker' }
  },
  {
    icon: 'arrowsSwap', tone: '', title: 'Find out who unfollowed you',
    answer: 'X doesn’t notify you about unfollows. Save a followers snapshot, check again later, and compare: accounts that disappeared left (or were suspended, deactivated or blocked you). Nothing can show unfollows from before your first snapshot.',
    guides: ['how-to-find-out-who-unfollowed-you-on-x', 'what-an-x-follower-tracker-can-and-cannot-tell-you'],
    tool: { label: 'Follower tracker', href: '/x-follower-tracker' }
  },
  {
    icon: 'users', tone: '', title: 'Unfollow many accounts at once',
    answer: 'Pick a specific group (non-followers, inactive, a filtered slice), whitelist the accounts you value, review the selection, then unfollow at a measured pace with delays, breaks and a daily limit. X applies its own limits to every account.',
    guides: ['how-to-mass-unfollow-accounts-on-x', 'how-to-unfollow-everyone-on-x']
  },
  {
    icon: 'shield', tone: 'green', title: 'Protect accounts before a cleanup',
    answer: 'Add friends and must-read accounts to a whitelist and use rules for groups — verified, private, big accounts, keywords, recent follows. Then check which accounts are protected before you start.',
    guides: ['how-to-whitelist-accounts-before-unfollowing-on-x', 'how-to-recover-from-an-accidental-unfollow-on-x']
  },
  {
    icon: 'moonZ', tone: 'amber', title: 'Find inactive accounts',
    answer: 'X only exposes visible activity, so “inactive” means no recent post, reply or repost. Check each account’s newest readable post, pick a cut-off like 90 days, and keep quiet accounts that still matter.',
    guides: ['how-to-find-inactive-accounts-on-x', 'a-thoughtful-guide-to-cleaning-up-your-x-following-list']
  },
  {
    icon: 'download', tone: '', title: 'Export your following list',
    answer: 'Request X’s data archive for an official copy (it can take days), or export a CSV from a tool after a scan for a spreadsheet with names, counts and follow-back status.',
    guides: ['how-to-export-your-x-following-list-to-csv']
  },
  {
    icon: 'sparkle', tone: 'green', title: 'Clean up your following list',
    answer: 'Decide what your feed is for, protect people first, then review in batches — dormant accounts, likely spam, unfamiliar non-followers — using several signals together.',
    guides: ['a-thoughtful-guide-to-cleaning-up-your-x-following-list', 'best-free-x-unfollow-tools-what-to-look-for']
  },
  {
    icon: 'monitor', tone: '', title: 'Manage several X accounts in Chrome',
    answer: 'Use X’s account switcher for accounts you manage yourself, or separate Chrome profiles to keep accounts strictly apart. Keep a separate whitelist and pace for each account.',
    guides: ['how-to-manage-multiple-x-accounts-in-chrome']
  }
];

export default function GuidesPage() {
  const list = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnfollowX Pro how-to guides',
    url: absoluteUrl('/guides'),
    hasPart: [{ '@type': 'WebPage', name: 'Setup guide', url: absoluteUrl('/setup') }, ...[...new Set(tasks.flatMap((t) => t.guides))].map((slug) => ({ '@type': 'BlogPosting', name: getArticle(slug).title, url: absoluteUrl(`/blog/${slug}`) }))]
  };

  return (
    <>
      <JsonLd data={list} />
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs items={[{ name: 'How-to Guides', path: '/guides' }]} />
          <div className="eyebrow" style={{ marginTop: 28 }}>How-to guides</div>
          <h1>What do you want <span className="gradient-text">to do on X?</span></h1>
          <p className="lead">Pick a task. Each one starts with the short answer, then links to the step-by-step guide. They’re written to help whether or not you use UnfollowX Pro.</p>
        </div>
      </section>

      <section className="container">
        <div className="card setup-banner" data-reveal="">
          <div>
            <h2>New to UnfollowX Pro?</h2>
            <p>Install it, run a read-only scan and set up protection in about five minutes.</p>
          </div>
          <Link className="btn btn-primary" href="/setup" data-cta="Setup guide" data-cta-location="guides_banner"><Icon name="book" />Read the setup guide</Link>
        </div>

        <div className="task-grid" data-stagger="60">
          {tasks.map((task) => (
            <section className="card task" key={task.title} aria-labelledby={`task-${task.icon}-${task.title.length}`}>
              <span className={`icon-tile ${task.tone}`}><Icon name={task.icon} /></span>
              <h2 id={`task-${task.icon}-${task.title.length}`}>{task.title}</h2>
              <p className="answer">{task.answer}</p>
              <ul>
                {task.guides.map((slug) => {
                  const a = getArticle(slug);
                  return <li key={slug}><Link href={`/blog/${slug}`} data-cta="guide_link" data-cta-location="guides_hub"><Icon name="arrowRight" />{a.title}</Link></li>;
                })}
                {task.tool ? <li><Link href={task.tool.href} data-cta={task.tool.label} data-cta-location="guides_hub"><Icon name="zap" />{task.tool.label}</Link></li> : null}
              </ul>
            </section>
          ))}
        </div>
      </section>

      <CtaBand location="guides_cta" title="Skip the manual work." text="UnfollowX Pro scans, compares and paces for you — free forever, with no premium unlocks." secondary={{ label: 'Browse the blog', href: '/blog' }} />
    </>
  );
}
