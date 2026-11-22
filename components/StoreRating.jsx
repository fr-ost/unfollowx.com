import { STORE_RATING, STORE_REVIEWS_URL } from '@/lib/site';

// Visible Chrome Web Store rating. Values come from STORE_RATING in
// lib/site.js — the same constant feeds softwareSchemaWithRating, so the
// number people see and the structured data always match.
export default function StoreRating({ location = 'hero', className = '' }) {
  if (!STORE_RATING) return null;
  const { value, count, best } = STORE_RATING;
  return (
    <a
      className={`store-rating ${className}`.trim()}
      href={STORE_REVIEWS_URL}
      target="_blank"
      rel="noopener"
      data-cta="store_rating"
      data-cta-location={location}
    >
      <span className="store-rating-stars" aria-hidden="true">★★★★★</span>
      <span><b>{value.toFixed(1)}</b>/{best} on the Chrome Web Store · {count} ratings</span>
    </a>
  );
}
