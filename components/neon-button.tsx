"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NeonButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
}

export default function NeonButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
}: NeonButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40",
    secondary:
      "bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-400 hover:to-yellow-400 text-black font-semibold shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40",
    outline:
      "border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black bg-transparent shadow-lg shadow-cyan-400/25 hover:shadow-cyan-400/40",
  }

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <Button
      onClick={onClick}
      className={cn("transition-all duration-300 hover:scale-105 border-0", variants[variant], sizes[size], className)}
    >
      {children}
    </Button>
  )
}
