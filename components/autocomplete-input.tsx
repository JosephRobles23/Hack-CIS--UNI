"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface Option {
    id: string
    name: string
    initial?: string
}

interface AutocompleteInputProps {
    placeholder: string
    searchFunction: (search: string) => Promise<Option[]>
    onSelect: (option: Option | null) => void
    onCreateNew?: (name: string, initial?: string) => Promise<Option | null>
    value?: Option | null
    className?: string
    createLabel?: string
}

export default function AutocompleteInput({
    placeholder,
    searchFunction,
    onSelect,
    onCreateNew,
    value,
    className = "",
    createLabel = "Crear nuevo"
}: AutocompleteInputProps) {
    const [inputValue, setInputValue] = useState("")
    const [options, setOptions] = useState<Option[]>([])
    const [loading, setLoading] = useState(false)
    const [showOptions, setShowOptions] = useState(false)
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [newItemName, setNewItemName] = useState("")
    const [newItemInitial, setNewItemInitial] = useState("")
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (value) {
            setInputValue(value.name)
        }
    }, [value])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowOptions(false)
                setShowCreateForm(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    useEffect(() => {
        if (inputValue.length > 0 && showOptions) {
            searchOptions()
        } else {
            setOptions([])
        }
    }, [inputValue, showOptions])

    const searchOptions = async () => {
        setLoading(true)
        try {
            const results = await searchFunction(inputValue)
            setOptions(results)
        } catch (error) {
            console.error("Error searching:", error)
            setOptions([])
        } finally {
            setLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setInputValue(newValue)
        setShowOptions(true)

        // Si el usuario borra el input, limpiar la selección
        if (newValue === "") {
            onSelect(null)
        }
    }

    const handleSelect = (option: Option) => {
        setInputValue(option.name)
        onSelect(option)
        setShowOptions(false)
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

    const handleFocus = () => {
        setShowOptions(true)
    }

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <Input
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                className="w-full max-w-lg mx-auto bg-gray-900/50 border-gray-700 focus:border-cyan-400 text-white placeholder-gray-400 text-lg py-4 px-6"
                autoFocus
            />

            {showOptions && inputValue.length > 0 && (
                <div className="absolute z-50 w-full max-w-lg mx-auto left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 border border-gray-700 rounded-lg shadow-lg max-h-80 overflow-hidden">
                    <div className="max-h-48 overflow-y-auto">
                        {loading ? (
                            <div className="p-4 text-left text-gray-400">Buscando...</div>
                        ) : options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.id}
                                    className="p-3 hover:bg-gray-800 cursor-pointer text-white transition-colors border-b border-gray-700 last:border-b-0"
                                    onClick={() => handleSelect(option)}
                                >
                                    <div className="truncate">{option.name}</div>
                                    {option.initial && (
                                        <div className="text-sm text-gray-400 truncate">{option.initial}</div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-left text-gray-400">No se encontraron resultados</div>
                        )}
                    </div>

                    {onCreateNew && !showCreateForm && (
                        <div className="border-t border-gray-700">
                            <button
                                className="w-full p-3 text-left text-cyan-400 hover:bg-gray-800 flex items-center transition-colors"
                                onClick={() => setShowCreateForm(true)}
                            >
                                <Plus className="h-4 w-4 mr-2 flex-shrink-0" />
                                <span className="truncate">{createLabel}: "{inputValue}"</span>
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
                            <div className="flex gap-2">
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
                                    className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white bg-transparent"
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