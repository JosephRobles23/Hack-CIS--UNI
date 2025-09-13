"use client"

import Image from "next/image"
import GradientText from "../gradient-text"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function SponsorsSection() {
  const allSponsors = [
    { name: "FUTURA", 
      logo: "/images/sponsors/Logo-Futura.png",
      website: "https://futuradata.pe/" },
    { name: "GDG Open Lima", 
      logo: "/images/sponsors/Logo-GDG.webp", 
      website: "https://gdg.community.dev/gdg-open/" },
    {
      name: "CTIC UNI",
      logo: "/images/sponsors/Logo-ctic.png",
      website: "https://www.ctic.uni.edu.pe/",
    },
    /* {
      name: "Ya Vendió",
      logo: "/images/sponsors/Logo-Yavendio.png",
      website: "https://www.yavendio.com/",
    }, */
  ];

  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: sponsorsRef, isIntersecting: sponsorsVisible } = useIntersectionObserver()

  return (
    <section className="pb-12 sm:pb-16 md:pb-20 lg:pb-28 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main heading */}
          <div 
            ref={headerRef}
            className={`space-y-3 sm:space-y-4 lg:space-y-6 mb-6 sm:mb-8 lg:mb-12 transition-all duration-1000 ${
              headerVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-tight px-2"
              style={{
                color: "#D9D9D9",
                fontFamily:
                  "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "0.02em",
              }}
            >
              con el{" "}
              <span
                className="font-bold relative inline-block"
                style={{
                  fontFamily:
                    "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <GradientText gradient="from-yellow-400 to-red-400 font-neue-power">apoyo</GradientText>
                <div
                  className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                  style={{ backgroundColor: "#FAC120", opacity: 0.3 }}
                />
              </span>{" "}
              de
            </h2>
          </div>

          <div 
            ref={sponsorsRef}
            className={`flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
              sponsorsVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {allSponsors.map((sponsor, index) => (
              <a
                key={index}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] xl:w-[220px] h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 flex items-center justify-center rounded-md border border-white/40 transition-all duration-500 hover:bg-white/5 hover:border-white/60 hover:scale-105 cursor-pointer ${
                  sponsorsVisible ? 'animate-fade-in-up' : ''
                }`}
                style={{ 
                  backgroundColor: "transparent",
                  animationDelay: `${index * 100}ms`
                }}
              >
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  width={800}
                  height={480}
                  className="max-h-full max-w-[85%] object-contain opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}