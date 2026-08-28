import type { StructureResolver } from 'sanity/structure';

const SINGLETONS = [
  { id: 'handbook', title: 'Handbook', icon: '📖' },
  { id: 'siteSettings', title: 'Site Settings', icon: '⚙️' },
  { id: 'homePage', title: 'Home Page', icon: '🏠' },
];

const COLLECTIONS: Array<[string, string]> = [
  ['weeklyRun', 'Weekly Runs'],
  ['runException', 'Cancellations & Changes'],
  ['event', 'Events'],
  ['eventTag', 'Event Labels'],
  ['teamYear', 'Team Years'],
  ['person', 'People'],
  ['execRole', 'Exec Roles'],
  ['collab', 'Collabs & Sponsors'],
  ['collabCategory', 'Collab Categories'],
  ['award', 'Awards'],
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({ id, title }) =>
        S.listItem()
          .title(title)
          .id(id)
          .child(S.document().schemaType(id).documentId(id).title(title))
      ),
      S.divider(),
      ...COLLECTIONS.map(([type, title]) =>
        S.listItem().title(title).id(type).child(S.documentTypeList(type).title(title))
      ),
    ]);
