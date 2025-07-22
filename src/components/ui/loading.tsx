import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

function LoadingSpinner({ className, size = "md", ...props }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-white/30 border-t-white",
          sizeClasses[size]
        )}
      />
    </div>
  )
}

interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading: boolean
  children: React.ReactNode
}

function LoadingOverlay({ isLoading, children, className, ...props }: LoadingOverlayProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-md">
          <LoadingSpinner size="lg" />
        </div>
      )}
    </div>
  )
}

export { LoadingSpinner, LoadingOverlay }
