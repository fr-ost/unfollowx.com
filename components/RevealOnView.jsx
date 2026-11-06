'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Progressive scroll reveals + pointer spotlight for [data-spotlight] cards.
// Content is visible by default; html.js-reveal (added here, only when motion
// is allowed) hides not-yet-seen [data-reveal] elements until they enter view.
export default function RevealOnView() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;
    const root = document.documentElement;

    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const step = Number(group.dataset.stagger) || 70;
      Array.from(group.children).forEach((child, index) => {
        if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
        child.style.setProperty('--reveal-delay', `${Math.min(index * step, 420)}ms`);
      });
    });

    const targets = Array.from(document.querySelectorAll('[data-reveal]:not(.is-visible)'));
    // Anything already in (or above) the viewport is shown immediately: no flash, no delayed LCP.
    const fold = window.innerHeight * 0.92;
    targets.forEach((el) => { if (el.getBoundingClientRect().top < fold) el.classList.add('is-visible'); });
    root.classList.add('js-reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    targets.forEach((el) => { if (!el.classList.contains('is-visible')) observer.observe(el); });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return undefined;
    let frame = 0;
    let last = null;
    const onMove = (event) => {
      const card = event.target instanceof Element ? event.target.closest('[data-spotlight]') : null;
      if (!card) return;
      last = { card, x: event.clientX, y: event.clientY };
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = last.card.getBoundingClientRect();
        last.card.style.setProperty('--mx', `${last.x - rect.left}px`);
        last.card.style.setProperty('--my', `${last.y - rect.top}px`);
      });
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    return () => { document.removeEventListener('pointermove', onMove); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return null;
}
