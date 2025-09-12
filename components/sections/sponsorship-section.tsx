import Link from "next/link"
import GradientText from "@/components/gradient-text"
import NeonButton from "@/components/neon-button"

export default function SponsorshipSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-12">
            <div
              className="w-4 sm:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
            <span
              className="text-xs sm:text-sm font-medium tracking-wider  uppercase opacity-70"
              style={{ color: "#D9D9D9" }}
            >
              Patrocinadores
            </span>
            <div
              className="w-4 sm:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 ">
            ¿Quieres ser <GradientText gradient="from-yellow-400 to-orange-400 font-neue-power">patrocinador?</GradientText>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Conecta tu marca con la hack más grande de innovación en la región
          </p>
          <Link href="/sponsors">
            <NeonButton variant="secondary" size="lg">
              Únete como patrocinador
            </NeonButton>
          </Link>
        </div>
      </div>
    </section>
  )
}