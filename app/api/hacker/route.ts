import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Schema de validación usando Zod
const hackerRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  lastname: z.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(100, 'El apellido no puede exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),
  
  phone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Formato de teléfono inválido')
    .min(9, 'El teléfono debe tener al menos 9 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos'),
  
  email: z.string()
    .email('Formato de email inválido')
    .max(255, 'El email no puede exceder 255 caracteres'),
  
  linkedin: z.string()
    .url('URL de LinkedIn inválida')
    .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'URL de LinkedIn debe tener el formato correcto'),
  
  github: z.string()
    .url('URL de GitHub inválida')
    .regex(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/, 'URL de GitHub debe tener el formato correcto')
    .optional()
    .or(z.literal('')),
  
  level: z.enum(['Principiante', 'Intermedio', 'Avanzado', 'Experto'], {
    errorMap: () => ({ message: 'Nivel de experiencia inválido' })
  }),
  
  education_id: z.string()
    .min(1, 'ID de educación es requerido')
    .uuid('ID de educación debe ser un UUID válido'),
  
  expertise_id: z.string()
    .min(1, 'ID de expertise es requerido')
    .uuid('ID de expertise debe ser un UUID válido'),
  
  team_create: z.boolean(),
  
  project_description: z.string()
    .min(10, 'La descripción del proyecto debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres')
    .optional(),
  
  team_name: z.string()
    .min(2, 'El nombre del equipo debe tener al menos 2 caracteres')
    .max(50, 'El nombre del equipo no puede exceder 50 caracteres')
    .optional()
})

// Función para generar UUID simple (en producción usar una librería como uuid)
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Función para simular guardado en base de datos
async function saveHackerToDatabase(hackerData: any) {
  // Aquí iría la lógica para guardar en tu base de datos
  // Por ahora simulamos con un delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Simular que se guarda exitosamente
  return {
    id: generateUUID(),
    ...hackerData,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la request
    const body = await request.json()
    
    // Validar los datos usando el schema
    const validatedData = hackerRegistrationSchema.parse(body)
    
    // Validaciones adicionales de negocio
    if (validatedData.team_create && !validatedData.team_name) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'El nombre del equipo es requerido cuando se crea un nuevo equipo',
          errors: { team_name: ['El nombre del equipo es requerido'] }
        },
        { status: 400 }
      )
    }
    
    if (validatedData.team_create && !validatedData.project_description) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'La descripción del proyecto es requerida cuando se crea un nuevo equipo',
          errors: { project_description: ['La descripción del proyecto es requerida'] }
        },
        { status: 400 }
      )
    }
    
    // Verificar si el email ya existe (simulado)
    // En producción, aquí harías una consulta a la base de datos
    const existingEmails = ['test@example.com', 'admin@hackcis.com'] // Simulado
    if (existingEmails.includes(validatedData.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Este email ya está registrado',
          errors: { email: ['Este email ya está registrado'] }
        },
        { status: 409 }
      )
    }
    
    // Generar IDs si no se proporcionaron (en un caso real vendrían del frontend)
    const hackerData = {
      ...validatedData,
      expertise_id: validatedData.expertise_id || generateUUID(),
      education_id: validatedData.education_id || generateUUID()
    }
    
    // Guardar en la base de datos
    const savedHacker = await saveHackerToDatabase(hackerData)
    
    // Respuesta exitosa
    return NextResponse.json(
      {
        success: true,
        message: 'Registro exitoso',
        data: {
          id: savedHacker.id,
          name: savedHacker.name,
          email: savedHacker.email,
          team_name: savedHacker.team_name
        }
      },
      { status: 201 }
    )
    
  } catch (error) {
    // Manejar errores de validación de Zod
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      
      error.errors.forEach((err) => {
        const field = err.path.join('.')
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field].push(err.message)
      })
      
      return NextResponse.json(
        {
          success: false,
          message: 'Datos de entrada inválidos',
          errors
        },
        { status: 400 }
      )
    }
    
    // Manejar otros errores
    console.error('Error en registro de hacker:', error)
    
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor',
        errors: {}
      },
      { status: 500 }
    )
  }
}

// Método GET para obtener información (opcional)
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Endpoint de registro de hackers',
      endpoints: {
        POST: 'hacker/'
      }
    },
    { status: 200 }
  )
}