// Cliente API para manejar las llamadas al backend

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  errors?: Record<string, string[]>
}

export interface HackerRegistrationRequest {
  name: string
  lastname: string
  phone: string
  email: string
  linkedin: string
  github?: string
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Experto'
  education_id: string
  expertise_id: string
  team_create: boolean
  project_description?: string
  team_name?: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.URL_BACKEND_HACK_CIS || ''
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Error en la solicitud',
          errors: data.errors || {}
        }
      }

      return data
    } catch (error) {
      console.error('Error en la llamada a la API:', error)
      return {
        success: false,
        message: 'Error de conexión con el servidor',
        errors: { network: ['No se pudo conectar con el servidor'] }
      }
    }
  }

  // Registrar hacker
  async registerHacker(data: HackerRegistrationRequest): Promise<ApiResponse> {
    return this.makeRequest('/hacker', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Obtener información del endpoint (para testing)
  async getHackerEndpointInfo(): Promise<ApiResponse> {
    return this.makeRequest('/hacker', {
      method: 'GET',
    })
  }
}

// Instancia singleton del cliente API
export const apiClient = new ApiClient()

// Funciones de conveniencia
export const registerHacker = (data: HackerRegistrationRequest) => 
  apiClient.registerHacker(data)

export const getHackerEndpointInfo = () => 
  apiClient.getHackerEndpointInfo()