'use client';

import { useEffect } from 'react';

const revealSelector = [
  '.section-heading',
  '.journey-card',
  '.clarity-copy',
  '.insight-card',
  '.privacy-card',
  '.notes-heading',
  '.blog-card',
  '.closing-inner',
  '.setup-step',
  '.setup-aside-card',
  '.setup-faq > .eyebrow',
  '.setup-faq > h2',
  '.setup-faq > details',
  '.setup-troubleshoot > *',
  '.prose > section'
].join(',');

export default function RevealOnView() {
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    document.querySelectorAll('.journey,.clarity-stack,.blog-cards,.setup-steps,.troubleshoot-grid').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.setProperty('--reveal-delay', Math.min(index * 75, 225) + 'ms');
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -4% 0px' });

    document.querySelectorAll(revealSelector).forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
