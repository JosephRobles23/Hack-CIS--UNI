"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, ChevronDown, Check } from "lucide-react"

interface Option {
  id: string
  name: string
  initial?: string
}

interface SearchableSelectProps {
  placeholder: string
  searchFunction: (search: string) => Promise<Option[]>
  onSelect: (option: Option | null) => void
  onCreateNew?: (name: string, initial?: string) => Promise<Option | null>
  value?: Option | null
  className?: string
  createLabel?: string
}

export default function SearchableSelect({
  placeholder,
  searchFunction,
  onSelect,
  onCreateNew,
  value,
  className = "",
  createLabel = "Crear nuevo"
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newItemName, setNewItemName] = useState("")
  const [newItemInitial, setNewItemInitial] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setShowCreateForm(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (searchTerm.length > 0) {
      searchOptions()
    } else {
      setOptions([])
    }
  }, [searchTerm])

  const searchOptions = async () => {
    setLoading(true)
    try {
      const results = await searchFunction(searchTerm)
      setOptions(results)
    } catch (error) {
      console.error("Error searching:", error)
      setOptions([])
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (option: Option) => {
    onSelect(option)
    setIsOpen(false)
    setSearchTerm("")
    setShowCreateForm(false)
  }

  const handleCreateNew = async () => {
    if (!onCreateNew || !newItemName.trim()) return

    try {
      const newOption = await onCreateNew(newItemName.trim(), newItemInitial.trim())
      if (newOption) {
        handleSelect(newOption)
        setNewItemName("")
        setNewItemInitial("")
      }
    } catch (error) {
      console.error("Error creating new option:", error)
    }
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        className="w-full max-w-lg mx-auto bg-gray-900/50 border border-gray-700 rounded-lg px-4 sm:px-6 py-4 text-white cursor-pointer flex items-center justify-between transition-colors hover:border-gray-600 focus-within:border-cyan-400 text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-gray-400 truncate"}>
          {value ? value.name : placeholder}
        </span>
        <ChevronDown className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full max-w-lg mx-auto left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-hidden">
          <div className="p-3 border-b border-gray-700">
            <Input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-base"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Buscando...</div>
            ) : options.length > 0 ? (
              options.map((option) => (
                <div
                  key={option.id}
                  className="p-3 hover:bg-gray-800 cursor-pointer text-white flex items-center justify-between transition-colors"
                  onClick={() => handleSelect(option)}
                >
                  <span className="truncate mr-2">{option.name}</span>
                  {value?.id === option.id && <Check className="h-4 w-4 text-cyan-400 flex-shrink-0" />}
                </div>
              ))
            ) : searchTerm.length > 0 ? (
              <div className="p-4 text-center text-gray-400">No se encontraron resultados</div>
            ) : (
              <div className="p-4 text-center text-gray-400">Escribe para buscar...</div>
            )}
          </div>

          {onCreateNew && searchTerm.length > 0 && !showCreateForm && (
            <div className="border-t border-gray-700">
              <button
                className="w-full p-3 text-left text-cyan-400 hover:bg-gray-800 flex items-center transition-colors"
                onClick={() => setShowCreateForm(true)}
              >
                <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{createLabel}: "{searchTerm}"</span>
              </button>
            </div>
          )}

          {showCreateForm && (
            <div className="border-t border-gray-700 p-3 space-y-3">
              <Input
                type="text"
                placeholder="Nombre completo"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-base"
              />
              <Input
                type="text"
                placeholder="Siglas (ej: UNI, PUCP, etc.)"
                value={newItemInitial}
                onChange={(e) => setNewItemInitial(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-base"
              />
              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 sm:space-y-0">
                <Button
                  onClick={handleCreateNew}
                  disabled={!newItemName.trim()}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Crear
                </Button>
                <Button
                  onClick={() => setShowCreateForm(false)}
                  variant="outline"
                  className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white bg-transparent transition-colors"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
