import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Free Circleboom alternative for mass unfollow on Twitter (X)';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Circleboom alternative', title: 'A free alternative for mass unfollow on Twitter (X)', subtitle: 'UnfollowX Pro: a free Chrome extension. No password, no subscription, whitelist always respected.' });
}
