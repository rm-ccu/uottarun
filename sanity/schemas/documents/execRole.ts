import { defineType, defineField } from 'sanity';

/** Translated once, reused every year. Adding "VP Finance" is a CMS action. */
export const execRole = defineType({
  name: 'execRole',
  title: 'Exec Role',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Role',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lower numbers appear first on the team page.',
      initialValue: 100,
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'order' } },
});
