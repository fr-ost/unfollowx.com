'use client';

import { useEffect, useRef, useState } from 'react';

const lines = ['what matters.', 'your people.', 'more clarity.'];

export default function HeroHeadline() {
  const [activeLine, setActiveLine] = useState(0);
  const headingRef = useRef(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return undefined;
    let timer = null;
    const stop = () => {
      if (timer === null) return;
      window.clearInterval(timer);
      timer = null;
    };
    const sync = (inView) => {
      if (!inView || document.hidden || motionPreference.matches) {
        stop();
        return;
      }
      if (timer !== null) return;
      timer = window.setInterval(() => setActiveLine((current) => (current + 1) % lines.length), 5600);
    };
    const observer = new IntersectionObserver(([entry]) => sync(entry.isIntersecting), { threshold: 0.2 });
    const heading = headingRef.current;
    if (heading) observer.observe(heading);
    const onVisibilityChange = () => {
      if (document.hidden || !heading) {
        stop();
        return;
      }
      const rect = heading.getBoundingClientRect();
      sync(rect.bottom > 0 && rect.top < window.innerHeight);
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    motionPreference.addEventListener?.('change', onVisibilityChange);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      motionPreference.removeEventListener?.('change', onVisibilityChange);
    };
  }, []);

  return <h1 className="hero-headline" ref={headingRef}>
    <span>Make room for</span><br />
    <span className="hero-word-frame" aria-live="off">
      <span key={activeLine} className="gradient-text hero-word">{lines[activeLine]}</span>
    </span>
  </h1>;
}
