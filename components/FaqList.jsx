'use client';
import { useMemo, useState } from 'react';
const questions = [
  ['start','What is UnfollowX Pro?','UnfollowX Pro is a Chrome extension for reviewing your X following list. It can identify non-followers, track changes between follower checks, filter accounts and help you manage follow or unfollow actions.'],
  ['start','How do I see who doesn’t follow me back on X?','Install UnfollowX Pro from the Chrome Web Store, open x.com in Chrome and run a scan from the extension. Review the “Don’t follow back” results before selecting any action.'],
  ['features','How can I see who unfollowed me?','Run a followers check to save a baseline, then check again later. The extension compares complete snapshots and lists accounts that are new or no longer present. It cannot reconstruct changes from before your first snapshot.'],
  ['start','Does it work on Twitter and X?','The extension supports x.com and twitter.com in Google Chrome. X may change its website, so compatibility can change over time.'],
  ['privacy','Does UnfollowX Pro need my X password?','No. It uses the X session you already have open in Chrome. It does not request or store your X password.'],
  ['privacy','Where are my lists and history stored?','The extension stores settings, scan data, whitelist, follower snapshots, groups and action history in Chrome extension storage on your device. Its privacy policy explains the optional anonymous usage events separately.'],
  ['privacy','What are anonymous usage statistics?','If enabled, the extension sends an install identifier, extension version and event information such as install or daily activity; active events include an aggregate follow/unfollow action count. The extension states that it does not send your X account or lists. You can turn this off in Dashboard → Settings → Privacy → Anonymous usage stats.'],
  ['features','Can I choose exactly who to unfollow?','Yes. Review the scanned list, search or filter it, then select individual accounts or a group. Whitelist and Keep rules are applied to supported bulk cleanup modes. Check your selection before starting.'],
  ['safety','Can I pause or stop a run?','Yes. You can pause, resume or stop. The extension supports action delays, breaks and a rolling daily limit. X may still rate-limit or restrict activity, so use reasonable settings and stop if X shows a warning or verification request.'],
  ['features','Can I undo an unfollow?','The extension keeps a local history of accounts it has unfollowed. You can select an account in History and follow it again, subject to X’s current behavior and limits.'],
  ['start','Is it free? Do I need an account?','The extension is free to install and use, and it does not require a separate UnfollowX account. The Chrome Web Store listing is the source for current availability and version details.'],
  ['privacy','How do I delete extension data?','Use Dashboard → Settings → Delete all extension data, or remove the extension from Chrome. This deletes the local extension data associated with it.'],
  ['start','What browsers and languages are supported?','The extension is built for Google Chrome. The interface currently includes English, Spanish, Portuguese (Brazil), Hindi, Indonesian, Turkish and Arabic.']
];
const filters=[['all','All questions'],['start','Getting started'],['features','Features'],['privacy','Privacy'],['safety','Controls']];
export default function FaqList(){
  const [filter,setFilter]=useState('all'),[open,setOpen]=useState(null);
  const visible=useMemo(()=>questions.map((q,i)=>[...q,i]).filter(q=>filter==='all'||q[0]===filter),[filter]);
  return <><div className="faq-cats">{filters.map(([id,label])=><button key={id} className={filter===id?'active':''} onClick={()=>{setFilter(id);setOpen(null);}}>{label}</button>)}</div><div className="faq-list">{visible.map(([category,question,answer,index])=><div className={`faq-item ${open===index?'open':''}`} key={question}><button className="faq-q" aria-expanded={open===index} onClick={()=>setOpen(open===index?null:index)}>{question}<span>+</span></button>{open===index&&<div className="faq-a">{answer}{index===1&&<> <a href="https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl" target="_blank" rel="noopener">Install from the Chrome Web Store ↗</a></>}</div>}</div>)}</div></>;
}
