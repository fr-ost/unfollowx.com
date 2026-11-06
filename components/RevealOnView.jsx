'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// Progressive scroll reveals + pointer spotlight for [data-spotlight] cards.
// Content is visible by default (no JS, reduced motion). When motion is
// allowed, elements that start off-screen get .reveal-pending and fade in
// (.is-visible) as they enter the viewport.
export default function RevealOnView() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;

    document.querySelectorAll('[data-stagger]').forEach((group) => {
      const step = Number(group.dataset.stagger) || 70;
      const children = Array.from(group.children);
      // Large grids reveal as one unit: one compositing layer instead of a
      // dozen, which keeps scrolling smooth on mid-range devices.
      if (children.length > 6) { group.setAttribute('data-reveal', ''); return; }
      children.forEach((child, index) => {
        if (!child.hasAttribute('data-reveal')) child.setAttribute('data-reveal', '');
        child.style.setProperty('--reveal-delay', `${Math.min(index * step, 420)}ms`);
      });
    });

    // No layout reads here (getBoundingClientRect would force layout of
    // sections the browser skips via content-visibility). The observer's
    // first report decides: on-screen elements are left alone; off-screen
    // ones are hidden ("reveal-pending") and fade in when they arrive.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) {
          if (el.classList.contains('reveal-pending')) el.classList.add('is-visible');
          observer.unobserve(el);
        } else if (!el.dataset.revealSeen) {
          el.classList.add('reveal-pending');
        }
        el.dataset.revealSeen = '1';
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => { if (!el.dataset.revealSeen) observer.observe(el); });
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
