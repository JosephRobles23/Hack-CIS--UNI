"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Minus, Plus } from "lucide-react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

export default function FAQSection() {
  const { ref: headerRef, isIntersecting: headerVisible } = useIntersectionObserver()
  const { ref: faqRef, isIntersecting: faqVisible } = useIntersectionObserver()

  return (
    <section className="relative z-10 py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div 
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
            headerVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-2">
            ¿Tienes<GradientText className="font-neue-power"> dudas?</GradientText>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 px-4">
            Aquí tienes las respuestas a las preguntas más frecuentes
          </p>
        </div>

        <div ref={faqRef}>
          <FAQItems isVisible={faqVisible} />
        </div>
      </div>
    </section>
  )
}

function FAQItems({ isVisible }: { isVisible: boolean }) {
  const [openMap, setOpenMap] = useState<Record<number, boolean>>({})

  const items = [
    {
      q: "¿Necesito experiencia previa en IA?",
      a:
        "No es necesario ser un experto. Buscamos participantes con diferentes niveles de experiencia, desde principiantes hasta expertos.",
    },
    {
      q: "¿Puedo participar solo o necesito un equipo?",
      a:
        "Puedes participar solo o en equipos. Los equipos deben ser de mínimo 2 y máximo 4 integrantes, con al menos 2 personas de especialidades diferentes.",
    },
    {
      q: "¿Qué debo traer al evento?",
      a:
        "Tu laptop, cargador y muchas ganas de crear. Nosotros nos encargamos de la comida, bebidas y el espacio de trabajo.",
    },
    {
      q: "¿Hay algún costo de participación?",
      a:
        "No, la participación es completamente gratuita. Solo necesitas registrarte y confirmar tu asistencia.",
    },
    {
      q: "¿Qué edades pueden participar?",
      a: "Pueden participar personas entre 18 y 28 años.",
    },
    {
      q: "¿Hasta cuándo puedo registrarme?",
      a: "Las inscripciones cierran el 26 de setiembre a las 12:00 horas.",
    },
    {
      q: "¿Habrá un proceso de selección?",
      a: "Sí. Si se superan los 40 equipos inscritos, se aplicará un primer filtro.",
    },
    {
      q: "¿Cuál es la modalidad y el cronograma?",
      a:
        "La hackathon tendrá 5 días virtuales y el último día será presencial el 4 de octubre en el Auditorio CTIC UNI.",
    },
  ]

  return (
    <div className="space-y-4 sm:space-y-6">
      {items.map((item, idx) => (
        <Collapsible
          key={idx}
          open={!!openMap[idx]}
          onOpenChange={(open) => setOpenMap((m) => ({ ...m, [idx]: open }))}
          className={`relative transition-all duration-700 ${
            isVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ 
            transitionDelay: `${idx * 100}ms`
          }}
        >
          <Card className="bg-gray-900/50 border-gray-800 p-4 sm:p-6 hover:bg-gray-900/70 transition-colors duration-300 hover:scale-[1.02]">
            <CollapsibleTrigger asChild>
              <button
                aria-label="Alternar respuesta"
                className="absolute right-3 sm:right-4 top-3 sm:top-4 rounded-md p-1 font-bold text-cyan-500 hover:text-cyan-300 hover:bg-white/10 transition-colors duration-200"
              >
                {openMap[idx] ? (
                  <Minus className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </button>
            </CollapsibleTrigger>

            <h3 className="text-lg sm:text-xl text-gray-300 font-semibold mb-3 pr-8 sm:pr-12 leading-tight">
              {item.q}
            </h3>
            <CollapsibleContent>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed pr-4 sm:pr-8">
                {item.a}
              </p>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )
}