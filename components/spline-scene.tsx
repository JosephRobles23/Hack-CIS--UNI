"use client"

import { useEffect, useState } from "react"
import Spline from "@splinetool/react-spline";

export default function SplineScene() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)

  function handleSplineMouseUp(e: any) {
    // Detectamos si el objeto clickeado es el botón
    if (e.target.name === "Button-register") {
      console.log("🟢 Botón 3D 'Button-register' presionado (Mouse Up) - Redirigiendo a submit-project");

      // Redirigir a la página de submisión de proyectos
      window.location.href = "/submit-project"
    }
  }

  useEffect(() => {
    // Detectar si es mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 480)
    }

    // Verificar al montar
    checkMobile()

    // Escuchar cambios de tamaño de ventana
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // URL condicional según el tamaño de pantalla
  const splineUrl = isMobile
    ? "https://prod.spline.design/nwDJJPY243nnG6aM/scene.splinecode" // Mobile
    : "https://prod.spline.design/dYNHLr92LJwaISpR/scene.splinecode"
  /* : "https://prod.spline.design/I7nVGHVBvrdSDSPs/scene.splinecode" */ // Desktop

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

  // Mostrar un fondo de respaldo mientras detecta el tipo de dispositivo
  if (isMobile === null) {
    return (
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        {/* Fondo de respaldo con gradiente */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Spline Scene con evento de mouse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Spline
          scene={splineUrl}
          onSplineMouseUp={handleSplineMouseUp}
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
