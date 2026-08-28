'use client';

import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';

export interface ExecMember {
  id: string;
  name: string;
  role: string;
  image: string | null;
}

export type PacerSeason = 'fall' | 'winter' | 'both';

export interface PacerMember {
  id: string;
  name: string;
  season: PacerSeason;
  image: string | null;
}

const SEASON_CHIP_STYLES: Record<PacerSeason, string> = {
  fall: 'bg-accent/15 text-accent-dark border-accent/40',
  winter: 'bg-brand-light text-brand border-brand/30',
  both: 'bg-secondary-light text-secondary-dark border-secondary/40',
};

export function ExecCard({ member }: { member: ExecMember }) {
  const { t } = useTranslation();
  const roleKey = `exec_roles.${member.role}`;
  const translatedRole = t(roleKey);
  const displayRole = translatedRole === roleKey ? member.role : translatedRole;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-light hover:shadow-lg transition-shadow">
      <div className="aspect-square relative bg-brand-light">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold text-8xl text-brand select-none">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 text-lg leading-tight">{member.name}</h3>
        <p className="text-sm text-brand font-medium mt-0.5">{displayRole}</p>
      </div>
    </div>
  );
}

export function PacerCard({ member }: { member: PacerMember }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-brand-light hover:shadow-md transition-shadow">
      <div className="aspect-square relative bg-brand-light">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading font-bold text-4xl text-brand select-none">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="font-medium text-gray-900 text-sm leading-tight truncate">{member.name}</p>
        <span
          className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full border ${SEASON_CHIP_STYLES[member.season]}`}
        >
          {t(`team_page.season_${member.season}`)}
        </span>
      </div>
    </div>
  );
}
