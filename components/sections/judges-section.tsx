"use client"

import { useState, useEffect } from "react"
import GradientText from "../gradient-text"
import InfiniteProfileCarousel from "../infinite-profile-carousel"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function JudgesSection() {
  const judges = [
    {
      id: "1",
      name: "Arian Gallardo",
      title: "Software Engineer @ Microsoft",
      handle: "ariangcc",
      status: "Instagram" as const,
      contactText: "Ver LinkedIn",
      avatarUrl: "/images/judges/judge1.webp",
      iconUrl: "/images/card-cis.webp",
      profileUrl: 'https://www.linkedin.com/in/ariangcc/',
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: true,
      onContactClick: () => handleContactClick("Arian Gallardo")
    },
    {
      id: "2",
      name: "Yancel Salinas",
      title: "CTO @ASG Group",
      handle: "yancel.salinas",
      status: "Instagram" as const,
      contactText: "Ver LinkedIn",
      avatarUrl: "/images/judges/judge2.webp",
      iconUrl: "/images/card-cis.webp",
      profileUrl: 'https://www.linkedin.com/in/sagoyanfisic/',
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: true,
      onContactClick: () => handleContactClick("Yancel Salinas")
    },
    {
      id: "3",
      name: "Anonimo",
      title: "Anonimo",
      handle: "anonimo",
      status: "Instagram" as const,
      contactText: "Ver LinkedIn",
      avatarUrl: "/images/judges/anonimo.webp",
      iconUrl: "/images/card-cis.webp",
      profileUrl: '',
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: true,
      onContactClick: () => handleContactClick("Anonimo")
    },
    {
      id: "4",
      name: "Anonimo",
      title: "Anonimo",
      handle: "anonimo",
      status: "Instagram" as const,
      contactText: "Ver LinkedIn",
      avatarUrl: "/images/judges/anonimo.webp",
      iconUrl: "/images/card-cis.webp",
      profileUrl: '',
      showUserInfo: true,
      enableTilt: true,
      enableMobileTilt: true,
      onContactClick: () => handleContactClick("Anonimo")
    }
  ]

  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: judgesRef, isIntersecting: judgesVisible } = useIntersectionObserver()

  const [visibleItems, setVisibleItems] = useState(2)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1)
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2)
      } else {
        setVisibleItems(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleContactClick = (judgeName: string) => {
    console.log(`Contact clicked for ${judgeName}`)
    // Aquí puedes agregar la lógica para mostrar más información del jurado
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="container px-0 relative z-10">
        <div className="flex items-center justify-center space-x-2 mb-10 sm:mb-6">
          <div
            className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#FFDA35" }}
          />
          <span
            className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-70"
            style={{ color: "#D9D9D9" }}
          >
            Jurados
          </span>
          <div
            className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#FFDA35" }}
          />
        </div>
        <div className="text-center">
          {/* Main heading */}
          <div
            ref={headerRef}
            className={`space-y-3 sm:space-y-4 lg:space-y-6 mb-8 sm:mb-12 lg:mb-16 transition-all duration-1000 ${headerVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <h2
              className="text-3xl sm:text-3xl lg:text-5xl font-bold tracking-tight leading-tight px-2"
              style={{
                color: "#ffffffff",
                fontFamily:
                  "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              Conoce a nuestros{" "}
              <span
                className="font-bold relative inline-block"
                style={{
                  fontFamily:
                    "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <GradientText gradient="from-cyan-400 to-purple-500 font-neue-power">jurados</GradientText>
                <div
                  className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                  style={{ backgroundColor: "#00D4FF", opacity: 0.3 }}
                />
              </span>
            </h2>
          </div>

          {/* Judges Carousel */}
          <div
            ref={judgesRef}
            className={` transition-all duration-1000 delay-300 ${judgesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            <InfiniteProfileCarousel
              profiles={judges}
              visibleItems={visibleItems}
              speed={0.08}
              pauseOnHover={true}
              direction="left"
              gap={visibleItems === 1 ? 8 : 32}
              fadeWidth={visibleItems === 1 ? 40 : 80}
              autoPlay={true}
              className="judges-carousel"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        :global(.judges-carousel) {
          padding: 1rem 0;
          min-height: 600px;
        }
        
        @media (max-width: 1024px) {
          :global(.judges-carousel) {
            min-height: 450px;
          }
        }
        
        @media (max-width: 768px) {
          :global(.judges-carousel) {
            padding: 1rem 0;
            min-height: 400px;
          }
        }
        
        @media (max-width: 480px) {
          :global(.judges-carousel) {
            min-height: 350px;
          }
        }
      `}</style>
    </section>
  )
}