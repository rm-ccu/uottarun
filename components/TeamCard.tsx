'use client';

import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';
import { loc } from '../sanity/locale';
import { urlFor } from '../sanity/image';
import type { RosterMember } from '../sanity/types';

export type PacerSeason = 'fall' | 'winter' | 'both';

const SEASON_CHIP_STYLES: Record<string, string> = {
  fall: 'bg-accent/15 text-accent-dark border-accent/40',
  winter: 'bg-brand-light text-brand border-brand/30',
  both: 'bg-secondary-light text-secondary-dark border-secondary/40',
};

/** Hotspot-aware square crop — keeps the face centred whatever was uploaded. */
const headshot = (member: RosterMember, size: number) =>
  member.photo ? urlFor(member.photo).width(size).height(size).url() : null;

function Initial({ name, className }: { name: string; className: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <span className={`font-heading font-bold text-brand select-none ${className}`}>
        {name.charAt(0)}
      </span>
    </div>
  );
}

export function ExecCard({ member }: { member: RosterMember }) {
  const { lang } = useTranslation();
  const src = headshot(member, 600);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-light hover:shadow-lg transition-shadow">
      <div className="aspect-square relative bg-brand-light">
        {src ? (
          <Image src={src} alt={member.name} fill className="object-cover" />
        ) : (
          <Initial name={member.name} className="text-8xl" />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">{member.name}</h3>
        <p className="text-sm text-brand font-medium mt-0.5">{loc(member.role, lang)}</p>
      </div>
    </div>
  );
}

export function PacerCard({ member }: { member: RosterMember }) {
  const { t } = useTranslation();
  const src = headshot(member, 300);
  const season = member.season || 'both';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-light hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-brand-light">
        {src ? (
          <Image src={src} alt={member.name} fill className="object-cover" />
        ) : (
          <Initial name={member.name} className="text-4xl" />
        )}
      </div>
      <div className="p-3">
        <p className="font-medium text-gray-900 text-sm leading-tight truncate">{member.name}</p>
        <span className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${SEASON_CHIP_STYLES[season]}`}>
          {t(`team_page.season_${season}`)}
        </span>
      </div>
    </div>
  );
}
