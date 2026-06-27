'use client'

import { useEffect, useRef, useState } from 'react'

const proofPoints = [
  {
    headline: 'Events every weekend',
    sub: 'Lagos and beyond',
  },
  {
    headline: 'Weddings, Corporate & Social',
    sub: 'Any event, any scale',
  },
  {
    headline: 'Professional staff',
    sub: 'Briefed before every event',
  },
]

export default function ProofStrip() {
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
    <section className="proof grain" ref={ref}>
      <div className="proof__inner">
        {proofPoints.map((point, i) => (
          <div
            key={i}
            className={`proof__item ${visible ? 'proof__item--visible' : ''}`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <h3 className="proof__headline">{point.headline}</h3>
            <p className="proof__sub">{point.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}