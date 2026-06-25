export default {
  name: 'galleryPhoto',
  title: 'Gallery Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'eventName',
      title: 'Event Name',
      type: 'string',
    },
    {
      name: 'eventDate',
      title: 'Event Date',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Controls display order. Lower numbers appear first.',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
}