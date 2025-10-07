"use client"

import { useEffect, useState } from "react"

export default function SplineScene() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // Detectar si es mobile de forma síncrona para evitar re-renders
    const checkMobile = () => {
      const mobile = window.innerWidth < 480
      setIsMobile(mobile)
      return mobile
    }

    // Verificar al montar
    const mobile = checkMobile()

    // Cargar el script de Spline de forma diferida (después del FCP)
    const loadSplineScript = () => {
      if (!document.querySelector('script[src*="spline-viewer.js"]')) {
        const script = document.createElement('script')
        script.type = 'module'
        script.src = 'https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js'
        script.async = true
        script.onload = () => {
          setScriptLoaded(true)
          setIsLoaded(true)
        }
        script.onerror = () => {
          console.warn('Failed to load Spline viewer')
          setIsLoaded(true)
        }
        document.head.appendChild(script)
      } else {
        setScriptLoaded(true)
        setIsLoaded(true)
      }
    }

    // Retrasar la carga de Spline para no bloquear el FCP
    const timer = setTimeout(() => {
      loadSplineScript()
    }, 100)

    // Escuchar cambios de tamaño de ventana
    const handleResize = () => {
      const newMobile = window.innerWidth < 480
      if (newMobile !== mobile) {
        setIsMobile(newMobile)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
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

  // Mostrar un fondo de respaldo mientras carga
  if (!isLoaded || isMobile === null) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Fondo de respaldo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      </div>
    )
  }

  // Si el script no cargó, mostrar solo el fondo
  if (!scriptLoaded) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Spline Viewer Embebido - Fondo interactivo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <spline-viewer
          key={splineUrl}
          url={splineUrl}
          style={splineStyles}
          loading="lazy"
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