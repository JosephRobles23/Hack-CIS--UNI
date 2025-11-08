"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft } from "lucide-react"
import TypewriterText from "@/components/typewriter-text"
import FloatingParticles from "@/components/floating-particles"
import SuccessModal from "@/components/success-modal"
import { toast } from "@/hooks/use-toast"

interface Question {
  id: string
  text: string
  placeholder: string
  type: "text" | "url" | "textarea"
  highlightWords?: string[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: "team",
    text: "¿Cuál es el nombre de tu grupo?",
    placeholder: "Nombre del grupo",
    type: "text",
    highlightWords: ["nombre", "grupo"],
    required: true,
  },
  {
    id: "name",
    text: "¿Cuál es el nombre de tu proyecto?",
    placeholder: "Nombre del proyecto",
    type: "text",
    highlightWords: ["nombre", "proyecto"],
    required: true,
  },
  {
    id: "description_final",
    text: "Describe tu proyecto final",
    placeholder: "Cuéntanos qué construyeron, qué tecnologías usaron y qué problema resuelve...",
    type: "textarea",
    highlightWords: ["proyecto", "final"],
    required: true,
  },
  {
    id: "github",
    text: "Comparte el repositorio de GitHub de tu proyecto",
    placeholder: "https://github.com/tu-usuario/tu-proyecto",
    type: "url",
    highlightWords: ["GitHub", "repositorio"],
    required: true,
  },
  {
    id: "demo",
    text: "¿Tienes un demo o video de tu proyecto?",
    placeholder: "https://www.youtube.com/watch?v=... o https://tu-demo.com",
    type: "url",
    highlightWords: ["demo", "video"],
    required: false,
  },
  {
    id: "presentation",
    text: "Comparte el link de tu presentación (Canva, Google Slides, etc.)",
    placeholder: "https://www.canva.com/design/...",
    type: "url",
    highlightWords: ["presentación"],
    required: false,
  },
]

export default function SubmitProjectPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showInput, setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState<string>("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const currentQuestion = questions[currentStep]

  // Función de validación para cada campo
  const validateField = (question: Question, value: string): string => {
    if (question.required && (!value || value.trim().length === 0)) {
      return "Este campo es obligatorio"
    }

    // Validaciones específicas por tipo de campo
    if (question.type === "url" && value) {
      if (!/^https?:\/\/.+/.test(value)) {
        return "La URL debe comenzar con http:// o https://"
      }
    }

    return ""
  }

  const handleNext = () => {
    // Validar el campo actual antes de continuar
    const error = validateField(
      currentQuestion,
      answers[currentQuestion.id] || ""
    )

    if (error) {
      setFieldError(error)
      return
    }

    // Limpiar error si la validación es exitosa
    setFieldError("")

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setShowInput(false)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setFieldError("") // Limpiar errores al retroceder
      setCurrentStep((prev) => prev - 1)
      setShowInput(true)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const projectData = {
        team: answers.team || '',
        name: answers.name || '',
        description_final: answers.description_final || '',
        github: answers.github || '',
        demo: answers.demo || '',
        presentation: answers.presentation || ''
      }

      // Llamar a la API
      const API_BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND_HACK_CIS || 'https://hack-cis-uni-backend.onrender.com/api/v1/'
      const response = await fetch(`${API_BASE_URL}project/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        console.log("Proyecto enviado exitosamente")
        toast({
          title: "¡Proyecto enviado!",
          description: "Tu proyecto ha sido registrado correctamente en Hack[CIS] 2025",
        })
        setShowSuccessModal(true)
      } else {
        let errorMessage = "Error al enviar el proyecto. Por favor, intenta nuevamente."
        try {
          const result = await response.json()
          errorMessage = result.message || errorMessage
        } catch (e) {
          // Si no se puede parsear el JSON, usar mensaje por defecto
        }

        console.error("Error al enviar proyecto:", response.status, errorMessage)
        toast({
          title: "Error al enviar proyecto",
          description: errorMessage,
          variant: "destructive",
        })
        setFieldError("Error al enviar el proyecto. Por favor, intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error al enviar el proyecto:", error)
      toast({
        title: "Error de conexión",
        description: "No se pudo enviar el proyecto. Verifica tu conexión a internet.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
    // Limpiar error cuando el usuario comience a escribir
    if (fieldError) {
      setFieldError("")
    }
  }

  const canProceed = currentQuestion?.required
    ? answers[currentQuestion.id]?.trim().length > 0
    : true

  // Manejar tecla Enter
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showInput && canProceed && currentQuestion.type !== 'textarea') {
        event.preventDefault()
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [showInput, canProceed, currentQuestion])

  return (
    <div className="h-screen bg-black text-white overflow-hidden flex flex-col">
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <FloatingParticles />

      {/* Header */}
      <nav className="relative z-10 p-4 sm:p-6 flex justify-between items-center max-w-7xl mx-auto w-full flex-shrink-0">
        <div className="text-xl sm:text-2xl font-bold">
          <Image
            src="/images/Logo-cis.webp"
            alt="Hack CIS"
            width={180}
            height={60}
            priority
            className="h-12 w-auto"
          />
        </div>
        <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
          Volver al inicio
        </a>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-8 mt-3 mt-1 sm:mt-8 lg:mt-12">
        <div className="max-w-4xl w-full space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index <= currentStep ? "bg-cyan-400 scale-110" : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="text-center flex-1 flex flex-col justify-center space-y-6 sm:space-y-8 min-h-0">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold leading-tight flex items-center justify-center px-2 min-h-[80px] sm:min-h-[120px] lg:min-h-[130px]">
              <TypewriterText
                text={currentQuestion.text}
                speed={30}
                highlightWords={currentQuestion.highlightWords}
                onComplete={() => setShowInput(true)}
                key={currentStep}
              />
            </h1>

            {/* Input field */}
            {showInput && currentQuestion && (
              <div className="space-y-6 animate-fade-in">
                {currentQuestion.type === "textarea" ? (
                  <textarea
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full max-w-lg mx-auto bg-gray-900/50 border border-gray-700 rounded-lg px-6 py-4 text-white placeholder-gray-400 text-lg focus:border-cyan-400 focus:outline-none transition-colors min-h-[120px] resize-none"
                    autoFocus
                  />
                ) : (
                  <Input
                    type={currentQuestion.type}
                    placeholder={currentQuestion.placeholder}
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full max-w-lg mx-auto bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400 text-lg py-4 px-6"
                    autoFocus
                  />
                )}

                <div className="space-y-2">
                  <p className="text-sm text-gray-400">
                    {currentQuestion.required ? "*Campo obligatorio" : "*Campo opcional"}
                  </p>
                  {fieldError && (
                    <p className="text-sm text-red-400 animate-fade-in">
                      {fieldError}
                    </p>
                  )}
                </div>

                <div className="flex justify-center space-x-3 sm:space-x-4 flex-shrink-0">
                  {currentStep > 0 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-4 sm:px-8 py-2 sm:py-3 bg-transparent text-sm sm:text-base"
                    >
                      <ArrowLeft className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Atrás
                    </Button>
                  )}

                  <Button
                    onClick={handleNext}
                    disabled={!canProceed || isSubmitting}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : currentStep === questions.length - 1 ? (
                      "Enviar Proyecto"
                    ) : (
                      <>
                        Continuar
                        <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false)
          window.location.href = "/"
        }}
        participantName={answers.name || ""}
      />
    </div>
  )
}
