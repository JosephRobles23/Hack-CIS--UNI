"use client"

import { useEffect, useState } from "react"

interface ConfettiEffectProps {
  isActive: boolean
  duration?: number
}

export default function ConfettiEffect({ isActive, duration = 5000 }: ConfettiEffectProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    emoji: string
    startX: number
    startY: number
    velocityX: number
    velocityY: number
    rotation: number
    rotationSpeed: number
    delay: number
  }>>([])

  useEffect(() => {
    if (isActive) {
      // Crear partículas con física realista
      const newParticles = Array.from({ length: 30 }, (_, i) => {
        // Posiciones de inicio aleatorias en la parte inferior
        const startX = Math.random() * window.innerWidth
        const startY = window.innerHeight - 50
        
        // Velocidades iniciales más realistas
        const velocityX = (Math.random() - 0.5) * 800 // -400 a 400 px/s
        const velocityY = -(Math.random() * 600 + 400) // -400 a -1000 px/s (hacia arriba)
        
        return {
          id: i,
          emoji: ["🎉", "🎊", "✨", "🎈", "🥳", "🎆", "🌟", "💫", "⭐"][Math.floor(Math.random() * 9)],
          startX,
          startY,
          velocityX,
          velocityY,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 720, // -360 a 360 grados/s
          delay: Math.random() * 1000 // 0-1 segundo de delay
        }
      })
      
      setParticles(newParticles)
      
      // Limpiar después de la duración especificada
      const timer = setTimeout(() => {
        setParticles([])
      }, duration)
      
      return () => clearTimeout(timer)
    } else {
      setParticles([])
    }
  }, [isActive, duration])

  if (!isActive || particles.length === 0) return null

  return (
    <>
      <style jsx>{`
        @keyframes confetti-physics {
          0% {
            transform: translate(var(--start-x), var(--start-y)) rotate(var(--start-rotation));
            opacity: 1;
          }
          100% {
            transform: translate(var(--end-x), var(--end-y)) rotate(var(--end-rotation));
            opacity: 0;
          }
        }
        
        .confetti-particle {
          animation: confetti-physics var(--duration) var(--easing) var(--delay) forwards;
        }
      `}</style>
      
      <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden">
        {particles.map((particle) => {
          // Calcular posición final usando física realista
          const gravity = 980 // px/s² (gravedad)
          const animationDuration = 4 // segundos
          
          // Ecuaciones de movimiento uniformemente acelerado
          const finalX = particle.startX + (particle.velocityX * animationDuration)
          const finalY = particle.startY + (particle.velocityY * animationDuration) + (0.5 * gravity * animationDuration * animationDuration)
          
          const finalRotation = particle.rotation + (particle.rotationSpeed * animationDuration)
          
          // Función de easing que simula resistencia del aire
          const easing = "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          
          return (
            <div
              key={particle.id}
              className="absolute confetti-particle text-2xl select-none"
              style={{
                '--start-x': `${particle.startX}px`,
                '--start-y': `${particle.startY}px`,
                '--end-x': `${finalX}px`,
                '--end-y': `${finalY}px`,
                '--start-rotation': `${particle.rotation}deg`,
                '--end-rotation': `${finalRotation}deg`,
                '--duration': `${animationDuration}s`,
                '--easing': easing,
                '--delay': `${particle.delay}ms`,
                left: 0,
                top: 0,
              } as React.CSSProperties}
            >
              {particle.emoji}
            </div>
          )
        })}
      </div>
    </>
  )
}