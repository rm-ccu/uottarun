'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import type { Award } from '../../sanity/types';

/** Drawn rather than the 🏆 emoji, which renders as a different illustration on
 *  every OS — not what you want on the row you show sponsors. */
function TrophyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5A2.5 2.5 0 0 0 7 8" />
      <path d="M17 5.5h2.5A2.5 2.5 0 0 1 17 8" />
      <path d="M12 14v3.5" />
      <path d="M10.5 17.5h3" />
      <path d="M9 20.5h6" />
    </svg>
  );
}

export function AwardsStrip({ awards }: { awards: Award[] }) {
  const { t, lang } = useTranslation();
  if (!awards?.length) return null;

  return (
    <section className="bg-brand py-12">
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
              className="flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full pl-3.5 pr-4 py-2"
            >
              <span className="text-accent">
                <TrophyIcon />
              </span>
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
