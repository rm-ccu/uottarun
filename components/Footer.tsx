'use client';

import Link from 'next/link';
import { useTranslation } from '../lib/useTranslation';
import type { SiteSettings } from '../sanity/types';

const NAV_LINKS = [
  { href: '/events', key: 'nav.events' },
  { href: '/team', key: 'nav.team' },
  { href: '/collabs', key: 'nav.collabs' },
  { href: '/faq', key: 'nav.faq' },
  { href: '/join', key: 'nav.join' },
] as const;

export function Footer({ settings }: { settings: SiteSettings | null }) {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  const socials = (settings?.socials || []).filter(({ url }) => url);

  return (
    <footer className="bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <span className="font-heading font-bold text-2xl text-brand">{t('brand_name')}</span>
            <p className="mt-2 text-sm text-gray-400">{t('footer.tagline')}</p>
            <a
              href={`mailto:${settings?.email ?? ''}`}
              className="mt-2 block text-sm text-gray-400 hover:text-brand transition-colors"
            >
              {settings?.email}
            </a>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.links')}
            </h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ href, key }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
              {t('footer.connect')}
            </h3>
            <ul className="space-y-2">
              {socials.map(({ label, url }) => (
                <li key={label}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-sm text-gray-500">
          © {year} {t('brand_name')}. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
