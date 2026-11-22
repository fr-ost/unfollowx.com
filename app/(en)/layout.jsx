import RootDocument, { rootMetadata, rootViewport } from '@/app/_root/RootDocument';

// Root layout for every English page: <html lang="en">.
export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnglishRootLayout({ children }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
