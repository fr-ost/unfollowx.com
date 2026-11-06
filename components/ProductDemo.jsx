'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { track } from '@/lib/analytics';

// Interactive demo with fictional accounts. Runs entirely in the page: it is
// not connected to X and never reads the visitor's account. Search text is
// never sent to analytics; only the interaction type is.

const FOLLOWING = [
  { id: 1, n: 'Northwind Notes', h: 'northwindnotes', fy: false, days: 3, blue: true, f: 12400, bio: 'Weekly notes on maps and design' },
  { id: 2, n: 'Lena Park', h: 'lenapark_dev', fy: true, days: 1, blue: false, f: 920, bio: 'Frontend engineer, coffee person' },
  { id: 3, n: 'Juniper House', h: 'juniperhouse', fy: false, days: 241, blue: false, f: 3100, bio: 'Independent publisher' },
  { id: 4, n: 'Monday Studio', h: 'mondaystudio', fy: false, days: 12, blue: true, f: 48000, bio: 'Branding studio' },
  { id: 5, n: 'Open Field Radio', h: 'openfieldfm', fy: false, days: 402, blue: false, f: 610, bio: 'Community radio archive' },
  { id: 6, n: 'Aria Chen', h: 'ariachen', fy: true, days: 0, blue: true, f: 2300, bio: 'Product designer' },
  { id: 7, n: 'Saltmarsh Lab', h: 'saltmarshlab', fy: false, days: 133, blue: false, f: 1800, bio: 'Coastal research group' },
  { id: 8, n: 'Diego Ramos', h: 'diegoramos', fy: true, days: 5, blue: false, f: 410, bio: 'Photographer and teacher' },
  { id: 9, n: 'Quiet Canyon', h: 'quietcanyon', fy: false, days: 610, blue: false, f: 95, bio: 'Hiking photos, mostly' },
  { id: 10, n: 'Pixel Harbor', h: 'pixelharbor', fy: true, days: 2, blue: true, f: 7600, bio: 'Indie game studio' },
  { id: 11, n: 'Fernwood Daily', h: 'fernwooddaily', fy: false, days: 44, blue: true, f: 15200, bio: 'Local news and weather' },
  { id: 12, n: 'Maya Okafor', h: 'mayaokafor', fy: true, days: 9, blue: false, f: 1300, bio: 'Writer · editor' }
];

const FOLLOWERS = {
  lost: [
    { id: 21, n: 'Brightline Books', h: 'brightlinebooks', note: 'You follow them', f: 8700, when: 'Oct 30 – Nov 3' },
    { id: 22, n: 'Theo Marsh', h: 'theomarsh', note: 'You follow them', f: 380, when: 'Oct 30 – Nov 3' },
    { id: 23, n: 'Cobalt Weekly', h: 'cobaltweekly', note: 'Not followed', f: 2200, when: 'Oct 30 – Nov 3' }
  ],
  gained: [
    { id: 31, n: 'Hana Ito', h: 'hanaito', note: 'New follower', f: 640, when: 'since last check' },
    { id: 32, n: 'Gridline Co.', h: 'gridlineco', note: 'New follower', f: 5100, when: 'since last check' },
    { id: 33, n: 'Sam Rivera', h: 'samrivera', note: 'New follower', f: 210, when: 'since last check' }
  ],
  fans: [
    { id: 41, n: 'Atlas Archive', h: 'atlasarchive', note: 'Follows you', f: 1200, when: 'not followed back' },
    { id: 42, n: 'Ivy Moreno', h: 'ivymoreno', note: 'Follows you', f: 330, when: 'not followed back' }
  ]
};

const FOLLOWING_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'non', label: 'Don’t follow back' },
  { id: 'mutual', label: 'Mutuals' },
  { id: 'inactive', label: 'Inactive 90d+' },
  { id: 'notblue', label: 'Not blue' }
];
const FOLLOWER_FILTERS = [
  { id: 'lost', label: 'Unfollowed you' },
  { id: 'gained', label: 'New followers' },
  { id: 'fans', label: 'You don’t follow back' }
];

