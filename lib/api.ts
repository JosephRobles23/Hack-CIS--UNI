const API_BASE_URL = process.env.NEXT_PUBLIC_URL_BACKEND_HACK_CIS || ''

// Tipos para las respuestas de la API
export interface University {
  id: string
  name: string
  initial: string
}

export interface Expertise {
  id: string
  name: string
}

export interface Team {
  id: string
  name: string
}

export interface ApiResponse<T> {
  message: string
  success: boolean
  data: T
}

// Función para buscar universidades
export async function searchUniversities(search: string): Promise<University[]> {
  try {
    console.log('Buscando universidades con:', search)
    console.log('URL:', `${API_BASE_URL}education/?search=${encodeURIComponent(search)}`)
    
    const response = await fetch(`${API_BASE_URL}education/?search=${encodeURIComponent(search)}`)
    
    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers.get('content-type'))
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText)
      return []
    }

    const text = await response.text()
    console.log('Response text:', text)
    
    let result: ApiResponse<University[]>
    try {
      result = JSON.parse(text)
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      console.error('Response text was:', text)
      return []
    }
    
    if (result.success) {
      console.log('Universidades encontradas:', result.data)
      return result.data
    }
    
    console.error('Error al buscar universidades:', result.message)
    return []
  } catch (error) {
    console.error('Error en la búsqueda de universidades:', error)
    return []
  }
}

// Función para crear nueva universidad
export async function createUniversity(name: string, initial?: string): Promise<University | null> {
  try {
    const response = await fetch(`${API_BASE_URL}education/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, initial: initial || '' }),
    })
    
    const result: ApiResponse<University> = await response.json()
    
    if (result.success) {
      return result.data
    }
    
    console.error('Error al crear universidad:', result.message)
    return null
  } catch (error) {
    console.error('Error al crear universidad:', error)
    return null
  }
}

// Función para buscar expertise
export async function searchExpertise(search: string): Promise<Expertise[]> {
  try {
    const response = await fetch(`${API_BASE_URL}expertise/?search=${encodeURIComponent(search)}`)
    const result: ApiResponse<Expertise[]> = await response.json()
    
    if (result.success) {
      return result.data
    }
    
    console.error('Error al buscar expertise:', result.message)
    return []
  } catch (error) {
    console.error('Error en la búsqueda de expertise:', error)
    return []
  }
}

// Función para obtener equipos existentes
export async function getExistingTeams(): Promise<Team[]> {
  try {
    console.log('Obteniendo equipos existentes')
    console.log('URL:', `${API_BASE_URL}team/`)
    
    const response = await fetch(`${API_BASE_URL}team/`)
    
    console.log('Response status:', response.status)
    console.log('Response headers:', response.headers.get('content-type'))
    
    if (!response.ok) {
      console.error('Response not OK:', response.status, response.statusText)
      return []
    }

    const text = await response.text()
    console.log('Response text:', text)
    
    let result: ApiResponse<Team[]>
    try {
      result = JSON.parse(text)
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError)
      console.error('Response text was:', text)
      return []
    }
    
    if (result.success) {
      console.log('Equipos encontrados:', result.data)
      return result.data
    }
    
    console.error('Error al obtener equipos:', result.message)
    return []
  } catch (error) {
    console.error('Error al obtener equipos:', error)
    return []
  }
}
