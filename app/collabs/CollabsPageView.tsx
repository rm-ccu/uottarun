'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { CollabCarousel } from '../../components/CollabCarousel';
import { PageHeader } from '../../components/PageHeader';
import { loc } from '../../sanity/locale';
import type { CollabCategory } from '../../sanity/types';
import type { Image as SanityImage } from 'sanity';

export function CollabsPageView({
  categories,
  email,
  headerImage,
}: {
  categories: CollabCategory[];
  email?: string;
  headerImage?: SanityImage | null;
}) {
  const { t, lang } = useTranslation();
  const populated = (categories || []).filter((c) => c.items?.length);

  return (
    <>
      <PageHeader
        title={t('collabs_page.title')}
        sub={t('collabs_page.sub')}
        image={headerImage}
        width="max-w-6xl"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
                <div className="flex-1 h-px bg-line-strong" />
              </div>
              <CollabCarousel items={category.items} />
            </motion.section>
          ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="on-dark bg-brand rounded-2xl p-10 sm:p-14 text-center"
      >
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-3">
          {t('collabs_page.cta_title')}
        </h2>
        <p className="text-white/70 max-w-lg mx-auto mb-7">{t('collabs_page.cta_body')}</p>
        <a
          href={`mailto:${email ?? ''}`}
          className="inline-block px-8 py-3 bg-accent text-gray-950 font-semibold rounded-full hover:bg-accent-dark transition-colors"
        >
          {t('collabs_page.cta_button')}
        </a>
      </motion.div>
      </div>
    </>
  );
}
