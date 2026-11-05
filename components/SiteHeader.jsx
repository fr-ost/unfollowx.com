'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const STORE = 'https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl';
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [dark, setDark] = useState(false);
  const progressBar = useRef(null);
  const themePreference = useRef('system');
  useEffect(() => {
    let progressFrame = 0;
    const updateProgress = () => {
      if (progressFrame) return;
      progressFrame = window.requestAnimationFrame(() => {
        progressFrame = 0;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        progressBar.current?.style.setProperty('transform', `scaleX(${progress})`);
      });
    };
    updateProgress(); window.addEventListener('scroll', updateProgress, { passive: true });
    try { themePreference.current = localStorage.getItem('unfollowx-theme') || 'system'; } catch { themePreference.current = 'system'; }
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const nextDark = themePreference.current === 'dark' || (themePreference.current === 'system' && systemPreference.matches);
      document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
      document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light';
      setDark(nextDark);
    };
    const onSystemThemeChange = () => { if (themePreference.current === 'system') applyTheme(); };
    applyTheme();
    systemPreference.addEventListener?.('change', onSystemThemeChange);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      if (progressFrame) window.cancelAnimationFrame(progressFrame);
      systemPreference.removeEventListener?.('change', onSystemThemeChange);
    };
  }, []);
  function toggleTheme() {
    const next = !dark;
    themePreference.current = next ? 'dark' : 'light';
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem('unfollowx-theme', themePreference.current); } catch {}
  }
  return <header className="topbar"><span ref={progressBar} className="scroll-progress" aria-hidden="true"/>
    <Link className="brand" href="/" aria-label="UnfollowX Pro home"><img src="/assets/logo.svg" alt=""/><span>UnfollowX <small>PRO</small></span></Link>
    <button className="mobile-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
    <nav className={`nav ${open ? 'open' : ''}`}><a href="/#how" onClick={() => setOpen(false)}>How it works</a><Link className={pathname==='/features'?'nav-active':''} aria-current={pathname==='/features'?'page':undefined} href="/features" onClick={() => setOpen(false)}>Features</Link><Link className={pathname==='/setup'?'nav-active':''} aria-current={pathname==='/setup'?'page':undefined} href="/setup" onClick={() => setOpen(false)}>Setup</Link><Link className={pathname==='/faq'?'nav-active':''} aria-current={pathname==='/faq'?'page':undefined} href="/faq" onClick={() => setOpen(false)}>FAQ</Link><Link className={pathname?.startsWith('/blog')?'nav-active':''} aria-current={pathname?.startsWith('/blog')?'page':undefined} href="/blog" onClick={() => setOpen(false)}>Field notes</Link></nav>
    <div className="nav-actions"><button className="theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={dark} title={dark ? 'Dark theme is on' : 'Light theme is on'} onClick={toggleTheme}><span className="theme-toggle-icon" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false">{dark ? <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></> : <path d="M20.5 15.3A8.7 8.7 0 0 1 8.7 3.5 8.9 8.9 0 1 0 20.5 15.3Z"/>}</svg></span><span className="theme-toggle-label">{dark ? 'Dark' : 'Light'}</span></button><a className="button button-small button-primary" href={STORE} target="_blank" rel="noopener">Add to Chrome <span>↗</span></a></div>
  </header>;
}
