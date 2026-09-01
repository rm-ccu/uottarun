'use client';

import Image from 'next/image';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import { urlForLogo } from '../../sanity/image';
import type { Collab, CollabCategory } from '../../sanity/types';

/**
 * Logos get a real tile rather than a 28px chip beside their name — this is the
 * row sponsors look at to decide whether backing the club is worth it. Resting
 * greyscale keeps a wall of clashing brand colours from fighting the page, and
 * hover restores the real mark.
 */
function SponsorLogo({ sponsor, name }: { sponsor: Collab; name: string }) {
  const inner = sponsor.logo ? (
    <span className="relative block w-32 h-16 sm:w-36 sm:h-20">
      <Image
        src={urlForLogo(sponsor.logo, 480)}
        alt={name}
        fill
        sizes="144px"
        quality={90}
        className="object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </span>
  ) : (
    <span className="flex items-center justify-center w-32 h-16 sm:w-36 sm:h-20 text-gray-500 font-semibold text-lg text-center leading-tight transition-colors group-hover:text-brand">
      {name}
    </span>
  );

  if (!sponsor.url) return <div className="group">{inner}</div>;

  return (
    <a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group rounded-2xl"
    >
      {inner}
    </a>
  );
}

export function SponsorStrip({ categories }: { categories: CollabCategory[] }) {
  const { lang } = useTranslation();
  const featured = (categories || []).filter((c) => c.showOnHome && c.items?.length);
  if (!featured.length) return null;

  return (
    <section className="py-20 bg-white border-t border-line">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-14">
        {featured.map((cat) => (
          <div key={cat._id}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-8">
              {loc(cat.title, lang)}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8 sm:gap-x-14">
              {cat.items.map((sponsor) => (
                <SponsorLogo
                  key={sponsor._id}
                  sponsor={sponsor}
                  name={lang === 'fr' && sponsor.nameFr ? sponsor.nameFr : sponsor.name}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
