import { defineType, defineField } from 'sanity';

export const teamYear = defineType({
  name: 'teamYear',
  title: 'Team Year',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Year label',
      type: 'string',
      description: 'e.g. 2026–27',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL slug',
      type: 'slug',
      options: { source: 'label', slugify: (input) => input.replace(/–|—/g, '-').trim() },
      description: 'Becomes /team/2026-27',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isCurrent',
      title: 'Current year',
      type: 'boolean',
      description: 'The year shown by default. Only one should be on.',
      initialValue: false,
    }),
    defineField({ name: 'pacerFormUrl', title: 'Pacer application form URL', type: 'url' }),
    defineField({
      name: 'exec',
      title: 'Exec team',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'person',
              type: 'reference',
              to: [{ type: 'person' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'reference',
              to: [{ type: 'execRole' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo for this year (optional)',
              type: 'image',
              options: { hotspot: true },
              description:
                "Only if their headshot that year differed. Leave empty to use the person's current photo.",
            }),
          ],
          preview: {
            select: {
              title: 'person.name',
              subtitle: 'role.title.en',
              photo: 'photo',
              personPhoto: 'person.photo',
            },
            prepare: ({ title, subtitle, photo, personPhoto }) => ({
              title,
              subtitle,
              media: photo || personPhoto,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'pacers',
      title: 'Pacers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'person',
              type: 'reference',
              to: [{ type: 'person' }],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'season',
              type: 'string',
              options: {
                list: [
                  { title: 'Fall', value: 'fall' },
                  { title: 'Winter', value: 'winter' },
                  { title: 'Both', value: 'both' },
                ],
                layout: 'radio',
              },
              initialValue: 'both',
            }),
            defineField({
              name: 'photo',
              title: 'Photo for this year (optional)',
              type: 'image',
              options: { hotspot: true },
              description:
                "Only if their headshot that year differed. Leave empty to use the person's current photo.",
            }),
          ],
          preview: {
            select: {
              title: 'person.name',
              subtitle: 'season',
              photo: 'photo',
              personPhoto: 'person.photo',
            },
            prepare: ({ title, subtitle, photo, personPhoto }) => ({
              title,
              subtitle,
              media: photo || personPhoto,
            }),
          },
        },
      ],
    }),
  ],
  orderings: [{ title: 'Year, newest first', name: 'yearDesc', by: [{ field: 'label', direction: 'desc' }] }],
  preview: {
    select: { title: 'label', isCurrent: 'isCurrent' },
    prepare: ({ title, isCurrent }) => ({
      title,
      subtitle: isCurrent ? 'Current year' : undefined,
    }),
  },
});
