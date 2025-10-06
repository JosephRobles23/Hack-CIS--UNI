"use client"

interface TeamChoiceButtonsProps {
  options: string[]
  selectedValue: string
  onSelect: (value: string) => void
  onAutoAdvance?: () => void
  className?: string
}

export default function TeamChoiceButtons({
  options,
  selectedValue,
  onSelect,
  onAutoAdvance,
  className = ""
}: TeamChoiceButtonsProps) {
  const handleSelect = (value: string) => {
    onSelect(value)
    // Auto avanzar después de un pequeño delay para mostrar la selección
    setTimeout(() => {
      onAutoAdvance?.()
    }, 500)
  }

  const getButtonContent = (option: string) => {
    switch (option) {
      case "Crear nuevo equipo":
        return {
          icon: "🚀",
          title: "Crear nuevo equipo",
          description: "Forma tu propio equipo y lidera el proyecto",
          gradient: "from-purple-500 to-pink-500",
          hoverGradient: "from-purple-400 to-pink-400",
          borderColor: "border-purple-400"
        }
      case "Unirme a equipo existente":
        return {
          icon: "🤝",
          title: "Unirme a equipo existente",
          description: "Únete a un equipo que ya está formado",
          gradient: "from-cyan-500 to-blue-500",
          hoverGradient: "from-cyan-400 to-blue-400",
          borderColor: "border-cyan-400"
        }
      default:
        return {
          icon: "👥",
          title: option,
          description: "Selecciona una opción",
          gradient: "from-gray-500 to-gray-600",
          hoverGradient: "from-gray-400 to-gray-500",
          borderColor: "border-gray-400"
        }
    }
  }

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Mobile: Stacked vertically */}
      <div className="flex flex-col gap-4 mx-8 sm:hidden">
        {options.map((option) => {
          const isSelected = selectedValue === option
          const content = getButtonContent(option)
          
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`
                relative overflow-hidden border-2 rounded-2xl p-6 text-center transition-all duration-500 
                hover:scale-105 active:scale-95 min-h-[140px] flex flex-col justify-center
                ${isSelected 
                  ? `bg-gradient-to-r ${content.gradient} text-white ${content.borderColor} shadow-lg` 
                  : `bg-gray-900/50 border-gray-700 text-gray-300 hover:${content.borderColor} hover:bg-gradient-to-r hover:${content.hoverGradient} hover:text-white`
                }
              `}
            >
              <div className="space-y-3">
                <div className="text-4xl">{content.icon}</div>
                <div className="font-bold text-lg leading-tight">{content.title}</div>
                <div className="text-sm opacity-90 leading-tight px-2">{content.description}</div>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
            </button>
          )
        })}
      </div>

      {/* Tablet and Desktop: Side by side */}
      <div className="hidden sm:flex gap-6 mx-8">
        {options.map((option) => {
          const isSelected = selectedValue === option
          const content = getButtonContent(option)
          
          return (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`
                relative overflow-hidden flex-1 border-2 rounded-2xl p-4 text-center transition-all duration-500 
                hover:scale-105 active:scale-95 min-h-[180px]  flex flex-col justify-center 
                ${isSelected 
                  ? `bg-gradient-to-r ${content.gradient} text-white ${content.borderColor} shadow-xl shadow-${content.gradient.split('-')[1]}-500/25` 
                  : `bg-gray-900/50 border-gray-700 text-gray-300 hover:${content.borderColor} hover:bg-gradient-to-r hover:${content.hoverGradient} hover:text-white`
                }
              `}
            >
              <div className="space-y-4">
                <div className="text-5xl">{content.icon}</div>
                <div className="font-bold text-xl leading-tight">{content.title}</div>
                <div className="text-base opacity-90 leading-relaxed px-4">{content.description}</div>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-white/10 animate-pulse" />
              )}
              
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20">
                <div className="w-8 h-8 rounded-full bg-white/20" />
              </div>
              <div className="absolute bottom-4 left-4 opacity-20">
                <div className="w-6 h-6 rounded-full bg-white/20" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}