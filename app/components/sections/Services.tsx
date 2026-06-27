'use client'

import { useEffect, useRef, useState } from 'react'
import { client } from '@/app/lib/sanity'
import { servicesQuery } from '@/app/lib/queries'
import { Service } from '@/app/types'

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

function TiltCard({
  service,
  index,
  visible,
}: {
  service: Service
  index: number
  visible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)')
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    let permission = false

    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        const response = await (DeviceOrientationEvent as any).requestPermission()
        permission = response === 'granted'
      } else {
        permission = true
      }
    }

    requestPermission()

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (!permission) return
      const beta = Math.min(Math.max(e.beta || 0, -30), 30)
      const gamma = Math.min(Math.max(e.gamma || 0, -30), 30)
      const rotateX = -(beta / 30) * 8
      const rotateY = (gamma / 30) * 8
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`)
    }

    window.addEventListener('deviceorientation', handleOrientation)
    return () => window.removeEventListener('deviceorientation', handleOrientation)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = -((y - centerY) / centerY) * 8
    const rotateY = ((x - centerX) / centerX) * 8
    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowPos({ x: glowX, y: glowY })
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setIsHovered(false)
  }

  return (
    <div
      ref={cardRef}
      className={`service-card ${visible ? 'service-card--visible' : ''}`}
      style={{
        transitionDelay: `${index * 120}ms`,
        transform,
        transition: isHovered
          ? 'transform 0.1s ease'
          : 'transform 0.5s ease, opacity 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && (
        <div
          className="service-card__glow"
          style={{
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(196,146,58,0.12) 0%, transparent 60%)`,
          }}
        />
      )}
      <div className="service-card__icon">
        <ServiceIcon type={service.icon} />
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>
    </div>
  )
}

export default function Services() {
  const [visible, setVisible] = useState(false)
  const [services, setServices] = useState<Service[]>([])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    client.fetch(servicesQuery).then((data) => {
      setServices(data)
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
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const displayServices = services.length > 0 ? services : [
    { _id: '1', _type: 'service' as const, title: 'Hosts & Hostesses', description: 'Professional, well-presented event staff for any occasion.', icon: 'hosts' as const },
    { _id: '2', _type: 'service' as const, title: 'Bridal & Celebrant Assistants', description: 'Dedicated support so you are fully present on your day.', icon: 'bridal' as const },
    { _id: '3', _type: 'service' as const, title: 'Full Event Coordination', description: 'We plan, manage, and execute — start to finish.', icon: 'coordination' as const },
  ]

  return (
    <section className="services grain" id="services" ref={ref}>
      <div className="container">
        <p className="section-label">What We Do</p>
        <div className="services__grid">
          {displayServices.map((service, i) => (
            <TiltCard
              key={service._id}
              service={service}
              index={i}
              visible={visible}
            />
          ))}
        </div>
      </div>
    </section>
  )
}