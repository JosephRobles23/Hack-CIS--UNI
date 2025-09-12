"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, ArrowLeft } from "lucide-react"
import TypewriterText from "@/components/typewriter-text"
import FloatingParticles from "@/components/floating-particles"
import GradientText from "@/components/gradient-text"
import SearchableSelect from "@/components/searchable-select"
import SuccessModal from "@/components/success-modal"
import { searchUniversities, searchExpertise, createUniversity, getExistingTeams, University, Expertise, Team } from "@/lib/api"

interface Question {
  id: string
  text: string
  placeholder: string
  type: "text" | "email" | "select" | "tel" | "url" | "textarea" | "searchable-select"
  options?: string[]
  highlightWords?: string[]
  required?: boolean
  conditional?: {
    dependsOn: string
    value: string
  }
}

// Los equipos se cargarán dinámicamente desde la API

const questions: Question[] = [
  {
    id: "name",
    text: "Hola! ¿Cuál es tu nombre?",
    placeholder: "Tu nombre completo",
    type: "text",
    highlightWords: ["nombre"],
    required: true, 
  },
  {
    id: "lastname",
    text: "¿Cuál es tu apellido?",
    placeholder: "Tu apellido completo",
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
    id: "phone",
    text: "¿Cuál es tu número de celular?",
    placeholder: "+51 999 999 999",
    type: "tel",
    highlightWords: ["celular"],
    required: true,
  },
  {
    id: "university",
    text: "¿De qué universidad o instituto estudias?",
    placeholder: "Busca tu universidad o instituto",
    type: "searchable-select",
    highlightWords: ["universidad", "instituto"],
    required: true,
  },
  {
    id: "linkedin",
    text: "Comparte tu perfil de LinkedIn",
    placeholder: "https://linkedin.com/in/tu-perfil",
    type: "url",
    highlightWords: ["LinkedIn"],
    required: true,
  },
  {
    id: "github",
    text: "¿Tienes perfil de GitHub? (Opcional)",
    placeholder: "https://github.com/tu-usuario",
    type: "url",
    highlightWords: ["GitHub"],
    required: false,
  },
  {
    id: "social",
    text: "¿Alguna otra red social que quieras compartir? (Opcional)",
    placeholder: "Instagram, Twitter, etc.",
    type: "text",
    highlightWords: ["red social"],
    required: false,
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
    id: "expertise",
    text: "¿Cuál es tu área de especialización?",
    placeholder: "Busca tu especialización",
    type: "searchable-select",
    highlightWords: ["especialización", "área"],
    required: true,
  },
  {
    id: "teamChoice",
    text: "¿Quieres crear un nuevo equipo o unirte a uno existente?",
    placeholder: "Selecciona una opción",
    type: "select",
    options: ["Crear nuevo equipo", "Unirme a equipo existente"],
    highlightWords: ["equipo"],
    required: true,
  },
  {
    id: "teamName",
    text: "¿Cuál será el nombre de tu equipo?",
    placeholder: "Nombre del equipo (mín. 2, máx. 4 integrantes)",
    type: "text",
    highlightWords: ["nombre", "equipo"],
    required: true,
    conditional: {
      dependsOn: "teamChoice",
      value: "Crear nuevo equipo"
    }
  },
  {
    id: "teamDescription",
    text: "Describe qué planean construir o desarrollar",
    placeholder: "Cuéntanos sobre su idea o proyecto...",
    type: "textarea",
    highlightWords: ["construir", "desarrollar"],
    required: true,
    conditional: {
      dependsOn: "teamChoice",
      value: "Crear nuevo equipo"
    }
  },
  {
    id: "existingTeam",
    text: "¿A qué equipo te gustaría unirte?",
    placeholder: "Busca y selecciona un equipo",
    type: "searchable-select",
    highlightWords: ["equipo"],
    required: true,
    conditional: {
      dependsOn: "teamChoice",
      value: "Unirme a equipo existente"
    }
  }
]

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null)
  const [selectedExpertise, setSelectedExpertise] = useState<Expertise | null>(null)
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [showInput, setShowInput] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fieldError, setFieldError] = useState<string>("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // Filtrar preguntas basado en condiciones
  const getVisibleQuestions = () => {
    return questions.filter(question => {
      if (!question.conditional) return true

      const dependentAnswer = answers[question.conditional.dependsOn]
      return dependentAnswer === question.conditional.value
    })
  }

  const visibleQuestions = getVisibleQuestions()
  const currentQuestion = visibleQuestions[currentStep]

  // Función de validación para cada campo
  const validateField = (question: Question, value: string, university: University | null, expertise: Expertise | null, team: Team | null): string => {
    if (question.required) {
      if (question.type === "searchable-select") {
        if (question.id === "university" && !university) {
          return "Debes seleccionar una universidad o instituto"
        }
        if (question.id === "expertise" && !expertise) {
          return "Debes seleccionar tu área de especialización"
        }
        if (question.id === "existingTeam" && !team) {
          return "Debes seleccionar un equipo existente"
        }
      } else if (!value || value.trim().length === 0) {
        return "Este campo es obligatorio"
      }
    }

    // Validaciones específicas por tipo de campo
    switch (question.type) {
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Ingresa un email válido"
        }
        break
      case "tel":
        if (value && !/^\+?[\d\s\-\(\)]{9,}$/.test(value)) {
          return "Ingresa un número de teléfono válido"
        }
        break
      case "url":
        if (value && !/^https?:\/\/.+/.test(value)) {
          return "La URL debe comenzar con http:// o https://"
        }
        break
    }

    return ""
  }

  const handleNext = () => {
    // Validar el campo actual antes de continuar
    const error = validateField(
      currentQuestion,
      answers[currentQuestion.id] || "",
      selectedUniversity,
      selectedExpertise,
      selectedTeam
    )

    if (error) {
      setFieldError(error)
      return
    }

    // Limpiar error si la validación es exitosa
    setFieldError("")

    if (currentStep < visibleQuestions.length - 1) {
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
      // Mapear las respuestas del formulario al formato de la API
      const isCreatingNewTeam = answers.teamChoice === 'Crear nuevo equipo'
      
      const registrationData = isCreatingNewTeam ? {
        name: answers.name || '',
        lastname: answers.lastname || '',
        phone: answers.phone || '',
        email: answers.email || '',
        linkedin: answers.linkedin || '',
        github: answers.github || '',
        level: answers.experience as 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto',
        education_id: selectedUniversity?.id || '',
        expertise_id: selectedExpertise?.id || '',
        team_create: true,
        project_description: answers.teamDescription || '',
        team_name: answers.teamName || ''
      } : {
        name: answers.name || '',
        lastname: answers.lastname || '',
        phone: answers.phone || '',
        email: answers.email || '',
        linkedin: answers.linkedin || '',
        github: answers.github || '',
        level: answers.experience as 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto',
        education_id: selectedUniversity?.id || '',
        expertise_id: selectedExpertise?.id || '',
        team_create: false,
        team_id: selectedTeam?.id || ''
      }

      // Llamar a la API
      const response = await fetch('/api/hacker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("Registro completado exitosamente:", result.data)
        setShowSuccessModal(true)
      } else {
        console.error("Error en el registro:", result.message, result.errors)
        // Manejar errores de validación
        setFieldError("Error al enviar el registro. Por favor, intenta nuevamente.")
      }
    } catch (error) {
      console.error("Error al enviar el registro:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función auxiliar para generar UUID (temporal)
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
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
    ? currentQuestion.type === "searchable-select" 
      ? (currentQuestion.id === "university" ? selectedUniversity !== null : 
         currentQuestion.id === "expertise" ? selectedExpertise !== null :
         currentQuestion.id === "existingTeam" ? selectedTeam !== null : false)
      : answers[currentQuestion.id]?.trim().length > 0
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
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
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-bold">
          <GradientText>Hack[CIS]</GradientText>
        </div>
        <a href="/" className="text-gray-400 hover:text-white transition-colors">
          Volver al inicio
        </a>
      </nav>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start p-8 mt-12">
        <div className="max-w-4xl w-full space-y-8">
          {/* Progress indicator */}
          <div className="flex justify-center space-x-2 mb-8">
            {visibleQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index <= currentStep ? "bg-cyan-400 scale-110" : "bg-gray-600"
                  }`}
              />
            ))}
          </div>

          {/* Question */}
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-relaxed min-h-[150px] flex items-center justify-center">
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
              <div className="space-y-8 animate-fade-in">
                {currentQuestion.type === "searchable-select" ? (
                  <SearchableSelect
                    placeholder={currentQuestion.placeholder}
                    searchFunction={
                      currentQuestion.id === "university" ? searchUniversities : 
                      currentQuestion.id === "expertise" ? searchExpertise :
                      currentQuestion.id === "existingTeam" ? async () => await getExistingTeams() : 
                      searchUniversities
                    }
                    onSelect={(option) => {
                      if (currentQuestion.id === "university") {
                        setSelectedUniversity(option as University)
                      } else if (currentQuestion.id === "expertise") {
                        setSelectedExpertise(option as Expertise)
                      } else if (currentQuestion.id === "existingTeam") {
                        setSelectedTeam(option as Team)
                      }
                      // Limpiar error cuando se seleccione una opción
                      if (fieldError) {
                        setFieldError("")
                      }
                    }}
                    onCreateNew={currentQuestion.id === "university" ? createUniversity : undefined}
                    value={
                      currentQuestion.id === "university" ? selectedUniversity : 
                      currentQuestion.id === "expertise" ? selectedExpertise :
                      currentQuestion.id === "existingTeam" ? selectedTeam :
                      null
                    }
                    createLabel={currentQuestion.id === "university" ? "Crear nueva universidad" : undefined}
                  />
                ) : currentQuestion.type === "select" ? (
                  <select
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full max-w-lg mx-auto bg-gray-900/50 border border-gray-700 rounded-lg px-6 py-4 text-white text-lg focus:border-cyan-400 focus:outline-none transition-colors"
                  >
                    <option value="">{currentQuestion.placeholder}</option>
                    {currentQuestion.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : currentQuestion.type === "textarea" ? (
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

                <div className="flex justify-center space-x-4">
                  {currentStep > 0 && (
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white px-8 py-3 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Atrás
                    </Button>
                  )}

                  <Button
                    onClick={handleNext}
                    disabled={!canProceed || isSubmitting}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : currentStep === visibleQuestions.length - 1 ? (
                      "Completar Registro"
                    ) : (
                      <>
                        Continuar
                        <ArrowRight className="ml-2 h-4 w-4" />
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
        onClose={() => setShowSuccessModal(false)}
        participantName={answers.name || ""}
      />
    </div>
  )
}
