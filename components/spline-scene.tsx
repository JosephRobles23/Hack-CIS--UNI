"use client"

import { useEffect, useRef } from "react"

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    // Verificar si el script ya está cargado
    if (scriptLoadedRef.current) return

    // Función para cargar el script de Spline
    const loadSplineScript = () => {
      // Verificar si el script ya existe
      if (document.querySelector('script[src*="spline-viewer.js"]')) {
        scriptLoadedRef.current = true
        return
      }

      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js'
      script.async = true
      
      script.onload = () => {
        scriptLoadedRef.current = true
        console.log('Spline viewer script loaded successfully')
      }
      
      script.onerror = () => {
        console.error('Failed to load Spline viewer script')
      }

      document.head.appendChild(script)
    }

    loadSplineScript()

    // Cleanup function
    return () => {
      // El script se mantiene en el DOM para reutilización
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen' // Efecto de mezcla para integrar mejor con el fondo
      }}
    >
      {/* Elemento Spline Viewer */}
      <spline-viewer 
        url="https://prod.spline.design/yTO4oXwIHVYvTiHC/scene.splinecode"
        style={{
          width: '100%',
          height: '100%',
          opacity: '0.5', // Hacer semi-transparente para que no domine la escena
          pointerEvents: 'auto' // Asegurar que no interfiera con la interacción
        } as React.CSSProperties}
      />
      
      {/* Overlay sutil para mejor integración */}
      <div 
        className="absolute inset-0 bg-black/20 pointer-events-none"
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
