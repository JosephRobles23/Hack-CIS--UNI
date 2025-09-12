"use client"

import { useState, useEffect } from "react"

interface GlitchTextProps {
  text: string
  className?: string
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [glitchText, setGlitchText] = useState(text)

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    let timeoutId: NodeJS.Timeout

    const glitch = () => {
      const chars = text.split("")
      const glitchedChars = chars.map((char, index) => {
        if (Math.random() < 0.1) {
          return glitchChars[Math.floor(Math.random() * glitchChars.length)]
        }
        return char
      })

      setGlitchText(glitchedChars.join(""))

      timeoutId = setTimeout(() => {
        setGlitchText(text)
      }, 100)
    }

    const intervalId = setInterval(glitch, 3000)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [text])

  return <span className={`${className} transition-all duration-100`}>{glitchText}</span>
}
