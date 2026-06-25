import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import galleryPhoto from './sanity/schemas/galleryPhoto'
import testimonial from './sanity/schemas/testimonial'
import service from './sanity/schemas/service'
import siteSettings from './sanity/schemas/siteSettings'

export default defineConfig({
  name: 'default',
  title: 'HostIt Services',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool()],
  schema: {
    types: [galleryPhoto, testimonial, service, siteSettings],
  },
})