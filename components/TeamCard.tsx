'use client';

import Image from 'next/image';
import { useTranslation } from '../lib/useTranslation';

export interface ExecMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  bioFr: string | null;
  image: string | null;
}

export interface PacerMember {
  id: string;
  name: string;
  pace: string;
  image: string | null;
}

export function ExecCard({ member }: { member: ExecMember }) {
  const { t, lang } = useTranslation();
  const roleKey = `exec_roles.${member.role}`;
  const translatedRole = t(roleKey);
  const displayRole = translatedRole === roleKey ? member.role : translatedRole;
  const displayBio = lang === 'fr' && member.bioFr ? member.bioFr : member.bio;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
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
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{displayBio}</p>
      </div>
    </div>
  );
}

export function PacerCard({ member }: { member: PacerMember }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center gap-3">
      <div className="w-10 h-10 bg-brand-light rounded-full flex items-center justify-center shrink-0 overflow-hidden relative">
        {member.image ? (
          <Image src={member.image} alt={member.name} fill className="object-cover" />
        ) : (
          <span className="text-brand font-bold text-sm">{member.name.charAt(0)}</span>
        )}
      </div>
      <p className="font-medium text-gray-900 text-sm flex-1 min-w-0 truncate">{member.name}</p>
      <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
        {member.pace}
      </span>
    </div>
  );
}
