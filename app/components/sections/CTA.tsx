'use client'

import { useEffect, useRef, useState } from 'react'

export default function CTA() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="cta" id="contact" ref={ref}>
      <div className="cta__inner">
        <div className={`cta__gold-line ${visible ? 'cta__gold-line--visible' : ''}`} />

        <h2 className={`cta__headline ${visible ? 'cta__headline--visible' : ''}`}>
          Planning an event in Lagos?
        </h2>

        <p className={`cta__sub ${visible ? 'cta__sub--visible' : ''}`}>
          From Owambe to Corporate — let's talk about what we can build for you.
        </p>

        
        <a  href="https://wa.me/2348000000000"
          target="_blank"
          rel="noopener noreferrer"
          className={`cta__btn ${visible ? 'cta__btn--visible' : ''}`}
        >
          Book Your Event on WhatsApp
        </a>

        <p className={`cta__alt ${visible ? 'cta__alt--visible' : ''}`}>
          Or send us a DM on Instagram —{' '}
          
         <a   href="https://instagram.com/hostitservices"
            target="_blank"
            rel="noopener noreferrer"
          >
            @hostitservices
          </a>
        </p>
      </div>
    </section>
  )
}