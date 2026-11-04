'use client';

import { useEffect, useState } from 'react';

const lines = ['what matters.', 'your people.', 'more clarity.'];

export default function HeroHeadline() {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionPreference.matches) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActiveLine((current) => (current + 1) % lines.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return <h1 className="hero-headline">
    <span>Make room for</span><br />
    <span className="hero-word-frame" aria-live="off">
      <span key={activeLine} className="gradient-text hero-word">{lines[activeLine]}</span>
    </span>
  </h1>;
}
