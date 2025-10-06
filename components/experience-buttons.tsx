"use client"

interface ExperienceButtonsProps {
  options: string[]
  selectedValue: string
  onSelect: (value: string) => void
  className?: string
}

export default function ExperienceButtons({
  options,
  selectedValue,
  onSelect,
  className = ""
}: ExperienceButtonsProps) {
  const getButtonStyle = (level: string, isSelected: boolean) => {
    switch (level) {
      case "Principiante":
        return isSelected 
          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-500/25" 
          : "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-green-400 hover:bg-green-500/10 hover:text-green-300"
      case "Intermedio":
        return isSelected 
          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400 shadow-lg shadow-blue-500/25" 
          : "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-blue-400 hover:bg-blue-500/10 hover:text-blue-300"
      case "Avanzado":
        return isSelected 
          ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-black border-orange-400 shadow-lg shadow-orange-500/25" 
          : "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-orange-400 hover:bg-orange-500/10 hover:text-orange-300"
      case "Experto":
        return isSelected 
          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg shadow-purple-500/25" 
          : "bg-gray-900/50 border-gray-700 text-gray-300 hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
      default:
        return "bg-gray-900/50 border-gray-700 text-gray-300"
    }
  }
  
  const getIcon = (level: string) => {
    switch (level) {
      case "Principiante": return "🌱"
      case "Intermedio": return "🚀"
      case "Avanzado": return "⚡"
      case "Experto": return "🏆"
      default: return "📊"
    }
  }

  const getDescription = (level: string) => {
    switch (level) {
      case "Principiante": return "Empezando en IA"
      case "Intermedio": return "Conocimientos básicos"
      case "Avanzado": return "Experiencia sólida"
      case "Experto": return "Dominio completo"
      default: return ""
    }
  }

  return (
    <div className={`w-full max-w-5xl mx-auto ${className}`}>
      {/* Mobile: 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {options.map((option) => {
          const isSelected = selectedValue === option
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`
                border-2 rounded-xl p-4 text-center transition-all duration-300 
                hover:scale-105 active:scale-95 min-h-[120px] flex flex-col justify-center
                ${getButtonStyle(option, isSelected)}
              `}
            >
              <div className="space-y-2">
                <div className="text-2xl">{getIcon(option)}</div>
                <div className="font-semibold text-sm leading-tight">{option}</div>
                <div className="text-xs opacity-75 leading-tight">{getDescription(option)}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tablet: 2x2 Grid with more space */}
      <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
        {options.map((option) => {
          const isSelected = selectedValue === option
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`
                border-2 rounded-xl p-6 text-center transition-all duration-300 
                hover:scale-105 active:scale-95 min-h-[140px] flex flex-col justify-center
                ${getButtonStyle(option, isSelected)}
              `}
            >
              <div className="space-y-3">
                <div className="text-3xl">{getIcon(option)}</div>
                <div className="font-semibold text-base">{option}</div>
                <div className="text-sm opacity-75">{getDescription(option)}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Desktop: Single row */}
      <div className="hidden lg:flex gap-4">
        {options.map((option) => {
          const isSelected = selectedValue === option
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`
                flex-1 border-2 rounded-xl p-6 text-center transition-all duration-300 
                hover:scale-105 active:scale-95 min-h-[160px] flex flex-col justify-center
                ${getButtonStyle(option, isSelected)}
              `}
            >
              <div className="space-y-3">
                <div className="text-4xl">{getIcon(option)}</div>
                <div className="font-semibold text-lg">{option}</div>
                <div className="text-sm opacity-75">{getDescription(option)}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}