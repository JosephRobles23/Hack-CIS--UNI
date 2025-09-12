import { Card } from "@/components/ui/card"
import GradientText from "@/components/gradient-text"

export default function ProjectSubmissionsSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">— PROCESO —</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Cómo van a funcionar las <GradientText gradient="from-yellow-400 to-orange-400">entregas</GradientText>{" "}
            de los proyectos?
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto">
            Cada equipo debe cumplir con los siguientes{" "}
            <span className="text-yellow-400 font-semibold">requisitos de entrega</span> para participar en la
            evaluación. Asegúrate de revisar cuidadosamente cada elemento antes de la hora de entrega.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Obligatorio</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🎥</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Video Demo</h3>
              <p className="text-gray-400">
                Máximo 2 minutos, entregado por la plataforma de YouTube. Recuerde que el video debe ser público
              </p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Obligatorio</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🎤</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Video Pitch</h3>
              <p className="text-gray-400">
                Máximo 2 minutos, entregado por la plataforma de YouTube. Recuerde que el video debe ser público
              </p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">Opcional</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-green-400 flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pitch Deck</h3>
              <p className="text-gray-400">Máximo 10 slides (opcional)</p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">Obligatorio</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center mb-4">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Repositorio GitHub</h3>
              <p className="text-gray-400">
                Link del repositorio público en GitHub, con readme, licencia, y instrucciones de setup
              </p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">Opcional</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-pink-400 flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Producto en Producción</h3>
              <p className="text-gray-400">Link del producto en producción (si aplica)</p>
            </div>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold">Opcional</span>
            </div>
            <div className="mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Comparte el Demo en LinkedIn</h3>
              <p className="text-gray-400">Muestra a todo el mundo lo que construiste (opcional)</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}