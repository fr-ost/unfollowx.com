'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import { pagePath, track } from '@/lib/analytics';

// Copies a value (e.g. the support email) to the clipboard. Analytics only
// records that a copy happened (cta_name), never the copied value.
export default function CopyButton({ value, label, name }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    track('cta_click', { cta_name: name, cta_location: 'support_box', page_path: pagePath() });
    window.setTimeout(() => setCopied(false), 1600);
  }
  return (
    <button type="button" className={`copy-btn${copied ? ' is-copied' : ''}`} onClick={copy} aria-label={`Copy ${label}`}>
      <Icon name={copied ? 'check' : 'file'} />
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}