const compact = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : String(n));
const lastActive = (d) => (d === 0 ? 'today' : d < 30 ? `${d}d ago` : d < 365 ? `${Math.round(d / 30)} mo ago` : `${Math.floor(d / 365)} yr ago`);
const initials = (name) => name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
const tones = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6'];

function matches(item, filter) {
  if (filter === 'non') return !item.fy;
  if (filter === 'mutual') return item.fy;
  if (filter === 'inactive') return item.days >= 90;
  if (filter === 'notblue') return !item.blue;
  return true;
}

export default function ProductDemo() {
  const [view, setView] = useState('following');
  const [filter, setFilter] = useState('non');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(() => new Set([3, 5]));
  const [kept, setKept] = useState(() => new Set([11]));
  const [removed, setRemoved] = useState(() => new Set());
  const [scan, setScan] = useState({ running: false, progress: 1 });
  const [notice, setNotice] = useState('');
  const sent = useRef(new Set());
  const scanTimer = useRef(0);

  const interact = (type) => {
    if (sent.current.has(type)) return;
    sent.current.add(type);
    track('demo_interaction', { interaction_type: type, demo_section: view === 'following' ? 'following' : 'followers' });
  };

  useEffect(() => () => cancelAnimationFrame(scanTimer.current), []);

  const following = useMemo(() => FOLLOWING.filter((item) => !removed.has(item.id)), [removed]);
  const counts = useMemo(() => ({
    total: following.length,
    non: following.filter((u) => !u.fy).length,
    mutual: following.filter((u) => u.fy).length,
    inactive: following.filter((u) => u.days >= 90).length
  }), [following]);

  const q = query.trim().toLowerCase();
  const search = (item) => !q || `${item.n} ${item.h} ${item.bio || ''}`.toLowerCase().includes(q);
  const rows = view === 'following'
    ? following.filter((item) => matches(item, filter) && search(item))
    : (FOLLOWERS[filter] || []).filter(search);

  const selectable = view === 'following' ? rows.filter((r) => !kept.has(r.id)) : rows;
  const selectedVisible = rows.filter((r) => selected.has(r.id) && !kept.has(r.id));

  function switchView(next) {
    if (next === view) return;
    setView(next);
    setFilter(next === 'following' ? 'non' : 'lost');
    setQuery('');
    setNotice('');
    interact('view_switch');
  }

  function toggleSelect(id) {
    setSelected((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    interact('select_account');
  }

  function toggleKeep(id) {
    setKept((current) => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    setSelected((current) => { const next = new Set(current); next.delete(id); return next; });
    interact('whitelist_toggle');
  }

  function selectAll() {
    const allOn = selectable.every((r) => selected.has(r.id));
    setSelected((current) => {
      const next = new Set(current);
      selectable.forEach((r) => (allOn ? next.delete(r.id) : next.add(r.id)));
      return next;
    });
    interact('select_all');
  }

  function runScan() {
    if (scan.running) return;
    interact('simulate_scan');
    setNotice('');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { setScan({ running: false, progress: 1 }); setNotice('Sample scan complete. In the extension, a real scan reads your list from X and changes nothing.'); return; }
    const start = performance.now();
    const duration = 2200;
    setScan({ running: true, progress: 0 });
    const step = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setScan({ running: t < 1, progress: t });
      if (t < 1) scanTimer.current = requestAnimationFrame(step);
      else setNotice('Sample scan complete. In the extension, a real scan reads your list from X and changes nothing.');
    };
    scanTimer.current = requestAnimationFrame(step);
  }

  function simulateAction() {
    const ids = selectedVisible.map((r) => r.id);
    if (!ids.length) return;
    if (view === 'following') {
      setRemoved((current) => new Set([...current, ...ids]));
      setNotice(`Demo: ${ids.length} sample ${ids.length === 1 ? 'account' : 'accounts'} removed. In UnfollowX Pro this starts a paced run using your delays, breaks and daily limit — and you can pause or stop it.`);
      interact('simulate_unfollow');
    } else {
      setNotice(`Demo: in UnfollowX Pro this would ${filter === 'lost' ? 'unfollow' : 'follow back'} ${ids.length} selected ${ids.length === 1 ? 'account' : 'accounts'} at your chosen pace.`);
      interact(filter === 'lost' ? 'simulate_unfollow' : 'simulate_follow_back');
    }
    setSelected(new Set());
  }

  function reset() {
    setRemoved(new Set());
    setSelected(new Set([3, 5]));
    setKept(new Set([11]));
    setQuery('');
    setNotice('');
    setView('following');
    setFilter('non');
    interact('reset');
  }

  const filters = view === 'following' ? FOLLOWING_FILTERS : FOLLOWER_FILTERS;
  const filterCount = (id) => (view === 'following' ? following.filter((u) => matches(u, id)).length : FOLLOWERS[id].length);
  const scanned = Math.round(scan.progress * 1842);
  const actionLabel = view === 'following' || filter === 'lost' ? 'Unfollow selected' : 'Follow back selected';

  return (
    <div className="demo card" data-reveal="scale">
      <div className="demo-top">
        <div className="segmented" role="group" aria-label="Demo view">
          <button type="button" aria-pressed={view === 'following'} onClick={() => switchView('following')}><Icon name="users" />Following</button>
          <button type="button" aria-pressed={view === 'followers'} onClick={() => switchView('followers')}><Icon name="userCheck" />Followers</button>
        </div>
        <span className="demo-label"><Icon name="info" />Interactive demo · sample accounts · not connected to X</span>
        <button type="button" className="btn btn-secondary btn-sm demo-scan" onClick={runScan} disabled={scan.running} aria-describedby="demo-status">
          <Icon name="refresh" className={scan.running ? 'spin' : ''} />{scan.running ? 'Scanning…' : 'Run sample scan'}
        </button>
      </div>

      <div className="demo-stats">
        {view === 'following' ? (
          <>
            <div><span>Following</span><b className="tabular">{scan.running ? scanned.toLocaleString('en-US') : (1830 + counts.total).toLocaleString('en-US')}</b></div>
            <div className="tone-green"><span>Mutuals</span><b className="tabular">{scan.running ? '…' : (1405 + counts.mutual).toLocaleString('en-US')}</b></div>
            <div className="tone-red"><span>Don’t follow back</span><b className="tabular">{scan.running ? '…' : 425 + counts.non}</b></div>
            <div className="tone-amber"><span>Inactive 90d+</span><b className="tabular">{scan.running ? '…' : 236 + counts.inactive}</b></div>
          </>
        ) : (
          <>
            <div><span>Followers</span><b className="tabular">1,427</b></div>
            <div className="tone-red"><span>Unfollowed you</span><b className="tabular">23</b></div>
            <div className="tone-green"><span>New followers</span><b className="tabular">12</b></div>
            <div><span>You don’t follow back</span><b className="tabular">48</b></div>
          </>
        )}
      </div>

      <div className="demo-progress" aria-hidden={!scan.running}>
        <span style={{ transform: `scaleX(${scan.progress})` }} />
      </div>

      <div className="demo-controls">
        <label className="demo-search">
          <Icon name="search" />
          <span className="visually-hidden">Search sample accounts</span>
          <input
            type="search"
            value={query}
            placeholder="Search name, @handle or bio"
            onChange={(e) => { setQuery(e.target.value); if (e.target.value) interact('search'); }}
            autoComplete="off"
            spellCheck="false"
          />
        </label>
        <div className="chip-row demo-filters" role="group" aria-label="Filter sample accounts">
          {filters.map((f) => (
            <button key={f.id} type="button" className="chip" aria-pressed={filter === f.id} onClick={() => { setFilter(f.id); interact('filter_change'); }}>
              {f.label}<span className="count">{filterCount(f.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`demo-list${scan.running ? ' is-scanning' : ''}`}>
        <div className="demo-head" aria-hidden="true">
          <span />
          <span>Account</span>
          <span className="hide-sm">{view === 'following' ? 'Last active' : 'Status'}</span>
          <span className="hide-sm">Followers</span>
          <span>{view === 'following' ? 'Keep' : ''}</span>
        </div>
        {scan.running ? (
          <div className="demo-scanning" role="status">
            <Icon name="refresh" className="spin" />
            <b>Reading your following list…</b>
            <span className="tabular">{scanned.toLocaleString('en-US')} / 1,842 accounts</span>
          </div>
        ) : rows.length ? (
          <ul className="demo-rows" role="list">
            {rows.map((item, index) => {
              const isKept = view === 'following' && kept.has(item.id);
              const isSel = selected.has(item.id) && !isKept;
              return (
                <li key={`${view}-${item.id}`} className={`demo-row${isSel ? ' is-sel' : ''}${isKept ? ' is-kept' : ''}`} style={{ '--i': index }}>
                  <input
                    type="checkbox"
                    checked={isSel}
                    disabled={isKept}
                    onChange={() => toggleSelect(item.id)}
                    aria-label={isKept ? `${item.n} is protected by your whitelist` : `Select ${item.n}`}
                  />
                  <span className="demo-account">
                    <span className={`hd-avatar ${tones[item.id % tones.length]}`} aria-hidden="true">{initials(item.n)}</span>
                    <span className="demo-name">
                      <b>{item.n}{item.blue ? <Icon name="badgeCheck" className="blue-check" title="Blue check (sample)" /> : null}</b>
                      <small>@{item.h}</small>
                    </span>
                  </span>
                  <span className="demo-meta hide-sm">
                    {view === 'following' ? (
                      <span className={`pill${item.days >= 90 ? ' amber' : ''}`}>{lastActive(item.days)}</span>
                    ) : (
                      <span className="pill">{item.note}</span>
                    )}
                  </span>
                  <span className="demo-meta hide-sm tabular">{compact(item.f)}</span>
                  <span className="demo-keep">
                    {view === 'following' ? (
                      <button type="button" className={`keep-btn${isKept ? ' on' : ''}`} aria-pressed={isKept} aria-label={`${isKept ? 'Remove' : 'Add'} ${item.n} ${isKept ? 'from' : 'to'} whitelist`} onClick={() => toggleKeep(item.id)}>
                        <Icon name="shield" />
                      </button>
                    ) : null}
                  </span>
                  <span className="demo-sub">{view === 'following' ? (item.fy ? 'Follows you' : 'Doesn’t follow you back') : item.when}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="demo-empty">
            <b>No sample accounts match.</b>
            <span>{removed.size ? 'You removed some in the demo — ' : 'Try another filter or search — '}<button type="button" className="link-btn" onClick={reset}>reset the demo</button>.</span>
          </div>
        )}
      </div>

      <div className="demo-bulk">
        <span className="demo-bulk-count"><b className="tabular">{selectedVisible.length}</b> selected</span>
        <button type="button" className="link-btn" onClick={selectAll} disabled={!selectable.length || scan.running}>
          {selectable.length && selectable.every((r) => selected.has(r.id)) ? 'Clear visible' : 'Select all visible'}
        </button>
        <span className="demo-bulk-spacer" />
        {removed.size ? <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>Reset demo</button> : null}
        <button type="button" className="btn btn-primary btn-sm" onClick={simulateAction} disabled={!selectedVisible.length || scan.running}>
          <Icon name={actionLabel.startsWith('Follow') ? 'userPlus' : 'userMinus'} />{actionLabel}
        </button>
      </div>
      <p id="demo-status" className="demo-notice" role="status" aria-live="polite">{notice}</p>
    </div>
  );
}
