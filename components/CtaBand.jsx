import Link from 'next/link';
import InstallLink from '@/components/InstallLink';

export default function CtaBand({
  location,
  eyebrow = 'Free forever',
  title = 'Your X following list. Your rules.',
  text = 'Get powerful following-management tools without paying a subscription.',
  secondary = { label: 'Read the setup guide', href: '/setup' },
  note = 'No sign-up · No X password · No premium plan',
  ctaLabel
}) {
  return (
    <section className="container section-tight">
      <div className="cta-band" data-reveal="scale">
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cta-row">
          <InstallLink location={location} size="lg">{ctaLabel}</InstallLink>
          {secondary ? <Link className="btn btn-secondary btn-lg" href={secondary.href} data-cta={secondary.label} data-cta-location={location}>{secondary.label}</Link> : null}
        </div>
        {note ? <small>{note}</small> : null}
      </div>
    </section>
  );
}
