'use client';

import { useTranslation } from '../../lib/useTranslation';
import sponsors from '../../data/sponsors.json';

export function SponsorStrip() {
  const { t } = useTranslation();
  const allSponsors = sponsors.tiers.flatMap((tier) => tier.sponsors);

  if (allSponsors.length === 0) return null;

  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
          {t('sponsors_page.title')}
        </p>
        <div className="flex flex-wrap justify-center gap-10 items-center">
          {allSponsors.map((sponsor) => (
            <a
              key={sponsor.id}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 font-semibold text-lg hover:text-brand transition-colors"
            >
              {sponsor.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
