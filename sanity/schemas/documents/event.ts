import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Start time',
      type: 'string',
      description: 'e.g. 5:30 PM',
    }),
    defineField({ name: 'distance', title: 'Distance', type: 'string', description: 'e.g. 5 km' }),
    defineField({ name: 'location', title: 'Location', type: 'localeString' }),
    defineField({ name: 'description', title: 'Description', type: 'localeText' }),
    defineField({
      name: 'image',
      title: 'Event photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Labels',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'eventTag' }] }],
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram post URL',
      type: 'url',
      description:
        'Link to the specific post. Leave blank to fall back to the club Instagram in Site Settings.',
    }),
  ],
  orderings: [
    { title: 'Date, newest first', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title.en', subtitle: 'date', media: 'image' },
  },
});
