'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../lib/useTranslation';
import teamData from '../data/team.json';

const NAV_LINKS_BEFORE_TEAM = [
  { href: '/', key: 'nav.home' },
  { href: '/events', key: 'nav.events' },
] as const;

const NAV_LINKS_AFTER_TEAM = [
  { href: '/collabs', key: 'nav.collabs' },
  { href: '/join', key: 'nav.join' },
] as const;

const TEAM_YEARS = teamData.years.map(({ id, label }) => ({ id, label }));

function TeamNavDropdown({ pathname }: { pathname: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isActive = pathname.startsWith('/team');

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-white cursor-pointer ${
          isActive ? 'text-white underline underline-offset-4 decoration-accent' : 'text-white/70'
        }`}
      >
        {t('nav.team')}
        <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 bg-white rounded-xl shadow-lg border border-brand-light overflow-hidden py-1">
          {TEAM_YEARS.map((y) => (
            <Link
              key={y.id}
              href={`/team/${y.id}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors ${
                pathname === `/team/${y.id}`
                  ? 'text-brand font-semibold bg-brand-light'
                  : 'text-gray-700 hover:bg-surface'
              }`}
            >
              {y.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

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
            {NAV_LINKS_BEFORE_TEAM.map(({ href, key }) => (
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
            <TeamNavDropdown pathname={pathname} />
            {NAV_LINKS_AFTER_TEAM.map(({ href, key }) => (
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
            {NAV_LINKS_BEFORE_TEAM.map(({ href, key }) => (
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

            <div>
              <span className={`text-sm font-medium ${pathname.startsWith('/team') ? 'text-white font-semibold' : 'text-white/70'}`}>
                {t('nav.team')}
              </span>
              <div className="mt-2 pl-4 flex flex-col gap-2">
                {TEAM_YEARS.map((y) => (
                  <Link
                    key={y.id}
                    href={`/team/${y.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-sm transition-colors hover:text-white ${
                      pathname === `/team/${y.id}` ? 'text-white font-semibold' : 'text-white/60'
                    }`}
                  >
                    {y.label}
                  </Link>
                ))}
              </div>
            </div>

            {NAV_LINKS_AFTER_TEAM.map(({ href, key }) => (
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
