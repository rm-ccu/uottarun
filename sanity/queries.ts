import { groq } from 'next-sanity';
import { client } from './client';
import type {
  SiteSettings, HomePage, WeeklyRun, RunException, ClubEvent,
  Award, CollabCategory, TeamYear, Faq, PageHeaders,
} from './types';

const TAG = groq`{ _id, title, color }`;

export const settingsQuery = groq`*[_id == "siteSettings"][0]`;

export const homeQuery = groq`*[_id == "homePage"][0]{
  heroImage, heroHeadlinePre, heroHeadlineEm, heroHeadlinePost, heroSub,
  stats[]{ _key, value, label }
}`;

export const pageHeadersQuery = groq`*[_id == "pageHeaders"][0]{
  team, events, faq, collabs, join
}`;

export const weeklyRunsQuery = groq`*[_type == "weeklyRun" && active == true]|order(order asc){
  _id, title, day, active, location, paceRange, seasons[], stravaUrl,
  tags[]->${TAG}
}`;

export const exceptionsQuery = groq`*[_type == "runException" && date >= $from]{
  _id, "runId": run._ref, date, status, note, newTime, newLocation
}`;

export const eventsQuery = groq`*[_type == "event" && date >= $from]|order(date asc){
  _id, title, date, time, distance, location, description, image, instagramUrl,
  tags[]->${TAG}
}`;

export const awardsQuery = groq`*[_type == "award"]|order(year desc){ _id, title, issuer, year }`;

export const collabsQuery = groq`*[_type == "collabCategory"]|order(order asc){
  _id, title, showOnHome,
  "items": *[_type == "collab" && category._ref == ^._id]|order(order asc){
    _id, name, nameFr, description, url, logo
  }
}`;

export const faqsQuery = groq`*[_type == "faq"]|order(order asc){
  _id, question, answer, category, linkLabel, linkUrl
}`;

export const teamYearsQuery = groq`*[_type == "teamYear"]|order(label desc){
  _id, label, "slug": slug.current, isCurrent, pacerFormUrl, headerImage,
  exec[]{ ..., "name": person->name, "photo": coalesce(photo, person->photo), "role": role->title },
  pacers[]{ _key, season, "name": person->name, "photo": coalesce(photo, person->photo) }
}`;

const today = () => new Date().toISOString().slice(0, 10);

export const getSettings = () => client.fetch<SiteSettings>(settingsQuery);
export const getHome = () => client.fetch<HomePage>(homeQuery);
export const getPageHeaders = () => client.fetch<PageHeaders | null>(pageHeadersQuery);
export const getWeeklyRuns = () => client.fetch<WeeklyRun[]>(weeklyRunsQuery);
export const getExceptions = () => client.fetch<RunException[]>(exceptionsQuery, { from: today() });
export const getEvents = () => client.fetch<ClubEvent[]>(eventsQuery, { from: today() });
export const getAwards = () => client.fetch<Award[]>(awardsQuery);
export const getCollabs = () => client.fetch<CollabCategory[]>(collabsQuery);
export const getTeamYears = () => client.fetch<TeamYear[]>(teamYearsQuery);
export const getFaqs = () => client.fetch<Faq[]>(faqsQuery);
