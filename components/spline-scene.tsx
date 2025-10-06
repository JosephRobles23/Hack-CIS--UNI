"use client"

import { useEffect } from "react"

export default function SplineScene() {
  useEffect(() => {
    // Cargar el script de Spline si no existe
    if (!document.querySelector('script[src*="spline-viewer.js"]')) {
      const script = document.createElement('script')
      script.type = 'module'
      script.src = 'https://unpkg.com/@splinetool/viewer@1.10.74/build/spline-viewer.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Spline Viewer Embebido - Fondo interactivo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <spline-viewer 
          url="https://prod.spline.design/I7nVGHVBvrdSDSPs/scene.splinecode"
          style={{
            width: '100dvw',
            height: '100dvh',
            minWidth: '1920px',
            minHeight: '1080px',
            opacity: '1',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            /* transform: 'translate(-80%, -83%) scale(1.8)', */
            left: '50%',
            top: '50%',
            position: 'absolute',
            pointerEvents: 'auto', // Interactivo por defecto
            zIndex: '1' // Z-index bajo para estar detrás
          } as React.CSSProperties}
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