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
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || motionPreference.matches) return undefined;

    document.querySelectorAll('.journey,.clarity-stack,.blog-cards,.setup-steps,.troubleshoot-grid').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        child.style.setProperty('--reveal-delay', Math.min(index * 100, 300) + 'ms');
      });
    });

    const targets = document.querySelectorAll(revealSelector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -5% 0px' });

    targets.forEach((element) => {
      element.classList.add('reveal');
      observer.observe(element);
    });

    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const spotTargets = finePointer ? document.querySelectorAll('.journey-card,.insight-card,.blog-card,.setup-step,.setup-aside-card') : [];
    const updateSpot = (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((event.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((event.clientY - rect.top) / rect.height) * 100));
      event.currentTarget.style.setProperty('--spot-x', x + '%');
      event.currentTarget.style.setProperty('--spot-y', y + '%');
    };
    const clearSpot = (event) => {
      event.currentTarget.style.setProperty('--spot-x', '50%');
      event.currentTarget.style.setProperty('--spot-y', '0%');
    };
    spotTargets.forEach((element) => {
      element.addEventListener('pointermove', updateSpot);
      element.addEventListener('pointerleave', clearSpot);
    });

    return () => {
      observer.disconnect();
      spotTargets.forEach((element) => {
        element.removeEventListener('pointermove', updateSpot);
        element.removeEventListener('pointerleave', clearSpot);
      });
    };
  }, []);

  return null;
}
