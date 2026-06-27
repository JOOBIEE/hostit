'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { client, urlFor } from '@/app/lib/sanity'
import { galleryQuery } from '@/app/lib/queries'
import { GalleryPhoto } from '@/app/types'

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

type PhotoItem = {
  id: string
  alt: string
  aspectRatio: string
  sanityUrl?: string
}

function GalleryItem({
  photo,
  index,
  onOpen,
  tappedId,
  setTappedId,
}: {
  photo: PhotoItem
  index: number
  onOpen: (src: string) => void
  tappedId: string | null
  setTappedId: (id: string | null) => void
}) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const isTapped = tappedId === photo.id
  const src = photo.sanityUrl || `/images/gallery/placeholder-${photo.id}.jpeg`

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

  const handleClick = () => {
    const mobile = window.innerWidth < 768
    if (mobile) {
      if (isTapped) {
        onOpen(src)
        setTappedId(null)
      } else {
        setTappedId(photo.id)
      }
    } else {
      onOpen(src)
    }
  }

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
        height: heights[photo.aspectRatio] || '300px',
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div
        className={`gallery-item__img
          ${hovered ? 'gallery-item__img--hovered' : ''}
          ${isTapped ? 'gallery-item__img--tapped' : ''}
        `}
      >
        <Image
          src={src}
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
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [tappedId, setTappedId] = useState<string | null>(null)
  const [sanityPhotos, setSanityPhotos] = useState<GalleryPhoto[]>([])

  useEffect(() => {
    client.fetch(galleryQuery).then((data) => {
      if (data && data.length > 0) setSanityPhotos(data)
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  useEffect(() => {
    if (lightboxSrc) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [lightboxSrc])

  const photos: PhotoItem[] = sanityPhotos.length > 0
    ? sanityPhotos.map((photo) => ({
        id: photo._id,
        alt: photo.alt,
        aspectRatio: 'tall',
        sanityUrl: urlFor(photo.image).width(800).url(),
      }))
    : placeholderPhotos.map((photo) => ({
        ...photo,
        sanityUrl: undefined,
      }))

  return (
    <section className="gallery grain" id="gallery" ref={ref}>
      <div className="container">
        <p className="section-label">The Team In Action</p>
        <div className="gallery__grid">
          {photos.map((photo, i) => (
            <GalleryItem
              key={photo.id}
              photo={photo}
              index={i}
              onOpen={setLightboxSrc}
              tappedId={tappedId}
              setTappedId={setTappedId}
            />
          ))}
        </div>

        <div className={`gallery__cta ${visible ? 'gallery__cta--visible' : ''}`}>
          <a href="#contact" className="btn btn--dark">
            Work With Us
          </a>
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="lightbox"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            className="lightbox__close"
            onClick={() => setLightboxSrc(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="lightbox__img-wrap"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxSrc}
              alt="Full size photo"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </section>
  )
}