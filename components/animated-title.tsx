"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Text3D, Center, Environment } from "@react-three/drei"
import { useRef, useState } from "react"
import { type Mesh, Vector3 } from "three"

function AnimatedText() {
  const meshRef = useRef<Mesh>(null)
  const { mouse, viewport } = useThree()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Seguir el cursor
      const x = (mouse.x * viewport.width) / 8
      const y = (mouse.y * viewport.height) / 8

      meshRef.current.rotation.x = y * 0.1
      meshRef.current.rotation.y = x * 0.1

      // Animación de flotación
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1

      // Efecto de hover
      const scale = hovered ? 1.05 : 1
      meshRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1)
    }
  })

  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/GeistMono_Bold.json"
        size={1.2}
        height={0.2}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={5}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {"Hack[CIS]"}
        <meshStandardMaterial
          color={hovered ? "#00ff88" : "#ffffff"}
          emissive={hovered ? "#004422" : "#000000"}
          roughness={0.1}
          metalness={0.8}
        />
      </Text3D>
    </Center>
  )
}

export default function AnimatedTitle() {
  return (
    <div className="h-64 w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff0088" />
        <AnimatedText />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}
