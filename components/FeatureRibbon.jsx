'use client';

import { useState } from 'react';

const features = [
  'Find non-followers',
  'Compare follower snapshots',
  'Filter your following',
  'Protect people with Keep rules',
  'Export lists to CSV',
  'Review action history'
];

function FeatureItems({ decorative = false }) {
  return <div className="motion-ribbon-track" aria-hidden={decorative || undefined}>
    {features.map((feature) => <span key={feature}><i aria-hidden="true">✳</i>{feature}</span>)}
  </div>;
}

export default function FeatureRibbon() {
  const [paused, setPaused] = useState(false);

  return <div className="motion-ribbon" data-paused={paused} role="region" aria-label="UnfollowX Pro tools">
    <div className="motion-ribbon-viewport">
      <div className="motion-ribbon-marquee">
        <FeatureItems />
        <FeatureItems decorative />
      </div>
    </div>
    <button
      className="motion-ribbon-toggle"
      type="button"
      aria-label={paused ? 'Resume feature ticker' : 'Pause feature ticker'}
      aria-pressed={paused}
      onClick={() => setPaused((value) => !value)}
    >
      <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
      <span>{paused ? 'Play' : 'Pause'}</span>
    </button>
  </div>;
}
