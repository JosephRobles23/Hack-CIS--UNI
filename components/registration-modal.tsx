"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, X } from "lucide-react"
import TypewriterText from "./typewriter-text"
import FloatingParticles from "./floating-particles"

interface Question {
  id: string
  text: string
  placeholder: string
  type: "text" | "email" | "select"
  options?: string[]
  highlightWords?: string[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: "name",
    text: "Hola! ¿Cuál es tu nombre completo?",
    placeholder: "Tu nombre completo",
    type: "text",
    highlightWords: ["nombre"],
    required: true,
  },
  {
    id: "email",
    text: "Perfecto! Ahora necesitamos tu email para contactarte",
    placeholder: "tu@email.com",
    type: "email",
    highlightWords: ["email"],
    required: true,
  },
  {
    id: "university",
    text: "¿De qué universidad vienes?",
    placeholder: "Nombre de tu universidad",
    type: "text",
    highlightWords: ["universidad"],
    required: true,
  },
  {
    id: "experience",
    text: "¿Cuál es tu nivel de experiencia en IA?",
    placeholder: "Selecciona tu nivel",
    type: "select",
    options: ["Principiante", "Intermedio", "Avanzado", "Experto"],
    highlightWords: ["experiencia", "IA"],
    required: true,
  },
  {
    id: "motivation",
    text: "¿Por qué quieres participar en Hack[CIS]?",
    placeholder: "Cuéntanos tu motivación...",
    type: "text",
    highlightWords: ["Hack[CIS]"],
    required: true,
  },
]

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showInput, setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = questions[currentStep]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setShowInput(false)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simular envío
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    onClose()
    // Aquí podrías enviar los datos a tu backend
    console.log("Registro completado:", answers)
  }

  const handleInputChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const canProceed = answers[currentQuestion.id]?.trim().length > 0

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-black border-gray-800 p-0 overflow-hidden">
        <div className="relative h-full">
          <FloatingParticles />

          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white"
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative z-10 h-full flex flex-col items-center justify-start p-8">
            <div className="max-w-2xl w-full space-y-8">
              {/* Progress indicator */}
              <div className="flex justify-center space-x-2 mb-8">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index <= currentStep ? "bg-cyan-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-relaxed">
                  <TypewriterText
                    text={currentQuestion.text}
                    speed={30}
                    highlightWords={currentQuestion.highlightWords}
                    onComplete={() => setShowInput(true)}
                  />
                </h2>

                {/* Input field */}
                {showInput && (
                  <div className="space-y-4 animate-fade-in">
                    {currentQuestion.type === "select" ? (
                      <select
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="w-full max-w-md mx-auto bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                      >
                        <option value="">{currentQuestion.placeholder}</option>
                        {currentQuestion.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Input
                        type={currentQuestion.type}
                        placeholder={currentQuestion.placeholder}
                        value={answers[currentQuestion.id] || ""}
                        onChange={(e) => handleInputChange(e.target.value)}
                        className="w-full max-w-md mx-auto bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400"
                        autoFocus
                      />
                    )}

                    <p className="text-sm text-gray-400">*Lo necesitamos para inscribirte al evento</p>

                    <Button
                      onClick={handleNext}
                      disabled={!canProceed || isSubmitting}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : currentStep === questions.length - 1 ? (
                        "Completar Registro"
                      ) : (
                        <>
                          Continuar
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
