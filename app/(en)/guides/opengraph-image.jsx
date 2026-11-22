import { ogContentType, ogSize, renderOg } from '@/lib/og';

export const alt = 'How-to guides for managing your X following';
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: 'How-to guides', title: 'What do you want to do on X?', subtitle: 'Short answers and step-by-step guides for every common following-list task.' });
}
