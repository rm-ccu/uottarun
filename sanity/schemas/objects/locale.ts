import { defineType, defineField } from 'sanity';

/**
 * Field-level EN/FR. English is required; a missing French value raises a
 * validation *warning* so editors can see untranslated content at a glance
 * without being blocked from saving a draft.
 */
const frWarning = (Rule: import('sanity').StringRule | import('sanity').TextRule) =>
  Rule.custom((value?: string) =>
    value ? true : 'No French translation yet — this will fall back to English on the site.'
  ).warning();

export const localeString = defineType({
  name: 'localeString',
  title: 'Text (EN / FR)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'string',
      validation: frWarning,
    }),
  ],
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Paragraph (EN / FR)',
  type: 'object',
  options: { columns: 2 },
  fields: [
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fr',
      title: 'Français',
      type: 'text',
      rows: 3,
      validation: frWarning,
    }),
  ],
});
