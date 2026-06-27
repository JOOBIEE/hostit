import { useEffect, useRef, useState } from 'react'

export function useWordReveal(text: string, triggered: boolean) {
  const [litCount, setLitCount] = useState(0)
  const words = text.split(' ')

  useEffect(() => {
    if (!triggered) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setLitCount(i)
      if (i >= words.length) clearInterval(interval)
    }, 80)
    return () => clearInterval(interval)
  }, [triggered])

  return { words, litCount }
}