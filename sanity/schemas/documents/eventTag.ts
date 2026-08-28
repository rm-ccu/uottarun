import { defineType, defineField } from 'sanity';

/** Guru / Coffee / Trail etc. A document, not free text, so labels stay
 *  consistent and a new one can be added without touching code. */
export const eventTag = defineType({
  name: 'eventTag',
  title: 'Event Label',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Badge colour',
      type: 'string',
      options: {
        list: [
          { title: 'Brand blue', value: 'brand' },
          { title: 'Green', value: 'secondary' },
          { title: 'Yellow', value: 'accent' },
          { title: 'Neutral', value: 'neutral' },
        ],
        layout: 'radio',
      },
      initialValue: 'brand',
    }),
  ],
  preview: { select: { title: 'title.en', subtitle: 'color' } },
});
