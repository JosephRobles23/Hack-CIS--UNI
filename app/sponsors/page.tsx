"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft } from "lucide-react"
import TypewriterText from "@/components/typewriter-text"
import FloatingParticles from "@/components/floating-particles"
import GradientText from "@/components/gradient-text"
import { toast } from "@/hooks/use-toast"
import SponsorSuccessModal from "@/components/sponsor-success-modal"

interface Question {
  id: string
  text: string
  placeholder: string
  type: "text" | "email" | "select" | "tel" | "url"
  options?: string[]
  highlightWords?: string[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: "name",
    text: "¡Bienvenido! ¿Cuál es el nombre de tu empresa?",
    placeholder: "Nombre de la empresa",
    type: "text",
    highlightWords: ["empresa"],
    required: true,
  },
  {
    id: "email",
    text: "¿Cuál es el email de contacto de la empresa?",
    placeholder: "contacto@empresa.com",
    type: "email",
    highlightWords: ["email"],
    required: true,
  },
  {
    id: "contact_name",
    text: "¿Cuál es el nombre del representante de la empresa?",
    placeholder: "Nombre del contacto",
    type: "text",
    highlightWords: ["representante"],
    required: true,
  },
  {
    id: "contact_lastname",
    text: "¿Cuál es el apellido del representante?",
    placeholder: "Apellido del contacto",
    type: "text",
    highlightWords: ["apellido"],
    required: true,
  },
  {
    id: "contact_phone",
    text: "¿Cuál es el número de teléfono del representante?",
    placeholder: "+51 999 999 999",
    type: "tel",
    highlightWords: ["teléfono"],
    required: true,
  },
  {
    id: "linkedin",
    text: "Comparte el perfil de LinkedIn de la empresa",
    placeholder: "https://linkedin.com/company/tu-empresa",
    type: "url",
    highlightWords: ["LinkedIn"],
    required: false,
  },
  {
    id: "instagram",
    text: "¿Tienen perfil de Instagram? (Opcional)",
    placeholder: "https://instagram.com/tu-empresa",
    type: "url",
    highlightWords: ["Instagram"],
    required: false,
  },
  {
    id: "facebook",
    text: "¿Tienen página de Facebook? (Opcional)",
    placeholder: "https://facebook.com/tu-empresa",
    type: "url",
    highlightWords: ["Facebook"],
    required: false,
  },
  {
    id: "plan",
    text: "¿Qué plan de patrocinio les interesa?",
    placeholder: "Selecciona un plan",
    type: "select",
    options: ["Silver - Aliado Inicial (S/ 300)", "Golden - Aliado Formador (S/ 450)", "Diamond - Hiring Ally (S/ 600)"],
    highlightWords: ["plan", "patrocinio"],
    required: true,
  },
]

