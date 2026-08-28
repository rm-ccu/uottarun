'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import type { Award } from '../../sanity/types';

export function AwardsStrip({ awards }: { awards: Award[] }) {
  const { t, lang } = useTranslation();
  if (!awards?.length) return null;

  return (
    <section className="bg-brand py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-6">
          {t('awards_section.title')}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {awards.map((award, i) => (
            <motion.div
              key={award._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2"
            >
              <span className="text-accent text-sm">🏆</span>
              <span className="text-sm font-medium text-white">
                {loc(award.title, lang)} <span className="text-white/60">— {award.year}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
