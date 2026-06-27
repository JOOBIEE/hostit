'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const placeholderPhotos = [
  { id: '1', alt: 'Event photo 1', aspectRatio: 'tall' },
  { id: '2', alt: 'Event photo 2', aspectRatio: 'wide' },
  { id: '3', alt: 'Event photo 3', aspectRatio: 'tall' },
  { id: '4', alt: 'Event photo 4', aspectRatio: 'square' },
  { id: '5', alt: 'Event photo 5', aspectRatio: 'tall' },
  { id: '6', alt: 'Event photo 6', aspectRatio: 'wide' },
  { id: '7', alt: 'Event photo 7', aspectRatio: 'square' },
  { id: '8', alt: 'Event photo 8', aspectRatio: 'tall' },
]

function GalleryItem({ photo, index }: { photo: typeof placeholderPhotos[0], index: number }) {
  const [hovered, setHovered] = useState(false)
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const heights: Record<string, string> = {
    tall: '380px',
    wide: '240px',
    square: '300px',
  }

  return (
    <div
      ref={ref}
      className={`gallery-item ${visible ? 'gallery-item--visible' : ''}`}
      style={{
        height: heights[photo.aspectRatio],
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`gallery-item__img ${hovered ? 'gallery-item__img--hovered' : ''}`}>
        <Image
          src={`/images/gallery/placeholder-${photo.id}.jpeg`}
          alt={photo.alt}
          fill
          style={{ objectFit: 'cover' }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        <div className="gallery-item__fallback">
          <span>{photo.alt}</span>
        </div>
      </div>
    </div>
  )
}

export default function Gallery() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="gallery" id="gallery" ref={ref}>
      <div className="container">
        <p className="section-label">The Team In Action</p>
        <div className="gallery__grid">
          {placeholderPhotos.map((photo, i) => (
            <GalleryItem key={photo.id} photo={photo} index={i} />
          ))}
        </div>
        <div className={`gallery__cta ${visible ? 'gallery__cta--visible' : ''}`}>
          <a href="#contact" className="btn btn--dark">
            Work With Us
          </a>
        </div>
      </div>
    </section>
  )
}