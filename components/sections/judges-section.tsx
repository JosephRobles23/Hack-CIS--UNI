"use client"

import { useState, useEffect, useRef } from "react"
import GradientText from "../gradient-text"
import ProfileCard from "../ProfileCard"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

// Duplicar los jurados para crear un efecto de scroll infinito
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
    profileUrl: 'https://www.linkedin.com/in/ariangcc/'
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
    profileUrl: 'https://www.linkedin.com/in/sagoyanfisic/'
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
    profileUrl: ''
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
    profileUrl: ''
  }
];

const duplicatedJudges = [...judges, ...judges, ...judges, ...judges];

export default function JudgesSection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: judgesRef, isIntersecting: judgesVisible } = useIntersectionObserver()
  
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Calcular cuántos jurados mostrar por slide según el ancho de la pantalla
  const getVisibleItems = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 4; // lg
      if (window.innerWidth >= 768) return 3; // md
      return 3; // sm - mostrar 1.2 jurados en móvil para indicar que hay más
    }
    return 2; // default para SSR
  };
  
  const [visibleItems, setVisibleItems] = useState(getVisibleItems());
  
  // Actualizar visibleItems en cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
      setIsMobile(window.innerWidth < 768);
    };
    
    // Establecer el estado inicial de isMobile
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Animar el desplazamiento automático
  useEffect(() => {
    if (isPaused) return;

    const cardWidth = 100 / visibleItems; // Ancho de cada tarjeta en porcentaje
    const totalWidth = cardWidth * judges.length; // Ancho total del carrusel original

    let animationFrameId: number;
    let isResetting = false;
    
    // Velocidad de desplazamiento más lenta en móviles
    const getScrollSpeed = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 0.1; // Más lento en móviles
      }
      return 0.8; // Velocidad normal en desktop
    };
    
    const animate = () => {
      setScrollPosition(prevPos => {
        // Si hemos desplazado más allá del ancho total, preparar para reiniciar suavemente
        if (prevPos >= totalWidth) {
          if (!isResetting) {
            isResetting = true;
            // Usar setTimeout para dar tiempo a que se complete la transición actual
            setTimeout(() => {
              setScrollPosition(0);
              isResetting = false;
            }, 0);
          }
          // Mantener la posición actual durante el reseteo para evitar saltos
          return prevPos;
        }
        return prevPos + getScrollSpeed(); // Incremento adaptativo
      });
      
      if (!isResetting) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused, visibleItems]);

  const handleContactClick = (judgeName: string) => {
    console.log(`Contact clicked for ${judgeName}`)
    // Aquí puedes agregar la lógica para mostrar más información del jurado
  }

  // Estilo para el contenedor que se desplaza - diferentes configuraciones para móvil y desktop
  const scrollerStyle = {
    transform: `translateX(-${scrollPosition}%)`,
    width: isMobile 
      ? `${duplicatedJudges.length *6}%` // Estilo móvil - más amplio para dar espacio a cada tarjeta
      : `${(duplicatedJudges.length / visibleItems) * 50}%`, // Estilo desktop - similar a TestimonialsSection
  };

  // Función para calcular el ancho de cada elemento del carrusel según el dispositivo
  const getItemWidth = () => {
    if (isMobile) {
      return { width: '80%' }; // En móvil, cada tarjeta ocupa el 80% del contenedor visible
    } else {
      return { width: `${70 / visibleItems}%` }; // En desktop, se ajusta según visibleItems
    }
  };

  return (
    <section className="py-6 sm:py-16 md:py-20 lg:py-20 relative overflow-hidden">
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
            className={`space-y-3 sm:space-y-4 lg:space-y-6 mb-8 sm:mb-12 lg:mb-12 transition-all duration-1000 ${headerVisible
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
            className={`transition-all duration-1000 delay-300 ${judgesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Wrapper para el carrusel con padding específico para móvil */}
            <div className="px-2 sm:px-0">
              <div 
                className="overflow-hidden relative mx-auto max-w-[100%] sm:max-w-full rounded-lg"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
                ref={carouselRef}
              >
                {/* Efecto de desvanecimiento en el borde izquierdo */}
                <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-black to-transparent z-10"></div>
                
                <div 
                  className="flex transition-transform duration-200 ease-linear py-4 md:py-6"
                  style={scrollerStyle}
                >
                  {duplicatedJudges.map((judge, index) => (
                    <div 
                      key={`${judge.id}-${index}`} 
                      className="flex-shrink-0 px-2 py-10 sm:px-3 md:px-4"
                      style={getItemWidth()}
                    >
                      <div className="h-full">
                        <ProfileCard
                          avatarUrl={judge.avatarUrl}
                          name={judge.name}
                          title={judge.title}
                          handle={judge.handle}
                          status={judge.status}
                          contactText={judge.contactText}
                          iconUrl={judge.iconUrl}
                          profileUrl={judge.profileUrl}
                          showUserInfo={true}
                          enableTilt={true}
                          enableMobileTilt={true}
                          onContactClick={() => handleContactClick(judge.name)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Efecto de desvanecimiento en el borde derecho */}
                <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-black to-transparent z-10"></div>
              </div>
            </div>
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
      `}</style>
    </section>
  )
}