'use client';
import { useRef, useState } from 'react';

const lists = {
  non: [['A','avatar-purple','Atlas Archive','@atlasarchive','Doesn’t follow back'],['M','avatar-orange','Monday Studio','@mondaystudio','Last post · 8 mo ago'],['N','avatar-green','Northbound','@northbound','Doesn’t follow back']],
  mutual: [['L','avatar-green','Lena Park','@lenapark','Follows you back'],['O','avatar-purple','Open Field','@openfield','Follows you back'],['J','avatar-orange','Juniper House','@juniperhouse','Follows you back']],
  inactive: [['M','avatar-orange','Monday Studio','@mondaystudio','Last post · 8 mo ago'],['B','avatar-purple','Blue Hour Notes','@bluehour','Last post · 5 mo ago'],['W','avatar-green','Westward Journal','@westward','Last post · 4 mo ago']]
};
const tabs = [['non','Don’t follow back','346'],['mutual','Mutuals','938'],['inactive','Inactive','84']];
const STORE = 'https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl';

export default function InteractivePreview() {
  const [view,setView] = useState('non');
  const [kept,setKept] = useState({});
  const [scanning,setScanning] = useState(false);
  const [updated,setUpdated] = useState(false);
  const timer = useRef();
  function refresh() {
    if(scanning) return;
    setScanning(true); setUpdated(false);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { setScanning(false); setUpdated(true); },850);
  }
  return <div className="hero-visual"><div className="visual-halo halo-one"/><div className="visual-halo halo-two"/><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="product-window" id="productWindow">
    <div className="window-chrome"><div className="window-dots"><i/><i/><i/></div><div className="window-url"><span>◈</span> UnfollowX Pro <span className="url-muted">/ overview</span></div><div className="window-account"><span className="account-dot"/> X connected</div></div>
    <div className="product-app"><aside className="product-sidebar"><div className="product-logo"><img src="/assets/logo.svg" alt=""/><span>UnfollowX<small>Pro</small></span></div><div className="side-link active"><span>▦</span> Overview</div><div className="side-link"><span>◎</span> Following</div><div className="side-link"><span>♧</span> Followers</div><div className="side-link"><span>♡</span> Whitelist</div><div className="side-link"><span>◷</span> History</div><div className="side-divider"/><div className="side-link"><span>⚙</span> Settings</div><div className="sidebar-bottom"><span className="mini-avatar">U</span><span><b>Your account</b><small>Connected on X</small></span><span className="dots-more">···</span></div></aside>
      <div className="product-content"><div className="app-welcome"><div><span className="app-kicker">YOUR X ACCOUNT</span><h2>Your connections, at a glance.</h2><p>A little clarity goes a long way.</p></div><button className={`scan-button ${scanning?'scanning':''}`} onClick={refresh}><span>{updated?'✓':'↻'}</span> <b>{scanning?'Refreshing preview…':updated?'Preview refreshed':'Preview scan'}</b></button></div>
      <div className="metric-row"><div className="metric-card"><div className="metric-label"><span className="metric-icon icon-blue">◎</span> FOLLOWING</div><div className="metric-value"><b>1,284</b><span>accounts</span></div><div className="metric-foot">Your full list <span>↗</span></div></div><div className="metric-card"><div className="metric-label"><span className="metric-icon icon-green">↔</span> MUTUALS</div><div className="metric-value"><b>938</b><span>follow back</span></div><div className="metric-foot">A two-way connection <span>✓</span></div></div><div className="metric-card accent-card"><div className="metric-label"><span className="metric-icon icon-red">↗</span> NON-FOLLOWERS</div><div className="metric-value"><b>346</b><span>to review</span></div><div className="metric-foot">You decide what’s next <span>→</span></div></div></div>
      <div className="activity-panel"><div className="panel-heading"><div><h3>Your following</h3><p>A sample of your scan results</p></div><button className="filter-button">Filters <span>⌄</span></button></div><div className="account-tabs" role="tablist">{tabs.map(([id,label,count])=><button key={id} role="tab" aria-selected={view===id} className={`account-tab ${view===id?'selected':''}`} onClick={()=>setView(id)}>{label} <span>{count}</span></button>)}</div><div className="account-list">{lists[view].map(([letter,avatar,name,handle,status])=><div className="account-row" key={handle}><span className={`user-avatar ${avatar}`}>{letter}</span><span className="user-info"><b>{name}</b><small>{handle}</small></span><span className="row-status">{status}</span><button className={`row-keep ${kept[handle]?'kept':''}`} aria-label={`${kept[handle]?'Remove':'Keep'} ${name}`} aria-pressed={!!kept[handle]} onClick={()=>setKept({...kept,[handle]:!kept[handle]})}>{kept[handle]?'♥':'♡'}</button></div>)}</div><div className="panel-bottom"><span><i/> Sample dashboard preview</span><a href={STORE} target="_blank" rel="noopener">Explore the extension <span>→</span></a></div></div><div className="app-foot"><span>{updated?'Preview · just refreshed':'Last scan · just now'}</span><span className="local-lock">▣ Saved in your browser</span></div></div>
    </div></div><div className="float-chip chip-top"><span className="chip-spark">✧</span><span><b>Thoughtful by design</b><small>You review every move</small></span></div><div className="float-chip chip-bottom"><span className="chip-ring">✓</span><span><b>Your list stays local</b><small>Stored in Chrome on your device</small></span></div><div className="visual-caption">A LITTLE MORE CLARITY. A LOT MORE YOU.</div></div>;
}
