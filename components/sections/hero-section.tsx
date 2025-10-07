import Link from "next/link"
import { Sparkles, FileText } from "lucide-react"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"
import NeonButton from "@/components/neon-button"
import CountdownTimer from "@/components/countdown-timer"
import HackerCounter from "@/components/hacker-counter"
import TypewriterText from "@/components/typewriter-text"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-between px-6 mt-8 sm:mt-3 mb-8 pointer-events-none">
      {/* Línea de tecnologías - Posición fija arriba */}
      <div className="relative z-20 max-w-4xl mx-auto text-center pointer-events-none">
        <div className="text-sm uppercase tracking-widest text-gray-500">
          LLM | Generative AI | Agents AI | Web3 | Blockchain | Cybersecurity | IoT
        </div>
      </div>

      {/* Spacer para empujar el contenido hacia abajo - TRANSPARENTE AL SPLINE */}
      <div className="flex-1"></div>

      {/* Contador - VISIBLE PERO TRANSPARENTE AL SPLINE */}
      <div className="relative pt-0 ">
        <div className="relative z-20">
          <CountdownTimer />
        </div>
      </div>

      {/* Botones y contador - Posición más abajo */}
      <div className="relative z-30 max-w-4xl mx-auto text-center space-y-4 mb-60 pb-20 sm:pb-40 sm:mb-20 pointer-events-none">
        {/* Solo el botón Registrarse es clickeable */}
        <div className="relative flex justify-center pb-10">
          <Link href="/register" className="relative z-50 pointer-events-auto">
            <NeonButton variant="primary" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Registrarse
            </NeonButton>
          </Link>
        </div>
      </div>
    </section>
  )
}