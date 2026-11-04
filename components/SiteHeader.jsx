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
  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      progressBar.current?.style.setProperty('transform', `scaleX(${progress})`);
    };
    updateProgress(); window.addEventListener('scroll', updateProgress, { passive: true });
    let pref = 'system';
    try { pref = localStorage.getItem('unfollowx-theme') || 'system'; } catch {}
    const nextDark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light';
    setDark(nextDark);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem('unfollowx-theme', next ? 'dark' : 'light'); } catch {}
  }
  return <header className="topbar"><span ref={progressBar} className="scroll-progress" aria-hidden="true"/>
    <Link className="brand" href="/" aria-label="UnfollowX Pro home"><img src="/assets/logo.svg" alt=""/><span>UnfollowX <small>PRO</small></span></Link>
    <button className="mobile-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
    <nav className={`nav ${open ? 'open' : ''}`}><a href="/#how" onClick={() => setOpen(false)}>How it works</a><Link className={pathname==='/features'?'nav-active':''} aria-current={pathname==='/features'?'page':undefined} href="/features" onClick={() => setOpen(false)}>Features</Link><Link className={pathname==='/faq'?'nav-active':''} aria-current={pathname==='/faq'?'page':undefined} href="/faq" onClick={() => setOpen(false)}>FAQ</Link><Link className={pathname?.startsWith('/blog')?'nav-active':''} aria-current={pathname?.startsWith('/blog')?'page':undefined} href="/blog" onClick={() => setOpen(false)}>Field notes</Link></nav>
    <div className="nav-actions"><button className="theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title="Switch color theme" onClick={toggleTheme}>{dark ? '☼' : '☾'}</button><a className="button button-small button-primary" href={STORE} target="_blank" rel="noopener">Add to Chrome <span>↗</span></a></div>
  </header>;
}
