'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const STORE = 'https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl';
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    let pref = 'system';
    try { pref = localStorage.getItem('unfollowx-theme') || 'system'; } catch {}
    const nextDark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = nextDark ? 'dark' : 'light';
    document.documentElement.style.colorScheme = nextDark ? 'dark' : 'light';
    setDark(nextDark);
  }, []);
  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem('unfollowx-theme', next ? 'dark' : 'light'); } catch {}
  }
  return <header className="topbar">
    <Link className="brand" href="/" aria-label="UnfollowX Pro home"><img src="/assets/logo.svg" alt=""/><span>UnfollowX <small>PRO</small></span></Link>
    <button className="mobile-toggle" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? '×' : '☰'}</button>
    <nav className={`nav ${open ? 'open' : ''}`}><a href="/#how" onClick={() => setOpen(false)}>How it works</a><Link href="/features" onClick={() => setOpen(false)}>Features</Link><Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link><Link href="/blog" onClick={() => setOpen(false)}>Field notes</Link></nav>
    <div className="nav-actions"><button className="theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title="Switch color theme" onClick={toggleTheme}>{dark ? '☼' : '☾'}</button><a className="button button-small button-primary" href={STORE} target="_blank" rel="noopener">Add to Chrome <span>↗</span></a></div>
  </header>;
}
