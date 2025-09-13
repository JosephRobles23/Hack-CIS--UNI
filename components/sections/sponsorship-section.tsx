"use client"

import Link from "next/link"
import GradientText from "@/components/gradient-text"
import NeonButton from "@/components/neon-button"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function SponsorshipSection() {
  const { ref: sectionRef, isIntersecting: sectionVisible } = useIntersectionObserver()

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={sectionRef}
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            sectionVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-8 sm:mb-12">
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
            <span
              className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-70"
              style={{ color: "#D9D9D9" }}
            >
              Patrocinadores
            </span>
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            ¿Quieres ser <GradientText gradient="from-yellow-400 to-orange-400 font-neue-power">patrocinador?</GradientText>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Conecta tu marca con la hack más grande de innovación en la región
          </p>
          <div className={`transition-all duration-700 delay-300 ${
            sectionVisible 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <Link href="/sponsors">
              <NeonButton variant="secondary" size="lg" className="transform hover:scale-105 transition-transform duration-300">
                Únete como patrocinador
              </NeonButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}