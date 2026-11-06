import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro blog';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Blog', title: 'Smarter ways to manage your X network.', subtitle: 'Guides to following, followers and unfollowing on X.' });
}
