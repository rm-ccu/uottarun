'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import type { SiteSettings } from '../../sanity/types';

export function JoinPageView({ settings }: { settings: SiteSettings | null }) {
  const { t } = useTranslation();
  const socials = (settings?.socials || []).filter(({ url }) => url);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('join_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">{t('join_page.sub')}</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 bg-brand-light rounded-2xl p-10 flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">
            {t('join_page.form_title')}
          </h2>
          <p className="text-gray-600 mb-8">{t('join_page.form_sub')}</p>
          <a
            href={settings?.memberFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
          >
            {t('join_page.form_title')} ↗
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="font-heading font-semibold text-2xl text-gray-800 mb-2">
            {t('join_page.links_title')}
          </h2>
          <span className="block w-10 h-1 bg-accent rounded-full mb-5" />
          <div className="space-y-3 mb-6">
            {socials.map(({ label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 border border-line rounded-xl hover:border-brand hover:bg-surface transition-colors group"
              >
                <span className="font-medium text-gray-800 group-hover:text-brand transition-colors">
                  {label}
                </span>
                <span className="text-gray-400 group-hover:text-brand transition-colors">↗</span>
              </a>
            ))}
          </div>

          <div className="p-4 bg-surface rounded-xl border border-line">
            <p className="text-sm text-gray-500">
              {t('join_page.email_label')}:{' '}
              <a href={`mailto:${settings?.email ?? ''}`} className="text-brand hover:underline font-medium">
                {settings?.email}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
