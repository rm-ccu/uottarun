'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from '../../lib/useTranslation';
import { loc } from '../../sanity/locale';
import type { Faq, FaqCategory } from '../../sanity/types';

/** Section order on the page. A FAQ whose category isn't listed here — one
 *  added to the schema but not yet to this file — still shows, under the first
 *  section, rather than silently disappearing. */
const CATEGORY_ORDER: FaqCategory[] = ['runs', 'logistics', 'safety', 'involved'];

const sectionOf = (faq: Faq): FaqCategory =>
  CATEGORY_ORDER.includes(faq.category) ? faq.category : CATEGORY_ORDER[0];

function FaqItem({ faq, open, onToggle }: { faq: Faq; open: boolean; onToggle: () => void }) {
  const { lang } = useTranslation();
  const label = loc(faq.linkLabel, lang);

  return (
    <div className="border-b border-line last:border-b-0">
      <h3>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`faq-answer-${faq._id}`}
          className="w-full flex items-start justify-between gap-4 py-5 text-left cursor-pointer group"
        >
          <span
            className={`font-heading font-semibold text-lg sm:text-xl transition-colors ${
              open ? 'text-brand' : 'text-gray-900 group-hover:text-brand'
            }`}
          >
            {loc(faq.question, lang)}
          </span>
          <span
            className={`shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
              open ? 'bg-brand text-white rotate-180' : 'bg-brand-light text-brand'
            }`}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`faq-answer-${faq._id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pb-6 pr-10">
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {loc(faq.answer, lang)}
              </p>
              {faq.linkUrl && label && (
                <a
                  href={faq.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-sm font-semibold text-brand hover:text-brand-dark transition-colors"
                >
                  {label} ↗
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqPageView({ faqs }: { faqs: Faq[] }) {
  const { t } = useTranslation();

  const sections = CATEGORY_ORDER.map((category) => ({
    category,
    items: faqs.filter((f) => sectionOf(f) === category),
  })).filter(({ items }) => items.length > 0);

  // The first question opens on load so the page never reads as a wall of
  // closed rows; every other one is collapsed.
  const [openId, setOpenId] = useState<string | null>(sections[0]?.items[0]?._id ?? null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="font-display font-medium text-5xl sm:text-6xl text-gray-950">
          {t('faq_page.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-500">{t('faq_page.sub')}</p>
      </motion.div>

      {faqs.length === 0 ? (
        <p className="text-gray-400 text-sm">{t('faq_page.empty')}</p>
      ) : (
        <div className="space-y-12">
          {sections.map(({ category, items }, s) => (
            <motion.section
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: s * 0.07 }}
            >
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-gray-950 mb-3">
                {t(`faq_page.categories.${category}`)}
              </h2>
              <span className="block w-10 h-1 bg-accent rounded-full mb-2" />
              <div>
                {items.map((faq) => (
                  <FaqItem
                    key={faq._id}
                    faq={faq}
                    open={openId === faq._id}
                    onToggle={() => setOpenId(openId === faq._id ? null : faq._id)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-16 p-8 bg-brand-light rounded-2xl text-center"
      >
        <h2 className="font-heading font-bold text-2xl text-gray-900 mb-2">
          {t('faq_page.cta_title')}
        </h2>
        <p className="text-gray-600 mb-6">{t('faq_page.cta_body')}</p>
        <Link
          href="/join"
          className="inline-block px-8 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors"
        >
          {t('faq_page.cta_button')}
        </Link>
      </motion.div>
    </div>
  );
}
