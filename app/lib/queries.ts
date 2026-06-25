export const galleryQuery = `
  *[_type == "galleryPhoto"] | order(order asc) {
    _id,
    title,
    alt,
    image,
    eventName,
    eventDate,
    order
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] | order(_createdAt asc) {
    _id,
    quote,
    clientName,
    eventType,
    location,
    year
  }
`

export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    order
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    heroHeadline,
    heroSubheadline,
    whatsappNumber,
    instagramHandle,
    ctaHeadline,
    ctaSubheadline
  }
`