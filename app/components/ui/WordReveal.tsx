'use client'

import { useWordReveal } from '@/app/lib/useWordReveal'

export default function WordReveal({
  text,
  triggered,
  className,
}: {
  text: string
  triggered: boolean
  className?: string
}) {
  const { words, litCount } = useWordReveal(text, triggered)

  return (
    <span className={`reveal-text ${className || ''}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`word ${i < litCount ? 'word--lit' : ''}`}
        >
          {word}
        </span>
      ))}
    </span>
  )
}