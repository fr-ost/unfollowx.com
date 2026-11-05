'use client';

import { useRef, useState } from 'react';

const STORE = 'https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl';

const lists = {
  non: [
    ['A', 'avatar-purple', 'Atlas Archive', '@atlasarchive', 'Doesn’t follow back'],
    ['M', 'avatar-orange', 'Monday Studio', '@mondaystudio', 'Last post · 8 mo ago'],
    ['N', 'avatar-green', 'Northbound', '@northbound', 'Doesn’t follow back']
  ],
  mutual: [
    ['L', 'avatar-green', 'Lena Park', '@lenapark', 'Follows you back'],
    ['O', 'avatar-purple', 'Open Field', '@openfield', 'Follows you back'],
    ['J', 'avatar-orange', 'Juniper House', '@juniperhouse', 'Follows you back']
  ],
  inactive: [
    ['M', 'avatar-orange', 'Monday Studio', '@mondaystudio', 'Last post · 8 mo ago'],
    ['B', 'avatar-purple', 'Blue Hour Notes', '@bluehour', 'Last post · 5 mo ago'],
    ['W', 'avatar-green', 'Westward Journal', '@westward', 'Last post · 4 mo ago']
  ]
};

const tabs = [
  ['non', 'Don’t follow back', '346'],
  ['mutual', 'Mutuals', '938'],
  ['inactive', 'Inactive', '84']
];

export default function InteractivePreview() {
  const [view, setView] = useState('non');
  const [kept, setKept] = useState({});
  const [scanning, setScanning] = useState(false);
  const [updated, setUpdated] = useState(false);
  const timer = useRef(null);

  function refreshPreview() {
    if (scanning) return;
    setScanning(true);
    setUpdated(false);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setScanning(false);
      setUpdated(true);
    }, 700);
  }

  return <div className="hero-visual">
    <div className="product-window">
      <div className="window-chrome">
        <div className="window-dots"><i/><i/><i/></div>
        <div className="window-url"><span>◈</span> unfollowx.pro <span className="url-muted">/ dashboard</span></div>
        <div className="window-account"><span className="account-dot"/> X connected</div>
      </div>

      <div className="product-app">
        <div className="product-content">
          <div className="app-welcome">
            <div>
              <span className="app-kicker">YOUR X ACCOUNT</span>
              <h2>Your connections, at a glance.</h2>
              <p>Review your list. Decide what stays.</p>
            </div>
            <button className={'scan-button ' + (scanning ? 'scanning' : '')} onClick={refreshPreview} aria-busy={scanning}>
              <span aria-hidden="true">{updated ? '✓' : '↻'}</span>
              <b>{scanning ? 'Refreshing…' : updated ? 'Preview updated' : 'Preview scan'}</b>
            </button>
          </div>

          <div className="metric-row">
            <div className="metric-card">
              <div className="metric-label"><span className="metric-icon icon-blue">◎</span> FOLLOWING</div>
              <div className="metric-value"><b>1,284</b><span>accounts</span></div>
              <div className="metric-foot">Your full list</div>
            </div>
            <div className="metric-card">
              <div className="metric-label"><span className="metric-icon icon-green">↔</span> MUTUALS</div>
              <div className="metric-value"><b>938</b><span>follow back</span></div>
              <div className="metric-foot">Two-way connections</div>
            </div>
            <div className="metric-card accent-card">
              <div className="metric-label"><span className="metric-icon icon-red">↗</span> TO REVIEW</div>
              <div className="metric-value"><b>346</b><span>non-followers</span></div>
              <div className="metric-foot">You choose what’s next</div>
            </div>
          </div>

          <div className="activity-panel">
            <div className="panel-heading">
              <div><h3>Your following</h3><p>A sample of your scan results</p></div>
              <span className="filter-button">Filters <span aria-hidden="true">⌄</span></span>
            </div>
            <div className="account-tabs" role="tablist" aria-label="Sample account groups">
              {tabs.map(([id, label, count]) => <button key={id} role="tab" aria-selected={view === id} className={'account-tab ' + (view === id ? 'selected' : '')} onClick={() => setView(id)}>
                {label}<span>{count}</span>
              </button>)}
            </div>
            <div className="account-list" role="tabpanel">
              {lists[view].map(([letter, avatar, name, handle, status]) => <div className="account-row" key={handle}>
                <span className={'user-avatar ' + avatar}>{letter}</span>
                <span className="user-info"><b>{name}</b><small>{handle}</small></span>
                <span className="row-status">{status}</span>
                <button className={'row-keep ' + (kept[handle] ? 'kept' : '')} aria-label={(kept[handle] ? 'Remove ' : 'Keep ') + name} aria-pressed={!!kept[handle]} onClick={() => setKept((current) => ({ ...current, [handle]: !current[handle] }))}>
                  {kept[handle] ? '♥' : '♡'}
                </button>
              </div>)}
            </div>
            <div className="panel-bottom"><span><i/> Sample data · Your lists stay in Chrome</span><a href={STORE} target="_blank" rel="noopener">See the extension <span>↗</span></a></div>
          </div>
          <div className="app-foot"><span>{updated ? 'Preview · just refreshed' : 'A look inside UnfollowX Pro'}</span><span className="local-lock">Chrome extension</span></div>
        </div>
      </div>
    </div>
  </div>;
}
