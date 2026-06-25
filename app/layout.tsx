import type { Metadata } from 'next'
import '@/styles/globals.css'
import ThemeProvider from '@/app/components/ui/ThemeProvider'

export const metadata: Metadata = {
  title: 'HostIt Services',
  description: 'Premium event staffing and coordination in Lagos.',
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}