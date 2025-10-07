"use client"

import { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface LiquidGlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
  size?: "sm" | "md" | "lg"
}

export default function LiquidGlassButton({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: LiquidGlassButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base",
    lg: "px-5 py-2.5 text-sm sm:px-7 sm:py-3.5 sm:text-base md:px-8 md:py-4 md:text-lg",
  }

  const variantClasses = {
    primary:
      "bg-white/5 hover:bg-white/20 border-white/20 text-white shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
    secondary:
      "bg-black/10 hover:bg-black/20 border-black/20 text-gray-900 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
  }

  return (
    <button
      className={cn(
        // Base styles
        "relative group overflow-hidden rounded-2xl",
        "border backdrop-blur-xl",
        "font-semibold tracking-wide",
        "transition-all duration-500 ease-out",
        "transform hover:scale-[1.02] active:scale-[0.98]",

        // Glass morphism effect
        "before:absolute before:inset-0",
        "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
        "before:opacity-0 hover:before:opacity-100",
        "before:transition-opacity before:duration-500",

        // Liquid animation
        "after:absolute after:inset-0",
        "after:bg-gradient-to-r after:from-cyan-400/30 after:via-purple-400/30 after:to-purple-500/30 after:to-purple-600/30",
        "after:translate-x-[-100%] hover:after:translate-x-[100%]",
        "after:transition-transform after:duration-1000 after:ease-in-out",

        // Shadow and glow
        "hover:shadow-[0_8px_32px_0_rgba(99,102,241,0.3)]",

        // Size and variant
        sizeClasses[size],
        variantClasses[variant],

        className
      )}
      {...props}
    >
      {/* Inner glow effect */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

      {/* Shimmer effect */}
      <span className="absolute inset-0 rounded-2xl overflow-hidden">
        <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000 ease-out" />
      </span>

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Border glow */}
      <span className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30 transition-all duration-500" />
    </button>
  )
}
