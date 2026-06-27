'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useTheme } from '@/app/components/ui/ThemeProvider'

function FloatingText() {
  const letters = ['H', 'O', 'S', 'T', 'I', 'T']
  const [activeIndex, setActiveIndex] = useState(-1)
  const [visible, setVisible] = useState(false)

  const positions = [
    { x: '5%', y: '15%', rotate: '-12deg', size: '18vw' },
    { x: '75%', y: '8%', rotate: '8deg', size: '14vw' },
    { x: '55%', y: '60%', rotate: '-5deg', size: '20vw' },
    { x: '15%', y: '65%', rotate: '10deg', size: '16vw' },
    { x: '40%', y: '25%', rotate: '-8deg', size: '12vw' },
    { x: '80%', y: '55%', rotate: '15deg', size: '17vw' },
  ]

  useEffect(() => {
    let letterIndex = 0
    let timeout: NodeJS.Timeout

    const showNext = () => {
      setActiveIndex(letterIndex)
      letterIndex++

      if (letterIndex < letters.length) {
        timeout = setTimeout(showNext, 400)
      } else {
        timeout = setTimeout(() => {
          setVisible(false)
          setTimeout(() => {
            letterIndex = 0
            setActiveIndex(-1)
            setVisible(true)
            timeout = setTimeout(showNext, 200)
          }, 2000)
        }, 1500)
      }
    }

    const startCycle = () => {
      setVisible(true)
      timeout = setTimeout(showNext, 800)
    }

    const initial = setTimeout(startCycle, 1500)

    return () => {
      clearTimeout(timeout)
      clearTimeout(initial)
    }
  }, [])

  return (
    <div
      className="hero__floating-text"
      style={{
        transition: 'opacity 1000ms ease',
        opacity: visible ? 0.12 : 0,
      }}
    >
      {letters.map((letter, i) => (
        <span
          key={i}
          className="hero__float-letter"
          style={{
            left: positions[i].x,
            top: positions[i].y,
            transform: `rotate(${positions[i].rotate})`,
            fontSize: positions[i].size,
            opacity: activeIndex >= i ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  )
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [visible, setVisible] = useState(false)
  const { theme } = useTheme()

  const line1 = ['Your', 'event.']
  const line2 = ['Our', 'responsibility.']

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

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
        const dx = p.x - mouseX
        const dy = p.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPULSION_DISTANCE && dist > 0) {
          const force = (REPULSION_DISTANCE - dist) / REPULSION_DISTANCE
          p.vx += (dx / dist) * force * 0.5
          p.vy += (dy / dist) * force * 0.5
        }

        p.vx *= 0.99
        p.vy *= 0.99

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = theme === 'dark'
          ? 'rgba(255,255,255,0.6)'
          : 'rgba(0,0,0,0.75)'
        ctx.fill()
      })

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
              : `rgba(0,0,0,${opacity * 2.5})`
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
      <FloatingText />

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
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}