import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro privacy policy';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Privacy policy', title: 'Your data, clearly explained.', subtitle: 'Lists stay in Chrome storage. Optional anonymous stats. Website analytics only with consent.' });
}
