'use client'

import { useEffect, useRef, useState } from 'react'

const services = [
  {
    icon: 'hosts',
    title: 'Hosts & Hostesses',
    description: 'Professional, well-presented event staff for any occasion.',
  },
  {
    icon: 'bridal',
    title: 'Bridal & Celebrant Assistants',
    description: 'Dedicated support so you are fully present on your day.',
  },
  {
    icon: 'coordination',
    title: 'Full Event Coordination',
    description: 'We plan, manage, and execute — start to finish.',
  },
]

function ServiceIcon({ type }: { type: string }) {
  if (type === 'hosts') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="10" r="5" />
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" />
      </svg>
    )
  }
  if (type === 'bridal') {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="16" r="8" />
        <circle cx="16" cy="16" r="3" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4" />
      </svg>
    )
  }
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="4" y="4" width="10" height="10" />
      <rect x="18" y="4" width="10" height="10" />
      <rect x="4" y="18" width="10" height="10" />
      <rect x="18" y="18" width="10" height="10" />
    </svg>
  )
}

export default function Services() {
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
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="services" id="services" ref={ref}>
      <div className="container">
        <p className="section-label">What We Do</p>
        <div className="services__grid">
          {services.map((service, i) => (
            <div
              key={i}
              className={`service-card ${visible ? 'service-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="service-card__icon">
                <ServiceIcon type={service.icon} />
              </div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}