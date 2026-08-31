import type { Image } from 'sanity';

export type LocaleStr = { en: string; fr?: string } | null;

export interface SocialLink { label: string; url: string }

export interface SiteSettings {
  email: string;
  socials: SocialLink[];
  instagramUrl: string;
  memberFormUrl: string;
  colorBrand: string; colorBrandDark: string; colorBrandLight: string;
  colorSecondary: string; colorSecondaryDark: string; colorSecondaryLight: string;
  colorAccent: string; colorAccentDark: string;
  colorBackground: string; colorSurface: string;
  fontHeading: string; fontBody: string; fontDisplay: string;
}

export interface Stat { _key: string; value: string; label: LocaleStr }

export interface HomePage {
  heroImage: Image | null;
  heroHeadlinePre: LocaleStr;
  heroHeadlineEm: LocaleStr;
  heroHeadlinePost: LocaleStr;
  heroSub: LocaleStr;
  stats: Stat[];
}

/** The photo behind each page title. Every field is optional — a page with no
 *  image falls back to the plain surface band. */
export interface PageHeaders {
  team: Image | null;
  events: Image | null;
  faq: Image | null;
  collabs: Image | null;
  join: Image | null;
}

export interface Tag { _id: string; title: LocaleStr; color: string }

export interface RunSeason {
  _key: string;
  name: string;
  startDate: string;
  endDate: string;
  warmup?: string;
  run: string;
}

export interface WeeklyRun {
  _id: string;
  title: LocaleStr;
  day: string;
  active: boolean;
  location: LocaleStr;
  paceRange?: string;
  tags: Tag[];
  seasons: RunSeason[];
  stravaUrl?: string;
}

export type ExceptionStatus = 'cancelled' | 'time' | 'location' | 'notice';

export interface RunException {
  _id: string;
  runId: string;
  date: string;
  status: ExceptionStatus;
  note: LocaleStr;
  newTime?: string;
  newLocation: LocaleStr;
}

export interface ClubEvent {
  _id: string;
  title: LocaleStr;
  date: string;
  time?: string;
  distance?: string;
  location: LocaleStr;
  description: LocaleStr;
  image: Image | null;
  tags: Tag[];
  instagramUrl?: string;
}

export interface Award { _id: string; title: LocaleStr; issuer: LocaleStr; year: number }

export interface Collab {
  _id: string;
  name: string;
  nameFr?: string;
  description: LocaleStr;
  url?: string;
  logo: Image | null;
}

export interface CollabCategory {
  _id: string;
  title: LocaleStr;
  showOnHome: boolean;
  items: Collab[];
}

export interface RosterMember {
  _key: string;
  name: string;
  role?: LocaleStr;
  season?: string;
  photo: Image | null;
}

export interface TeamYear {
  _id: string;
  label: string;
  slug: string;
  isCurrent: boolean;
  pacerFormUrl?: string;
  headerImage: Image | null;
  exec: RosterMember[];
  pacers: RosterMember[];
}

export type FaqCategory = 'runs' | 'logistics' | 'safety' | 'involved';

export interface Faq {
  _id: string;
  question: LocaleStr;
  answer: LocaleStr;
  category: FaqCategory;
  linkLabel?: LocaleStr;
  linkUrl?: string;
}
