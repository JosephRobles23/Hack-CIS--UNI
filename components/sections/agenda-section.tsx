import GradientText from "@/components/gradient-text"

export default function AgendaSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">— AGENDA —</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Agenda del <GradientText gradient="from-yellow-400 to-orange-400">Hackathon</GradientText>
          </h2>
        </div>

        <div className="space-y-16">
          <div>
            <h3 className="text-3xl font-bold mb-8">
              <GradientText gradient="from-yellow-400 to-orange-400">Viernes 4 de Octubre 2024</GradientText>
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">8:00 AM - 9:00 AM</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Check-in</h4>
                  <p className="text-gray-400">Registro y bienvenida de participantes</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">9:00 AM - 10:00 AM</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Conoce a los Patrocinadores</h4>
                  <p className="text-gray-400">Presentación de sponsors</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">10:30 AM</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Inicio de la Hackathon</h4>
                  <p className="text-gray-400">¡Empieza el cronómetro!</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8">
              <GradientText gradient="from-yellow-400 to-orange-400">Sábado 5 de Octubre 2024</GradientText>
            </h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">11:00 AM</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Cierre de Entregas</h4>
                  <p className="text-gray-400">Deadline final para subir proyectos</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">2:30 p.m. - 3:30 p.m.</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Demos</h4>
                  <p className="text-gray-400">Presentación de proyectos finalistas</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 border-l-2 border-yellow-400 pl-6">
                <div className="text-yellow-400 font-bold min-w-[140px]">3:30 p.m.</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Anuncio de Ganadores</h4>
                  <p className="text-gray-400">Premiación y cierre del evento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}