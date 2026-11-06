import Icon from '@/components/Icon';
import { PRIMARY_CTA, STORE_URL } from '@/lib/site';

// Every "Add to Chrome" link on the site. `location` feeds the GA4
// chrome_install_click event (button_location), handled by components/Analytics.
export default function InstallLink({ location, children = PRIMARY_CTA, size = 'md', variant = 'primary', className = '', icon = true }) {
  const sizeClass = size === 'lg' ? ' btn-lg' : size === 'sm' ? ' btn-sm' : '';
  return (
    <a
      className={`btn btn-${variant}${sizeClass} ${className}`.trim()}
      href={STORE_URL}
      target="_blank"
      rel="noopener"
      data-install=""
      data-location={location}
    >
      {icon ? <Icon name="install" /> : null}
      {children}
      <span className="visually-hidden"> (opens the Chrome Web Store in a new tab)</span>
    </a>
  );
}
