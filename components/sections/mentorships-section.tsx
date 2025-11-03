"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Linkedin } from "lucide-react"
import GradientText from "../gradient-text"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

const mentorships = [
  {
    id: "1",
    title: "AGENTES EN ACCIÓN: TEORÍA Y PRÁCTICA CON SMOLAGENTS",
    description: "Explora el mundo de los agentes LLM en una sesión práctica con la librería smolagents de Hugging Face.",
    mentor: {
      name: "SERGIO DEL CARPIO",
      role: "SSr. Adv. Python Developer",
      company: "Globant",
      image: "/images/mentors/Carpio-mentor.webp",
      linkedin: "https://www.linkedin.com/in/sadelcarpio/"
    },
    schedule: {
      date: "03 NOV 2025",
      time: "AT 6:30 PM"
    },
    calendarUrl: "https://calendar.app.google/5gaycD4YWpHWxB4V7",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    id: "2",
    title: "PROCESAMIENTO DE LENGUAJE NATURAL: DE LA MINERÍA AL MODELO",
    description: "Una guía práctica para transformar datos de texto en modelos de IA funcionales.",
    mentor: {
      name: "LUIS GARAYAR",
      role: "Chapter Leader Data Science",
      company: "CREDICORP",
      image: "/images/mentors/Futura-mentor.webp",
      linkedin: "https://www.linkedin.com/in/luis-felipe-garayar-burneo-70752124/"
    },
    schedule: {
      date: "04 NOV 2025",
      time: "AT 8:30 PM"
    },
    calendarUrl: "https://calendar.app.google/3hLyR1s6TggdHTZe6",
    gradient: "from-orange-500 to-yellow-500"
  },
  {
    id: "3",
    title: "FROM MONOLITH TO MICROSERVICES IN AWS",
    description: "Aprende cómo desacoplar aplicaciones monolíticas y migrarlas a microservicios utilizando las herramientas de AWS.",
    mentor: {
      name: "ALEXIS TAMAYO",
      role: "Software Architecture Lead",
      company: "AWS Academy",
      image: "/images/mentors/Alexis-mentor.webp",
      linkedin: "https://www.linkedin.com/in/jemsun-alexis-tamayo-tello-78749075/"
    },
    schedule: {
      date: "05 NOV 2025",
      time: "AT 6:00 PM"
    },
    calendarUrl: "https://calendar.app.google/sbnS6rCBWMmHktP16",
    gradient: "from-orange-500 to-yellow-500"
  }
]

export default function MentorshipsSection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: cardsRef, isIntersecting: cardsVisible } = useIntersectionObserver()
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section 
      id="mentorships-section"
      className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-black"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center space-x-2 mb-8 sm:mb-6">
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
            <span
              className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-70"
              style={{ color: "#D9D9D9" }}
            >
              HACKATHON TECH SESSION
            </span>
            <div
              className="w-3 sm:w-4 lg:w-6 h-0.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#FFDA35" }}
            />
          </div>

          <div
            ref={headerRef}
            className={`space-y-3 sm:space-y-4 lg:space-y-6 transition-all duration-1000 ${
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight px-2"
              style={{
                color: "#ffffffff",
                fontFamily: "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                letterSpacing: "0.02em"
              }}
            >
              Sesiones de{" "}
              <span
                className="font-bold relative inline-block"
                style={{
                  fontFamily: "NeuePower, -apple-system, BlinkMacSystemFont, sans-serif",
                  letterSpacing: "0.02em"
                }}
              >
                <GradientText gradient="from-orange-400 via-yellow-400 to-orange-500 font-neue-power">
                  Mentoría
                </GradientText>
                <div
                  className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                  style={{ backgroundColor: "#FFDA35", opacity: 0.3 }}
                />
              </span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Aprende de expertos en sesiones técnicas especializadas
            </p>
          </div>
        </div>

        {/* Mentorship Cards */}
        <div
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto transition-all duration-1000 delay-300 ${
            cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {mentorships.map((mentorship, index) => (
            <div
              key={mentorship.id}
              className={`group relative bg-black border border-white/20 rounded-lg overflow-hidden transition-all duration-500 hover:border-orange-500/50 hover:shadow-2xl hover:shadow-orange-500/20 hover:-translate-y-2 ${
                cardsVisible ? "animate-fade-in-up" : ""
              }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => setHoveredCard(mentorship.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Top Section - Mentor Image */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gradient-to-br from-orange-500/20 to-yellow-500/20">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <Image
                  src={mentorship.mentor.image}
                  alt={mentorship.mentor.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Company Badge */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full z-20">
                  <span className="text-xs font-semibold text-white">
                    {mentorship.mentor.company}
                  </span>
                </div>

                {/* Mentor Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 uppercase tracking-tight">
                    {mentorship.mentor.name}
                  </h3>
                  <p className="text-sm text-gray-300 italic">
                    {mentorship.mentor.role}
                  </p>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                {/* Title */}
                <h4 className="text-lg sm:text-xl font-bold text-white uppercase leading-tight tracking-tight">
                  {mentorship.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-400 line-clamp-3">
                  {mentorship.description}
                </p>

                {/* Schedule */}
                <div className="flex items-center gap-2 text-orange-400 font-bold">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {mentorship.schedule.date} {mentorship.schedule.time}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-2">
                  <a
                    href={mentorship.calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <Calendar className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-sm uppercase tracking-wide">Registrarse</span>
                  </a>
                  
                  <a
                    href={mentorship.mentor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-blue-600 border border-white/20 hover:border-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group/linkedin"
                  >
                    <Linkedin className="w-5 h-5 group-hover/linkedin:scale-110 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                  hoveredCard === mentorship.id ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-lg" />
              </div>
            </div>
          ))}
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
