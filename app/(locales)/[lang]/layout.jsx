import RootDocument, { rootMetadata, rootViewport } from '@/app/_root/RootDocument';
import { LOCALES, LOCALE_SLUGS } from '@/lib/i18n';

// Root layout for the localized landing pages (/es, /pt-br, /hi, /id, /tr,
// /ar): <html lang> and dir come from the route, e.g. lang="pt-BR",
// and lang="ar" dir="rtl" for Arabic.
export const metadata = rootMetadata;
export const viewport = rootViewport;
export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALE_SLUGS.map((lang) => ({ lang }));
}

export default async function LocaleRootLayout({ children, params }) {
  const { lang } = await params;
  const locale = LOCALES.find((l) => l.slug === lang);
  return <RootDocument lang={locale?.hreflang || 'en'} dir={locale?.dir || 'ltr'}>{children}</RootDocument>;
}
