import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Shared Open Graph / Twitter card renderer (1200×630 PNG, generated at build).
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = 'image/png';

const fontsPromise = Promise.all([
  readFile(join(process.cwd(), 'lib/og-fonts/bricolage-700.woff')),
  readFile(join(process.cwd(), 'lib/og-fonts/inter-500.woff')),
  readFile(join(process.cwd(), 'public/assets/logo.svg'))
]);

export async function renderOg({ eyebrow = 'Free forever · Unlimited', title, subtitle }) {
  const [display, body, logo] = await fontsPromise;
  const logoSrc = `data:image/svg+xml;base64,${logo.toString('base64')}`;
  const titleSize = title.length > 70 ? 54 : title.length > 48 ? 62 : 72;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: '#07090f', color: '#eef1f8', fontFamily: 'Inter', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -260, right: -180, width: 820, height: 820, borderRadius: 9999, background: 'radial-gradient(closest-side, rgba(91,84,240,.55), rgba(7,9,15,0))', display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -300, left: -200, width: 760, height: 760, borderRadius: 9999, background: 'radial-gradient(closest-side, rgba(59,130,246,.32), rgba(7,9,15,0))', display: 'flex' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <img src={logoSrc} width={64} height={64} style={{ borderRadius: 18 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 34, fontFamily: 'Bricolage', letterSpacing: -1 }}>
            UnfollowX
            <span style={{ fontSize: 16, fontFamily: 'Inter', letterSpacing: 3, padding: '6px 10px', borderRadius: 8, background: 'rgba(139,147,255,.18)', color: '#b7bdff' }}>PRO</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 1000 }}>
          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: 20, letterSpacing: 2.5, textTransform: 'uppercase', color: '#7ee2b8', padding: '8px 16px', borderRadius: 999, border: '1.5px solid rgba(126,226,184,.4)', background: 'rgba(18,184,134,.12)' }}>{eyebrow}</span>
          </div>
          <div style={{ fontFamily: 'Bricolage', fontSize: titleSize, lineHeight: 1.04, letterSpacing: -2.5, color: '#ffffff' }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 28, lineHeight: 1.4, color: '#a8b1c8', maxWidth: 940 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, color: '#a8b1c8' }}>
          <span>www.unfollowx.com</span>
          <span style={{ display: 'flex', gap: 14 }}>
            <span>No subscription</span><span style={{ color: '#5b6480' }}>·</span><span>No premium plan</span><span style={{ color: '#5b6480' }}>·</span><span>Chrome extension</span>
          </span>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Bricolage', data: display, weight: 700, style: 'normal' },
        { name: 'Inter', data: body, weight: 500, style: 'normal' }
      ]
    }
  );
}
