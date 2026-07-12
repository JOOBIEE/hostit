import type { Metadata } from 'next'
import '@/styles/globals.css'
import ThemeProvider from '@/app/components/ui/ThemeProvider'
import HashScrollHandler from '@/app/components/ui/HashScrollHandler'

export const metadata: Metadata = {
  title: {
    default: 'HostIt Services — Premium Event Staffing in Lagos',
    template: '%s | HostIt Services',
  },
  description: 'Professional hosts, hostesses, bridal assistants and full event coordination in Lagos. Your event, our responsibility.',
  keywords: [
    'event staffing Lagos',
    'hostesses Lagos',
    'event coordination Nigeria',
    'bridal assistant Lagos',
    'corporate event staff Nigeria',
    'HostIt Services',
  ],
  authors: [{ name: 'HostIt Services' }],
  creator: 'HostIt Services',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://hostit.services',
    siteName: 'HostIt Services',
    title: 'HostIt Services — Premium Event Staffing in Lagos',
    description: 'Professional hosts, hostesses, bridal assistants and full event coordination in Lagos. Your event, our responsibility.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HostIt Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HostIt Services — Premium Event Staffing in Lagos',
    description: 'Professional hosts, hostesses, bridal assistants and full event coordination in Lagos.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <HashScrollHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}