import Link from 'next/link';
import Icon from '@/components/Icon';
import InstallLink from '@/components/InstallLink';

// A deliberately small Markdown subset for articles in content/articles/*.md.
// Block syntax: ## h2, ### h3, paragraphs, - lists, 1. lists, | tables |,
// > [!NOTE] / > [!WARNING] callouts, --- rules, and a [[cta]] install box.
// Inline syntax: **bold**, *italic*, `code`, [text](href).
// Rendering happens at build time on the server; no Markdown library ships.

export const slugify = (text) =>
  text.toLowerCase().replace(/[’'"]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);

function inline(text, key = 'i') {
  const out = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`/g;
  let last = 0;
  let m;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const k = `${key}-${n++}`;
    if (m[1]) {
      const href = m[2];
      if (href.startsWith('/') || href.startsWith('#')) out.push(<Link key={k} href={href}>{inline(m[1], k)}</Link>);
      else out.push(<a key={k} href={href} target="_blank" rel="noopener">{inline(m[1], k)}</a>);
    } else if (m[3]) out.push(<strong key={k}>{inline(m[3], k)}</strong>);
    else if (m[4]) out.push(<em key={k}>{m[4]}</em>);
    else out.push(<code key={k}>{m[5]}</code>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function parseMarkdown(source) {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }
    if (line.startsWith('### ')) { blocks.push({ type: 'h3', text: line.slice(4).trim() }); i++; continue; }
    if (line.startsWith('## ')) { blocks.push({ type: 'h2', text: line.slice(3).trim() }); i++; continue; }
    if (line.trim() === '---') { blocks.push({ type: 'hr' }); i++; continue; }
    if (line.trim() === '[[cta]]') { blocks.push({ type: 'cta' }); i++; continue; }
    if (line.startsWith('>')) {
      const body = [];
      while (i < lines.length && lines[i].startsWith('>')) { body.push(lines[i].replace(/^>\s?/, '')); i++; }
      let kind = 'note';
      if (/^\[!(NOTE|WARNING|TIP)\]/.test(body[0])) { kind = body[0].match(/^\[!(\w+)\]/)[1].toLowerCase(); body[0] = body[0].replace(/^\[!\w+\]\s*/, ''); }
      blocks.push({ type: 'callout', kind, text: body.join(' ').trim() });
      continue;
    }
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) { items.push(lines[i].slice(2).trim()); i++; }
      blocks.push({ type: 'ul', items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) { items.push(lines[i].replace(/^\d+\.\s/, '').trim()); i++; }
      blocks.push({ type: 'ol', items });
      continue;
    }
    if (line.startsWith('|')) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) { rows.push(lines[i]); i++; }
      const cells = (row) => row.replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
      const [head, , ...body] = rows;
      blocks.push({ type: 'table', head: cells(head), rows: body.map(cells) });
      continue;
    }
    const para = [];
    while (i < lines.length && lines[i].trim() && !/^(#{2,3} |- |\d+\. |>|\||---$|\[\[cta\]\])/.test(lines[i])) { para.push(lines[i].trim()); i++; }
    blocks.push({ type: 'p', text: para.join(' ') });
  }
  return blocks;
}

export function headingsOf(blocks) {
  return blocks.filter((b) => b.type === 'h2').map((b) => ({ id: slugify(b.text), text: b.text }));
}

export function wordCount(source) {
  return source.replace(/[#>*`|\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
}

export function renderBlocks(blocks, { ctaLocation = 'blog_inline' } = {}) {
  return blocks.map((b, index) => {
    const key = `b${index}`;
    switch (b.type) {
      case 'h2': return <h2 key={key} id={slugify(b.text)}>{inline(b.text, key)}</h2>;
      case 'h3': return <h3 key={key} id={slugify(b.text)}>{inline(b.text, key)}</h3>;
      case 'hr': return <hr key={key} />;
      case 'ul': return <ul key={key}>{b.items.map((item, j) => <li key={j}>{inline(item, `${key}-${j}`)}</li>)}</ul>;
      case 'ol': return <ol key={key}>{b.items.map((item, j) => <li key={j}>{inline(item, `${key}-${j}`)}</li>)}</ol>;
      case 'callout':
        return (
          <div key={key} className={`callout${b.kind === 'warning' ? ' warn' : ''}`}>
            <Icon name={b.kind === 'warning' ? 'alert' : b.kind === 'tip' ? 'sparkle' : 'info'} />
            <p>{inline(b.text, key)}</p>
          </div>
        );
      case 'table':
        return (
          <div key={key} className="table-wrap">
            <table>
              <thead><tr>{b.head.map((h, j) => <th key={j} scope="col">{inline(h, `${key}-h${j}`)}</th>)}</tr></thead>
              <tbody>{b.rows.map((row, r) => <tr key={r}>{row.map((c, j) => (j === 0 ? <th key={j} scope="row">{inline(c, `${key}-${r}-${j}`)}</th> : <td key={j}>{inline(c, `${key}-${r}-${j}`)}</td>))}</tr>)}</tbody>
            </table>
          </div>
        );
      case 'cta':
        return (
          <aside key={key} className="inline-cta" aria-label="Try UnfollowX Pro">
            <div>
              <b>Try it with UnfollowX Pro — free forever</b>
              <span>A Chrome extension for X. No sign-up, no X password, no premium plan.</span>
            </div>
            <InstallLink location={ctaLocation} size="sm" />
          </aside>
        );
      default: return <p key={key}>{inline(b.text, key)}</p>;
    }
  });
}
