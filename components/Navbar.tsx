'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '../lib/useTranslation';

const NAV_LINKS = [
  { href: '/', key: 'nav.home' },
  { href: '/events', key: 'nav.events' },
  { href: '/team', key: 'nav.team' },
  { href: '/collabs', key: 'nav.collabs' },
  { href: '/join', key: 'nav.join' },
] as const;

export function Navbar() {
  const { t, lang, changeLang } = useTranslation();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-brand border-b border-brand-dark/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-heading font-bold text-2xl tracking-tight text-white">
            {t('brand_name')}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  pathname === href ? 'text-white underline underline-offset-4 decoration-accent' : 'text-white/70'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => changeLang(lang === 'en' ? 'fr' : 'en')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors border border-white/30 rounded-full px-3 py-1 cursor-pointer"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              className="md:hidden p-2 text-white cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden py-4 border-t border-white/20 flex flex-col gap-4 pb-5">
            {NAV_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  pathname === href ? 'text-white font-semibold' : 'text-white/70'
                }`}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
