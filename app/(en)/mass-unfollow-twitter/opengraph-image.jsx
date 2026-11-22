import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Mass unfollow on Twitter (X) — free bulk unfollow tool';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Free bulk unfollow tool', title: 'Mass Unfollow on Twitter (X)', subtitle: 'Filter non-followers and inactive accounts, then bulk unfollow at a safe pace. Whitelist always respected.' });
}
