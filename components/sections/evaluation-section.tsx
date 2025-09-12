import { Card, CardContent } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"

export default function EvaluationSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">— EVALUACIÓN —</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Criterios de <GradientText gradient="from-yellow-400 to-orange-400">Evaluación</GradientText>
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Los mentores son los encargados de filtrar las entregas hasta obtener a un{" "}
            <span className="text-yellow-400 font-semibold">top 3 por track</span>. Este top 3 es invitado a presentar
            frente a los jueces y hacer un pitch en vivo. La estrategia de evaluación es la siguiente: se asigna un{" "}
            <span className="text-yellow-400 font-semibold">puntaje del 1 al 5</span> para cada uno de los criterios y
            se calcula un promedio ponderado para la entrega de cada equipo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">35%</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Innovation & Impact</h3>
              <p className="text-gray-400">¿Resuelve un problema real de forma diferente?</p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">30%</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center mb-4">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Technical Execution</h3>
              <p className="text-gray-400">Código limpio, demo reproducible y excelencia técnica</p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">20%</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Viability</h3>
              <p className="text-gray-400">¿Puede esto convertirse en un producto?</p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">15%</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pitch & UX</h3>
              <p className="text-gray-400">Mensaje claro y efectivo. ¿Vende?</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}