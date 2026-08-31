'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { PageHeader } from '../../components/PageHeader';
import type { SiteSettings } from '../../sanity/types';

export function JoinPageView({ settings }: { settings: SiteSettings | null }) {
  const { t } = useTranslation();
  const socials = (settings?.socials || []).filter(({ url }) => url);

  return (
    <>
      <PageHeader title={t('join_page.title')} sub={t('join_page.sub')} width="max-w-4xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="on-dark lg:col-span-3 bg-brand rounded-2xl p-10 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-white/10 ring-1 ring-white/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-3xl text-white mb-2">
              {t('join_page.form_title')}
            </h2>
            <p className="text-white/70 mb-8">{t('join_page.form_sub')}</p>
            <a
              href={settings?.memberFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-accent text-gray-950 font-semibold rounded-full hover:bg-accent-dark transition-colors"
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
    </>
  );
}
