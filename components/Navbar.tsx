'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from '../lib/useTranslation';

export interface NavYear { slug: string; label: string }

const NAV_LINKS_BEFORE_TEAM = [
  { href: '/', key: 'nav.home' },
  { href: '/events', key: 'nav.events' },
] as const;

const NAV_LINKS_AFTER_TEAM = [
  { href: '/collabs', key: 'nav.collabs' },
  { href: '/faq', key: 'nav.faq' },
] as const;

const linkClasses = (active: boolean) =>
  `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
    active ? 'text-white bg-white/15' : 'text-white/75 hover:text-white hover:bg-white/10'
  }`;

function TeamNavDropdown({ pathname, years }: { pathname: string; years: NavYear[] }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActive = pathname.startsWith('/team');

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    // Escape returns focus to the trigger, so a keyboard user isn't dropped
    // back at the top of the document after dismissing the menu.
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="team-year-menu"
        className={`flex items-center gap-1 cursor-pointer ${linkClasses(isActive)}`}
      >
        {t('nav.team')}
        <svg
          className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          id="team-year-menu"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-36 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 overflow-hidden py-1"
        >
          {years.map((y) => (
            <Link
              key={y.slug}
              href={`/team/${y.slug}`}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors ${
                pathname === `/team/${y.slug}`
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

export function Navbar({ years, photoRoutes }: { years: NavYear[]; photoRoutes: string[] }) {
  const { t, lang, changeLang } = useTranslation();
  const pathname = usePathname();
  // The menu remembers which route it was opened on, so any navigation — a tap
  // on a link, the wordmark, or the browser back button — closes it without an
  // effect having to reach in and reset state.
  const [menu, setMenu] = useState({ open: false, path: pathname });
  const open = menu.open && menu.path === pathname;
  const setOpen = useCallback(
    (next: boolean) => setMenu({ open: next, path: pathname }),
    [pathname]
  );
  const [scrolled, setScrolled] = useState(false);

  // The bar may only go transparent where there is a photo behind it to sit on.
  // Which routes those are is decided on the server from what is actually in the
  // Studio, so clearing a page's image also puts its navbar back to solid.
  const overHero = photoRoutes.includes(pathname);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [overHero]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [setOpen]);

  // An open mobile menu always needs a solid ground, or its links land on top
  // of the hero photo.
  const solid = !overHero || scrolled || open;

  return (
    // The divider is an inset shadow rather than a border so the bar is exactly
    // h-16 tall. A 1px border made it 65px against the hero's -mt-16 pull, and
    // that leftover pixel showed as a cream line across the top of the page.
    <header
      className={`on-dark sticky top-0 z-50 transition-colors duration-300 ${
        solid
          ? 'bg-brand/95 backdrop-blur-md shadow-[inset_0_-1px_0_0_var(--color-brand-dark)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 rounded-full">
            <Image src="/logo.png" alt="" width={36} height={36} className="object-contain" priority />
            <span className="font-heading font-bold text-2xl tracking-tight text-white">
              {t('brand_name')}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS_BEFORE_TEAM.map(({ href, key }) => (
              <Link key={href} href={href} className={linkClasses(pathname === href)}>
                {t(key)}
              </Link>
            ))}
            <TeamNavDropdown pathname={pathname} years={years} />
            {NAV_LINKS_AFTER_TEAM.map(({ href, key }) => (
              <Link key={href} href={href} className={linkClasses(pathname === href)}>
                {t(key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/join"
              className="hidden md:inline-block px-5 py-2 bg-accent text-gray-950 text-sm font-semibold rounded-full hover:bg-accent-dark transition-colors"
            >
              {t('nav.join')}
            </Link>
            <button
              onClick={() => changeLang(lang === 'en' ? 'fr' : 'en')}
              aria-label={t('nav.switch_lang')}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors border border-white/30 rounded-full px-3 py-1 cursor-pointer"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              className="md:hidden p-2 text-white cursor-pointer"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={t('nav.toggle_menu')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
          <nav id="mobile-menu" className="md:hidden py-4 border-t border-white/20 flex flex-col gap-4 pb-5">
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
                {years.map((y) => (
                  <Link
                    key={y.slug}
                    href={`/team/${y.slug}`}
                    onClick={() => setOpen(false)}
                    className={`text-sm transition-colors hover:text-white ${
                      pathname === `/team/${y.slug}` ? 'text-white font-semibold' : 'text-white/60'
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

            <Link
              href="/join"
              onClick={() => setOpen(false)}
              className="mt-1 px-5 py-2.5 bg-accent text-gray-950 text-sm font-semibold rounded-full text-center"
            >
              {t('nav.join')}
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
