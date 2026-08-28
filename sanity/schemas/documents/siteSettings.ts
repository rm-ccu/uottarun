import { defineType, defineField } from 'sanity';

/** Curated font stack — next/font requires build-time literals, so the CMS
 *  picks from fonts registered in app/layout.tsx rather than free text. */
export const FONT_CHOICES = [
  { title: 'Barlow Condensed', value: 'barlow-condensed' },
  { title: 'DM Sans', value: 'dm-sans' },
  { title: 'Playfair Display', value: 'playfair-display' },
  { title: 'Inter', value: 'inter' },
  { title: 'Oswald', value: 'oswald' },
  { title: 'Space Grotesk', value: 'space-grotesk' },
];

const color = (name: string, title: string, initialValue: string) =>
  defineField({
    name,
    title,
    type: 'string',
    group: 'brand',
    initialValue,
    description: 'Hex code, e.g. #215D7A',
    validation: (Rule) =>
      Rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex colour' }),
  });

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'contact', title: 'Contact & Links', default: true },
    { name: 'brand', title: 'Colours & Fonts' },
  ],
  fields: [
    defineField({
      name: 'email',
      title: 'Contact email',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'socials',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      description: 'Shown in the footer and on the Join page, in this order.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        },
      ],
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Club Instagram',
      type: 'url',
      group: 'contact',
      description: 'Default link for events that have no specific post URL.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'memberFormUrl',
      title: 'Membership form URL',
      type: 'url',
      group: 'contact',
      validation: (Rule) => Rule.required(),
    }),

    color('colorBrand', 'Brand', '#215D7A'),
    color('colorBrandDark', 'Brand — dark', '#184A64'),
    color('colorBrandLight', 'Brand — light', '#DFF0F8'),
    color('colorSecondary', 'Secondary', '#9ABD74'),
    color('colorSecondaryDark', 'Secondary — dark', '#7FA55C'),
    color('colorSecondaryLight', 'Secondary — light', '#EEF7E5'),
    color('colorAccent', 'Accent', '#FFCE00'),
    color('colorAccentDark', 'Accent — dark', '#E6B800'),
    color('colorBackground', 'Page background', '#FFFFF4'),
    color('colorSurface', 'Surface', '#F5F5E8'),

    defineField({
      name: 'fontHeading',
      title: 'Heading font',
      type: 'string',
      group: 'brand',
      options: { list: FONT_CHOICES },
      initialValue: 'barlow-condensed',
    }),
    defineField({
      name: 'fontBody',
      title: 'Body font',
      type: 'string',
      group: 'brand',
      options: { list: FONT_CHOICES },
      initialValue: 'dm-sans',
    }),
    defineField({
      name: 'fontDisplay',
      title: 'Display font',
      type: 'string',
      group: 'brand',
      options: { list: FONT_CHOICES },
      initialValue: 'playfair-display',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
});
