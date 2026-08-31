import { defineType, defineField } from 'sanity';

/** Section headings live in i18next (`faq_page.categories.*`) so a new
 *  category needs a translation, not just a value typed into the Studio. */
export const FAQ_CATEGORIES = [
  { title: 'The runs', value: 'runs' },
  { title: 'What to bring & wear', value: 'logistics' },
  { title: 'Safety', value: 'safety' },
  { title: 'Getting involved', value: 'involved' },
];

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Section',
      type: 'string',
      options: { list: FAQ_CATEGORIES, layout: 'radio' },
      initialValue: 'runs',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkLabel',
      title: 'Link label (optional)',
      type: 'localeString',
      description: 'Adds a button under the answer, e.g. "Follow us on Instagram".',
    }),
    defineField({
      name: 'linkUrl',
      title: 'Link URL (optional)',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Sort order',
      type: 'number',
      description: 'Lowest first, within the section.',
      initialValue: 100,
    }),
  ],
  orderings: [{ title: 'Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: { select: { title: 'question.en', subtitle: 'category' } },
});
