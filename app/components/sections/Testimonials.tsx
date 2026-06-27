'use client'

import { useEffect, useRef, useState } from 'react'
import { client } from '@/app/lib/sanity'
import { testimonialsQuery } from '@/app/lib/queries'
import { Testimonial } from '@/app/types'

const fallbackTestimonials: Testimonial[] = [
  {
    _id: '1',
    _type: 'testimonial',
    quote: 'The team was absolutely professional. Every guest was attended to and I did not have to worry about a single thing on my wedding day.',
    clientName: 'Adaeze O.',
    eventType: 'Wedding',
    location: 'Lekki, Lagos',
    year: '2025',
  },
  {
    _id: '2',
    _type: 'testimonial',
    quote: 'Our corporate dinner was flawless. The hosts were well-presented, warm, and handled everything with such calm and precision.',
    clientName: 'Tunde B.',
    eventType: 'Corporate Dinner',
    location: 'Victoria Island, Lagos',
    year: '2025',
  },
  {
    _id: '3',
    _type: 'testimonial',
    quote: 'I hired HostIt for my 40th birthday and they exceeded every expectation. My guests kept asking who organised the staff.',
    clientName: 'Folake M.',
    eventType: 'Birthday Celebration',
    location: 'Ikoyi, Lagos',
    year: '2024',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials)
  const ref = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    client.fetch(testimonialsQuery).then((data) => {
      if (data && data.length > 0) setTestimonials(data)
    })
  }, [])

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

  const goTo = (index: number) => {
    setFading(true)
    setTimeout(() => {
      setCurrent(index)
      setFading(false)
    }, 300)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      goTo((current + 1) % testimonials.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [current, testimonials.length])

  const t = testimonials[current]

  return (
    <section className="testimonials" ref={ref}>
      <div className="container">
        <p className="section-label">What Clients Say</p>
        <div className={`testimonials__card ${visible ? 'testimonials__card--visible' : ''} ${fading ? 'testimonials__card--fading' : ''}`}>
          <blockquote className="testimonials__quote">
            "{t.quote}"
          </blockquote>
          <p className="testimonials__name">{t.clientName}</p>
          <p className="testimonials__meta">
            {t.eventType}{t.location ? ` · ${t.location}` : ''}{t.year ? `, ${t.year}` : ''}
          </p>
        </div>
        <div className="testimonials__dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}