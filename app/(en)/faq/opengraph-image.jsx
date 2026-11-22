import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro FAQ';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'FAQ', title: 'Questions, answered honestly.', subtitle: 'Free forever, X limits, privacy and features — including the fine print.' });
}
