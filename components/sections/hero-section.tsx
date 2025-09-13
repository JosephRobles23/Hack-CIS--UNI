import Link from "next/link"
import { Sparkles, Code2, FileText } from "lucide-react"
import GradientText from "@/components/gradient-text"
import AnimatedCounter from "@/components/animated-counter"
import NeonButton from "@/components/neon-button"
import CountdownTimer from "@/components/countdown-timer"
import HackerCounter from "@/components/hacker-counter"
import TypewriterText from "@/components/typewriter-text"

export default function HeroSection() {
  return (
    <section className="relative z-10 min-h-screen flex items-start justify-center px-6 mt-4 sm: mb-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="text-sm uppercase tracking-widest text-gray-500">
            LLM | Generative AI | Agents AI | Web3 | Blockchain | Cybersecurity | IoT
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight text-center">
            <div>
              <GradientText gradient="from-cyan-500 font-neue-power to-purple-500">
                Hack
              </GradientText>
            </div>
            <div>
              <span className="text-white">[</span>
              <GradientText gradient="from-yellow-400 font-neue-power to-orange-400">
                CIS
              </GradientText>
              <span className="text-white">]</span>
            </div>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-mono">
            <TypewriterText text="[CIS HACK] → Deploying the Future in 120H" speed={45} />
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/register">
            <NeonButton variant="primary" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Registrarse
            </NeonButton>
          </Link>
          <a href="https://drive.google.com/file/d/1-OHclkT6rA3gIx2RdBWIMydWtqRQy9J9/view?usp=sharing" target="_blank" rel="noopener noreferrer">
            <NeonButton variant="outline" size="lg">
              <FileText className="mr-2 h-5 w-5" />
              Bases
            </NeonButton>
          </a>
        </div>

        {/* Stats with Countdown and Hacker Counter */}
        <div className="space-y-12">
          <CountdownTimer />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <HackerCounter />
            <div className="text-center">
              <div className="text-3xl font-bold">
                <GradientText gradient="from-green-400 to-blue-400">
                  <AnimatedCounter end={120} />H
                </GradientText>
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Duración</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <GradientText gradient="from-yellow-400 to-red-400">
                  <AnimatedCounter end={2} prefix="S/" suffix="K" />
                </GradientText>
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Premios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">
                <GradientText gradient="from-purple-400 to-pink-400">
                  <AnimatedCounter end={6} />
                </GradientText>
              </div>
              <div className="text-gray-500 text-sm uppercase tracking-wider">Mentores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}