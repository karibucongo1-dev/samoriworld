import Link from 'next/link';
import { absoluteUrl } from '@/lib/site-config';

export interface Crumb {
  name: string;
  path: string;
}

// Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. The last crumb is the current page.
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb">
        <ol>
          {trail.map((crumb, index) => (
            <li key={crumb.path} style={{ display: 'inline' }}>
              {index > 0 && ' › '}
              {index === trail.length - 1 ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.path}>{crumb.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
