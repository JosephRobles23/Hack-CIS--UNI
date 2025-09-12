"use client"

import { useEffect, useState } from "react"
import AnimatedCounter from "./animated-counter"
import GradientText from "./gradient-text"
import { toast } from "@/hooks/use-toast"

export default function HackerCounter() {
  const [hackerCount, setHackerCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Función para obtener el conteo de hackers
  const fetchHackerCount = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND_HACK_CIS || 'https://hack-cis-uni-backend.onrender.com/api/v1/'
      const response = await fetch(`${API_BASE_URL}user/count`)
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      
      if (result.total !== undefined) {
        setHackerCount(result.total)
      } else {
        console.error('Respuesta inesperada del servidor:', result)
        // Fallback a valor por defecto si no hay datos
        setHackerCount(0)
      }
    } catch (error) {
      console.error('Error al obtener conteo de hackers:', error)
      // En caso de error, mostrar un valor por defecto
      setHackerCount(0)
      toast({
        title: "Error al cargar datos",
        description: "No se pudo obtener el número de hackers registrados",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Obtener conteo inicial
    fetchHackerCount()

    // Actualizar cada 30 segundos
    const interval = setInterval(() => {
      fetchHackerCount()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="text-center space-y-2">
      <div className="text-4xl font-bold">
        <GradientText gradient="from-green-400 to-cyan-400">
          {loading ? (
            <div className="animate-pulse">---</div>
          ) : (
            <AnimatedCounter end={hackerCount} />
          )}
        </GradientText>
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">
        Hackers Registrados
        {loading && (
          <div className="text-xs text-gray-500 mt-1">Cargando...</div>
        )}
      </div>
    </div>
  )
}
