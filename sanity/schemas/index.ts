import { localeString, localeText } from './objects/locale';
import { siteSettings } from './documents/siteSettings';
import { homePage } from './documents/homePage';
import { pageHeaders } from './documents/pageHeaders';
import { event } from './documents/event';
import { eventTag } from './documents/eventTag';
import { weeklyRun } from './documents/weeklyRun';
import { runException } from './documents/runException';
import { person } from './documents/person';
import { execRole } from './documents/execRole';
import { teamYear } from './documents/teamYear';
import { collab, collabCategory } from './documents/collab';
import { award } from './documents/award';
import { faq } from './documents/faq';
import { handbook } from './documents/handbook';

export const schemaTypes = [
  localeString,
  localeText,
  siteSettings,
  homePage,
  pageHeaders,
  event,
  eventTag,
  weeklyRun,
  runException,
  person,
  execRole,
  teamYear,
  collabCategory,
  collab,
  award,
  faq,
  handbook,
];
