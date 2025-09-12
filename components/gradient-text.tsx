"use client"

import type React from "react"

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  gradient?: string
}

export default function GradientText({
  children,
  className = "",
  gradient = "from-cyan-500 via-blue-500 to-purple-600",
}: GradientTextProps) {
  return <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>{children}</span>
}
