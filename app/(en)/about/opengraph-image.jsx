import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'About UnfollowX Pro';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'About', title: 'Who makes UnfollowX Pro', subtitle: 'An independent, free Chrome extension for Twitter (X), built and supported by one developer.' });
}
