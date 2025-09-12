import { z } from 'zod'

// Validaciones personalizadas reutilizables
export const phoneValidation = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Formato de teléfono inválido')
  .min(9, 'El teléfono debe tener al menos 9 dígitos')
  .max(15, 'El teléfono no puede exceder 15 dígitos')

export const emailValidation = z.string()
  .email('Formato de email inválido')
  .max(255, 'El email no puede exceder 255 caracteres')

export const linkedinValidation = z.string()
  .url('URL de LinkedIn inválida')
  .regex(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 'URL de LinkedIn debe tener el formato correcto')

export const githubValidation = z.string()
  .url('URL de GitHub inválida')
  .regex(/^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/, 'URL de GitHub debe tener el formato correcto')
  .optional()
  .or(z.literal(''))

export const nameValidation = z.string()
  .min(2, 'Debe tener al menos 2 caracteres')
  .max(100, 'No puede exceder 100 caracteres')
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Solo puede contener letras y espacios')

// Schema completo para el registro de hacker
export const hackerRegistrationSchema = z.object({
  name: nameValidation,
  lastname: nameValidation,
  phone: phoneValidation,
  email: emailValidation,
  linkedin: linkedinValidation,
  github: githubValidation,
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

// Tipos TypeScript derivados del schema
export type HackerRegistrationData = z.infer<typeof hackerRegistrationSchema>

// Función para validar datos del frontend
export function validateHackerData(data: unknown): { 
  success: boolean
  data?: HackerRegistrationData
  errors?: Record<string, string[]>
} {
  try {
    const validatedData = hackerRegistrationSchema.parse(data)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      
      error.errors.forEach((err) => {
        const field = err.path.join('.')
        if (!errors[field]) {
          errors[field] = []
        }
        errors[field].push(err.message)
      })
      
      return { success: false, errors }
    }
    
    return { 
      success: false, 
      errors: { general: ['Error de validación desconocido'] }
    }
  }
}