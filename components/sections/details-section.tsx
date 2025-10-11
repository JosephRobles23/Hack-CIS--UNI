"use client"

import { MapPin, Trophy } from "lucide-react"
import GradientText from "@/components/gradient-text"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import AnimatedCounter from "@/components/animated-counter"
import HackerCounter from "@/components/hacker-counter"
import TypewriterText from "@/components/typewriter-text"

export default function DetailsSection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: statsRef, isIntersecting: statsVisible } = useIntersectionObserver()
  const { ref: dateRef, isIntersecting: dateVisible } = useIntersectionObserver()
  const { ref: prizeRef, isIntersecting: prizeVisible } = useIntersectionObserver()

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-6">
        {/* Header */}
        <header
          ref={headerRef}
          className={`transition-all duration-1000 ${headerVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="flex items-center justify-center space-x-2 mb-8 sm:mb-6">
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
            <span
              className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-70"
              style={{ color: "#D9D9D9" }}
            >
              Detalles
            </span>
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-12 lg:mb-16 px-2">
            <span className="block sm:inline">Todo lo que necesitas </span>
            <div className="relative inline-block">
              <GradientText gradient="from-yellow-400 font-neue-power to-orange-400">saber</GradientText>
              <div
                className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                style={{ backgroundColor: "#FAC120", opacity: 0.3 }}
              />
            </div>
          </h2>
        </header>

        {/* Stats Grid */}
        <div
          ref={statsRef}
          className={`grid grid-cols-3 gap-4 sm:gap-6 lg:gap-12 mb-12 sm:mb-16 transition-all duration-1000 delay-300 ${statsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="text-center transform transition-all duration-700 delay-700 hover:scale-105">
            <div className="text-2xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4">
              <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
                <GradientText gradient="from-yellow-400 to-orange-400">120h</GradientText>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm lg:text-base">non-stop hacking</p>
            </div>
            {/* <p className="text-gray-400 text-xs sm:text-sm lg:text-base">hackers registrados</p> */}
          </div>
          <div className="text-center transform transition-all duration-700 delay-500 hover:scale-105">
            <div className="text-2xl sm:text-4xl lg:text-5xl mb-2 sm:mb-4">
              <GradientText gradient="from-yellow-400 to-orange-400">
                <HackerCounter />
              </GradientText>
            </div>
          </div>
          <div className="text-center transform transition-all duration-700 delay-900 hover:scale-105">
            <div className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
              <GradientText gradient="from-yellow-400 to-orange-400">
                <AnimatedCounter end={1} />
              </GradientText>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm lg:text-base">reto</p>
          </div>
        </div>

        {/* Date and Location */}
        <div
          ref={dateRef}
          className={`space-y-4 sm:space-y-6 lg:space-y-8 transition-all duration-1000 delay-500 ${dateVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="text-4xl sm:text-5xl lg:text-5xl font-bold px-2">
            <GradientText gradient="from-yellow-400 to-orange-400">02 - 07 Nov</GradientText>
          </div>
          <div className="text-xl sm:text-2xl text-gray-300">Lima, Perú</div>
          <div className="flex items-center justify-center space-x-2 text-yellow-400 px-4">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <a
              href="https://maps.app.goo.gl/obq8zZPKnE93QvVz9"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90 transition-opacity text-sm sm:text-base"
            >
              Auditorio CTIC UNI
            </a>
          </div>
        </div>

        {/* Prize Section */}
        <div
          ref={prizeRef}
          className={`mt-12 sm:mt-16 space-y-3 sm:space-y-4 transition-all duration-1000 delay-700 ${prizeVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="flex items-center justify-center transform transition-all duration-500 hover:scale-110">
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-400 mr-2" />
          </div>
          <div className="text-5xl sm:text-5xl lg:text-6xl font-bold px-2">
            <GradientText gradient="from-yellow-400 to-red-400 ">
              <AnimatedCounter end={2000} prefix="S/" suffix="" />
            </GradientText>
          </div>
          <div className="text-gray-400 text-sm sm:text-base">+ premios y sorpresas</div>
        </div>
      </div>
    </section>
  )
}