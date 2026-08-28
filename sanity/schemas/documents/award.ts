import { defineType, defineField } from 'sanity';

export const award = defineType({
  name: 'award',
  title: 'Award',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Award',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'issuer', title: 'Issued by', type: 'localeString' }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
  ],
  orderings: [{ title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'year' } },
});
