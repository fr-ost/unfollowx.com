'use client';
import { useState } from 'react';
const presets=[
  {name:'Safe',delay:'15–35 sec',limit:'250 actions',breakEvery:'30 actions',breakLength:'10 min'},
  {name:'Balanced',delay:'8–20 sec',limit:'400 actions',breakEvery:'50 actions',breakLength:'6 min'},
  {name:'Fast',delay:'4–10 sec',limit:'1,000 actions',breakEvery:'80 actions',breakLength:'5 min'}
];
export default function PaceDemo(){
  const [pace,setPace]=useState(50); const preset=presets[pace<34?0:pace<68?1:2];
  return <div className="pace-preview"><div className="pace-head"><b>{preset.name}</b><span className="pace-safe">● Steady pace</span></div><input className="pace-range" aria-label="Explore speed presets" type="range" min="0" max="100" value={pace} aria-valuetext={`${preset.name} pace: ${preset.delay} between actions, ${preset.limit} per day`} onChange={e=>setPace(Number(e.target.value))} style={{'--pace-fill':`${pace}%`}}/><div className="pace-labels"><span>Gentle</span><span>Fast</span></div><div className="pace-separator"/><div className="pace-stats"><span>Between actions<b>{preset.delay}</b></span><span>Daily limit<b>{preset.limit}</b></span></div><div className="pace-button"><span>▶</span> Break every {preset.breakEvery.split(' ')[0]} · {preset.breakLength} rest</div></div>;
}
