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
  const [marginBottom, setMarginBottom] = useState("mb-[12rem]")
  const [marginBottomDesktop, setMarginBottomDesktop] = useState("pb-[15rem]")

  useEffect(() => {
    const updateSpacing = () => {
      const width = window.innerWidth

      // Desktop Extra Grande (1920px+)
      if (width >= 1600) {
        setMarginBottom("")
        setMarginBottomDesktop("mb-[24rem]")
      }
      // Desktop Grande (1536px - 1919px)
      else if (width >= 1536 && width <= 1599) {
        setMarginBottom("")
        setMarginBottomDesktop("mb-[21rem]")
      }
      // Desktop Estándar / Laptop Grande (1280px - 1535px)
      else if (width >= 1280 && width <= 1535) {
        setMarginBottom("")
        setMarginBottomDesktop("mb-[20rem]")
      }
      // Laptop Pequeña (1024px - 1279px)
      else if (width >= 1024 && width <= 1279) {
        setMarginBottom("")
        setMarginBottomDesktop("mb-[25rem]")
      }
      // Tablet / iPad (768px - 1023px)
      else if (width >= 768 && width <= 1023) {
        setMarginBottom("")
        setMarginBottomDesktop("mb-[2rem]")
      }
      // Tablet Pequeña / Móvil Grande (431px - 767px)
      else if (width >= 431 && width <= 767) {
        setMarginBottom("mb-[12rem]")
        setMarginBottomDesktop("")
      }
      // Móvil (426px - 430px)
      else if (width >= 426 && width <= 430) {
        setMarginBottom("mb-[12rem]")
        setMarginBottomDesktop("")
      }
      // Móvil (410px - 425px)
      else if (width >= 410 && width <= 425) {
        setMarginBottom("mb-[14rem]")
        setMarginBottomDesktop("")
      }
      // Móvil (400px - 409px)
      else if (width >= 400 && width <= 409) {
        setMarginBottom("mb-[13rem]")
        setMarginBottomDesktop("")
      }
      // Móvil (390px - 399px)
      else if (width >= 390 && width <= 399) {
        setMarginBottom("mb-[12rem]")
        setMarginBottomDesktop("")
      }
      // Móvil (375px - 389px)
      else if (width >= 375 && width <= 389) {
        setMarginBottom("mb-[10.5rem]")
        setMarginBottomDesktop("")
      }
      // Móvil Pequeño (< 375px)
      else {
        setMarginBottom("mb-[13rem]")
        setMarginBottomDesktop("")
      }
    }

    // Actualizar al montar
    updateSpacing()

    // Escuchar cambios de tamaño
    window.addEventListener('resize', updateSpacing)

    return () => {
      window.removeEventListener('resize', updateSpacing)
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
      <div className={`relative z-20 max-w-4xl mx-auto text-center space-y-4 ${marginBottom} ${marginBottomDesktop}`}>
        {/* Botón Liquid Glass Registrarse - Solo Mobile */}
        <div className="relative flex justify-center  md:hidden">
          <Link href="/register" className="relative z-30 pointer-events-auto">
            <LiquidGlassButton variant="primary" size="md">
                <Sparkles className="w-4 sm:h-5 sm:w-5" />
              <GradientText gradient="from-yellow-400 to-red-400 font-neue-power">Registrarse</GradientText>
            </LiquidGlassButton>
          </Link>
        </div>
      </div>
    </section>
  )
}