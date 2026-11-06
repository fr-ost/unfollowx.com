// Inline stroke icons (24×24 grid, 1.75 stroke). No external icon font or library.
const paths = {
  check: <path d="M5 12.5 10 17.5 19 7" />,
  checkCircle: <><circle cx="12" cy="12" r="9" /><path d="m8 12.3 2.7 2.7L16 9.7" /></>,
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
  arrowDown: <path d="M12 5v14m-6-6 6 6 6-6" />,
  install: <><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5" /><path d="M5 16v2.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V16" /></>,
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>,
  filter: <path d="M4 6h16M7 12h10m-7 6h4" />,
  users: <><circle cx="9" cy="8.5" r="3.5" /><path d="M2.5 19.5c.6-3.4 3.2-5.5 6.5-5.5s5.9 2.1 6.5 5.5" /><path d="M16 5.2a3.5 3.5 0 0 1 0 6.6M18.2 14.4c1.8.8 3 2.6 3.3 5.1" /></>,
  userMinus: <><circle cx="9.5" cy="8" r="3.5" /><path d="M3 19.5c.6-3.4 3.2-5.5 6.5-5.5 1.6 0 3 .5 4.1 1.3" /><path d="M16 17h6" /></>,
  userPlus: <><circle cx="9.5" cy="8" r="3.5" /><path d="M3 19.5c.6-3.4 3.2-5.5 6.5-5.5 1.6 0 3 .5 4.1 1.3" /><path d="M19 14v6m-3-3h6" /></>,
  userCheck: <><circle cx="9.5" cy="8" r="3.5" /><path d="M3 19.5c.6-3.4 3.2-5.5 6.5-5.5 1.6 0 3 .5 4.1 1.3" /><path d="m15.5 17.2 2 2 4-4" /></>,
  arrowsSwap: <path d="M7 4 3 8l4 4M3 8h14m0 4 4 4-4 4m4-4H7" />,
  shield: <><path d="M12 3.5 5 6.3v5.4c0 4.4 3 7.6 7 8.8 4-1.2 7-4.4 7-8.8V6.3Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  sparkle: <path d="M12 3.5c.6 3.9 2.6 5.9 6.5 6.5-3.9.6-5.9 2.6-6.5 6.5-.6-3.9-2.6-5.9-6.5-6.5 3.9-.6 5.9-2.6 6.5-6.5ZM18.5 15.5c.3 1.7 1.1 2.5 2.8 2.8-1.7.3-2.5 1.1-2.8 2.8-.3-1.7-1.1-2.5-2.8-2.8 1.7-.3 2.5-1.1 2.8-2.8Z" />,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  history: <><path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" /><path d="M3.5 4.5V9H8" /><path d="M12 8v4.2l2.8 1.8" /></>,
  download: <><path d="M12 4v11m0 0 4-4m-4 4-4-4" /><path d="M5 19h14" /></>,
  upload: <><path d="M12 15V4m0 0 4 4m-4-4L8 8" /><path d="M5 19h14" /></>,
  file: <><path d="M14 3.5H7.5A1.5 1.5 0 0 0 6 5v14a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V7.5Z" /><path d="M14 3.5v4h4M9 13h6m-6 3.5h4" /></>,
  layers: <><path d="m12 4 8.5 4.5L12 13 3.5 8.5Z" /><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" /></>,
  refresh: <><path d="M20 11.5A8 8 0 0 0 6 6.6L4 8.5" /><path d="M4 4.5v4h4M4 12.5a8 8 0 0 0 14 4.9l2-1.9" /><path d="M20 19.5v-4h-4" /></>,
  pause: <path d="M9 5v14m6-14v14" />,
  play: <path d="M8 5.5v13l10.5-6.5Z" />,
  stop: <rect x="6" y="6" width="12" height="12" rx="2" />,
  sliders: <><path d="M4 7h9m4 0h3M4 17h3m4 0h9" /><circle cx="15" cy="7" r="2" /><circle cx="9" cy="17" r="2" /></>,
  globe: <><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5S9.7 5.9 12 3.5Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v2m0 15v2M4.6 4.6 6 6m12 12 1.4 1.4M2.5 12h2m15 0h2M4.6 19.4 6 18M18 6l1.4-1.4" /></>,
  moon: <path d="M19.5 14.8A8 8 0 0 1 9.2 4.5 8.2 8.2 0 1 0 19.5 14.8Z" />,
  lock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 7 0v2.7" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 8.5-8.5M16.5 6.5l2.5 2.5M14 9l2 2" /></>,
  bell: <><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2H4.5Z" /><path d="M10 20.5a2.2 2.2 0 0 0 4 0" /></>,
  chart: <><path d="M4 4v16h16" /><path d="m7.5 14.5 3.5-4 3 2.5 5-6" /></>,
  infinity: <path d="M12 12c-1.8-2.4-3.4-3.6-5-3.6a3.6 3.6 0 0 0 0 7.2c1.6 0 3.2-1.2 5-3.6Zm0 0c1.8 2.4 3.4 3.6 5 3.6a3.6 3.6 0 0 0 0-7.2c-1.6 0-3.2 1.2-5 3.6Z" />,
  tag: <><path d="M3.5 12.2V4.8a1.3 1.3 0 0 1 1.3-1.3h7.4l8.3 8.3a1.3 1.3 0 0 1 0 1.8l-7.4 7.4a1.3 1.3 0 0 1-1.8 0Z" /><circle cx="8" cy="8" r="1.4" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  info: <><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5.5M12 7.8v.1" /></>,
  alert: <><path d="M12 4 2.8 19.5h18.4Z" /><path d="M12 10v4.2M12 17v.1" /></>,
  book: <><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v16H5.5A1.5 1.5 0 0 1 4 18.5Z" /><path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v16h5.5a1.5 1.5 0 0 0 1.5-1.5Z" /></>,
  zap: <path d="M13 3 5 13.5h6L10 21l8-10.5h-6Z" />,
  heart: <path d="M12 19.5s-7.5-4.4-7.5-9.7A4.2 4.2 0 0 1 12 7.4a4.2 4.2 0 0 1 7.5 2.4c0 5.3-7.5 9.7-7.5 9.7Z" />,
  database: <><ellipse cx="12" cy="6" rx="7" ry="2.5" /><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" /></>,
  trash: <path d="M4.5 7h15M10 7V4.5h4V7m-7.5 0 .8 12a1.5 1.5 0 0 0 1.5 1.5h6.4a1.5 1.5 0 0 0 1.5-1.5l.8-12M10 11v6m4-6v6" />,
  badgeCheck: <><path d="m12 3 2.3 1.6 2.8-.1.9 2.7 2.2 1.7-.9 2.7.9 2.7-2.2 1.7-.9 2.7-2.8-.1L12 21l-2.3-1.6-2.8.1-.9-2.7-2.2-1.7.9-2.7-.9-2.7 2.2-1.7.9-2.7 2.8.1Z" /><path d="m9 12 2 2 4-4" /></>,
  badgeOff: <><path d="m12 3 2.3 1.6 2.8-.1.9 2.7 2.2 1.7-.9 2.7.9 2.7-2.2 1.7-.9 2.7-2.8-.1L12 21l-2.3-1.6-2.8.1-.9-2.7-2.2-1.7.9-2.7-.9-2.7 2.2-1.7.9-2.7 2.8.1Z" /><path d="M9 9l6 6" /></>,
  activity: <path d="M3 12h4l2.5-6.5 5 13L17 12h4" />,
  moonZ: <><path d="M17.5 14.8A7 7 0 0 1 8.7 6a7.2 7.2 0 1 0 8.8 8.8Z" /><path d="M15 4h4l-4 4h4" /></>,
  list: <path d="M9 6.5h11M9 12h11M9 17.5h11M4.5 6.5h.1M4.5 12h.1M4.5 17.5h.1" />,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2 5-5 2 2-5Z" /></>,
  wallet: <><path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18v3" /><rect x="4" y="8" width="16" height="11" rx="2.5" /><path d="M16 13.5h.1" /></>,
  receipt: <><path d="M6 3.5h12v17l-2.4-1.5-2.4 1.5-1.2-.8-1.2.8-2.4-1.5L6 20.5Z" /><path d="M9 8h6m-6 3.5h6M9 15h3.5" /></>,
  ban: <><circle cx="12" cy="12" r="8.5" /><path d="m6 6 12 12" /></>,
  card: <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="M3 10h18M7 15h3" /></>,
  unlock: <><rect x="5" y="10.5" width="14" height="10" rx="2.5" /><path d="M8.5 10.5V7.8a3.5 3.5 0 0 1 6.8-1.2" /></>,
  mail: <><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" /><path d="m4.5 7 7.5 6 7.5-6" /></>,
  send: <path d="M20.5 3.5 10 14M20.5 3.5 14 20.5l-4-6.5-6.5-4Z" />,
  monitor: <><rect x="3" y="4.5" width="18" height="12" rx="2" /><path d="M9 20h6m-3-3.5V20" /></>,
  smartphone: <><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  keyboard: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M7 10h.1M10 10h.1M13 10h.1M16 10h.1M8 14h8" /></>,
  eye: <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="3" /></>
};

export default function Icon({ name, size, className, title, strokeWidth = 1.75 }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={name === 'play' || name === 'stop' ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  );
}
