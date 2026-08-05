'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { ExecCard, PacerCard, type PacerMember } from '../../components/TeamCard';
import teamData from '../../data/team.json';

const team = teamData as Omit<typeof teamData, 'pacers'> & { pacers: PacerMember[] };

export default function TeamPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('team_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">{t('team_page.sub')}</p>
      </motion.div>

      <section className="mb-16">
        <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-3">
          {t('team_page.exec_title')}
        </h2>
        <span className="block w-10 h-1 bg-accent rounded-full mb-8" />
        <div className="flex flex-wrap justify-center gap-6">
          {team.exec.map((member, i) => (
            <motion.div
              key={member.id}
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

      <section className="mb-16">
        <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-3">
          {t('team_page.pacers_title')}
        </h2>
        <span className="block w-10 h-1 bg-accent rounded-full mb-8" />
        {team.pacers.length === 0 ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-6 px-6 bg-surface rounded-xl border border-brand-light">
            <p className="text-gray-500 text-sm flex-1">{t('team_page.pacers_empty')}</p>
            {team.pacerFormUrl && (
              <a
                href={team.pacerFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-full hover:bg-brand-dark transition-colors"
              >
                {t('team_page.pacers_apply')} ↗
              </a>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.pacers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <PacerCard member={member} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-t border-brand-light pt-12"
      >
        <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-1">
          {t('team_page.alumni_title')}
        </h2>
        <p className="text-sm text-gray-400 mb-6">Former executives who helped build the club.</p>
        <div className="divide-y divide-brand-light">
          {team.alumni.map((member) => (
            <div key={member.id} className="flex items-start justify-between gap-4 py-3">
              <span className="font-medium text-gray-800 text-sm shrink-0">{member.name}</span>
              <div className="text-sm text-gray-400 text-right">
                {member.roles.map((role, i) => (
                  <span key={i} className="block">{role}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
