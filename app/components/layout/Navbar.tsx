'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ThemeToggle from '@/app/components/ui/ThemeToggle'
import Image from 'next/image'

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

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner">
          <Link href="/" className="navbar__logo">
            <Image
  src="/images/logo/logo.png"
  alt="HostIt Services"
  width={300}
  height={100}
  style={{ objectFit: 'contain' }}
/>
          </Link>

          <div className="navbar__links">
            <Link href="#services">Services</Link>
            <Link href="#events">Events</Link>
            <Link href="#gallery">Gallery</Link>
            <Link href="#contact">Contact</Link>
          </div>

          <div className="navbar__right">
            <ThemeToggle />
            <Link href="#contact" className="navbar__cta">
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
          <span className="mobile-menu__logo"><Image
  src="/images/logo/logo.png"
  alt="HostIt Services"
  width={200}
  height={80}
  style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
/></span>
          <button
            className="mobile-menu__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="mobile-menu__links">
          <Link href="#services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="#events" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="#contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>

        <Link
          href="#contact"
          className="mobile-menu__cta"
          onClick={() => setMenuOpen(false)}
        >
          Book Your Event
        </Link>
      </div>
    </>
  )
}