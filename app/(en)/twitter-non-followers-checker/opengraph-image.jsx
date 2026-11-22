import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'Free Twitter non-followers checker';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Non-followers checker · Free', title: 'Unfollow non-followers on Twitter (X).', subtitle: 'A free, read-only scan of your following list. No password, no sign-up, no limits.' });
}
