import Link from 'next/link';

// Renders a string with [text](href) links and **bold** spans. Pure, so it
// works in server and client components alike.
export function richText(text, keyPrefix = 'r') {
  const out = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match;
  let i = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1]) {
      const href = match[2];
      const key = `${keyPrefix}-${i++}`;
      if (href.startsWith('/') || href.startsWith('#')) out.push(<Link key={key} href={href}>{match[1]}</Link>);
      else out.push(<a key={key} href={href} target="_blank" rel="noopener">{match[1]}</a>);
    } else {
      out.push(<strong key={`${keyPrefix}-${i++}`}>{match[3]}</strong>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
