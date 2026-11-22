import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro — mass unfollow on Twitter (X), free and at a safe pace';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: 'Free Chrome extension · Safe pace',
    title: 'Mass unfollow on Twitter (X) — free, safe and in bulk',
    subtitle: 'Find who doesn’t follow you back, then bulk unfollow at a human pace while your whitelist stays safe.'
  });
}
