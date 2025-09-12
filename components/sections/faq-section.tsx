"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Minus, Plus } from "lucide-react"

export default function FAQSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Tienes<GradientText className="font-neue-power"> dudas?</GradientText>
          </h2>
          <p className="text-xl text-gray-400">Aquí tienes las respuestas a las preguntas más frecuentes</p>
        </div>

        <FAQItems />
      </div>
    </section>
  )
}

function FAQItems() {
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
    <div className="space-y-6">
      {items.map((item, idx) => (
        <Collapsible
          key={idx}
          open={!!openMap[idx]}
          onOpenChange={(open) => setOpenMap((m) => ({ ...m, [idx]: open }))}
          className="relative"
        >
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <CollapsibleTrigger asChild>
              <button
                aria-label="Alternar respuesta"
                className="absolute right-4 top-4 rounded-md p-1 font-bold text-cyan-500 hover:text-cyan-300 hover:bg-white/10"
              >
                {openMap[idx] ? (
                  <Minus className="h-5 w-5" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </CollapsibleTrigger>

            <h3 className="text-xl text-gray-300 font-semibold mb-3 ">{item.q}</h3>
            <CollapsibleContent>
              <p className="text-gray-400">{item.a}</p>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      ))}
    </div>
  )
}