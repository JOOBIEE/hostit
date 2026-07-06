import BookingForm from '@/app/components/sections/BookingForm'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book an Enquiry | HostIt Services',
  description: 'Fill in your event details and we will get back to you with availability and a quotation.',
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '72px' }}>
        <BookingForm />
      </main>
      <Footer />
    </>
  )
}