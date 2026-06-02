'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';

const STATS = [
  { value: '200+', key: 'stats.members' },
  { value: '30+', key: 'stats.events_year' },
  { value: '6', key: 'stats.years' },
] as const;

export function StatsSection() {
  const { t } = useTranslation();

  return (
    <section className="bg-accent py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          {STATS.map(({ value, key }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-heading font-bold text-5xl sm:text-6xl mb-2 text-brand">
                {value}
              </div>
              <div className="text-sm sm:text-base text-gray-700 font-medium uppercase tracking-wide">
                {t(key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
