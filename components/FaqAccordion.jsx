'use client';

import { useMemo, useState } from 'react';
import { richText } from '@/components/RichText';
import { pagePath, track } from '@/lib/analytics';

// Native <details> accordion: works without JavaScript, content is always in
// the HTML for search engines and screen readers. JS adds category filtering
// and the GA4 faq_expand event.
export default function FaqAccordion({ items, categories, idPrefix = 'faq' }) {
  const [active, setActive] = useState('all');
  const visible = useMemo(() => (active === 'all' ? items : items.filter((item) => item.category === active)), [items, active]);

  const onToggle = (item) => (event) => {
    if (event.currentTarget.open) track('faq_expand', { faq_question: item.q, page_path: pagePath() });
  };

  return (
    <div className="faq-accordion">
      {categories ? (
        <div className="chip-row" role="group" aria-label="Filter questions by topic">
          {[{ id: 'all', label: 'All questions' }, ...categories].map((cat) => (
            <button key={cat.id} type="button" className="chip" aria-pressed={active === cat.id} onClick={() => setActive(cat.id)}>
              {cat.label}
              <span className="count">{cat.id === 'all' ? items.length : items.filter((item) => item.category === cat.id).length}</span>
            </button>
          ))}
        </div>
      ) : null}
      <div className="accordion">
        {visible.map((item) => (
          <details key={item.id} id={`${idPrefix}-${item.id}`} onToggle={onToggle(item)}>
            <summary>
              <h3 className="acc-q">{item.q}</h3>
              <span className="acc-icon" aria-hidden="true" />
            </summary>
            <div className="acc-body">
              {item.a.map((paragraph, index) => <p key={index}>{richText(paragraph, `${item.id}-${index}`)}</p>)}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
