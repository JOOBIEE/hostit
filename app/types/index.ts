export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface GalleryPhoto {
  _id: string
  _type: 'galleryPhoto'
  title: string
  alt: string
  image: SanityImage
  eventName?: string
  eventDate?: string
  order?: number
}

export interface Testimonial {
  _id: string
  _type: 'testimonial'
  quote: string
  clientName: string
  eventType: string
  location?: string
  year?: string
}

export interface Service {
  _id: string
  _type: 'service'
  title: string
  description: string
  icon: 'hosts' | 'bridal' | 'coordination'
  order?: number
}

export interface SiteSettings {
  _id: string
  _type: 'siteSettings'
  heroHeadline: string
  heroSubheadline: string
  whatsappNumber: string
  instagramHandle: string
  ctaHeadline: string
  ctaSubheadline: string
}