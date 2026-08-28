import { defineType, defineField } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero background photo',
      type: 'image',
      options: { hotspot: true },
      description:
        'Full-bleed background. Set the hotspot on the subject so the crop holds up on phones.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'heroHeadlinePre', title: 'Headline — before italic', type: 'localeString' }),
    defineField({ name: 'heroHeadlineEm', title: 'Headline — italic part', type: 'localeString' }),
    defineField({ name: 'heroHeadlinePost', title: 'Headline — after italic', type: 'localeString' }),
    defineField({ name: 'heroSub', title: 'Hero subtitle', type: 'localeText' }),
    defineField({
      name: 'stats',
      title: 'Stats bar',
      type: 'array',
      description: 'Shown across the yellow band. Three reads best; more will wrap.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. 600+',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'label', title: 'Label', type: 'localeString' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label.en' } },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
});
