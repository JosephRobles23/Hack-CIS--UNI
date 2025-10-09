"use client"

import { useEffect, useState } from "react"

export default function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
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
    // Usar requestIdleCallback si está disponible, sino setTimeout
    let timer: number | NodeJS.Timeout

    if ('requestIdleCallback' in window) {
      timer = window.requestIdleCallback(() => {
        loadSplineScript()
      })
    } else {
      timer = setTimeout(() => {
        loadSplineScript()
      }, 500)
    }

    return () => {
      if ('requestIdleCallback' in window) {
        window.cancelIdleCallback(timer as number)
      } else {
        clearTimeout(timer as NodeJS.Timeout)
      }
    }
  }, [])

  const splineUrl = "https://prod.spline.design/Davqd-NY56s68KP7/scene.splinecode"

  const splineStyles: React.CSSProperties = {
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
  }

  // Mostrar un fondo de respaldo mientras carga
  if (!isLoaded) {
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