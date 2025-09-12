import { useState } from 'react'
import { registerHacker, HackerRegistrationRequest, ApiResponse } from '@/lib/api-client'

interface UseHackerRegistrationReturn {
  isLoading: boolean
  error: string | null
  errors: Record<string, string[]>
  success: boolean
  register: (data: HackerRegistrationRequest) => Promise<boolean>
  reset: () => void
}

export function useHackerRegistration(): UseHackerRegistrationReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [success, setSuccess] = useState(false)

  const register = async (data: HackerRegistrationRequest): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    setErrors({})
    setSuccess(false)

    try {
      const response: ApiResponse = await registerHacker(data)

      if (response.success) {
        setSuccess(true)
        return true
      } else {
        setError(response.message)
        setErrors(response.errors || {})
        return false
      }
    } catch (err) {
      setError('Error inesperado durante el registro')
      console.error('Error en registro:', err)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const reset = () => {
    setIsLoading(false)
    setError(null)
    setErrors({})
    setSuccess(false)
  }

  return {
    isLoading,
    error,
    errors,
    success,
    register,
    reset
  }
}