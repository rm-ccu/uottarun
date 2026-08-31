'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { CollabCarousel } from '../../components/CollabCarousel';
import { loc } from '../../sanity/locale';
import type { CollabCategory } from '../../sanity/types';

export function CollabsPageView({
  categories,
  email,
}: {
  categories: CollabCategory[];
  email?: string;
}) {
  const { t, lang } = useTranslation();
  const populated = (categories || []).filter((c) => c.items?.length);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('collabs_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">{t('collabs_page.sub')}</p>
      </motion.div>

      <div className="space-y-14 mb-20">
        {populated.map((category, i) => (
          <motion.section
            key={category._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <h2 className="font-heading font-bold text-2xl text-gray-900">
                {loc(category.title, lang)}
              </h2>
              <div className="flex-1 h-px bg-brand-light" />
            </div>
            <CollabCarousel items={category.items} />
          </motion.section>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-light rounded-2xl p-10 text-center"
      >
        <h2 className="font-heading font-bold text-3xl text-gray-900 mb-3">
          {t('collabs_page.cta_title')}
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">{t('collabs_page.cta_body')}</p>
        <a
          href={`mailto:${email ?? ''}`}
          className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          {t('collabs_page.cta_button')}
        </a>
      </motion.div>
    </div>
  );
}
