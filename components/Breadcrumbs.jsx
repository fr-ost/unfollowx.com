import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';

// Visible breadcrumb trail plus matching BreadcrumbList structured data.
// items: [{ name, path }] — the last item is the current page.
export default function Breadcrumbs({ items, className = '' }) {
  const trail = [{ name: 'Home', path: '/' }, ...items];
  return (
    <nav className={`breadcrumbs ${className}`.trim()} aria-label="Breadcrumb">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol>
        {trail.map((item, index) => (
          <li key={item.path}>
            {index === trail.length - 1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
