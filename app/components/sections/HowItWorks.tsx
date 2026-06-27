'use client'

import { useEffect, useRef, useState } from 'react'

const steps = [
  {
    number: '01',
    title: 'Tell us about your event.',
    description: 'DM or fill the form with the basics — date, type, what you need.',
  },
  {
    number: '02',
    title: 'We plan and brief.',
    description: 'We put together the right team for your specific event.',
  },
  {
    number: '03',
    title: 'Your event happens.',
    description: 'We handle everything. You enjoy the day.',
  },
]

export default function HowItWorks() {
  const [visible, setVisible] = useState(false)
  const [lineDrawn, setLineDrawn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          setTimeout(() => setLineDrawn(true), 300)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hiw" ref={ref}>
      <div className="container">
        <p className="section-label" style={{ color: 'var(--color-text)', opacity: 0.5 }}>
          How It Works
        </p>

        <div className="hiw__grid">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`hiw__step ${visible ? 'hiw__step--visible' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <span className="hiw__number">{step.number}</span>
              <div className="hiw__connector">
                <div className={`hiw__line ${lineDrawn ? 'hiw__line--drawn' : ''}`}
                  style={{ transitionDelay: `${i * 200}ms` }}
                />
              </div>
              <h3 className="hiw__title">{step.title}</h3>
              <p className="hiw__desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}