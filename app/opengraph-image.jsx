import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'UnfollowX Pro — the free and unlimited X unfollow tool';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: 'Free forever · Unlimited',
    title: 'The Ultimate X Unfollow Tool. Free Forever.',
    subtitle: 'Find non-followers, track unfollowers, filter inactive accounts and clean up your X following list.'
  });
}
