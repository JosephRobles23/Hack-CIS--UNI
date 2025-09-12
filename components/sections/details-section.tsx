import { MapPin, Trophy } from "lucide-react"
import GradientText from "@/components/gradient-text"

export default function DetailsSection() {
  return (
    <section className="relative z-10 py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div
            className="w-4 sm:w-6 h-0.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#FFDA35" }}
          />
          <span
            className="text-xs sm:text-sm font-medium tracking-wider uppercase opacity-70"
            style={{ color: "#D9D9D9" }}
          >
            Detalles
          </span>
          <div
            className="w-4 sm:w-6 h-0.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#FFDA35" }}
          />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          Todo lo que necesitas{" "}
          <div className="relative inline-block">
            <GradientText gradient="from-yellow-400 font-neue-power to-orange-400">saber</GradientText>
            <div
                  className="absolute -bottom-1 left-0 w-full h-0.5 animate-pulse"
                  style={{ backgroundColor: "#FAC120", opacity: 0.3 }}
                />
          </div>
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <div className="text-5xl font-bold mb-4">
              <GradientText gradient="from-yellow-400 to-orange-400">120h</GradientText>
            </div>
            <p className="text-gray-400">non-stop hacking</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-4">
              <GradientText gradient="from-yellow-400 to-orange-400">+100</GradientText>
            </div>
            <p className="text-gray-400">hackers</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-4">
              <GradientText gradient="from-yellow-400 to-orange-400">6</GradientText>
            </div>
            <p className="text-gray-400">mentores</p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="text-6xl font-bold">
            <GradientText gradient="from-yellow-400 to-orange-400">28 Set - 4 Oct</GradientText>
          </div>
          <div className="text-2xl text-gray-300">Lima, Perú</div>
          <div className="flex items-center justify-center space-x-2 text-yellow-400">
            <MapPin className="h-5 w-5" />
            <a
              href="https://maps.app.goo.gl/obq8zZPKnE93QvVz9"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:opacity-90"
            >
              Auditorio CTIC UNI
            </a>
          </div>
        </div>

        <div className="mt-16 space-y-4">
          <div className="flex items-center justify-center">
            <Trophy className="h-8 w-8 text-yellow-400 mr-2" />
          </div>
          <div className="text-6xl font-bold">
            <GradientText gradient="from-yellow-400 to-orange-400">s/ 2,000 </GradientText>
          </div>
          <div className="text-gray-400">+ premios y sorpresas </div>
          {/* <div className="flex justify-center space-x-4">
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm">Beca de CTIC</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm">Beca de FUTURA</span>
            <span className="bg-gray-800 px-4 py-2 rounded-full text-sm">Invitación a las oficinas de Google Perú</span>
          </div> */}
        </div>
      </div>
    </section>
  )
}