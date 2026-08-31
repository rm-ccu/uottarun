'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from '../lib/useTranslation';
import { ExecCard, PacerCard } from './TeamCard';
import type { TeamYear } from '../sanity/types';

export function TeamYearView({
  year,
  years,
}: {
  year: TeamYear;
  years: { slug: string; label: string }[];
}) {
  const { t } = useTranslation();
  const isCurrent = year.isCurrent;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('team_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">{t('team_page.sub')}</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-2 mb-16">
        {years.map((y) => (
          <Link
            key={y.slug}
            href={`/team/${y.slug}`}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
              y.slug === year.slug
                ? 'bg-brand text-white border-brand'
                : 'border-line-strong text-gray-600 hover:border-brand hover:text-brand'
            }`}
          >
            {y.label}
          </Link>
        ))}
      </div>

      <section className="mb-16">
        <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-3">
          {t('team_page.exec_title')}
        </h2>
        <span className="block w-10 h-1 bg-accent rounded-full mb-8" />
        <div className="flex flex-wrap justify-center gap-6">
          {(year.exec || []).map((member, i) => (
            <motion.div
              key={member._key}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <ExecCard member={member} />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-3">
          {t('team_page.pacers_title')}
        </h2>
        <span className="block w-10 h-1 bg-accent rounded-full mb-8" />
        {(year.pacers || []).length === 0 ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 px-6 bg-surface rounded-xl border border-line">
            <p className="text-gray-500 text-sm flex-1">
              {isCurrent ? t('team_page.pacers_empty') : t('team_page.pacers_archived_empty')}
            </p>
            {isCurrent && year.pacerFormUrl && (
              <a
                href={year.pacerFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
              >
                {t('team_page.pacers_apply')} ↗
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(year.pacers || []).map((member, i) => (
              <motion.div
                key={member._key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.04, 0.6) }}
              >
                <PacerCard member={member} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
