import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'How to set up UnfollowX Pro in Chrome';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Setup guide', title: 'Set up UnfollowX Pro in Chrome', subtitle: 'Install, run a read-only scan, protect who matters and choose your pace — in about five minutes.' });
}
