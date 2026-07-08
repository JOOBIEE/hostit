'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ThemeToggle from '@/app/components/ui/ThemeToggle'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function ScrambleLink({
  href,
  label,
  onClick,
}: {
  href: string
  label: string
  onClick?: () => void
}) {
  const [display, setDisplay] = useState(label)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const frameRef = useRef(0)

  const scramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    frameRef.current = 0

    intervalRef.current = setInterval(() => {
      frameRef.current++
      const progress = frameRef.current / (label.length * 3)

      setDisplay(
        label
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (i < frameRef.current / 3) return label[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplay(label)
      }
    }, 40)
  }

  const reset = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setDisplay(label)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <Link
      href={href}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {display}
    </Link>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const navLinks = [
    { href: '#services', label: 'SERVICES' },
    { href: '#events', label: 'EVENTS' },
    { href: '#gallery', label: 'GALLERY' },
    { href: '#contact', label: 'CONTACT' },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo">
            <Image
              src="/images/logo/logo.png"
              alt="HostIt Services"
              width={180}
              height={52}
              style={{ objectFit: 'contain' }}
            />
          </Link>

          <div className="navbar__links">
            {navLinks.map((link) => (
              <ScrambleLink
                key={link.href}
                href={link.href}
                label={link.label}
              />
            ))}
          </div>

          <div className="navbar__right">
            <ThemeToggle />
            <Link href="/book" className="navbar__cta">
  Book Your Event
</Link>
          </div>

          <div className="navbar__mobile-right">
            <ThemeToggle />
            <button
              className="navbar__hamburger"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__header">
          <span className="mobile-menu__logo">
            <Image
              src="/images/logo/logo.png"
              alt="HostIt Services"
              width={300}
              height={100}
              style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
            />
          </span>
          <button
            className="mobile-menu__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-menu__links">
          {navLinks.map((link) => (
            <ScrambleLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setMenuOpen(false)}
            />
          ))}
        </div>

        <Link href="/book" className="navbar__cta">
  Book Your Event
</Link>
      </div>
    </>
  )
}