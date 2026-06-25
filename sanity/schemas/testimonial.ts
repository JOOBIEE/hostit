export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      description: 'e.g. Wedding, Corporate Dinner',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. Victoria Island, Lagos',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. 2025',
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'eventType',
    },
  },
}