export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      description: 'Main headline in the hero section',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
    },
    {
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      description: 'Include country code e.g. +2348012345678',
    },
    {
      name: 'instagramHandle',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
    },
    {
      name: 'ctaHeadline',
      title: 'CTA Section Headline',
      type: 'string',
    },
    {
      name: 'ctaSubheadline',
      title: 'CTA Section Subheadline',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'heroHeadline',
    },
  },
}