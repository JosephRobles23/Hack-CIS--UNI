"use client"

import { useEffect, useState } from "react"
import AnimatedCounter from "./animated-counter"
import GradientText from "./gradient-text"

export default function HackerCounter() {
  const [hackerCount, setHackerCount] = useState(0)

  useEffect(() => {
    // Simular incremento de hackers registrados
    const interval = setInterval(() => {
      setHackerCount((prev) => {
        const increment = Math.random() > 0.7 ? 1 : 0
        return Math.min(prev + increment, 500) // Máximo 500
      })
    }, 5000)

    // Valor inicial
    setHackerCount(Math.floor(Math.random() * 50) + 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-bold">
        <GradientText gradient="from-green-400 to-cyan-400">
          <AnimatedCounter end={hackerCount} />
        </GradientText>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">Hackers Registrados</div>
    </div>
  )
}
