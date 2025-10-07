"use client"

import { useEffect, useState } from "react"

export default function SplineScene() {
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Detectar si es mobile (ancho menor a 480px)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480)
    }

    // Verificar al montar
    checkMobile()
    setIsLoaded(true)

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile)

    // Cargar el script de Spline si no existe
    if (!document.querySelector('script[src*="spline-viewer.js"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js'
      document.head.appendChild(script)
    }

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // URL condicional según el tamaño de pantalla
  const splineUrl = isMobile
    ? "https://prod.spline.design/nwDJJPY243nnG6aM/scene.splinecode" // Mobile
    : "https://prod.spline.design/I7nVGHVBvrdSDSPs/scene.splinecode" // Desktop

  // Estilos condicionales según el tamaño de pantalla
  const splineStyles: React.CSSProperties = isMobile ? {
    width: '100dvw',
    height: '100dvh',
    minWidth: '1920px',
    minHeight: '1080px',
    opacity: '1',
    objectFit: 'cover',
    transform: 'translate(-50%, -55%) scale(0.75)',
    left: '50%',
    top: '50%',
    position: 'absolute',
    pointerEvents: 'auto',
    zIndex: '1'
  } : {
    width: '100dvw',
    height: '100dvh',
    minWidth: '1920px',
    minHeight: '1080px',
    opacity: '1',
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
    left: '50%',
    top: '50%',
    position: 'absolute',
    pointerEvents: 'auto',
    zIndex: '1'
  }

  // No renderizar hasta que se haya detectado el tamaño
  if (!isLoaded) {
    return null
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Spline Viewer Embebido - Fondo interactivo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <spline-viewer
          key={splineUrl} // Forzar re-render cuando cambia la URL
          url={splineUrl}
          style={splineStyles}
        />
      </div>

      {/* Overlay para mejor integración */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ mixBlendMode: 'multiply' }}
      />
    </div>
  )
}

// Declaración de tipos para TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          url?: string
          style?: React.CSSProperties
        },
        HTMLElement
      >
    }
  }
}