import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Bloquear acceso a /boot en producción
  if (request.nextUrl.pathname.startsWith('/Boot') || 
      request.nextUrl.pathname.startsWith('/boot')) {
    
    // Solo permitir en desarrollo
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    '/Boot/:path*',
    '/boot/:path*',
  ],
}
