import { defineType, defineField } from 'sanity';

/** A one-off change to a weekly run: cancelled for weather, moved for a holiday,
 *  different meeting point during construction. Shows as a notice on the site. */
export const runException = defineType({
  name: 'runException',
  title: 'Run Change / Cancellation',
  type: 'document',
  fields: [
    defineField({
      name: 'run',
      title: 'Which run',
      type: 'reference',
      to: [{ type: 'weeklyRun' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date affected',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'What is happening',
      type: 'string',
      options: {
        list: [
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Time changed', value: 'time' },
          { title: 'Location changed', value: 'location' },
          { title: 'Notice only', value: 'notice' },
        ],
        layout: 'radio',
      },
      initialValue: 'cancelled',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'note',
      title: 'Message',
      type: 'localeString',
      description: 'Shown to visitors, e.g. "Cancelled — freezing rain. See you Saturday!"',
    }),
    defineField({
      name: 'newTime',
      title: 'New time',
      type: 'string',
      hidden: ({ parent }) => parent?.status !== 'time',
    }),
    defineField({
      name: 'newLocation',
      title: 'New location',
      type: 'localeString',
      hidden: ({ parent }) => parent?.status !== 'location',
    }),
  ],
  orderings: [{ title: 'Date, soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'desc' }] }],
  preview: {
    select: { date: 'date', status: 'status', run: 'run.title.en' },
    prepare: ({ date, status, run }) => ({ title: `${date} — ${run || 'run'}`, subtitle: status }),
  },
});
