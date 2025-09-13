"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"
import GradientText from "@/components/gradient-text"
import NeonButton from "@/components/neon-button"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function CTASection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: buttonsRef, isIntersecting: buttonsVisible } = useIntersectionObserver()

  return (
    <section id="register" className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="space-y-8 sm:space-y-12">
          <div 
            ref={headerRef}
            className={`space-y-4 sm:space-y-6 transition-all duration-1000 ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <GradientText>¿Listo para</GradientText>
              <br />
              <GradientText gradient="from-yellow-400 to-orange-400 font-neue-power">innovar?</GradientText>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Únete a la comunidad más innovadora de desarrolladores de IA en Perú
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <NeonButton variant="primary" size="lg">
                Registrarse Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </NeonButton>
            </Link>
            <a href="https://chat.whatsapp.com/KjuBCFP0GLq8D622MW59A3?mode=ems_copy_c" target="_blank" rel="noopener noreferrer">
              <NeonButton variant="secondary" size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Grupo de WhatsApp
              </NeonButton>
            </a>
          </div>

          <div className="text-sm text-gray-500">Registro gratuito • Cupos limitados • Solo 500 participantes</div>
        </div>
      </div>
    </section>
  )
}