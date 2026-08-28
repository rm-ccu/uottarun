import { defineType, defineField } from 'sanity';

/** One record per human. Execs recur across years with different roles, so the
 *  photo lives here once instead of being re-uploaded per year. */
export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
      description: 'Any framing works — set the hotspot on the face and it crops correctly everywhere.',
    }),
  ],
  orderings: [{ title: 'Name', name: 'name', by: [{ field: 'name', direction: 'asc' }] }],
  preview: { select: { title: 'name', media: 'photo' } },
});
