'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { CollabCarousel, type Collab } from '../../components/CollabCarousel';
import collabs from '../../data/collabs.json';

export default function CollabsPage() {
  const { t } = useTranslation();

  const categories: { key: keyof typeof collabs; labelKey: string; emphasized?: boolean }[] = [
    { key: 'charities', labelKey: 'collabs_page.charities', emphasized: true },
    { key: 'sponsors', labelKey: 'collabs_page.sponsors' },
    { key: 'uottawaClubs', labelKey: 'collabs_page.uottawa_clubs' },
    { key: 'runClubs', labelKey: 'collabs_page.run_clubs' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('collabs_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
          {t('collabs_page.sub')}
        </p>
      </motion.div>

      <div className="space-y-14 mb-20">
        {categories.map((category, i) => {
          const items = collabs[category.key] as Collab[];
          return (
            <motion.section
              key={category.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-heading font-bold text-2xl text-gray-900">
                  {t(category.labelKey)}
                </h2>
                <div className={`flex-1 h-px ${category.emphasized ? 'bg-accent-dark/30' : 'bg-brand-light'}`} />
              </div>
              <CollabCarousel items={items} emphasized={category.emphasized} />
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
          {t('collabs_page.cta_title')}
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('collabs_page.cta_body')}</p>
        <a
          href="mailto:uottarun@gmail.com"
          className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          {t('collabs_page.cta_button')}
        </a>
      </motion.div>
    </div>
  );
}
