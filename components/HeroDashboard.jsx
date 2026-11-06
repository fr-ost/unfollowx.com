'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import Icon from '@/components/Icon';

// Illustrative dashboard with fictional sample accounts. It mirrors real
// UnfollowX Pro concepts (stats, tabs, selection, paced run, history) but is
// not connected to X. Decorative for assistive tech: one summary label.

const STATS = [
  { key: 'following', label: 'Following', value: 1842, icon: 'users', tone: 'blue' },
  { key: 'mutuals', label: 'Mutuals', value: 1410, icon: 'arrowsSwap', tone: 'green' },
  { key: 'non', label: 'Don’t follow back', value: 432, icon: 'userMinus', tone: 'red' },
  { key: 'inactive', label: 'Inactive 90d+', value: 240, icon: 'moonZ', tone: 'amber' }
];

const ROWS = [
  { i: 'NW', c: 'a1', n: 'Northwind Notes', h: 'northwindnotes', tag: 'Doesn’t follow back', f: '12.4K', sel: true },
  { i: 'JH', c: 'a2', n: 'Juniper House', h: 'juniperhouse', tag: 'Last post 8 mo ago', f: '3.1K', sel: true, idle: true },
  { i: 'LP', c: 'a3', n: 'Lena Park', h: 'lenapark_dev', tag: 'Protected', f: '920', keep: true },
  { i: 'MS', c: 'a4', n: 'Monday Studio', h: 'mondaystudio', tag: 'Doesn’t follow back', f: '48.0K', sel: true },
  { i: 'OF', c: 'a5', n: 'Open Field Radio', h: 'openfieldfm', tag: 'Last post 1 yr ago', f: '610', idle: true }
];

const QUEUE = ['atlas_archive', 'bluehour_notes', 'westward_jrnl', 'pixel_harbor', 'quietcanyon', 'saltandsignal', 'northloop_co', 'fernwood_lab'];

const fmt = (n) => n.toLocaleString('en-US');

// Static number in the HTML; count-up animation (if motion is allowed) writes
// textContent directly, so React never re-renders the dashboard for it.
function Stat({ stat }) {
  return (
    <div className={`hd-stat tone-${stat.tone}`}>
      <span className="hd-stat-label"><Icon name={stat.icon} />{stat.label}</span>
      <b className="tabular" data-count={stat.value}>{fmt(stat.value)}</b>
    </div>
  );
}

const initialRun = {
  done: 127,
  countdown: 9,
  next: 0,
  history: [
    { id: 'h3', h: 'driftwood_daily', r: 'ok', t: 'just now' },
    { id: 'h2', h: 'lenapark_dev', r: 'skip', t: '1 min ago' },
    { id: 'h1', h: 'meadowlight', r: 'ok', t: '1 min ago' }
  ]
};

function runReducer(state, action) {
  if (action.type !== 'tick') return state;
  if (state.countdown > 1) return { ...state, countdown: state.countdown - 1 };
  const handle = QUEUE[state.next % QUEUE.length];
  return {
    done: state.done >= 408 ? 127 : state.done + 1,
    countdown: action.nextDelay,
    next: state.next + 1,
    history: [
      { id: `q${state.next}`, h: handle, r: 'ok', t: 'just now', fresh: true },
      ...state.history.map((item) => ({ ...item, fresh: false, t: item.t === 'just now' ? '1 min ago' : item.t }))
    ].slice(0, 3)
  };
}

