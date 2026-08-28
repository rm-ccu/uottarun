import { defineType, defineField } from 'sanity';

export const collabCategory = defineType({
  name: 'collabCategory',
  title: 'Collab Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'showOnHome',
      title: 'Show in the home page strip',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'title.en', subtitle: 'order' } },
});

export const collab = defineType({
  name: 'collab',
  title: 'Collab / Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Proper noun — usually the same in both languages.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nameFr',
      title: 'French name (optional)',
      type: 'string',
      description: 'Only if the name genuinely differs, e.g. GeeGees Rowing → GeeGees Aviron.',
    }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'collabCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'url', title: 'Link', type: 'url' }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'order', title: 'Sort order', type: 'number', initialValue: 100 }),
  ],
  preview: { select: { title: 'name', subtitle: 'category.title.en', media: 'logo' } },
});
