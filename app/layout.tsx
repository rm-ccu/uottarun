import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HtmlLang } from '../components/HtmlLang';
import { ThemeStyle } from '../components/ThemeStyle';
import { getSettings, getTeamYears, getHome, getPageHeaders } from '../sanity/queries';
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
  const [settings, years, home, headers] = await Promise.all([
    getSettings(), getTeamYears(), getHome(), getPageHeaders(),
  ]);

  // Which routes have a full-bleed photo behind their title — the only ones the
  // navbar may sit transparent over. Worked out here rather than in the bar
  // itself so the first paint is already right, and so clearing an image in the
  // Studio puts that page's navbar back to solid on its own.
  const photoRoutes = [
    home?.heroImage ? '/' : null,
    headers?.events ? '/events' : null,
    headers?.faq ? '/faq' : null,
    headers?.collabs ? '/collabs' : null,
    headers?.join ? '/join' : null,
    ...years.map((y) => (y.headerImage ?? headers?.team ? `/team/${y.slug}` : null)),
  ].filter((route): route is string => route !== null);

  // Load every registered family so a font swap in the Studio needs no rebuild.
  const fontClasses = Object.values(FONTS).map((f) => f.className).join(' ');

  return (
    <html lang="en" className={fontClasses}>
      <head>
        <ThemeStyle settings={settings} />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-background text-gray-900">
        <Providers>
          <HtmlLang />
          <Navbar
            years={years.map(({ slug, label }) => ({ slug, label }))}
            photoRoutes={photoRoutes}
          />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </Providers>
      </body>
    </html>
  );
}
