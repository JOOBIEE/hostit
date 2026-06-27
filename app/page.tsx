import Navbar from '@/app/components/layout/Navbar'
import Hero from '@/app/components/sections/Hero'
import ProofStrip from '@/app/components/sections/ProofStrip'
import Services from '@/app/components/sections/Services'
import Gallery from '@/app/components/sections/Gallery'
import Testimonials from '@/app/components/sections/Testimonials'
import HowItWorks from '@/app/components/sections/HowItWorks'
import CTA from '@/app/components/sections/CTA'
import Footer from '@/app/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <Services />
        <Gallery />
        <Testimonials />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </>
  )
}