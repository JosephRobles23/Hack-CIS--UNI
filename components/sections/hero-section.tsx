"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import LiquidGlassButton from "@/components/liquid-glass-button"
import CountdownTimer from "@/components/countdown-timer"
import TypewriterText from "@/components/typewriter-text"
import GradientText from "../gradient-text"
import NeonButton from "@/components/neon-button"

export default function HeroSection() {
  const [marginBottom, setMarginBottom] = useState("mb-[19rem]")

  useEffect(() => {
    const updateMargin = () => {
      const width = window.innerWidth

      if (width >= 426) {
        setMarginBottom("mb-[19rem]")
      } else if (width >= 410 && width <= 425) {
        setMarginBottom("mb-[19rem]")
      } else if (width >= 400 && width <= 409) {
        setMarginBottom("mb-[18rem]")
      } else if (width >= 390 && width <= 399) {
        setMarginBottom("mb-[16rem]")
      } else if (width >= 375 && width <= 389) {
        setMarginBottom("mb-[10.5rem]")
      } else {
        setMarginBottom("mb-[13rem]")
      }
    }

    // Actualizar al montar
    updateMargin()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', updateMargin)

    return () => {
      window.removeEventListener('resize', updateMargin)
    }
  }, [])
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 mt-8 sm:mt-3 mb-8 pointer-events-none">
      {/* Línea de tecnologías - Posición fija arriba */}
      <div className="relative z-20 max-w-4xl mx-auto text-center pointer-events-none">
        <div className="text-sm uppercase tracking-widest text-gray-500">
          LLM | Generative AI | Agents AI | Web3 | Blockchain | Cybersecurity | IoT
        </div>
      </div>

      {/* Spacer para empujar el contenido hacia abajo - TRANSPARENTE AL SPLINE */}
      <div className="flex-1 pointer-events-none"></div>
      <div className="relative text-center">
        <p className="text-xs  py-3 font-neue-power md:text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed font-mono font-bold">
          <TypewriterText text="[CIS HACK] → Deploying the Future in 120H" speed={45} />
        </p>
      </div>

      {/* Contador - VISIBLE PERO TRANSPARENTE AL SPLINE */}
      <div className="relative pt-0 ">
        <div className="relative z-20">
          <CountdownTimer />
        </div>
      </div>

      {/* Botones y contador - Posición más abajo */}
      <div className={`relative z-30 max-w-4xl mx-auto text-center space-y-4 ${marginBottom} sm:pb-[8rem] sm:mb-20 pointer-events-none`}>
        {/* Botón Liquid Glass Registrarse */}
        <div className="relative flex justify-center pb-10">
          <Link href="/register" className="relative z-50 pointer-events-auto">
            <LiquidGlassButton variant="primary" size="md">
                {/* <Sparkles className="w-4 sm:h-5 sm:w-5" /> */}
              <GradientText gradient="from-yellow-400 to-red-400 font-neue-power">Registrarse</GradientText>
            </LiquidGlassButton>
          </Link>
        </div>
      </div>
    </section>
  )
}