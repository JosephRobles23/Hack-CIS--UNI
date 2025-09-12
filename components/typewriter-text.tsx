"use client"

import { useEffect, useState } from "react"

interface TypewriterTextProps {
  text: string
  speed?: number
  className?: string
  highlightWords?: string[]
  onComplete?: () => void
}

export default function TypewriterText({
  text,
  speed = 50,
  className = "",
  highlightWords = [],
  onComplete,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  const renderTextWithHighlights = (text: string) => {
    if (highlightWords.length === 0) return text

    let result = text
    highlightWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi")
      result = result.replace(regex, '<span class="text-yellow-400">$1</span>')
    })

    return <span dangerouslySetInnerHTML={{ __html: result }} />
  }

  return (
    <span className={className}>
      {renderTextWithHighlights(displayText)}
      <span className="animate-pulse">|</span>
    </span>
  )
}
