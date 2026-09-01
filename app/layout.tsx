import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HtmlLang } from '../components/HtmlLang';
import { ThemeStyle } from '../components/ThemeStyle';
import { getSettings, getTeamYears, getHome } from '../sanity/queries';
import { urlFor } from '../sanity/image';
import { FONTS } from '../lib/fonts';
import './globals.css';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://uoc-uor.ca';
const TITLE = 'uOttaRun — University of Ottawa Running Club';
const DESCRIPTION =
  "University of Ottawa's official running club. All paces welcome. Join us for weekly runs, races, and social events.";

/**
 * Built as a function rather than a static object so the social preview can use
 * whatever hero photo is currently in the Studio — links get shared to Instagram
 * and Discord far more often than they get typed, so the card is the first thing
 * most people see of the club.
 */
export async function generateMetadata(): Promise<Metadata> {
  const home = await getHome();
  const ogImage = home?.heroImage
    ? urlFor(home.heroImage).width(1200).height(630).url()
    : null;

  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description: DESCRIPTION,
    icons: { icon: '/favicon.ico' },
    openGraph: {
      type: 'website',
      siteName: 'uOttaRun',
      title: TITLE,
      description: DESCRIPTION,
      url: '/',
      locale: 'en_CA',
      alternateLocale: 'fr_CA',
      images: ogImage
        ? [{ url: ogImage, width: 1200, height: 630, alt: 'uOttaRun members on a group run' }]
        : undefined,
    },
    twitter: {
      card: ogImage ? 'summary_large_image' : 'summary',
      title: TITLE,
      description: DESCRIPTION,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, years] = await Promise.all([getSettings(), getTeamYears()]);

  // Load every registered family so a font swap in the Studio needs no rebuild.
  const fontClasses = Object.values(FONTS).map((f) => f.className).join(' ');

  return (
    <html lang="en" className={fontClasses}>
      <head>
        <ThemeStyle settings={settings} />
      </head>
      <body className="relative min-h-screen flex flex-col font-sans antialiased bg-background text-gray-900">
        {/* What the navbar watches to know whether the page is still at the top.
            Its height is the scroll distance before the bar turns solid. */}
        <div data-top-sentinel aria-hidden className="absolute top-0 left-0 h-6 w-px pointer-events-none" />
        <Providers>
          <HtmlLang />
          <Navbar years={years.map(({ slug, label }) => ({ slug, label }))} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
