export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: [
          { title: 'Hosts & Hostesses', value: 'hosts' },
          { title: 'Bridal Assistant', value: 'bridal' },
          { title: 'Full Coordination', value: 'coordination' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'icon',
    },
  },
}