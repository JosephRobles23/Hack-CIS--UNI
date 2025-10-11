"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Navigation from "@/components/sections/navigation"
import HeroSection from "@/components/sections/hero-section"
import DetailsSection from "@/components/sections/details-section"

// Lazy load de componentes pesados
const FloatingParticles = dynamic(() => import("@/components/floating-particles"), {
  ssr: false,
})

const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
  ),
})

const SponsorsSection = dynamic(() => import("@/components/sections/sponsors-section"))
const JudgesSection = dynamic(() => import("@/components/sections/judges-section"))
const FAQSection = dynamic(() => import("@/components/sections/faq-section"))
const SponsorshipSection = dynamic(() => import("@/components/sections/sponsorship-section"))
const CTASection = dynamic(() => import("@/components/sections/cta-section"))
const Footer = dynamic(() => import("@/components/sections/footer"))

export default function HackCISMinimal() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Verificar al montar
    checkMobile()

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Determinar z-index basado en el tamaño de pantalla
  const splineZIndex = isMobile ? "z-10" : "z-50"

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingParticles />

      {/* Spline Background - Solo para Navigation y Hero */}
      <div className="relative min-h-screen">
        {/* Spline como fondo absoluto - Z-INDEX DINÁMICO */}
        <div className={`absolute inset-0 ${splineZIndex}`}>
          <SplineScene />
        </div>

        {/* Navigation y Hero con z-index superior - VISIBLES ENCIMA */}
        <div className="relative z-[60]">
          <Navigation />
          <HeroSection />
        </div>
      </div>

      <DetailsSection />
      <SponsorsSection />
      <JudgesSection />
      <SponsorshipSection />
      {/* <AgendaSection /> */}
      {/* <EvaluationSection /> */}
      {/* <ProjectSubmissionsSection /> */}
      <FAQSection />
      <CTASection />
      {/* <EventDetailsSection /> */}
      <Footer />
    </div>
  )
}
