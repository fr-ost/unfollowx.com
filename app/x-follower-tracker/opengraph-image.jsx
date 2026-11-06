import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Free X follower tracker';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Follower tracker · Free', title: 'See who unfollowed you on X — and who’s new.', subtitle: 'Snapshot comparison that never compares partial reads. Free, and your data stays on your device.' });
}
