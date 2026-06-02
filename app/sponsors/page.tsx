'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import sponsors from '../../data/sponsors.json';

export default function SponsorsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-heading font-bold text-5xl sm:text-6xl text-gray-950">
          {t('sponsors_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          {t('sponsors_page.sub')}
        </p>
      </motion.div>

      <div className="space-y-14 mb-20">
        {sponsors.tiers.map((tier, i) => {
          const tierLabel = t(`sponsors_page.${tier.tier}`);
          return (
            <motion.section
              key={tier.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-heading font-bold text-2xl text-gray-900">{tierLabel}</h2>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              {tier.sponsors.length === 0 ? (
                <p className="text-gray-400 text-sm italic">
                  No {tier.tier} sponsors yet — reach out to join!
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tier.sponsors.map((sponsor) => (
                    <a
                      key={sponsor.id}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-gray-200 rounded-2xl p-8 text-center hover:border-brand hover:shadow-md transition-all"
                    >
                      <p className="font-semibold text-gray-900 text-xl">{sponsor.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{sponsor.description}</p>
                    </a>
                  ))}
                </div>
              )}
            </motion.section>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-light border border-brand-light rounded-2xl p-10 text-center"
      >
        <h2 className="font-heading font-bold text-3xl text-gray-900 mb-3">
          {t('sponsors_page.cta_title')}
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('sponsors_page.cta_body')}</p>
        <a
          href="mailto:contact@uoc-uor.ca"
          className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          {t('sponsors_page.cta_button')}
        </a>
      </motion.div>
    </div>
  );
}
