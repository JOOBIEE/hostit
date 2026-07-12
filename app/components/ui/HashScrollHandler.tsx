'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }, [pathname])

  return null
}