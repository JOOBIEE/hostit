'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/app/components/ui/ThemeProvider'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()

  // Word by word animation
  const line1 = ['Your', 'event.']
  const line2 = ['Our', 'responsibility.']
  const allWords = [...line1, ...line2]

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let mouseX = -1000
    let mouseY = -1000

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const isMobile = window.innerWidth < 768
    const PARTICLE_COUNT = isMobile ? 40 : 80
    const CONNECTION_DISTANCE = 120
    const REPULSION_DISTANCE = 100

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
    }))

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Repulsion from mouse
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSION_DISTANCE && dist > 0) {
          const force = (REPULSION_DISTANCE - dist) / REPULSION_DISTANCE
          p.vx += (dx / dist) * force * 0.5
          p.vy += (dy / dist) * force * 0.5
        }

        // Dampen velocity
        p.vx *= 0.99
        p.vy *= 0.99

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.4)'
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.15
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = theme === 'dark'
  ? `rgba(255,255,255,${opacity})`
  : `rgba(0,0,0,${opacity})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [theme])

  return (
    <section className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      <div className="hero__content">
        <div className={`hero__gold-line ${visible ? 'hero__gold-line--visible' : ''}`} />

        <h1 className="hero__headline">
          <span className="hero__line">
            {line1.map((word, i) => (
              <span
                key={i}
                className="hero__word"
                style={{
                  animationDelay: `${i * 100 + 300}ms`,
                  animationPlayState: visible ? 'running' : 'paused',
                }}
              >
                {word}
              </span>
            ))}
          </span>
          <span className="hero__line">
            {line2.map((word, i) => (
              <span
                key={i}
                className="hero__word"
                style={{
                  animationDelay: `${(i + line1.length) * 100 + 300}ms`,
                  animationPlayState: visible ? 'running' : 'paused',
                }}
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        <p className={`hero__sub ${visible ? 'hero__sub--visible' : ''}`}>
          So you can show up and enjoy every moment.
        </p>

        <p className="hero__services">
          Hosts · Hostesses · Bridal Assistants · Full Event Coordination
        </p>

        <div className={`hero__buttons ${visible ? 'hero__buttons--visible' : ''}`}>
          <Link href="#contact" className="btn btn--gold">
            Book Your Event
          </Link>
          <Link href="#gallery" className="btn btn--outline">
            See Our Work
          </Link>
        </div>
      </div>

      <div className="hero__scroll-arrow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--color-text-muted)' }}>
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}