"use client"

import { useEffect, useState } from "react"
import GradientText from "./gradient-text"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint de Tailwind
    }

    // Verificar al montar
    checkMobile()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', checkMobile)

    // 02/10/2025 12:00:00 hora Perú (PET = UTC-5) -> UTC 17:00:00
    const targetTimestampUtc = Date.UTC(2025, 10, 2, 17, 0, 0)

    const update = () => {
      const now = Date.now()
      const difference = targetTimestampUtc - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    // Actualizar inmediatamente y luego cada segundo
    update()
    const timer = setInterval(update, 1000)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Etiquetas condicionales según el tamaño de pantalla
  const timeUnits = isMobile ? [
    { label: "Days", value: timeLeft.days },
    { label: "Hrs", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ] : [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ]

  return (
    <div className="mb-6">
      {/* Countdown Display */}
      <div className="grid grid-cols-4 gap-2 flex justify-center sm:gap-2 max-w-[16rem] sm:max-w-sm mx-auto">
        {timeUnits.map((unit, index) => (
          <div
            key={unit.label}
            className="text-center p-1 sm:p-4 rounded-lg sm:rounded-xl border border-white/10"
            style={{ backgroundColor: "#000000" }}
          >
            <div
              className="text-lg sm:text-2xl font-black mb-1"
              style={{
                background: "linear-gradient(to right, #FACC15, #F87171)", // equivalente a from-yellow-400 to-red-400
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontFamily: "'Orbitron', 'Rajdhani', 'Arial Black', sans-serif",
                fontWeight: "900",
              }}
            >
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div
              className="text-xs uppercase tracking-tight sm:tracking-wider font-medium opacity-70 leading-tight"
              style={{ color: "#D9D9D9" }}
            >
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
