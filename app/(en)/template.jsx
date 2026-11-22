'use client';

import { useEffect, useRef } from 'react';

// Re-mounted by Next.js on every client-side navigation. Adds a short,
// compositor-only fade (opacity + transform) to the new page — but never on
// the first load, so it can't delay first paint or LCP. Replaces the earlier
// React <ViewTransition>, whose full-page snapshots made navigation stutter.
let hasNavigated = false;

export default function Template({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!hasNavigated) { hasNavigated = true; return undefined; }
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    el.classList.add('route-enter');
    const done = () => el.classList.remove('route-enter');
    el.addEventListener('animationend', done, { once: true });
    return () => el.removeEventListener('animationend', done);
  }, []);
  return <div ref={ref}>{children}</div>;
}
