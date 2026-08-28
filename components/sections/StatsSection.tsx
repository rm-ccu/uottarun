'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import type { Stat } from '../../sanity/types';

export function StatsSection({ stats }: { stats: Stat[] }) {
  const { lang } = useTranslation();
  if (!stats?.length) return null;

  return (
    <section className="bg-accent py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat._key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-heading font-bold text-5xl sm:text-6xl mb-2 text-brand">
                {stat.value}
              </div>
              <div className="text-sm sm:text-base text-gray-700 font-medium uppercase tracking-wide">
                {loc(stat.label, lang)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
