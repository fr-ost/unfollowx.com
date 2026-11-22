import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro features';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'Features · all free', title: 'Every feature. No premium tier.', subtitle: 'Non-follower finder, unfollower tracker, inactive filters, whitelist, Keep rules, CSV and paced runs.' });
}