// Only this small component updates over time (once per second, and only
// while the hero is on screen and the tab is visible).
function LiveRun({ active }) {
  const [{ done, countdown, history }, dispatch] = useReducer(runReducer, initialRun);
  useEffect(() => {
    if (!active) return undefined;
    const timer = window.setInterval(() => {
      if (!document.hidden) dispatch({ type: 'tick', nextDelay: 6 + Math.floor(Math.random() * 7) });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [active]);
  const pct = Math.round((done / 408) * 100);
  return (
    <>
      <div className="hd-float hd-run" aria-hidden="true">
        <div className="hd-run-top"><span className="hd-live"><i />Running</span><span className="tabular">{pct}%</span></div>
        <div className="hd-run-count"><b className="tabular">{done}</b> / 408 unfollowed</div>
        <div className="hd-progress"><span style={{ transform: `scaleX(${done / 408})` }} /></div>
        <div className="hd-run-next"><span>Next account in</span><b className="tabular">{countdown}s</b></div>
        <div className="hd-run-actions"><span><Icon name="pause" />Pause</span><span className="stop"><Icon name="stop" />Stop</span></div>
      </div>

      <div className="hd-float hd-history" aria-hidden="true">
        <div className="hd-history-head"><Icon name="history" />History</div>
        {history.map((item) => (
          <div className={`hd-history-row${item.fresh ? ' fresh' : ''}`} key={item.id}>
            <span className={`dot ${item.r}`} />
            <span className="txt">{item.r === 'ok' ? 'Unfollowed' : 'Skipped'} <b>@{item.h}</b>{item.r === 'skip' ? <em> · whitelisted</em> : null}</span>
            <span className="time">{item.t}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default function HeroDashboard() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    // Count-up once, writing text directly — started only when the browser
    // is idle after load, so it never competes with hydration.
    const nodes = Array.from(el.querySelectorAll('[data-count]'));
    let frame = 0;
    let idle = 0;
    const run = () => {
      const start = performance.now();
      frame = requestAnimationFrame(function tick(now) {
        const t = Math.min(1, (now - start) / 900);
        const e = 1 - Math.pow(1 - t, 3);
        nodes.forEach((n) => { n.textContent = fmt(Math.round(Number(n.dataset.count) * e)); });
        if (t < 1) frame = requestAnimationFrame(tick);
      });
    };
    const schedule = () => { idle = 'requestIdleCallback' in window ? window.requestIdleCallback(run, { timeout: 1500 }) : window.setTimeout(run, 300); };
    if (document.readyState === 'complete') schedule(); else window.addEventListener('load', schedule, { once: true });
    // Live simulation + floating cards only run while the hero is visible.
    const observer = new IntersectionObserver(([entry]) => {
      setActive(entry.isIntersecting);
      el.classList.toggle('is-paused', !entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(idle); else window.clearTimeout(idle);
      window.removeEventListener('load', schedule);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="hero-visual"
      role="img"
      aria-label="Sample UnfollowX Pro dashboard with fictional accounts: 1,842 following, 1,410 mutuals, 432 who don’t follow back and 240 inactive for 90 days or more, a selected review list, and a paced unfollow run in progress."
    >
      <div className="hd-window" aria-hidden="true">
        <div className="hd-chrome">
          <span className="hd-dots"><i /><i /><i /></span>
          <span className="hd-url">UnfollowX Pro · Following</span>
          <span className="hd-sample">Sample data</span>
        </div>
        <div className="hd-body">
          <div className="hd-side">
            <div className="hd-brand"><img src="/assets/logo.svg" alt="" width="22" height="22" /><span>UnfollowX Pro<small>Free &amp; Unlimited</small></span></div>
            <span className="hd-nav"><Icon name="chart" />Overview</span>
            <span className="hd-nav is-on"><Icon name="users" />Following<em className="red">432</em></span>
            <span className="hd-nav"><Icon name="userCheck" />Followers<em className="red">23</em></span>
            <span className="hd-nav"><Icon name="shield" />Whitelist<em className="green">4</em></span>
            <span className="hd-nav"><Icon name="history" />History</span>
            <span className="hd-nav"><Icon name="sliders" />Settings</span>
          </div>
          <div className="hd-main">
            <div className="hd-stats">{STATS.map((stat) => <Stat key={stat.key} stat={stat} />)}</div>
            <div className="hd-toolbar">
              <span className="hd-search"><Icon name="search" />Search name, @handle or bio</span>
              <span className="hd-tabs">
                <span className="is-on">Don’t follow back <em>432</em></span>
                <span>Mutuals <em>1.4K</em></span>
                <span>Not blue <em>1.7K</em></span>
                <span>Inactive <em>240</em></span>
              </span>
            </div>
            <div className="hd-list">
              {ROWS.map((row) => (
                <div className={`hd-row${row.sel ? ' is-sel' : ''}${row.keep ? ' is-keep' : ''}`} key={row.h}>
                  <span className="hd-check">{row.sel ? <Icon name="check" strokeWidth={3} /> : null}</span>
                  <span className={`hd-avatar ${row.c}`}>{row.i}</span>
                  <span className="hd-name"><b>{row.n}</b><small>@{row.h}</small></span>
                  <span className={`hd-tag${row.keep ? ' keep' : row.idle ? ' idle' : ''}`}>{row.tag}</span>
                  <span className="hd-count tabular">{row.f}</span>
                  <span className={`hd-shield${row.keep ? ' on' : ''}`}><Icon name="shield" /></span>
                </div>
              ))}
            </div>
            <div className="hd-bulk">
              <b>3 selected</b><span>Clear</span>
              <span className="hd-bulk-actions"><span><Icon name="shield" />Keep</span><span><Icon name="download" />Export</span><span className="primary"><Icon name="userMinus" />Unfollow selected</span></span>
            </div>
          </div>
        </div>
      </div>

      <LiveRun active={active} />
    </div>
  );
}
