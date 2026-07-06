'use client'

import { useEffect, useRef, useState } from 'react'
import WordReveal from '@/app/components/ui/WordReveal'

function GoldDust() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = window.innerWidth < 768 ? 35 : 60

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: -(Math.random() * 0.4 + 0.1),
      life: Math.random(),
      decay: Math.random() * 0.003 + 0.001,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.speedX
        p.y += p.speedY
        p.life -= p.decay

        if (p.life <= 0) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.life = Math.random() * 0.8 + 0.2
          p.opacity = Math.random() * 0.6 + 0.2
          p.speedX = (Math.random() - 0.5) * 0.3
          p.speedY = -(Math.random() * 0.4 + 0.1)
        }

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        const alpha = p.opacity * p.life
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.radius * 2
        )
        gradient.addColorStop(0, `rgba(196, 146, 58, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(212, 162, 74, ${alpha * 0.6})`)
        gradient.addColorStop(1, `rgba(196, 146, 58, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="cta__dust"
    />
  )
}

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
    <section className="cta grain" id="contact" ref={ref}>
      <GoldDust />

      <div className="cta__inner">
        <div className={`cta__gold-line ${visible ? 'cta__gold-line--visible' : ''}`} />

        <h2 className={`cta__headline ${visible ? 'cta__headline--visible' : ''}`}>
  <WordReveal
    text="Planning an event in Lagos?"
    triggered={visible}
  />
</h2>

        <p className={`cta__sub ${visible ? 'cta__sub--visible' : ''}`}>
  <WordReveal
    text="From Owambe to Corporate — let's talk about what we can build for you."
    triggered={visible}
  />
</p>

        
        <a href="/book"
  className={`cta__btn ${visible ? 'cta__btn--visible' : ''}`}
>
  Book Your Event
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