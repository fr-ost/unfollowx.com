import Link from 'next/link';

const features = [
  ['Find non-followers', '/features#scan'],
  ['Compare follower snapshots', '/features#changes'],
  ['Filter your following', '/features#filters'],
  ['Protect people with Keep rules', '/features#keep'],
  ['Export lists to CSV', '/features#import'],
  ['Review action history', '/features#history']
];

export default function FeatureRibbon() {
  return <nav className="motion-ribbon" aria-label="Explore UnfollowX Pro features">
    <div className="motion-ribbon-track">
      {features.map(([label, href]) => <Link className="motion-ribbon-item" href={href} key={label}>
        <span aria-hidden="true">✳</span>{label}<b aria-hidden="true">↗</b>
      </Link>)}
    </div>
  </nav>;
}
