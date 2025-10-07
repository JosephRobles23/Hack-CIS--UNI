"use client"

import dynamic from "next/dynamic"
import FloatingParticles from "@/components/floating-particles"
import Navigation from "@/components/sections/navigation"
import HeroSection from "@/components/sections/hero-section"
import SponsorsSection from "@/components/sections/sponsors-section"
import JudgesSection from "@/components/sections/judges-section"
import DetailsSection from "@/components/sections/details-section"
import FAQSection from "@/components/sections/faq-section"
import SponsorshipSection from "@/components/sections/sponsorship-section"
import CTASection from "@/components/sections/cta-section"
import Footer from "@/components/sections/footer"

// Cargar Spline de forma diferida para no bloquear el FCP
const SplineScene = dynamic(() => import("@/components/spline-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
  ),
})

export default function HackCISMinimal() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingParticles />

      {/* Spline Background - Solo para Navigation y Hero */}
      <div className="relative min-h-screen">
        {/* Spline como fondo absoluto - Z-INDEX BAJO */}
        <div className="absolute inset-0 z-10">
          <SplineScene />
        </div>

        {/* Navigation y Hero con z-index superior - VISIBLES ENCIMA */}
        <div className="relative z-10">
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