export default function SponsorsPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showInput, setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const currentQuestion = questions[currentStep]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
      setShowInput(false)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      setShowInput(true)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Mapear planes de texto descriptivo a valores simples
      const planMapping: Record<string, string> = {
        'Silver - Aliado Inicial (S/ 300)': 'silver',
        'Golden - Aliado Formador (S/ 450)': 'gold', 
        'Diamond - Hiring Ally (S/ 600)': 'diamond'
      }
      
      const mappedPlan = planMapping[answers.plan] || 'gold'
      
      // Mapear las respuestas del formulario al formato de la API
      const sponsorData = {
        name: answers.name || '',
        email: answers.email || '',
        contact_name: answers.contact_name || '',
        contact_lastname: answers.contact_lastname || '',
        contact_phone: answers.contact_phone || '',
        linkedin: answers.linkedin || '',
        instagram: answers.instagram || '',
        facebook: answers.facebook || '',
        plan: mappedPlan
      }

      console.log("Datos del patrocinador a enviar:", sponsorData)

      // Llamar a la API
      const API_BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND_HACK_CIS || 'https://hack-cis-uni-backend.onrender.com/api/v1/'
      const response = await fetch(`${API_BASE_URL}sponsor/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sponsorData),
      })

      // Verificar si la respuesta fue exitosa basándose en el status code
      if (response.ok) {
        // Status 200-299 indica éxito
        console.log("Registro de patrocinador completado exitosamente")
        setShowSuccessModal(true)
      } else {
        // Intentar obtener el mensaje de error del response
        let errorMessage = "Error al enviar el registro. Por favor, intenta nuevamente."
        try {
          const result = await response.json()
          errorMessage = result.message || errorMessage
        } catch (e) {
          // Si no se puede parsear el JSON, usar mensaje por defecto
        }
        
        console.error("Error en el registro de patrocinador:", response.status, errorMessage)
        toast({
          title: "Error en el registro",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error al enviar registro de patrocinador:", error)
      toast({
        title: "Error de conexión",
        description: "No se pudo enviar el registro. Verifica tu conexión a internet.",
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
  }

  const canProceed = currentQuestion?.required
    ? answers[currentQuestion.id]?.trim().length > 0
    : true

  // Manejar tecla Enter
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showInput && canProceed) {
        event.preventDefault()
        handleNext()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [showInput, canProceed, currentStep])

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
          <GradientText>Hack[CIS]</GradientText>
        </div>
        <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
          Volver al inicio
        </a>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 min-h-0">
        <div className="max-w-4xl w-full h-full flex flex-col justify-center space-y-6 sm:space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 flex-shrink-0">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index <= currentStep ? "bg-yellow-400 scale-110" : "bg-gray-600"
                  }`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="text-center flex-1 flex flex-col justify-center space-y-6 sm:space-y-8 min-h-0">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight flex items-center justify-center px-2 min-h-[80px] sm:min-h-[120px] lg:min-h-[160px]">
              <TypewriterText
                text={currentQuestion.text}
                speed={30}
                highlightWords={currentQuestion.highlightWords}
                onComplete={() => setShowInput(true)}
                key={currentStep} // Reset animation on step change
              />
            </h1>

            {/* Input field */}
            {showInput && currentQuestion && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in flex-shrink-0">
                <div className="max-h-[30vh] overflow-y-auto">
                  {currentQuestion.type === "select" ? (
                    <select
                      value={answers[currentQuestion.id] || ""}
                      onChange={(e) => handleInputChange(e.target.value)}
                      className="w-full max-w-lg mx-auto bg-gray-900/50 border border-gray-700 rounded-lg px-4 sm:px-6 py-3 sm:py-4 text-white text-base sm:text-lg focus:border-yellow-400 focus:outline-none transition-colors [&>option]:bg-gray-900 [&>option]:text-white [&>option:checked]:bg-yellow-600"
                    >
                      <option value="" className="bg-gray-900 text-gray-400">{currentQuestion.placeholder}</option>
                      {currentQuestion.options?.map((option) => (
                        <option key={option} value={option} className="bg-gray-900 text-white hover:bg-gray-800">
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
                      className="w-full max-w-lg mx-auto bg-gray-900/50 border-gray-700 focus:border-yellow-400 text-white placeholder-gray-400 text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6"
                      autoFocus
                    />
                  )}
                </div>

                <p className="text-xs sm:text-sm text-gray-400 flex-shrink-0">
                  {currentQuestion.required ? "*Campo obligatorio" : "*Campo opcional"}
                </p>

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
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-black font-semibold px-4 sm:px-8 py-2 sm:py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : currentStep === questions.length - 1 ? (
                      "Completar Registro"
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

          {/* Sponsorship Plans Info - Solo visible cuando no hay scroll */}
          {currentQuestion.id === "plan" && showInput && (
            <div className="absolute inset-0 bg-black/95 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8">
              <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-center">
                    <GradientText gradient="from-yellow-400 to-orange-400">Planes de Patrocinio</GradientText>
                  </h3>
                  <button 
                    onClick={() => setShowInput(false)}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                  {/* Silver Plan */}
                  <div className="bg-gray-900/50 border border-gray-400 rounded-lg p-4 sm:p-6">
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-2xl font-bold text-gray-400 mb-1 sm:mb-2">Silver</h4>
                      <p className="text-sm sm:text-lg text-yellow-400 font-semibold">"Aliado Inicial"</p>
                      <p className="text-xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">S/ 300</p>
                    </div>
                    <ul className="text-xs sm:text-sm text-gray-300 space-y-1 sm:space-y-2">
                      <li>• Logo en el sitio web oficial de la hackathon, en las bases y en el material digital del evento</li>
                      <li>• Mención en todas las redes sociales de IEEE CIS UNI y comunidades aliadas</li>
                      <li>• 10 minutos de exposición en el auditorio</li>
                      <li>• Acceso al catálogo digital con los proyectos participantes (descripción + contacto de los equipos)</li>
                      <li>• Presencia en la parte trasera del cartel de premiación (logo pequeño)</li>
                    </ul>
                  </div>

                  {/* Golden Plan */}
                  <div className="bg-gray-900/50 border border-yellow-400 rounded-lg p-4 sm:p-6 relative">
                    <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-yellow-400 text-black px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">Recomendado</span>
                    </div>
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-2xl font-bold text-yellow-400 mb-1 sm:mb-2">Golden</h4>
                      <p className="text-sm sm:text-lg text-yellow-400 font-semibold">"Aliado Formador"</p>
                      <p className="text-xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">S/ 450</p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 space-y-1 sm:space-y-2">
                      <p className="text-yellow-400 font-semibold mb-1 sm:mb-2">Incluye todo lo de Silver +</p>
                      <ul className="space-y-1 sm:space-y-2">
                        <li>• Logo destacado en todas las publicaciones oficiales y en los banners físicos dentro del evento</li>
                        <li>• Logo en los certificados digitales para finalistas y ganadores</li>
                        <li>• 20 minutos de exposición en el evento final</li>
                        <li>• Participación como jurado invitado</li>
                        <li>• Oportunidad de realizar un workshop/taller exclusivo para participantes en los días previos al evento</li>
                        <li>• Presencia en el cartel de premiación (logo mediano en la gifcard)</li>
                      </ul>
                    </div>
                  </div>

                  {/* Diamond Plan */}
                  <div className="bg-gray-900/50 border border-purple-400 rounded-lg p-4 sm:p-6 relative">
                    <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-purple-400 text-black px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">Premium</span>
                    </div>
                    <div className="text-center mb-3 sm:mb-4">
                      <h4 className="text-lg sm:text-2xl font-bold text-purple-400 mb-1 sm:mb-2">Diamond</h4>
                      <p className="text-sm sm:text-lg text-purple-400 font-semibold">"Hiring Ally"</p>
                      <p className="text-xl sm:text-3xl font-bold text-white mt-1 sm:mt-2">S/ 600</p>
                    </div>
                    <div className="text-xs sm:text-sm text-gray-300 space-y-1 sm:space-y-2">
                      <p className="text-purple-400 font-semibold mb-1 sm:mb-2">Incluye todo lo de Golden +</p>
                      <ul className="space-y-1 sm:space-y-2">
                        <li>• Opción de proponer un reto técnico (ejemplo: API, dataset o caso de uso)</li>
                        <li>• Espacio de stand de reclutamiento/exposición en la sede durante todo el evento</li>
                        <li>• 30 minutos de exposición en el auditorio</li>
                        <li>• Acceso a la base de datos de CVs de los participantes (solo finalistas)</li>
                        <li>• Inclusión del logo en el video oficial del evento y en la fotografía grupal de clausura</li>
                        <li>• Reconocimiento especial en la ceremonia final como "Hiring Ally"</li>
                        <li>• Presencia en el cartel de premiación de ganadores (con logo destacado en la "gifcard" gigante)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de éxito */}
      <SponsorSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        companyName={answers.name || ""}
        contactName={answers.contact_name || ""}
        plan={(() => {
          const planMapping: Record<string, string> = {
            'Silver - Aliado Inicial (S/ 300)': 'silver',
            'Golden - Aliado Formador (S/ 450)': 'gold', 
            'Diamond - Hiring Ally (S/ 600)': 'diamond'
          }
          return planMapping[answers.plan] || 'gold'
        })()}
      />
    </div>
  )
}