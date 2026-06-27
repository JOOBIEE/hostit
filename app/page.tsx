import Navbar from '@/app/components/layout/Navbar'
import Hero from '@/app/components/sections/Hero'
import ProofStrip from '@/app/components/sections/ProofStrip'
import Services from '@/app/components/sections/Services'
import Gallery from '@/app/components/sections/Gallery'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProofStrip />
        <Services />
        <Gallery />
      </main>
    </>
  )
}