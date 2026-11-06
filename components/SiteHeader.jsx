'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { track } from '@/lib/analytics';
import { NAV_ITEMS, STORE_URL } from '@/lib/site';

const THEME_KEY = 'unfollowx-theme';

function applyTheme(next) {
  const root = document.documentElement;
  root.dataset.theme = next;
  root.style.colorScheme = next;
}

export default function SiteHeader() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const toggleRef = useRef(null);
  const isArticle = pathname.startsWith('/blog/');

  // Scroll state + reading progress on articles (one rAF-throttled listener).
  useEffect(() => {
    let frame = 0;
    let wasScrolled = null;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const isScrolled = y > 8;
      if (isScrolled !== wasScrolled) { wasScrolled = isScrolled; setScrolled(isScrolled); }
      if (isArticle && headerRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        headerRef.current.style.setProperty('--progress', max > 0 ? Math.min(1, y / max).toFixed(4) : '0');
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, [isArticle]);

  // Follow the system theme until the visitor picks one.
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      let stored = null;
      try { stored = localStorage.getItem(THEME_KEY); } catch {}
      if (stored !== 'light' && stored !== 'dark') applyTheme(media.matches ? 'dark' : 'light');
    };
    media.addEventListener?.('change', onChange);
    return () => media.removeEventListener?.('change', onChange);
  }, []);

  // Close the menu on navigation.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Mobile menu: Escape closes, Tab stays inside, page behind does not scroll.
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusables = () => [toggleRef.current, ...(menuRef.current?.querySelectorAll('a[href], button') || [])].filter(Boolean);
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); return; }
      if (event.key !== 'Tab') return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const close = () => { if (window.innerWidth >= 1080) setOpen(false); };
    window.addEventListener('resize', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  // Sliding hover indicator for the desktop nav.
  const movePill = useCallback((target) => {
    const nav = navRef.current;
    if (!nav) return;
    if (!target) { nav.classList.remove('has-pill'); return; }
    nav.style.setProperty('--pill-x', `${target.offsetLeft}px`);
    nav.style.setProperty('--pill-w', `${target.offsetWidth}px`);
    nav.classList.add('has-pill');
  }, []);

  function toggleTheme(event) {
    const root = document.documentElement;
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch {}
    track('theme_change', { selected_theme: next });
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && typeof document.startViewTransition === 'function') {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      root.style.setProperty('--reveal-x', `${x}px`);
      root.style.setProperty('--reveal-y', `${y}px`);
      root.style.setProperty('--reveal-r', `${radius}px`);
      root.classList.add('theme-reveal');
      const transition = document.startViewTransition(() => applyTheme(next));
      transition.finished.finally(() => root.classList.remove('theme-reveal'));
      return;
    }
    root.classList.add('theme-switching');
    applyTheme(next);
    window.setTimeout(() => root.classList.remove('theme-switching'), 360);
  }

  const navLink = (item, location, index) => {
    const active = item.match(pathname);
    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={active ? 'page' : undefined}
        data-nav={location}
        data-nav-item={item.label}
        style={index !== undefined ? { '--i': index } : undefined}
        onMouseEnter={location === 'header' ? (e) => movePill(e.currentTarget) : undefined}
        onFocus={location === 'header' ? (e) => movePill(e.currentTarget) : undefined}
      >
        {item.label}
        {location === 'mobile_menu' ? <span aria-hidden="true">→</span> : null}
      </Link>
    );
  };

  return (
    <header ref={headerRef} className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label="UnfollowX Pro home" data-nav="header" data-nav-item="Home">
          <img src="/assets/logo.svg" alt="" width="30" height="30" />
          <span>UnfollowX <span className="brand-pro">PRO</span></span>
        </Link>

        <nav ref={navRef} className="primary-nav" aria-label="Main" onMouseLeave={() => movePill(null)} onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) movePill(null); }}>
          <span className="nav-pill" aria-hidden="true" />
          {NAV_ITEMS.map((item) => navLink(item, 'header'))}
        </nav>

        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle light or dark theme">
            <Icon name="moon" className="icon-moon" />
            <Icon name="sun" className="icon-sun" />
          </button>
          <a className="btn btn-primary btn-sm" href={STORE_URL} target="_blank" rel="noopener" data-install="" data-location="header_nav">
            <Icon name="install" />
            <span className="header-cta-full">Add to Chrome — Free</span>
            <span className="header-cta-short">Add to Chrome</span>
            <span className="visually-hidden"> (opens the Chrome Web Store in a new tab)</span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="bars" aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </div>

      <div ref={menuRef} id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          {NAV_ITEMS.map((item, index) => navLink(item, 'mobile_menu', index))}
          {navLink({ label: 'Setup guide', href: '/setup', match: (p) => p === '/setup' }, 'mobile_menu', NAV_ITEMS.length)}
        </nav>
        <div className="mobile-menu-foot">
          <a className="btn btn-primary btn-lg" href={STORE_URL} target="_blank" rel="noopener" data-install="" data-location="mobile_menu">
            <Icon name="install" /> Add to Chrome — Free Forever
            <span className="visually-hidden"> (opens the Chrome Web Store in a new tab)</span>
          </a>
          <button type="button" className="menu-theme" onClick={toggleTheme}>
            <Icon name="moon" className="icon-moon" />
            <Icon name="sun" className="icon-sun" />
            <span className="label-light">Switch to dark theme</span>
            <span className="label-dark">Switch to light theme</span>
          </button>
          <p>Free forever · No subscription · No premium plan</p>
        </div>
      </div>

      {isArticle ? <span className="read-progress" aria-hidden="true" /> : null}
    </header>
  );
}
